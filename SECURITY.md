# Security status and production gates

## Important current status
This repository is a **UI and backend starter**, not a secure production messenger. It does not implement E2EE, real authentication screens, payments, push notifications, key storage, or disappearing-message deletion. The app intentionally displays demo notices.

## E2EE gate (must be completed before sensitive use)
- Select a maintained, independently reviewed messaging protocol and supported implementation for both Flutter Android and Web.
- Verify package provenance, maintenance status, platform compatibility and licensing. Do not invent cryptographic primitives.
- Implement identity keys, prekeys/session establishment, ratcheting, authenticated ciphertext, replay handling, device linking and key-change warnings.
- Keep private keys in Android Keystore-backed storage where supported; on web use an explicit threat model and browser crypto/storage safeguards. A compromised web origin can still capture plaintext.
- Add safety-number/identity verification and test cross-platform interoperability.
- Do not send plaintext or key material to the server, logs, analytics, crash reports, bots or push notifications.

## Database and API gates
- Review every RLS policy with two or more test users, including unauthorized read/write attempts.
- Create conversations/memberships only through a trusted atomic RPC/server endpoint.
- Add JWT verification, scoped bot credentials, token hashing/rotation, per-user and per-bot rate limits, audit logs, abuse reports and webhook signature verification.
- Make premium entitlements server-authoritative; never trust client-supplied tier values.
- Add a trusted scheduled deletion job and define backups/retention behavior for expiring ciphertext.
- Use HTTPS, secret management, dependency scanning, backups and incident response procedures.

## Test checklist
- User A cannot read User B's conversations or ciphertext.
- Non-member cannot insert or read messages.
- Sender ID spoofing is rejected by RLS.
- Block/report and bot rate limits work.
- Expiry cleanup deletes expired records from the database and define backup retention separately.
- Key changes trigger verification warnings; replayed/altered ciphertext is rejected.
- Android and Web can decrypt the same protocol test vectors only for intended recipients.
- Run independent security review before claiming production-grade E2EE.
