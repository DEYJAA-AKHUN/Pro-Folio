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
  apiKey: "AIzaSyArC1KYYHNbFmH87pBBCgQwsQ1bzjaAd0I",
  authDomain: "pro-folio-6a9d0.firebaseapp.com",
  projectId: "pro-folio-6a9d0",
  storageBucket: "pro-folio-6a9d0.firebasestorage.app",
  messagingSenderId: "243215346443",
  appId: "1:243215346443:web:b23f0576760eb9c14e900e",
};

function getFirebaseApp() {
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
  } catch (error) {
    console.error("Firebase sign-in failed:", error);
    throw error;
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
  } catch (error) {
    console.error("Firebase password reset failed:", error);
    return false;
  }
}
