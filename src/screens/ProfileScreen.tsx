import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import type { Profile } from "../types/profile";

type Props = { profile: Profile; onSave: (profile: Profile) => void };

export function ProfileScreen({ profile, onSave }: Props) {
  const { colors } = useTheme();
  const [editing,setEditing] = useState(false);
  const [draft,setDraft] = useState(profile);

  const beginEdit = () => { setDraft(profile); setEditing(true); };
  const save = () => { onSave(draft); setEditing(false); };

  return <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.header}>
      <View style={{flex:1}}>
        <Text style={[styles.eyebrow,{color:colors.accent}]}>PROFILE</Text>
        <Text style={[styles.name,{color:colors.text}]}>{profile.fullName}</Text>
        <Text style={[styles.headline,{color:colors.textSecondary}]}>{profile.headline}</Text>
      </View>
      <TouchableOpacity onPress={editing?save:beginEdit} style={[styles.action,{backgroundColor:colors.accent}]} activeOpacity={0.8}><Text style={styles.actionText}>{editing?"Save":"Edit"}</Text></TouchableOpacity>
    </View>

    {editing ? <View style={[styles.editor,{backgroundColor:colors.surfaceRaised,borderColor:colors.border}]}>
      <Field label="Full name" value={draft.fullName} onChangeText={value=>setDraft({...draft,fullName:value})} colors={colors}/>
      <Field label="Professional headline" value={draft.headline} onChangeText={value=>setDraft({...draft,headline:value})} colors={colors}/>
      <Field label="Professional summary" value={draft.summary} onChangeText={value=>setDraft({...draft,summary:value})} multiline colors={colors}/>
      <Field label="Email" value={draft.email||""} onChangeText={value=>setDraft({...draft,email:value})} keyboardType="email-address" colors={colors}/>
      <Field label="Location" value={draft.location||""} onChangeText={value=>setDraft({...draft,location:value})} colors={colors}/>
    </View> : <>
      <View style={[styles.card,{backgroundColor:colors.surfaceRaised,borderColor:colors.border}]}><Text style={[styles.label,{color:colors.textMuted}]}>PROFESSIONAL SUMMARY</Text><Text style={[styles.body,{color:colors.textSecondary}]}>{profile.summary}</Text></View>
      <Text style={[styles.section,{color:colors.text}]}>Contact</Text>
      <Info label="Email" value={profile.email}/><Info label="Location" value={profile.location}/><Info label="Visibility" value={profile.visibility}/>
    </>}
  </ScrollView>;
}

function Field({label,value,onChangeText,multiline,keyboardType,colors}:{label:string;value:string;onChangeText:(value:string)=>void;multiline?:boolean;keyboardType?:"default"|"email-address";colors:any}){
  return <View style={styles.field}><Text style={[styles.fieldLabel,{color:colors.textMuted}]}>{label}</Text><TextInput value={value} onChangeText={onChangeText} multiline={multiline} keyboardType={keyboardType} placeholderTextColor={colors.textMuted} style={[styles.input,{color:colors.text,borderColor:colors.border,backgroundColor:colors.surface}]} /></View>;
}
function Info({label,value}:{label:string;value?:string}){const {colors}=useTheme();return <View style={[styles.info,{backgroundColor:colors.surface,borderColor:colors.border}]}><Text style={[styles.label,{color:colors.textMuted}]}>{label}</Text><Text style={[styles.value,{color:colors.text}]}>{value||"Not set"}</Text></View>}

const styles=StyleSheet.create({
  container:{padding:22,paddingBottom:48},
  header:{flexDirection:"row",alignItems:"flex-start"},
  eyebrow:{fontSize:12,fontWeight:"800",letterSpacing:2},
  name:{fontSize:30,fontWeight:"800",marginTop:9},
  headline:{fontSize:16,marginTop:6},
  action:{borderRadius:13,paddingHorizontal:17,paddingVertical:10,marginLeft:12,marginTop:5},
  actionText:{color:"#FFFFFF",fontSize:13,fontWeight:"800"},
  editor:{borderRadius:20,padding:18,borderWidth:1,marginTop:24},
  field:{marginBottom:14},
  fieldLabel:{fontSize:10,fontWeight:"800",letterSpacing:1.1,marginBottom:6},
  input:{borderRadius:12,borderWidth:1,paddingHorizontal:13,paddingVertical:11,fontSize:14,minHeight:44},
  card:{borderRadius:20,padding:19,borderWidth:1,marginTop:24},
  label:{fontSize:10,fontWeight:"800",letterSpacing:1.2},
  body:{fontSize:14,lineHeight:21,marginTop:9},
  section:{fontSize:20,fontWeight:"800",marginTop:28,marginBottom:10},
  info:{borderRadius:15,padding:15,marginBottom:8,borderWidth:1},
  value:{fontSize:14,marginTop:5}
});
