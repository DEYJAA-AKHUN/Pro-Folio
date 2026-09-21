import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getCurrentUser } from "./authStorage";
import { getApp, getApps, initializeApp } from "firebase/app";
import type { Profile } from "../types/profile";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

function getDb() {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
    throw new Error("Firebase configuration is missing. Set the EXPO_PUBLIC_FIREBASE_* environment variables.");
  }
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return getFirestore(app);
}

export async function loadStoredProfile(): Promise<Partial<Profile> | null> {
  try {
    const user = await getCurrentUser();
    if (!user) return null;
    const snapshot = await getDoc(doc(getDb(), "profiles", user.uid));
    return snapshot.exists() ? (snapshot.data() as Partial<Profile>) : null;
  } catch {
    return null;
  }
}

export async function saveStoredProfile(profile: Partial<Profile>): Promise<void> {
  const user = await getCurrentUser();
  if (!user) return;
  await setDoc(doc(getDb(), "profiles", user.uid), { ...profile, id: user.uid }, { merge: true });
}

export async function clearStoredProfile(): Promise<void> {
  // Profiles remain in Firestore so signing out does not destroy user data.
}
