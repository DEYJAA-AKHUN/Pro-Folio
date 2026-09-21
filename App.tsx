import { useState } from "react";
import { AuthScreen } from "./src/screens/AuthScreen";
import { ProfileSetupScreen } from "./src/screens/ProfileSetupScreen";
import { AppShell } from "./src/navigation/AppShell";
import { ThemeProvider } from "./src/theme/ThemeContext";

type Stage = "auth" | "setup" | "app";

export default function App() {
  const [stage, setStage] = useState<Stage>("auth");
  return (
    <ThemeProvider>
      {stage === "auth" && <AuthScreen onAuthenticated={(isNewUser) => setStage(isNewUser ? "setup" : "app")} />}
      {stage === "setup" && <ProfileSetupScreen onComplete={() => setStage("app")} />}
      {stage === "app" && <AppShell />}
    </ThemeProvider>
  );
}
