import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { colors } from "../theme/colors";
import { mockProfile } from "../data/mockProfile";
import { DashboardScreen } from "../screens/DashboardScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { CareerScreen } from "../screens/CareerScreen";
import { PortfolioScreen } from "../screens/PortfolioScreen";
import { TimelineScreen } from "../screens/TimelineScreen";
import { SettingsScreen } from "../screens/SettingsScreen";

type Tab = "Home" | "Profile" | "Career" | "Portfolio" | "Timeline" | "Settings";

const tabs: Tab[] = ["Home", "Profile", "Career", "Portfolio", "Timeline", "Settings"];

export function AppShell() {
  const [tab, setTab] = useState<Tab>("Home");

  const content = {
    Home: <DashboardScreen profile={mockProfile} />,
    Profile: <ProfileScreen profile={mockProfile} />,
    Career: <CareerScreen profile={mockProfile} />,
    Portfolio: <PortfolioScreen profile={mockProfile} />,
    Timeline: <TimelineScreen profile={mockProfile} />,
    Settings: <SettingsScreen />,
  }[tab];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.content}>{content}</View>
      <View style={styles.nav}>
        {tabs.map(item => (
          <TouchableOpacity key={item} style={styles.navItem} onPress={() => setTab(item)} activeOpacity={0.7}>
            <Text style={[styles.navIcon, tab === item && styles.active]}>{item === "Home" ? "⌂" : item[0]}</Text>
            <Text style={[styles.navLabel, tab === item && styles.active]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1 },
  nav: { flexDirection: "row", backgroundColor: colors.surfaceRaised, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 7, paddingBottom: 8 },
  navItem: { flex: 1, alignItems: "center", minWidth: 0 },
  navIcon: { color: colors.textMuted, fontSize: 16, fontWeight: "800" },
  active: { color: colors.text },
  navLabel: { color: colors.textMuted, fontSize: 9, marginTop: 3 },
});
