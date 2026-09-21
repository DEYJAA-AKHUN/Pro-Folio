import { useEffect, useState } from "react";
import { AuthScreen } from "./src/screens/AuthScreen";
import { ProfileSetupScreen } from "./src/screens/ProfileSetupScreen";
import { AppShell } from "./src/navigation/AppShell";
import { ThemeProvider } from "./src/theme/ThemeContext";
import { loadStoredProfile, saveStoredProfile } from "./src/data/profileStorage";
import { hasSession } from "./src/data/authStorage";
import { mockProfile } from "./src/data/mockProfile";
import type { Profile } from "./src/types/profile";

type Stage="auth"|"setup"|"app";
export default function App(){
 const [stage,setStage]=useState<Stage>("auth"); const [profile,setProfile]=useState<Profile>(mockProfile);
 useEffect(()=>{(async()=>{const stored=await loadStoredProfile();if(stored)setProfile(p=>({...p,...stored,documents:stored.documents||p.documents}));if(await hasSession())setStage("app");})()},[]);
 const updateProfile=(next:Profile)=>{setProfile(next);saveStoredProfile(next);};
 return <ThemeProvider>
  {stage==="auth"&&<AuthScreen onAuthenticated={(isNew)=>setStage(isNew?"setup":"app")}/>}
  {stage==="setup"&&<ProfileSetupScreen profile={profile} onComplete={(next)=>{updateProfile(next);setStage("app")}}/>}
  {stage==="app"&&<AppShell profile={profile} onProfileChange={updateProfile} onSignOut={()=>setStage("auth")}/>}
 </ThemeProvider>;
}
