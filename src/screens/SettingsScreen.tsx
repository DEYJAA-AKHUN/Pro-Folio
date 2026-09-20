import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

export function SettingsScreen() {
  const rows = [
    ["Privacy", "Control what is visible"],
    ["Public Profile", "Manage your shareable profile"],
    ["Account", "Identity, security and account settings"],
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>SETTINGS</Text>
      <Text style={styles.title}>Control your profile</Text>
      <View style={styles.card}>
        {rows.map(([title, description]) => <View key={title} style={styles.row}><View style={styles.copy}><Text style={styles.rowTitle}>{title}</Text><Text style={styles.description}>{description}</Text></View><Text style={styles.chevron}>›</Text></View>)}
      </View>
      <Text style={styles.note}>Advanced account, privacy, sharing and data controls will live here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  eyebrow: { color: colors.textMuted, fontSize: 12, fontWeight: "700", letterSpacing: 2 },
  title: { color: colors.text, fontSize: 28, fontWeight: "800", marginTop: 10, marginBottom: 24 },
  card: { backgroundColor: colors.surfaceRaised, borderRadius: 18, borderWidth: 1, borderColor: colors.border, overflow: "hidden" },
  row: { flexDirection: "row", alignItems: "center", padding: 17, borderBottomWidth: 1, borderBottomColor: colors.border },
  copy: { flex: 1 },
  rowTitle: { color: colors.text, fontSize: 15, fontWeight: "700" },
  description: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
  chevron: { color: "#657080", fontSize: 27 },
  note: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginTop: 18 },
});
