import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import type { Profile } from "../types/profile";

export function ProfileSetupScreen({profile,onComplete}:{profile:Profile;onComplete:(profile:Profile)=>void}){
 const {colors}=useTheme(); const [headline,setHeadline]=useState(profile.headline==="Professional profile in progress"?"":profile.headline); const [location,setLocation]=useState(profile.location||""); const [about,setAbout]=useState(profile.summary||"");
 const finish=()=>onComplete({...profile,headline:headline.trim()||"Professional profile in progress",location:location.trim(),summary:about.trim()||"Build one trusted professional identity containing your experience, education, projects, skills and credentials."});
 return <KeyboardAvoidingView style={[styles.safe,{backgroundColor:colors.background}]} behavior={Platform.OS==="ios"?"padding":undefined}><ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
  <View style={[styles.step,{backgroundColor:colors.accentSoft}]}><Text style={[styles.stepText,{color:colors.accent}]}>01 / PROFILE FOUNDATION</Text></View>
  <Text style={[styles.title,{color:colors.text}]}>Build your profile</Text><Text style={[styles.subtitle,{color:colors.textSecondary}]}>The foundation is saved locally and feeds the rest of your professional workspace.</Text>
  <Field label="Professional headline" value={headline} onChange={setHeadline} placeholder="e.g. Software Developer" colors={colors}/>
  <Field label="Location" value={location} onChange={setLocation} placeholder="City, Country" colors={colors}/>
  <Field label="About you" value={about} onChange={setAbout} placeholder="A short professional introduction" multiline colors={colors}/>
  <TouchableOpacity style={[styles.button,{backgroundColor:colors.accent}]} onPress={finish}><Text style={styles.buttonText}>Continue to Pro-Filio</Text></TouchableOpacity>
  <TouchableOpacity onPress={finish} style={styles.skip}><Text style={{color:colors.textMuted,fontWeight:"700"}}>Skip for now</Text></TouchableOpacity>
 </ScrollView></KeyboardAvoidingView>;
}
function Field({label,value,onChange,placeholder,multiline,colors}:{label:string;value:string;onChange:(v:string)=>void;placeholder:string;multiline?:boolean;colors:any}){return <View><Text style={[styles.label,{color:colors.text}]}>{label}</Text><TextInput value={value} onChangeText={onChange} placeholder={placeholder} placeholderTextColor={colors.textMuted} multiline={multiline} textAlignVertical={multiline?"top":"center"} style={[styles.input,{color:colors.text,backgroundColor:colors.surfaceRaised,borderColor:colors.border},multiline&&styles.about]}/></View>}
const styles=StyleSheet.create({safe:{flex:1},container:{padding:24,paddingTop:48,paddingBottom:40},step:{alignSelf:"flex-start",paddingHorizontal:12,paddingVertical:7,borderRadius:20,marginBottom:18},stepText:{fontSize:11,fontWeight:"800"},title:{fontSize:30,fontWeight:"800"},subtitle:{fontSize:15,lineHeight:22,marginTop:8,marginBottom:20},label:{fontSize:14,fontWeight:"800",marginBottom:8,marginTop:10},input:{height:52,borderWidth:1,borderRadius:14,paddingHorizontal:15,fontSize:15},about:{height:120,paddingTop:14},button:{height:54,borderRadius:15,alignItems:"center",justifyContent:"center",marginTop:28},buttonText:{color:"#FFF",fontSize:16,fontWeight:"800"},skip:{alignItems:"center",paddingVertical:18}});
