import { ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import type { Profile } from "../types/profile";

export function PublicProfileScreen({ profile, onClose }: { profile: Profile; onClose: () => void }) {
  const { colors } = useTheme();
  const share = async () => {
    await Share.share({ message: buildShareText(profile), title: profile.fullName + " | Pro-Filio" });
  };
  return <ScrollView contentContainerStyle={[styles.container,{backgroundColor:colors.background}]}>
    <TouchableOpacity onPress={onClose}><Text style={[styles.back,{color:colors.accent}]}>‹ Back</Text></TouchableOpacity>
    <View style={[styles.hero,{backgroundColor:colors.surfaceRaised,borderColor:colors.border}]}>
      <View style={[styles.avatar,{backgroundColor:colors.accentSoft}]}><Text style={[styles.avatarText,{color:colors.accent}]}>{profile.fullName?.charAt(0)||"P"}</Text></View>
      <Text style={[styles.name,{color:colors.text}]}>{profile.fullName}</Text>
      <Text style={[styles.headline,{color:colors.textSecondary}]}>{profile.headline}</Text>
      {!!profile.location && <Text style={[styles.meta,{color:colors.textMuted}]}>{profile.location}</Text>}
      <TouchableOpacity style={[styles.share,{backgroundColor:colors.accent}]} onPress={share}><Text style={styles.shareText}>Share profile</Text></TouchableOpacity>
    </View>
    <Section title="About" text={profile.summary} colors={colors}/>
    <List title="Experience" items={profile.employment.map(x=>x.role+" • "+x.company)} colors={colors}/>
    <List title="Education" items={profile.education.map(x=>x.qualification+" • "+x.institution)} colors={colors}/>
    <List title="Projects" items={profile.projects.map(x=>x.name)} colors={colors}/>
    <List title="Skills" items={profile.skills.map(x=>x.name)} colors={colors}/>
    <List title="Certifications" items={profile.certifications.map(x=>x.name+" • "+x.issuer)} colors={colors}/>
    <List title="Achievements" items={profile.achievements.map(x=>x.title)} colors={colors}/>
    <Text style={[styles.footer,{color:colors.textMuted}]}>Published from Pro-Filio • Local preview</Text>
  </ScrollView>;
}
function Section({title,text,colors}:{title:string;text?:string;colors:any}){return <View style={[styles.section,{backgroundColor:colors.surfaceRaised,borderColor:colors.border}]}><Text style={[styles.sectionTitle,{color:colors.text}]}>{title}</Text><Text style={[styles.body,{color:colors.textSecondary}]}>{text||"Not added yet."}</Text></View>}
function List({title,items,colors}:{title:string;items:string[];colors:any}){return <View style={[styles.section,{backgroundColor:colors.surfaceRaised,borderColor:colors.border}]}><Text style={[styles.sectionTitle,{color:colors.text}]}>{title}</Text>{items.length?items.map((x,i)=><Text key={i} style={[styles.item,{color:colors.textSecondary}]}>• {x}</Text>):<Text style={[styles.body,{color:colors.textMuted}]}>Nothing added yet.</Text>}</View>}
function buildShareText(p:Profile){return p.fullName+" — "+p.headline+"\n"+(p.location||"")+"\n\n"+p.summary+"\n\nPro-Filio professional profile";}

const styles=StyleSheet.create({container:{padding:22,paddingBottom:50},back:{fontSize:16,fontWeight:"800",marginBottom:14},hero:{borderWidth:1,borderRadius:24,padding:24,alignItems:"center"},avatar:{width:72,height:72,borderRadius:25,alignItems:"center",justifyContent:"center"},avatarText:{fontSize:28,fontWeight:"900"},name:{fontSize:30,fontWeight:"900",marginTop:14,textAlign:"center"},headline:{fontSize:16,marginTop:6,textAlign:"center"},meta:{fontSize:12,marginTop:7},share:{marginTop:18,paddingHorizontal:20,paddingVertical:12,borderRadius:13},shareText:{color:"#FFF",fontWeight:"800"},section:{borderWidth:1,borderRadius:18,padding:17,marginTop:12},sectionTitle:{fontSize:17,fontWeight:"800",marginBottom:7},body:{fontSize:14,lineHeight:21},item:{fontSize:14,lineHeight:22},footer:{fontSize:11,textAlign:"center",marginTop:22}});
