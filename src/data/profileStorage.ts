import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { getCurrentUser } from "./authStorage";
import { getApp, getApps, initializeApp } from "firebase/app";
import type { Profile } from "../types/profile";

const firebaseConfig = {
 apiKey:process.env.EXPO_PUBLIC_FIREBASE_API_KEY, authDomain:process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
 projectId:process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID, storageBucket:process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
 messagingSenderId:process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, appId:process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};
function getDb(){if(!firebaseConfig.apiKey||!firebaseConfig.projectId||!firebaseConfig.appId)throw new Error("Firebase configuration is missing.");const app=getApps().length?getApp():initializeApp(firebaseConfig);return getFirestore(app);}
function makePublicId(){return "PF-"+Math.random().toString(36).slice(2,8).toUpperCase();}

export async function loadStoredProfile():Promise<Partial<Profile>|null>{
 try{const user=await getCurrentUser();if(!user)return null;const snapshot=await getDoc(doc(getDb(),"profiles",user.uid));return snapshot.exists()?(snapshot.data() as Partial<Profile>):null;}catch{return null;}
}
export async function saveStoredProfile(profile:Partial<Profile>):Promise<void>{
 const user=await getCurrentUser();if(!user)return;
 const existing=await getDoc(doc(getDb(),"profiles",user.uid));
 const current=(existing.exists()?existing.data():{}) as Partial<Profile>;
 await setDoc(doc(getDb(),"profiles",user.uid),{...current,...profile,id:user.uid,publicId:current.publicId||profile.publicId||makePublicId()},{merge:true});
}
export async function findPublicProfile(publicId:string):Promise<Profile|null>{
 try{const snap=await getDocs(query(collection(getDb(),"profiles"),where("publicId","==",publicId.trim().toUpperCase())));if(snap.empty)return null;const p=snap.docs[0].data() as Profile;return p.visibility==="public"?p:null;}catch{return null;}
}
export async function clearStoredProfile():Promise<void>{}
