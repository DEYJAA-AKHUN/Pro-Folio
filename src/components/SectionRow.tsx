import { Text, View, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

type Props = {
  title: string;
  description: string;
  letter: string;
};

export function SectionRow({ title, description, letter }: Props) {
  return (
    <View style={styles.item}>
      <View style={styles.icon}><Text style={styles.iconText}>{letter}</Text></View>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: "row", alignItems: "center", backgroundColor: colors.surface, borderRadius: 16, padding: 15, marginBottom: 10, borderWidth: 1, borderColor: colors.border },
  icon: { width: 42, height: 42, borderRadius: 12, backgroundColor: "#1B2029", alignItems: "center", justifyContent: "center" },
  iconText: { color: colors.accent, fontWeight: "800" },
  copy: { flex: 1, marginLeft: 13 },
  title: { color: colors.text, fontSize: 15, fontWeight: "700" },
  description: { color: colors.textMuted, fontSize: 12, lineHeight: 17, marginTop: 3 },
  chevron: { color: "#657080", fontSize: 27, marginLeft: 8 },
});
