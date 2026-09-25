import { Platform } from "react-native";
import {
  getAuth,
  initializeAuth,
  browserLocalPersistence,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User
} from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirebaseApp } from "./firebase";

export function getFirebaseAuth() {
  const app = getFirebaseApp();
  try {
    return Platform.OS === "web"
      ? initializeAuth(app, { persistence: browserLocalPersistence })
      : initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
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
  const credential = await createUserWithEmailAndPassword(
    getFirebaseAuth(),
    account.email.trim(),
    account.password || ""
  );
  if (account.name.trim()) {
    await updateProfile(credential.user, { displayName: account.name.trim() });
  }
}

export async function signIn(email: string, password: string): Promise<boolean> {
  await signInWithEmailAndPassword(getFirebaseAuth(), email.trim(), password);
  return true;
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
