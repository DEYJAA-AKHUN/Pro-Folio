import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import type { Profile } from "../types/profile";

export function CareerScreen({ profile }: { profile: Profile }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>CAREER</Text>
      <Text style={styles.title}>Education & employment</Text>

      <Text style={styles.section}>Education</Text>
      {profile.education.length === 0 ? <Empty text="No education entries yet." /> : profile.education.map(item => (
        <View key={item.id} style={styles.card}><Text style={styles.cardTitle}>{item.qualification}</Text><Text style={styles.cardMeta}>{item.institution}</Text></View>
      ))}

      <Text style={styles.section}>Employment</Text>
      {profile.employment.length === 0 ? <Empty text="No employment entries yet." /> : profile.employment.map(item => (
        <View key={item.id} style={styles.card}><Text style={styles.cardTitle}>{item.role}</Text><Text style={styles.cardMeta}>{item.company}</Text><Text style={styles.muted}>{item.startDate} – {item.current ? "Present" : item.endDate || "Unknown"}</Text></View>
      ))}
    </ScrollView>
  );
}

function Empty({ text }: { text: string }) {
  return <View style={styles.empty}><Text style={styles.muted}>{text}</Text></View>;
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingBottom: 48 },
  eyebrow: { color: colors.textMuted, fontSize: 12, fontWeight: "700", letterSpacing: 2 },
  title: { color: colors.text, fontSize: 28, fontWeight: "800", marginTop: 10 },
  section: { color: colors.text, fontSize: 20, fontWeight: "700", marginTop: 28, marginBottom: 10 },
  card: { backgroundColor: colors.surfaceRaised, borderRadius: 16, padding: 17, marginBottom: 10, borderWidth: 1, borderColor: colors.border },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: "700" },
  cardMeta: { color: colors.textSecondary, fontSize: 14, marginTop: 5 },
  muted: { color: colors.textMuted, fontSize: 13, marginTop: 6 },
  empty: { backgroundColor: colors.surface, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: colors.border },
});
