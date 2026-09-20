import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import type { Profile } from "../types/profile";

export function TimelineScreen({ profile }: { profile: Profile }) {
  const events = [
    ...profile.education.map(item => ({ id: item.id, date: item.endYear || item.startYear || "Education", title: item.qualification, detail: item.institution })),
    ...profile.employment.map(item => ({ id: item.id, date: item.endDate || item.startDate, title: item.role, detail: item.company })),
    ...profile.projects.map(item => ({ id: item.id, date: item.status || "Project", title: item.name, detail: item.description })),
  ];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>TIMELINE</Text>
      <Text style={styles.title}>Your professional journey</Text>
      {events.length === 0 ? <View style={styles.empty}><Text style={styles.muted}>Your timeline will appear here as you add education, employment and projects.</Text></View> : events.map(event => (
        <View key={event.id} style={styles.event}>
          <View style={styles.dot} />
          <View style={styles.line} />
          <View style={styles.copy}><Text style={styles.date}>{event.date}</Text><Text style={styles.eventTitle}>{event.title}</Text><Text style={styles.detail}>{event.detail}</Text></View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingBottom: 48 },
  eyebrow: { color: colors.textMuted, fontSize: 12, fontWeight: "700", letterSpacing: 2 },
  title: { color: colors.text, fontSize: 28, fontWeight: "800", marginTop: 10, marginBottom: 28 },
  event: { minHeight: 90, position: "relative", paddingLeft: 28 },
  dot: { position: "absolute", left: 1, top: 5, width: 12, height: 12, borderRadius: 99, backgroundColor: colors.accent },
  line: { position: "absolute", left: 6, top: 17, bottom: 0, width: 2, backgroundColor: colors.border },
  copy: { backgroundColor: colors.surface, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: colors.border, marginBottom: 10 },
  date: { color: colors.textMuted, fontSize: 11, fontWeight: "700" },
  eventTitle: { color: colors.text, fontSize: 15, fontWeight: "700", marginTop: 5 },
  detail: { color: colors.textSecondary, fontSize: 13, lineHeight: 19, marginTop: 4 },
  empty: { backgroundColor: colors.surface, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: colors.border },
  muted: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
});
