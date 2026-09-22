import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { createAccount, resetPassword, signIn } from "../data/authStorage";
import { useTheme } from "../theme/ThemeContext";

type Mode="signin"|"signup"|"reset";
export function AuthScreen({onAuthenticated}:{onAuthenticated:(isNewUser:boolean)=>void}){
 const {colors}=useTheme(); const [mode,setMode]=useState<Mode>("signin"); const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
 const submit=async()=>{if(busy)return;setError("");if(!email.trim()||(mode==="signup"&&(!name.trim()||!password.trim()))||(mode==="signin"&&!password.trim())){setError("Complete the required fields.");return;}setBusy(true);
  if(mode==="signup"){try{await createAccount({name:name.trim(),email:email.trim(),password});onAuthenticated(true);}catch(e){setError("Create account failed: "+((e as any)?.code||"unknown"));}finally{setBusy(false);}return;}
  if(mode==="reset"){const ok=await resetPassword(email);setError(ok?"Reset link sent. Check your email.":"Unable to send reset link.");if(ok)setMode("signin");setBusy(false);return;}
  try{await signIn(email,password);onAuthenticated(false);}catch(e){setError("Sign in failed: "+((e as any)?.code||"unknown"));}finally{setBusy(false);}
 };
 return <KeyboardAvoidingView style={[styles.safe,{backgroundColor:colors.background}]} behavior={Platform.OS==="ios"?"padding":undefined}><View style={styles.container}>
  <View style={styles.top}><Text style={[styles.mini,{color:colors.accent}]}>PRO FOLIO</Text><Text style={[styles.title,{color:colors.text}]}>{mode==="signup"?"CREATE YOUR STORY":mode==="reset"?"RETURN TO YOUR STORY":"ENTER YOUR STORY"}</Text><Text style={[styles.sub,{color:colors.textSecondary}]}>{mode==="signup"?"Create the identity people will remember.":mode==="reset"?"We'll help you get back in.":"Your professional identity starts here."}</Text></View>
  <View style={styles.progress}><View style={[styles.dot,{backgroundColor:colors.accent}]}/><View style={[styles.line,{backgroundColor:colors.border}]}/><Text style={[styles.step,{color:colors.textMuted}]}>{mode==="signup"?"01 / IDENTITY":mode==="reset"?"RECOVERY":"WELCOME"}</Text></View>
  <View style={[styles.card,{backgroundColor:colors.surfaceRaised,borderColor:colors.border}]}>
   {mode==="signup"&&<TextInput value={name} onChangeText={setName} placeholder="What should people call you?" placeholderTextColor={colors.textMuted} style={[styles.input,{color:colors.text,borderColor:colors.border,backgroundColor:colors.surface}]}/>}
   <TextInput value={email} onChangeText={setEmail} placeholder="Your email" placeholderTextColor={colors.textMuted} style={[styles.input,{color:colors.text,borderColor:colors.border,backgroundColor:colors.surface}]} keyboardType="email-address" autoCapitalize="none"/>
   {mode!=="reset"&&<TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor={colors.textMuted} style={[styles.input,{color:colors.text,borderColor:colors.border,backgroundColor:colors.surface}]} secureTextEntry/>}
   {!!error&&<Text style={[styles.error,{color:colors.warning}]}>{error}</Text>}
   {mode==="signin"&&<Pressable onPress={()=>{setError("");setMode("reset")}}><Text style={[styles.forgot,{color:colors.accent}]}>Forgot password?</Text></Pressable>}
   <Pressable style={[styles.button,{backgroundColor:colors.accent}]} onPress={submit}><Text style={styles.buttonText}>{mode==="signup"?"Begin your profile →":mode==="reset"?"Send reset link →":"Continue →"}</Text></Pressable>
  </View>
  <Pressable style={styles.switchRow} onPress={()=>{setError("");setMode(mode==="signin"?"signup":"signin")}}><Text style={{color:colors.textMuted}}>{mode==="signin"?"New here? ":"Already have an identity? "}</Text><Text style={[styles.switch,{color:colors.accent}]}>{mode==="signin"?"Create your story":"Enter your story"}</Text></Pressable>
  {mode==="reset"&&<Pressable onPress={()=>setMode("signin")}><Text style={[styles.back,{color:colors.textMuted}]}>‹ Back</Text></Pressable>}
  <Text style={[styles.footer,{color:colors.textMuted}]}>CREATE • SHAPE • SHARE • DISCOVER</Text>
 </View></KeyboardAvoidingView>;
}
const styles=StyleSheet.create({safe:{flex:1},container:{flex:1,justifyContent:"center",padding:24},top:{marginBottom:24},mini:{fontSize:10,fontWeight:"900",letterSpacing:2.5},title:{fontSize:35,lineHeight:40,fontWeight:"900",marginTop:10,maxWidth:350},sub:{fontSize:15,lineHeight:22,marginTop:8,maxWidth:330},progress:{flexDirection:"row",alignItems:"center",marginBottom:12},dot:{width:7,height:7,borderRadius:4},line:{height:1,flex:1,marginHorizontal:9},step:{fontSize:9,fontWeight:"800",letterSpacing:1.2},card:{borderWidth:1,borderRadius:25,padding:18},input:{height:54,borderWidth:1,borderRadius:15,paddingHorizontal:16,marginBottom:12,fontSize:15},forgot:{textAlign:"right",fontWeight:"800",marginBottom:16},error:{fontSize:12,fontWeight:"800",marginBottom:12},button:{height:54,borderRadius:15,alignItems:"center",justifyContent:"center"},buttonText:{color:"#FFF",fontSize:15,fontWeight:"900"},switchRow:{flexDirection:"row",justifyContent:"center",marginTop:22},switch:{fontWeight:"900"},back:{textAlign:"center",marginTop:15,fontWeight:"700"},footer:{fontSize:9,fontWeight:"900",letterSpacing:1.5,textAlign:"center",marginTop:28}});
