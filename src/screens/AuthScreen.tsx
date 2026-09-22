import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { createAccount, resetPassword, signIn } from "../data/authStorage";
import { useTheme } from "../theme/ThemeContext";

type Mode="signin"|"signup"|"reset";

export function AuthScreen({onAuthenticated}:{onAuthenticated:(isNewUser:boolean)=>void}){
 const {colors}=useTheme(); const [mode,setMode]=useState<Mode>("signin"); const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
 const submit=async()=>{ if(busy)return; setError(""); if(!email.trim()||(mode==="signup"&&(!name.trim()||!password.trim()))||(mode==="signin"&&!password.trim())){setError("Enter all required fields.");return;} setBusy(true);
  if(mode==="signup"){try{await createAccount({name:name.trim(),email:email.trim(),password});onAuthenticated(true);}catch(error){const code=(error as {code?:string})?.code||"unknown";setError(`Create account failed: ${code}`);}finally{setBusy(false);}return;}
  if(mode==="reset"){const ok=await resetPassword(email);setError(ok?"Reset email sent. Check your email.":"Unable to send reset email. Check Firebase Auth and the email address.");if(ok)setMode("signin");setBusy(false);return;}
  try{const ok=await signIn(email,password);if(ok)onAuthenticated(false);else setError("Sign in failed. Check your email and password.");}catch(error){const code=(error as {code?:string})?.code||"unknown";setError(`Sign in failed: ${code}`);}finally{setBusy(false);}
 };
 return <KeyboardAvoidingView style={[styles.safe,{backgroundColor:colors.background}]} behavior={Platform.OS==="ios"?"padding":undefined}><View style={styles.container}>
  <View style={styles.brand}><View style={[styles.mark,{backgroundColor:colors.accentSoft,borderColor:colors.accent}]}><Text style={[styles.markText,{color:colors.text}]}>P</Text></View><View style={styles.wordmark}><Text style={[styles.pro,{color:colors.text}]}>Pro</Text><Text style={[styles.folio,{color:colors.accent}]}>Folio</Text></View><Text style={[styles.tagline,{color:colors.textMuted}]}>YOUR STORY  •  YOUR PROFILE  •  YOUR FUTURE</Text><Text style={[styles.subtitle,{color:colors.textSecondary}]}>{mode==="reset"?"Reset your account password.":mode==="signin"?"Your professional identity, unified.":"Create your professional identity."}</Text></View>
  <View style={[styles.card,{backgroundColor:colors.surfaceRaised,borderColor:colors.border}]}>
   {mode==="signup"&&<TextInput value={name} onChangeText={setName} placeholder="Full name" placeholderTextColor={colors.textMuted} style={[styles.input,{color:colors.text,borderColor:colors.border,backgroundColor:colors.surface}]}/>}
   <TextInput value={email} onChangeText={setEmail} placeholder="Email address" placeholderTextColor={colors.textMuted} style={[styles.input,{color:colors.text,borderColor:colors.border,backgroundColor:colors.surface}]} keyboardType="email-address" autoCapitalize="none"/>
   <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor={colors.textMuted} style={[styles.input,{color:colors.text,borderColor:colors.border,backgroundColor:colors.surface}]} secureTextEntry/>
   {error!==""&&<Text style={[styles.error,{color:"#D64B4B"}]}>{error}</Text>}
   {mode==="signin"&&<Pressable hitSlop={10} onPress={()=>{setError("");setMode("reset")}}><Text style={[styles.forgot,{color:colors.accent}]}>Forgot password?</Text></Pressable>}
   <Pressable style={[styles.button,{backgroundColor:colors.accent}]} onPress={submit}><Text style={styles.buttonText}>{mode==="signup"?"Create Account":mode==="reset"?"Reset Password":"Sign In"}</Text></Pressable>
  </View>
  <View style={styles.switchRow}>{mode!=="reset"&&<><Text style={{color:colors.textSecondary}}>{mode==="signin"?"New to Pro Folio?":"Already have an account?"}</Text><Pressable hitSlop={10} onPress={()=>{setError("");setMode(mode==="signin"?"signup":"signin")}}><Text style={[styles.switch,{color:colors.accent}]}>{mode==="signin"?" Create account":" Sign in"}</Text></Pressable></>}{mode==="reset"&&<Pressable hitSlop={10} onPress={()=>{setError("");setMode("signin")}}><Text style={[styles.switch,{color:colors.accent}]}>Back to sign in</Text></Pressable>}</View>
  <Text style={[styles.footer,{color:colors.textMuted}]}>PRO FOLIO • PROFESSIONAL IDENTITY PLATFORM</Text>
 </View></KeyboardAvoidingView>;
}
const styles=StyleSheet.create({safe:{flex:1},container:{flex:1,justifyContent:"center",padding:24},brand:{alignItems:"center",marginBottom:18},mark:{width:74,height:74,borderRadius:24,borderWidth:1,alignItems:"center",justifyContent:"center",marginBottom:12},markText:{fontSize:42,fontWeight:"900"},wordmark:{flexDirection:"row",alignItems:"baseline"},pro:{fontSize:40,fontWeight:"800"},folio:{fontSize:40,fontWeight:"800"},tagline:{fontSize:9,fontWeight:"800",letterSpacing:1.7,marginTop:7,marginBottom:4},subtitle:{fontSize:15,textAlign:"center",marginTop:4},card:{borderWidth:1,borderRadius:24,padding:18},input:{height:52,borderWidth:1,borderRadius:14,paddingHorizontal:16,marginBottom:12,fontSize:15},forgot:{textAlign:"right",fontWeight:"700",marginBottom:16},error:{fontSize:13,fontWeight:"700",marginBottom:12,textAlign:"center"},button:{height:52,borderRadius:14,alignItems:"center",justifyContent:"center"},buttonText:{color:"#FFF",fontSize:16,fontWeight:"800"},switchRow:{flexDirection:"row",justifyContent:"center",marginTop:22},switch:{fontWeight:"800"},footer:{fontSize:9,fontWeight:"800",letterSpacing:1.4,textAlign:"center",marginTop:26}});
