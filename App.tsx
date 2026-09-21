import { AppShell } from "./src/navigation/AppShell";
import { ThemeProvider } from "./src/theme/ThemeContext";

export default function App() {
  return <ThemeProvider><AppShell /></ThemeProvider>;
}
