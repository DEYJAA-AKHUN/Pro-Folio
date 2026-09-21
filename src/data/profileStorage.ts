import type { Profile } from "./../types/profile";

const PROFILE_KEY = "pro-filio-profile-v1";

export type StoredProfile = Partial<Profile> & {
  setup?: {
    headline?: string;
    location?: string;
    about?: string;
  };
};

export async function loadStoredProfile(): Promise<StoredProfile | null> {
  try {
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    const raw = await AsyncStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function saveStoredProfile(profile: StoredProfile): Promise<void> {
  try {
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {}
}

export async function clearStoredProfile(): Promise<void> {
  try {
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    await AsyncStorage.removeItem(PROFILE_KEY);
  } catch {}
}
