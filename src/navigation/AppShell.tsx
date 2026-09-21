import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../theme/ThemeContext";
import { mockProfile } from "../data/mockProfile";
import type { Profile } from "../types/profile";
import { DashboardScreen } from "../screens/DashboardScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { CareerScreen } from "../screens/CareerScreen";
import { PortfolioScreen } from "../screens/PortfolioScreen";
import { TimelineScreen } from "../screens/TimelineScreen";
import { SettingsScreen } from "../screens/SettingsScreen";

type Tab = "Home" | "Profile" | "Career" | "Portfolio" | "Timeline" | "Settings";
const tabs: Tab[] = ["Home", "Profile", "Career", "Portfolio", "Timeline", "Settings"];
const icons: Record<Tab,string> = { Home:"⌂", Profile:"●", Career:"◆", Portfolio:"▣", Timeline:"│", Settings:"⚙" };

export function AppShell() {
  const [tab,setTab] = useState<Tab>("Home");
  const [profile,setProfile] = useState<Profile>(mockProfile);
  const { colors, themeName } = useTheme();
  const content = {
    Home:<DashboardScreen profile={profile}/>,
    Profile:<ProfileScreen profile={profile} onSave={setProfile}/>,
    Career:<CareerScreen profile={profile}/>,
    Portfolio:<PortfolioScreen profile={profile}/>,
    Timeline:<TimelineScreen profile={profile}/>,
    Settings:<SettingsScreen/>
  }[tab];
  const dark = ["midnight","obsidian","titanium"].includes(themeName);
  return <SafeAreaView style={[styles.safe,{backgroundColor:colors.background}]}>
    <StatusBar style={dark ? "light" : "dark"}/>
    <View style={styles.content}>{content}</View>
    <View style={[styles.nav,{backgroundColor:colors.surfaceRaised,borderTopColor:colors.border}]}>
      {tabs.map(item=>{const active=tab===item;return <TouchableOpacity key={item} style={styles.navItem} onPress={()=>setTab(item)} activeOpacity={0.75}>
        <View style={[styles.navIconWrap,active&&{backgroundColor:colors.accentSoft}]}><Text style={[styles.navIcon,{color:active?colors.accent:colors.textMuted}]}>{icons[item]}</Text></View>
        <Text style={[styles.navLabel,{color:active?colors.accent:colors.textMuted}]}>{item}</Text>
      </TouchableOpacity>})}
    </View>
  </SafeAreaView>;
}
const styles=StyleSheet.create({safe:{flex:1},content:{flex:1},nav:{flexDirection:"row",borderTopWidth:1,paddingTop:7,paddingBottom:8},navItem:{flex:1,alignItems:"center",minWidth:0},navIconWrap:{width:34,height:28,borderRadius:14,alignItems:"center",justifyContent:"center"},navIcon:{fontSize:15,fontWeight:"800"},navLabel:{fontSize:9,marginTop:2,fontWeight:"600"}});
