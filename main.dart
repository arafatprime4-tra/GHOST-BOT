import 'package:flutter/material.dart';

void main() => runApp(const NovaApp());

const _bg = Color(0xFF080B14);
const _panel = Color(0xFF111827);
const _cyan = Color(0xFF42F5E9);
const _violet = Color(0xFF9B7BFF);

class NovaApp extends StatelessWidget {
  const NovaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PROJECT_NOVA',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: _bg,
        colorScheme: const ColorScheme.dark(primary: _cyan, secondary: _violet),
        useMaterial3: true,
        cardTheme: CardThemeData(color: _panel, margin: EdgeInsets.zero),
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _tab = 0;
  final _chats = const [
    _Chat('Nova Assistant', 'Welcome to your new workspace.', 'Now', Icons.auto_awesome, true),
    _Chat('Dev Community', 'Build safely. Ship confidently.', '12:42', Icons.groups, false),
    _Chat('Saved Messages', 'Your private notes live here.', 'Yesterday', Icons.bookmark, false),
    _Chat('Bot Lab', 'Try /help to explore demo commands.', 'Mon', Icons.smart_toy, true),
  ];

  @override
  Widget build(BuildContext context) {
    final wide = MediaQuery.sizeOf(context).width >= 760;
    return Scaffold(
      appBar: AppBar(
        backgroundColor: _bg,
        title: const Row(children: [
          Icon(Icons.blur_on, color: _cyan, size: 30),
          SizedBox(width: 8),
          Text('PROJECT_NOVA', style: TextStyle(fontWeight: FontWeight.w900, letterSpacing: 1.2)),
        ]),
        actions: [
          IconButton(tooltip: 'Search (demo)', onPressed: () => _notice('Search will be connected in the next phase.'), icon: const Icon(Icons.search)),
          IconButton(tooltip: 'Privacy settings (demo)', onPressed: () => _notice('Privacy settings are a UI preview; E2EE is not implemented yet.'), icon: const Icon(Icons.shield_outlined)),
          const SizedBox(width: 8),
        ],
      ),
      body: Row(children: [
        if (wide) NavigationRail(
          selectedIndex: _tab,
          onDestinationSelected: (v) => setState(() => _tab = v),
          backgroundColor: _bg,
          destinations: const [
            NavigationRailDestination(icon: Icon(Icons.chat_bubble_outline), label: Text('Chats')),
            NavigationRailDestination(icon: Icon(Icons.smart_toy_outlined), label: Text('Bots')),
            NavigationRailDestination(icon: Icon(Icons.workspace_premium_outlined), label: Text('Premium')),
            NavigationRailDestination(icon: Icon(Icons.settings_outlined), label: Text('Settings')),
          ],
        ),
        Expanded(child: _page()),
      ]),
      bottomNavigationBar: wide ? null : NavigationBar(
        selectedIndex: _tab,
        onDestinationSelected: (v) => setState(() => _tab = v),
        backgroundColor: _panel,
        destinations: const [
          NavigationDestination(icon: Icon(Icons.chat_bubble_outline), label: 'Chats'),
          NavigationDestination(icon: Icon(Icons.smart_toy_outlined), label: 'Bots'),
          NavigationDestination(icon: Icon(Icons.workspace_premium_outlined), label: 'Premium'),
          NavigationDestination(icon: Icon(Icons.settings_outlined), label: 'Settings'),
        ],
      ),
    );
  }

  Widget _page() {
    switch (_tab) {
      case 1: return _botsPage();
      case 2: return _premiumPage();
      case 3: return _settingsPage();
      default: return _chatsPage();
    }
  }

  Widget _chatsPage() => ListView(
    padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
    children: [
      _hero('YOUR SIGNAL. YOUR SPACE.', 'A new generation of private communication.', Icons.bolt),
      const SizedBox(height: 18),
      const Text('MESSAGES', style: TextStyle(color: _cyan, letterSpacing: 2, fontSize: 11, fontWeight: FontWeight.bold)),
      const SizedBox(height: 10),
      ..._chats.map((chat) => Padding(
        padding: const EdgeInsets.only(bottom: 8),
        child: Card(child: ListTile(
          onTap: () => _notice('${chat.name}: demo conversation screen. Sending messages is not connected yet.'),
          leading: CircleAvatar(backgroundColor: chat.bot ? _violet.withValues(alpha: .18) : _cyan.withValues(alpha: .12), child: Icon(chat.icon, color: chat.bot ? _violet : _cyan)),
          title: Text(chat.name, style: const TextStyle(fontWeight: FontWeight.w700)),
          subtitle: Text(chat.lastMessage, maxLines: 1, overflow: TextOverflow.ellipsis),
          trailing: Text(chat.time, style: const TextStyle(fontSize: 11, color: Colors.white54)),
        )),
      )),
      const SizedBox(height: 8),
      const Text('DEMO BUILD • NO REAL MESSAGES OR E2EE YET', textAlign: TextAlign.center, style: TextStyle(fontSize: 10, color: Colors.white38, letterSpacing: 1)),
    ],
  );

  Widget _botsPage() => ListView(padding: const EdgeInsets.all(16), children: [
    _hero('BOT LAB', 'Useful automation with clear permissions.', Icons.smart_toy),
    const SizedBox(height: 14),
    _feature('Anti-Spam Sentinel', 'Demo concept: detect flood and repeated messages.', Icons.security, _cyan),
    _feature('Nova Utility', 'Demo concept: reminders and simple tools.', Icons.build_circle_outlined, _violet),
    _feature('Premium Manager', 'Demo concept: subscription and entitlement checks.', Icons.workspace_premium, Colors.amber),
    const SizedBox(height: 12),
    FilledButton.icon(onPressed: () => _notice('Bot API is a separate starter service; see the project README.'), icon: const Icon(Icons.terminal), label: const Text('Developer API guide')),
  ]);

  Widget _premiumPage() => ListView(padding: const EdgeInsets.all(16), children: [
    _hero('UPGRADE YOUR SPACE', 'Premium features will be activated by verified entitlements.', Icons.diamond_outlined),
    const SizedBox(height: 16),
    _feature('Free', 'Core messaging UI and standard bot access.', Icons.chat, _cyan),
    _feature('Premium', 'Future: advanced themes, higher bot quotas and customization.', Icons.stars, _violet),
    const SizedBox(height: 12),
    const Text('Payments and subscription verification are not implemented in this starter.', style: TextStyle(color: Colors.white60)),
  ]);

  Widget _settingsPage() => ListView(padding: const EdgeInsets.all(16), children: [
    _hero('PRIVACY CONTROL', 'Preview only — connect verified auth and security services before use.', Icons.shield),
    SwitchListTile(value: false, onChanged: (_) => _notice('Not connected: online visibility control.'), title: const Text('Show online status'), subtitle: const Text('Demo setting')),
    SwitchListTile(value: false, onChanged: (_) => _notice('Not connected: read receipts control.'), title: const Text('Read receipts'), subtitle: const Text('Demo setting')),
    ListTile(leading: const Icon(Icons.devices), title: const Text('Active sessions'), onTap: () => _notice('Session management is not implemented yet.')),
    ListTile(leading: const Icon(Icons.timer_outlined), title: const Text('Disappearing messages'), onTap: () => _notice('Timer UI and server cleanup are not implemented yet.')),
    const Divider(),
    const Text('Security status: starter UI only. Do not send sensitive messages.', style: TextStyle(color: Colors.orangeAccent)),
  ]);

  Widget _hero(String title, String subtitle, IconData icon) => Container(
    padding: const EdgeInsets.all(20),
    decoration: BoxDecoration(
      borderRadius: BorderRadius.circular(22),
      gradient: const LinearGradient(colors: [Color(0xFF13283A), Color(0xFF21163A)], begin: Alignment.topLeft, end: Alignment.bottomRight),
      border: Border.all(color: _cyan.withValues(alpha: .35)),
      boxShadow: [BoxShadow(color: _cyan.withValues(alpha: .07), blurRadius: 24)],
    ),
    child: Row(children: [
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(title, style: const TextStyle(color: _cyan, fontSize: 11, letterSpacing: 2, fontWeight: FontWeight.w900)),
        const SizedBox(height: 8), Text(subtitle, style: const TextStyle(fontSize: 20, height: 1.25, fontWeight: FontWeight.w700)),
      ])),
      const SizedBox(width: 12), Icon(icon, size: 42, color: _violet),
    ]),
  );

  Widget _feature(String title, String desc, IconData icon, Color color) => Card(
    child: ListTile(leading: Icon(icon, color: color, size: 30), title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)), subtitle: Text(desc), trailing: const Icon(Icons.chevron_right)),
  );

  void _notice(String message) => ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message), behavior: SnackBarBehavior.floating));
}

class _Chat {
  final String name, lastMessage, time;
  final IconData icon;
  final bool bot;
  const _Chat(this.name, this.lastMessage, this.time, this.icon, this.bot);
}
