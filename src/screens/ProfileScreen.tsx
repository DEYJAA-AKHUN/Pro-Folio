import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import type { Profile } from "../types/profile";
export function ProfileScreen({ profile }: { profile: Profile }) {
  const { colors } = useTheme();
  return <ScrollView contentContainerStyle={styles.container}>
    <Text style={[styles.eyebrow,{color:colors.accent}]}>PROFILE</Text>
    <Text style={[styles.name,{color:colors.text}]}>{profile.fullName}</Text>
    <Text style={[styles.headline,{color:colors.textSecondary}]}>{profile.headline}</Text>
    <View style={[styles.card,{backgroundColor:colors.surfaceRaised,borderColor:colors.border}]}><Text style={[styles.label,{color:colors.textMuted}]}>PROFESSIONAL SUMMARY</Text><Text style={[styles.body,{color:colors.textSecondary}]}>{profile.summary}</Text></View>
    <Text style={[styles.section,{color:colors.text}]}>Contact</Text>
    <Info label="Email" value={profile.email}/><Info label="Location" value={profile.location}/><Info label="Visibility" value={profile.visibility}/>
  </ScrollView>;
}
function Info({label,value}:{label:string;value?:string}){const {colors}=useTheme();return <View style={[styles.info,{backgroundColor:colors.surface,borderColor:colors.border}]}><Text style={[styles.label,{color:colors.textMuted}]}>{label}</Text><Text style={[styles.value,{color:colors.text}]}>{value||"Not set"}</Text></View>}
const styles=StyleSheet.create({container:{padding:22,paddingBottom:48},eyebrow:{fontSize:12,fontWeight:"800",letterSpacing:2},name:{fontSize:30,fontWeight:"800",marginTop:9},headline:{fontSize:16,marginTop:6},card:{borderRadius:20,padding:19,borderWidth:1,marginTop:24},label:{fontSize:10,fontWeight:"800",letterSpacing:1.2},body:{fontSize:14,lineHeight:21,marginTop:9},section:{fontSize:20,fontWeight:"800",marginTop:28,marginBottom:10},info:{borderRadius:15,padding:15,marginBottom:8,borderWidth:1},value:{fontSize:14,marginTop:5}});
