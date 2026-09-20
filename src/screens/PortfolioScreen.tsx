import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import type { Profile } from "../types/profile";

export function PortfolioScreen({ profile }: { profile: Profile }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>PORTFOLIO</Text>
      <Text style={styles.title}>Projects, skills & credentials</Text>

      <Text style={styles.section}>Projects</Text>
      {profile.projects.length === 0 ? <Empty text="No projects added yet." /> : profile.projects.map(item => (
        <View key={item.id} style={styles.card}><Text style={styles.cardTitle}>{item.name}</Text><Text style={styles.body}>{item.description}</Text></View>
      ))}

      <Text style={styles.section}>Skills</Text>
      {profile.skills.length === 0 ? <Empty text="No skills added yet." /> : profile.skills.map(item => (
        <View key={item.id} style={styles.chip}><Text style={styles.chipText}>{item.name}</Text></View>
      ))}

      <Text style={styles.section}>Credentials</Text>
      {profile.certifications.length === 0 && profile.achievements.length === 0 ? <Empty text="No credentials added yet." /> : null}
      {profile.certifications.map(item => <View key={item.id} style={styles.card}><Text style={styles.cardTitle}>{item.name}</Text><Text style={styles.cardMeta}>{item.issuer}</Text></View>)}
      {profile.achievements.map(item => <View key={item.id} style={styles.card}><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.cardMeta}>{item.issuer || "Achievement"}</Text></View>)}
    </ScrollView>
  );
}

function Empty({ text }: { text: string }) { return <View style={styles.empty}><Text style={styles.muted}>{text}</Text></View>; }

const styles = StyleSheet.create({
  container: { padding: 24, paddingBottom: 48 },
  eyebrow: { color: colors.textMuted, fontSize: 12, fontWeight: "700", letterSpacing: 2 },
  title: { color: colors.text, fontSize: 28, fontWeight: "800", marginTop: 10 },
  section: { color: colors.text, fontSize: 20, fontWeight: "700", marginTop: 28, marginBottom: 10 },
  card: { backgroundColor: colors.surfaceRaised, borderRadius: 16, padding: 17, marginBottom: 10, borderWidth: 1, borderColor: colors.border },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: "700" },
  cardMeta: { color: colors.textSecondary, fontSize: 14, marginTop: 5 },
  body: { color: colors.textSecondary, fontSize: 14, lineHeight: 21, marginTop: 7 },
  chip: { alignSelf: "flex-start", backgroundColor: colors.surface, borderRadius: 99, paddingHorizontal: 14, paddingVertical: 9, marginBottom: 8, borderWidth: 1, borderColor: colors.border },
  chipText: { color: colors.text, fontSize: 13, fontWeight: "600" },
  muted: { color: colors.textMuted, fontSize: 13 },
  empty: { backgroundColor: colors.surface, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: colors.border },
});
