import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

function getFirebaseApp() {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
    throw new Error("Firebase configuration is missing. Set the EXPO_PUBLIC_FIREBASE_* environment variables.");
  }
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export function getFirebaseAuth() {
  const app = getFirebaseApp();
  try {
    return initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
  } catch {
    return getAuth(app);
  }
}

export type LocalAccount = { name: string; email: string; password?: string };

export async function getCurrentUser(): Promise<User | null> {
  return getFirebaseAuth().currentUser;
}

export async function getAccount(): Promise<LocalAccount | null> {
  const user = await getCurrentUser();
  return user ? { name: user.displayName || "", email: user.email || "" } : null;
}

export async function createAccount(account: LocalAccount): Promise<void> {
  const credential = await createUserWithEmailAndPassword(getFirebaseAuth(), account.email.trim(), account.password || "");
  if (account.name.trim()) {
    const { updateProfile } = await import("firebase/auth");
    await updateProfile(credential.user, { displayName: account.name.trim() });
  }
}

export async function signIn(email: string, password: string): Promise<boolean> {
  try {
    await signInWithEmailAndPassword(getFirebaseAuth(), email.trim(), password);
    return true;
  } catch {
    return false;
  }
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(getFirebaseAuth());
}

export async function hasSession(): Promise<boolean> {
  return !!(await getCurrentUser());
}

export async function resetPassword(email: string): Promise<boolean> {
  try {
    await sendPasswordResetEmail(getFirebaseAuth(), email.trim());
    return true;
  } catch {
    return false;
  }
}
