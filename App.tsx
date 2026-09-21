import { useState } from "react";
import { AuthScreen } from "./src/screens/AuthScreen";
import { AppShell } from "./src/navigation/AppShell";
import { ThemeProvider } from "./src/theme/ThemeContext";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <ThemeProvider>
      {authenticated ? <AppShell /> : <AuthScreen onAuthenticated={() => setAuthenticated(true)} />}
    </ThemeProvider>
  );
}
