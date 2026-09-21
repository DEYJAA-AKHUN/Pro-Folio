import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../theme/ThemeContext";

type Mode = "signin" | "signup";

export function AuthScreen({ onAuthenticated }: { onAuthenticated: () => void }) {
  const { colors } = useTheme();
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    if (!email.trim() || !password.trim() || (mode === "signup" && !name.trim())) return;
    onAuthenticated();
  };

  return (
    <KeyboardAvoidingView style={[styles.safe, { backgroundColor: colors.background }]} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={styles.container}>
        <View style={[styles.logo, { backgroundColor: colors.accentSoft }]}>
          <Text style={[styles.logoText, { color: colors.accent }]}>P</Text>
        </View>
        <Text style={[styles.title, { color: colors.text }]}>Pro-Filio</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {mode === "signin" ? "Your professional identity, in one place." : "Create your professional identity."}
        </Text>

        <View style={[styles.card, { backgroundColor: colors.surfaceRaised, borderColor: colors.border }]}>
          {mode === "signup" && (
            <TextInput value={name} onChangeText={setName} placeholder="Full name" placeholderTextColor={colors.textMuted} style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface }]} autoCapitalize="words" />
          )}
          <TextInput value={email} onChangeText={setEmail} placeholder="Email address" placeholderTextColor={colors.textMuted} style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface }]} keyboardType="email-address" autoCapitalize="none" />
          <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor={colors.textMuted} style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface }]} secureTextEntry />
          {mode === "signin" && <TouchableOpacity><Text style={[styles.forgot, { color: colors.accent }]}>Forgot password?</Text></TouchableOpacity>}
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.accent }]} onPress={submit} activeOpacity={0.8}>
            <Text style={styles.buttonText}>{mode === "signin" ? "Sign In" : "Create Account"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.switchRow}>
          <Text style={{ color: colors.textSecondary }}>{mode === "signin" ? "New to Pro-Filio?" : "Already have an account?"}</Text>
          <TouchableOpacity onPress={() => setMode(mode === "signin" ? "signup" : "signin")}>
            <Text style={[styles.switch, { color: colors.accent }]}>{mode === "signin" ? " Create account" : " Sign in"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, justifyContent: "center", padding: 24 },
  logo: { width: 64, height: 64, borderRadius: 22, alignItems: "center", justifyContent: "center", alignSelf: "center", marginBottom: 16 },
  logoText: { fontSize: 30, fontWeight: "800" },
  title: { fontSize: 32, fontWeight: "800", textAlign: "center" },
  subtitle: { fontSize: 15, textAlign: "center", marginTop: 8, marginBottom: 28 },
  card: { borderWidth: 1, borderRadius: 24, padding: 18 },
  input: { height: 52, borderWidth: 1, borderRadius: 14, paddingHorizontal: 16, marginBottom: 12, fontSize: 15 },
  forgot: { textAlign: "right", fontWeight: "700", marginBottom: 16 },
  button: { height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  switchRow: { flexDirection: "row", justifyContent: "center", marginTop: 22 },
  switch: { fontWeight: "800" },
});
