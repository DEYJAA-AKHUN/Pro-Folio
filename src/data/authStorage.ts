import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCOUNT_KEY = "pro-filio-account-v1";
const SESSION_KEY = "pro-filio-session-v1";

export type LocalAccount = { name: string; email: string; password: string };

export async function getAccount(): Promise<LocalAccount | null> {
  try { const raw = await AsyncStorage.getItem(ACCOUNT_KEY); return raw ? JSON.parse(raw) : null; } catch { return null; }
}
export async function createAccount(account: LocalAccount): Promise<void> {
  await AsyncStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
  await AsyncStorage.setItem(SESSION_KEY, "1");
}
export async function signIn(email: string, password: string): Promise<boolean> {
  const account = await getAccount();
  const ok = !!account && account.email.toLowerCase() === email.trim().toLowerCase() && account.password === password;
  if (ok) await AsyncStorage.setItem(SESSION_KEY, "1");
  return ok;
}
export async function signOut(): Promise<void> { await AsyncStorage.removeItem(SESSION_KEY); }
export async function hasSession(): Promise<boolean> { return (await AsyncStorage.getItem(SESSION_KEY)) === "1"; }
export async function resetPassword(email: string, password: string): Promise<boolean> {
  const account = await getAccount();
  if (!account || account.email.toLowerCase() !== email.trim().toLowerCase()) return false;
  await AsyncStorage.setItem(ACCOUNT_KEY, JSON.stringify({ ...account, password }));
  return true;
}
