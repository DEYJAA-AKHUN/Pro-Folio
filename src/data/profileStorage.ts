import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Profile } from "../types/profile";
const PROFILE_KEY="pro-filio-profile-v2";
export async function loadStoredProfile():Promise<Partial<Profile>|null>{try{const raw=await AsyncStorage.getItem(PROFILE_KEY);return raw?JSON.parse(raw):null;}catch{return null;}}
export async function saveStoredProfile(profile:Partial<Profile>):Promise<void>{try{await AsyncStorage.setItem(PROFILE_KEY,JSON.stringify(profile));}catch{}}
export async function clearStoredProfile():Promise<void>{try{await AsyncStorage.removeItem(PROFILE_KEY);}catch{}}
