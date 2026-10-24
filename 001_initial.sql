-- PROJECT_NOVA schema starter. Review and extend policies before production.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'New user',
  avatar_path text,
  membership_tier text not null default 'free' check (membership_tier in ('free','premium')),
  created_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'direct' check (kind in ('direct','group','channel')),
  title text,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.conversation_members (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner','admin','member')),
  joined_at timestamptz not null default now(),
  primary key (conversation_id, user_id)
);

-- This table stores ciphertext/envelopes only. No plaintext message column.
create table if not exists public.encrypted_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references auth.users(id),
  protocol_version text not null,
  ciphertext bytea not null,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists encrypted_messages_conversation_created_idx
  on public.encrypted_messages (conversation_id, created_at desc);
create index if not exists encrypted_messages_expiry_idx
  on public.encrypted_messages (expires_at) where expires_at is not null;

create table if not exists public.bot_registry (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text not null default '',
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.bot_commands (
  id uuid primary key default gen_random_uuid(),
  bot_id uuid not null references public.bot_registry(id) on delete cascade,
  command text not null,
  description text not null default '',
  created_at timestamptz not null default now(),
  unique (bot_id, command)
);

create table if not exists public.user_blocks (
  blocker_id uuid not null references auth.users(id) on delete cascade,
  blocked_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id),
  check (blocker_id <> blocked_id)
);

alter table public.profiles enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_members enable row level security;
alter table public.encrypted_messages enable row level security;
alter table public.bot_registry enable row level security;
alter table public.bot_commands enable row level security;
alter table public.user_blocks enable row level security;

create policy "profiles readable to authenticated users" on public.profiles
for select to authenticated using (true);
create policy "users update own profile" on public.profiles
for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy "users insert own profile" on public.profiles
for insert to authenticated with check (id = (select auth.uid()));

create policy "members read conversations" on public.conversations
for select to authenticated using (exists (
  select 1 from public.conversation_members m
  where m.conversation_id = id and m.user_id = (select auth.uid())
));
create policy "members read membership rows" on public.conversation_members
for select to authenticated using (user_id = (select auth.uid()) or exists (
  select 1 from public.conversation_members mine
  where mine.conversation_id = conversation_members.conversation_id and mine.user_id = (select auth.uid())
));
create policy "members read encrypted messages" on public.encrypted_messages
for select to authenticated using (exists (
  select 1 from public.conversation_members m
  where m.conversation_id = encrypted_messages.conversation_id and m.user_id = (select auth.uid())
));
create policy "members insert encrypted messages as self" on public.encrypted_messages
for insert to authenticated with check (
  sender_id = (select auth.uid()) and exists (
    select 1 from public.conversation_members m
    where m.conversation_id = encrypted_messages.conversation_id and m.user_id = (select auth.uid())
  )
);
create policy "users manage own bot records" on public.bot_registry
for all to authenticated using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));
create policy "bot commands visible to bot owner" on public.bot_commands
for select to authenticated using (exists (
  select 1 from public.bot_registry b where b.id = bot_commands.bot_id and b.owner_id = (select auth.uid())
));
create policy "users manage own blocks" on public.user_blocks
for all to authenticated using (blocker_id = (select auth.uid())) with check (blocker_id = (select auth.uid()));

-- IMPORTANT: No client-side insert policy for conversations or memberships by design.
-- Add a reviewed SECURITY DEFINER RPC or trusted server endpoint to create a conversation
-- and its memberships atomically. Do not let clients self-add to arbitrary conversations.
-- Disappearing messages require a trusted scheduled cleanup job; expires_at alone does not delete data.
-- Premium membership must be granted by a trusted payment/webhook/admin path, not client updates.
