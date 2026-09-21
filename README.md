# Pro-Filio

**One person. One professional profile. Everything important in one place.**

Pro-Filio is a phone-first professional identity workspace built with Expo, React Native and TypeScript.

## Included now

- Local sign up / sign in / password reset
- Persistent profile data on the device
- Guided profile setup
- Profile editor
- Education and employment records
- Projects and portfolio
- Skills with category and level
- Certifications and achievements
- Professional timeline
- Document/evidence index
- Public profile preview
- Device sharing
- CV/resume text export
- Public/private visibility control
- 8 selectable visual themes
- Profile completion dashboard
- Mobile-first navigation
- Single shared profile source of truth

## Product architecture

```
App
 ├── Local authentication
 ├── Profile setup
 └── AppShell
      ├── Dashboard
      ├── Profile
      ├── Career
      ├── Portfolio
      ├── Timeline
      └── Settings
           ├── Public profile
           ├── Documents
           ├── CV export
           └── Themes
```

## Important production note

The current authentication and persistence layer is intentionally local-device infrastructure. It is suitable for the working app foundation, but it is **not production-grade account security**. A production release should connect the same profile model to a hosted authentication service, database, file storage and API.

The public profile screen is currently a local preview/share surface. A real public URL, QR code, multi-device sync, verification and recruiter features belong to the hosted backend phase.

## Development

This repository is the application source. Run it with Expo in the existing Roxum/Termux workflow.

```bash
npm install
npx expo start
```

For a production Android/iOS build, use an Expo-compatible build service or native build environment after the hosted backend and production credentials are configured.
