import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SectionRow } from "../components/SectionRow";
import { useTheme } from "../theme/ThemeContext";
import type { Profile } from "../types/profile";

type Props = { profile: Profile };

export function DashboardScreen({ profile }: Props) {
  const { colors } = useTheme();
  const completion = calculateCompletion(profile);
  const sections = [
    ["Profile", "Identity, contact details and professional headline"],
    ["Career", "Education, employment and work history"],
    ["Projects", "Personal, academic and professional projects"],
    ["Skills", "Technical, professional and interpersonal skills"],
    ["Credentials", "Certifications, achievements and supporting documents"],
  ] as const;
  return <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.topRow}>
      <View><Text style={[styles.eyebrow, { color: colors.accent }]}>PRO-FILIO</Text><Text style={[styles.title, { color: colors.text }]}>Your professional identity.</Text></View>
      <View style={[styles.avatar, { backgroundColor: colors.accentSoft }]}><Text style={[styles.avatarText, { color: colors.accent }]}>{profile.fullName === "Your Name" ? "P" : profile.fullName.charAt(0).toUpperCase()}</Text></View>
    </View>
    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>One profile. One source of truth. Everything important in one place.</Text>
    <View style={[styles.card, { backgroundColor: colors.surfaceRaised, borderColor: colors.border }]}>
      <View style={styles.metricRow}><View><Text style={[styles.label, { color: colors.textMuted }]}>PROFILE COMPLETION</Text><Text style={[styles.percent, { color: colors.text }]}>{completion}%</Text></View><View style={[styles.scoreCircle, { borderColor: colors.accent }]}><Text style={[styles.scoreText, { color: colors.accent }]}>{completion}</Text></View></View>
      <View style={[styles.track, { backgroundColor: colors.track }]}><View style={[styles.progress, { width: completion + "%", backgroundColor: colors.accent }]} /></View>
      <Text style={[styles.muted, { color: colors.textMuted }]}>{completion === 0 ? "Start building your professional profile." : "Keep building your professional profile."}</Text>
    </View>
    <Text style={[styles.section, { color: colors.text }]}>Workspace</Text>
    {sections.map(([title, description]) => <SectionRow key={title} title={title} description={description} letter={title[0]} />)}
  </ScrollView>;
}

function calculateCompletion(profile: Profile) {
  const checks = [Boolean(profile.fullName && profile.fullName !== "Your Name"), Boolean(profile.headline && profile.headline !== "Professional profile in progress"), Boolean(profile.summary), Boolean(profile.email), profile.education.length > 0, profile.employment.length > 0, profile.projects.length > 0, profile.skills.length > 0, profile.certifications.length > 0 || profile.achievements.length > 0];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

const styles = StyleSheet.create({
  container: { padding: 22, paddingBottom: 48 },
  topRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  eyebrow: { fontSize: 12, fontWeight: "800", letterSpacing: 2.2 },
  title: { fontSize: 30, lineHeight: 36, fontWeight: "800", marginTop: 8, maxWidth: 280 },
  avatar: { width: 48, height: 48, borderRadius: 17, alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 19, fontWeight: "800" },
  subtitle: { fontSize: 15, lineHeight: 22, marginTop: 10, marginBottom: 24 },
  card: { borderRadius: 22, padding: 20, borderWidth: 1 },
  metricRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  label: { fontSize: 10, fontWeight: "800", letterSpacing: 1.5 },
  percent: { fontSize: 34, fontWeight: "800", marginTop: 6 },
  scoreCircle: { width: 54, height: 54, borderRadius: 27, borderWidth: 3, alignItems: "center", justifyContent: "center" },
  scoreText: { fontSize: 14, fontWeight: "800" },
  track: { height: 8, borderRadius: 99, marginTop: 16, overflow: "hidden" },
  progress: { height: "100%", borderRadius: 99 },
  muted: { fontSize: 12, marginTop: 11 },
  section: { fontSize: 20, fontWeight: "800", marginTop: 30, marginBottom: 12 },
});