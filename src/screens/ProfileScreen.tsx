import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import type { Profile } from "../types/profile";

export function ProfileScreen({ profile }: { profile: Profile }) {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>PROFILE</Text>
      <Text style={styles.name}>{profile.fullName}</Text>
      <Text style={styles.headline}>{profile.headline}</Text>
      <View style={styles.card}>
        <Text style={styles.label}>PROFESSIONAL SUMMARY</Text>
        <Text style={styles.body}>{profile.summary}</Text>
      </View>
      <Text style={styles.section}>Contact</Text>
      <Info label="Email" value={profile.email} />
      <Info label="Location" value={profile.location} />
      <Info label="Visibility" value={profile.visibility} />
    </View>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return <View style={styles.info}><Text style={styles.label}>{label}</Text><Text style={styles.value}>{value || "Not set"}</Text></View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  eyebrow: { color: colors.textMuted, fontSize: 12, fontWeight: "700", letterSpacing: 2 },
  name: { color: colors.text, fontSize: 30, fontWeight: "800", marginTop: 10 },
  headline: { color: colors.textSecondary, fontSize: 16, marginTop: 6 },
  card: { backgroundColor: colors.surfaceRaised, borderRadius: 18, padding: 18, borderWidth: 1, borderColor: colors.border, marginTop: 24 },
  label: { color: colors.textMuted, fontSize: 11, fontWeight: "700", letterSpacing: 1.2 },
  body: { color: colors.textSecondary, fontSize: 14, lineHeight: 21, marginTop: 9 },
  section: { color: colors.text, fontSize: 20, fontWeight: "700", marginTop: 28, marginBottom: 10 },
  info: { backgroundColor: colors.surface, borderRadius: 14, padding: 15, marginBottom: 8, borderWidth: 1, borderColor: colors.border },
  value: { color: colors.text, fontSize: 14, marginTop: 5 },
});
