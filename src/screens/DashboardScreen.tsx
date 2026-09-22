import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import type { Profile } from "../types/profile";

export function DashboardScreen({profile,onManage,onDiscover,onPublic}:{profile:Profile;onManage:()=>void;onDiscover:()=>void;onPublic:()=>void}){
 const {colors}=useTheme();
 const first=(profile.fullName||"P").trim().charAt(0).toUpperCase();
 const stats=[["EDU",profile.education.length],["WORK",profile.employment.length],["PROJECTS",profile.projects.length],["SKILLS",profile.skills.length]];
 return <ScrollView contentContainerStyle={styles.container}>
  <View style={styles.header}><View><Text style={[styles.kicker,{color:colors.accent}]}>PRO FOLIO / CHARACTER</Text><Text style={[styles.title,{color:colors.text}]}>Build your story.</Text><Text style={[styles.sub,{color:colors.textSecondary}]}>Your professional identity, presented like it matters.</Text></View><View style={[styles.level,{borderColor:colors.border,backgroundColor:colors.surfaceRaised}]}><Text style={[styles.levelNo,{color:colors.accent}]}>01</Text><Text style={[styles.levelText,{color:colors.textMuted}]}>STORY</Text></View></View>
  <View style={[styles.hero,{backgroundColor:colors.surfaceRaised,borderColor:colors.border}]}>
   <View style={[styles.avatar,{backgroundColor:colors.accentSoft,borderColor:colors.accent}]}><Text style={[styles.avatarText,{color:colors.accent}]}>{first}</Text></View>
   <View style={{flex:1}}><Text style={[styles.name,{color:colors.text}]}>{profile.fullName}</Text><Text style={[styles.role,{color:colors.textSecondary}]}>{profile.headline}</Text>{!!profile.location&&<Text style={[styles.location,{color:colors.textMuted}]}>⌖ {profile.location}</Text>}</View>
   <View style={[styles.status,{backgroundColor:profile.visibility==="public"?colors.success:colors.border}]}><Text style={styles.statusText}>{profile.visibility==="public"?"PUBLIC":"PRIVATE"}</Text></View>
  </View>
  <View style={styles.stats}>{stats.map(([label,value])=><View key={label} style={[styles.stat,{backgroundColor:colors.surface,borderColor:colors.border}]}><Text style={[styles.statValue,{color:colors.text}]}>{value}</Text><Text style={[styles.statLabel,{color:colors.textMuted}]}>{label}</Text></View>)}</View>
  <Text style={[styles.section,{color:colors.text}]}>Your next chapter</Text>
  <View style={[styles.storyCard,{backgroundColor:colors.accentSoft,borderColor:colors.accent}]}>
   <Text style={[styles.chapter,{color:colors.text}]}>02 · Shape the profile</Text><Text style={[styles.story,{color:colors.textSecondary}]}>Add the experiences, projects and details that make this character yours.</Text>
   <TouchableOpacity onPress={onManage} style={[styles.primary,{backgroundColor:colors.accent}]}><Text style={styles.primaryText}>Continue creating →</Text></TouchableOpacity>
  </View>
  <View style={styles.actions}>
   <TouchableOpacity onPress={onPublic} style={[styles.action,{backgroundColor:colors.surfaceRaised,borderColor:colors.border}]}><Text style={[styles.actionIcon,{color:colors.accent}]}>◈</Text><Text style={[styles.actionText,{color:colors.text}]}>View my profile</Text></TouchableOpacity>
   <TouchableOpacity onPress={onDiscover} style={[styles.action,{backgroundColor:colors.surfaceRaised,borderColor:colors.border}]}><Text style={[styles.actionIcon,{color:colors.accent}]}>⌕</Text><Text style={[styles.actionText,{color:colors.text}]}>Find a profile</Text></TouchableOpacity>
  </View>
  <Text style={[styles.id,{color:colors.textMuted}]}>PROFILE ID  ·  {profile.publicId||"GENERATING"}</Text>
 </ScrollView>;
}
const styles=StyleSheet.create({container:{padding:20,paddingBottom:50},header:{flexDirection:"row",justifyContent:"space-between",marginBottom:20},kicker:{fontSize:10,fontWeight:"900",letterSpacing:2},title:{fontSize:34,fontWeight:"900",marginTop:7},sub:{fontSize:14,lineHeight:20,marginTop:5,maxWidth:290},level:{width:52,height:52,borderWidth:1,borderRadius:18,alignItems:"center",justifyContent:"center"},levelNo:{fontSize:17,fontWeight:"900"},levelText:{fontSize:7,fontWeight:"800",letterSpacing:1},hero:{borderWidth:1,borderRadius:28,padding:18,flexDirection:"row",alignItems:"center",gap:13},avatar:{width:66,height:66,borderRadius:23,borderWidth:1,alignItems:"center",justifyContent:"center"},avatarText:{fontSize:28,fontWeight:"900"},name:{fontSize:20,fontWeight:"900"},role:{fontSize:13,marginTop:3},location:{fontSize:11,marginTop:6},status:{position:"absolute",right:14,top:14,borderRadius:8,paddingHorizontal:7,paddingVertical:4},statusText:{color:"#FFF",fontSize:7,fontWeight:"900",letterSpacing:1},stats:{flexDirection:"row",gap:8,marginTop:12},stat:{flex:1,borderWidth:1,borderRadius:15,paddingVertical:13,alignItems:"center"},statValue:{fontSize:20,fontWeight:"900"},statLabel:{fontSize:8,fontWeight:"800",marginTop:2,letterSpacing:1},section:{fontSize:20,fontWeight:"900",marginTop:27,marginBottom:10},storyCard:{borderWidth:1,borderRadius:22,padding:18},chapter:{fontSize:16,fontWeight:"900"},story:{fontSize:13,lineHeight:20,marginTop:6},primary:{alignSelf:"flex-start",paddingHorizontal:16,paddingVertical:11,borderRadius:12,marginTop:15},primaryText:{color:"#FFF",fontWeight:"900"},actions:{flexDirection:"row",gap:9,marginTop:10},action:{flex:1,borderWidth:1,borderRadius:16,padding:15},actionIcon:{fontSize:22,fontWeight:"900"},actionText:{fontSize:12,fontWeight:"800",marginTop:7},id:{fontSize:9,fontWeight:"800",letterSpacing:1.2,textAlign:"center",marginTop:22}});
