import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SectionRow } from "../components/SectionRow";
import { colors } from "../theme/colors";
import type { Profile } from "../types/profile";

type Props = { profile: Profile };

export function DashboardScreen({ profile }: Props) {
  const completion = calculateCompletion(profile);
  const sections = [
    ["Profile", "Identity, contact details and professional headline"],
    ["Career", "Education, employment and work history"],
    ["Projects", "Personal, academic and professional projects"],
    ["Skills", "Technical, professional and interpersonal skills"],
    ["Credentials", "Certifications, achievements and supporting documents"],
  ] as const;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>PRO-FILIO</Text>
      <Text style={styles.title}>Your professional identity.</Text>
      <Text style={styles.subtitle}>One profile. One source of truth. Everything important in one place.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>PROFILE COMPLETION</Text>
        <Text style={styles.percent}>{completion}%</Text>
        <View style={styles.track}><View style={[styles.progress, { width: `${completion}%` }]} /></View>
        <Text style={styles.muted}>{completion === 0 ? "Start building your professional profile." : "Keep building your professional profile."}</Text>
      </View>

      <Text style={styles.section}>Workspace</Text>
      {sections.map(([title, description]) => (
        <SectionRow key={title} title={title} description={description} letter={title[0]} />
      ))}
    </ScrollView>
  );
}

function calculateCompletion(profile: Profile) {
  const checks = [
    Boolean(profile.fullName && profile.fullName !== "Your Name"),
    Boolean(profile.headline && profile.headline !== "Professional profile in progress"),
    Boolean(profile.summary),
    Boolean(profile.email),
    profile.education.length > 0,
    profile.employment.length > 0,
    profile.projects.length > 0,
    profile.skills.length > 0,
    profile.certifications.length > 0 || profile.achievements.length > 0,
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingBottom: 48 },
  eyebrow: { color: colors.textMuted, fontSize: 12, fontWeight: "700", letterSpacing: 2 },
  title: { color: colors.text, fontSize: 32, fontWeight: "800", marginTop: 10 },
  subtitle: { color: colors.textSecondary, fontSize: 15, lineHeight: 22, marginTop: 10, marginBottom: 28 },
  card: { backgroundColor: colors.surfaceRaised, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: colors.border },
  label: { color: colors.textMuted, fontSize: 11, fontWeight: "700", letterSpacing: 1.5 },
  percent: { color: colors.text, fontSize: 36, fontWeight: "800", marginTop: 8 },
  track: { height: 7, backgroundColor: colors.track, borderRadius: 99, marginTop: 14, overflow: "hidden" },
  progress: { height: "100%", backgroundColor: colors.accent },
  muted: { color: colors.textMuted, fontSize: 13, marginTop: 12 },
  section: { color: colors.text, fontSize: 20, fontWeight: "700", marginTop: 32, marginBottom: 12 },
});
