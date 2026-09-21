import { useEffect, useState } from "react";
import { AuthScreen } from "./src/screens/AuthScreen";
import { ProfileSetupScreen } from "./src/screens/ProfileSetupScreen";
import { AppShell } from "./src/navigation/AppShell";
import { ThemeProvider } from "./src/theme/ThemeContext";
import { loadStoredProfile, saveStoredProfile } from "./src/data/profileStorage";
import { mockProfile } from "./src/data/mockProfile";
import type { Profile } from "./src/types/profile";

type Stage = "auth" | "setup" | "app";

export default function App() {
  const [stage, setStage] = useState<Stage>("auth");
  const [profile, setProfile] = useState<Profile>(mockProfile);

  useEffect(() => {
    loadStoredProfile().then(stored => {
      if (stored) setProfile(current => ({ ...current, ...stored }));
    });
  }, []);

  const updateProfile = (next: Profile) => {
    setProfile(next);
    saveStoredProfile(next);
  };

  return (
    <ThemeProvider>
      {stage === "auth" && <AuthScreen onAuthenticated={(isNewUser) => setStage(isNewUser ? "setup" : "app")} />}
      {stage === "setup" && <ProfileSetupScreen onComplete={() => { saveStoredProfile(profile); setStage("app"); }} />}
      {stage === "app" && <AppShell profile={profile} onProfileChange={updateProfile} />}
    </ThemeProvider>
  );
}
