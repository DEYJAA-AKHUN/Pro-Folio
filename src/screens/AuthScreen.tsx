import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createAccount, resetPassword, signIn } from "../data/authStorage";
import { useTheme } from "../theme/ThemeContext";
type Mode="signin"|"signup"|"reset";
export function AuthScreen({onAuthenticated}:{onAuthenticated:(isNewUser:boolean)=>void}){
 const {colors}=useTheme(); const [mode,setMode]=useState<Mode>("signin"); const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const submit=async()=>{
  if(!email.trim()||(mode==="signup"&&(!name.trim()||!password.trim()))||(mode==="signin"&&!password.trim())){Alert.alert("Missing information","Enter all required fields.");return;}
  if(mode==="signup"){try{await createAccount({name:name.trim(),email:email.trim(),password});onAuthenticated(true);}catch(error){const code=(error as {code?:string})?.code||"unknown";Alert.alert("Create account failed",code); }return;}
  if(mode==="reset"){const ok=await resetPassword(email);Alert.alert(ok?"Reset email sent":"Unable to send reset email",ok?"Check your email for the Firebase password reset link.":"Check the email address and Firebase configuration.");if(ok)setMode("signin");return;}
  try{const ok=await signIn(email,password);if(ok)onAuthenticated(false);}catch(error){const code=(error as {code?:string})?.code||"unknown";Alert.alert("Sign in failed",code);}
 };
 return <KeyboardAvoidingView style={[styles.safe,{backgroundColor:colors.background}]} behavior={Platform.OS==="ios"?"padding":undefined}><View style={styles.container}>
  <View style={[styles.logo,{backgroundColor:colors.accentSoft}]}><Text style={[styles.logoText,{color:colors.accent}]}>P</Text></View><Text style={[styles.title,{color:colors.text}]}>Pro-Filio</Text><Text style={[styles.subtitle,{color:colors.textSecondary}]}>{mode==="reset"?"Reset the local account password.":mode==="signin"?"Your professional identity, in one place.":"Create your professional identity."}</Text>
  <View style={[styles.card,{backgroundColor:colors.surfaceRaised,borderColor:colors.border}]}>
   {mode==="signup"&&<TextInput value={name} onChangeText={setName} placeholder="Full name" placeholderTextColor={colors.textMuted} style={[styles.input,{color:colors.text,borderColor:colors.border,backgroundColor:colors.surface}]}/>}
   <TextInput value={email} onChangeText={setEmail} placeholder="Email address" placeholderTextColor={colors.textMuted} style={[styles.input,{color:colors.text,borderColor:colors.border,backgroundColor:colors.surface}]} keyboardType="email-address" autoCapitalize="none"/>
   <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor={colors.textMuted} style={[styles.input,{color:colors.text,borderColor:colors.border,backgroundColor:colors.surface}]} secureTextEntry/>
   {mode==="signin"&&<TouchableOpacity onPress={()=>setMode("reset")}><Text style={[styles.forgot,{color:colors.accent}]}>Forgot password?</Text></TouchableOpacity>}
   <TouchableOpacity style={[styles.button,{backgroundColor:colors.accent}]} onPress={submit}><Text style={styles.buttonText}>{mode==="signup"?"Create Account":mode==="reset"?"Reset Password":"Sign In"}</Text></TouchableOpacity>
  </View>
  <View style={styles.switchRow}>{mode!=="reset"&&<><Text style={{color:colors.textSecondary}}>{mode==="signin"?"New to Pro-Filio?":"Already have an account?"}</Text><TouchableOpacity onPress={()=>setMode(mode==="signin"?"signup":"signin")}><Text style={[styles.switch,{color:colors.accent}]}>{mode==="signin"?" Create account":" Sign in"}</Text></TouchableOpacity></>}{mode==="reset"&&<TouchableOpacity onPress={()=>setMode("signin")}><Text style={[styles.switch,{color:colors.accent}]}>Back to sign in</Text></TouchableOpacity>}</View>
 </View></KeyboardAvoidingView>;
}
const styles=StyleSheet.create({safe:{flex:1},container:{flex:1,justifyContent:"center",padding:24},logo:{width:64,height:64,borderRadius:22,alignItems:"center",justifyContent:"center",alignSelf:"center",marginBottom:16},logoText:{fontSize:30,fontWeight:"800"},title:{fontSize:32,fontWeight:"800",textAlign:"center"},subtitle:{fontSize:15,textAlign:"center",marginTop:8,marginBottom:28},card:{borderWidth:1,borderRadius:24,padding:18},input:{height:52,borderWidth:1,borderRadius:14,paddingHorizontal:16,marginBottom:12,fontSize:15},forgot:{textAlign:"right",fontWeight:"700",marginBottom:16},button:{height:52,borderRadius:14,alignItems:"center",justifyContent:"center"},buttonText:{color:"#FFF",fontSize:16,fontWeight:"800"},switchRow:{flexDirection:"row",justifyContent:"center",marginTop:22},switch:{fontWeight:"800"}});
