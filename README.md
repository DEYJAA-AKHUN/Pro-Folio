# Pro-Filio

**One person. One professional profile. Everything important in one place.**

Pro-Filio is a phone-first professional identity workspace built with Expo, React Native and TypeScript.

## Included now

- Firebase Email/Password sign up / sign in / password reset
- Firebase Authentication with persistent mobile session
- Cloud Firestore profile persistence
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

Authentication and profile persistence are now wired to Firebase. The app expects the Expo public Firebase configuration values in a local `.env.local` file. That file is ignored by Git and must not be committed.

Firebase client configuration is not a password or private server credential because `EXPO_PUBLIC_*` values are bundled into the client app. Security must come from Firebase Authentication and Firestore Security Rules, not from hiding those values.

Before running the app, copy `.env.example` to `.env.local` and fill in the six Firebase Web App values from Firebase Console.

The public profile screen is currently a local preview/share surface. A real public URL, QR code, multi-device sync, verification and recruiter features belong to the hosted backend phase.

## Development

This repository is the application source. Run it with Expo in the existing Roxum/Termux workflow.

```bash
npm install
npx expo start
```

For a production Android/iOS build, use an Expo-compatible build service or native build environment after the hosted backend and production credentials are configured.
