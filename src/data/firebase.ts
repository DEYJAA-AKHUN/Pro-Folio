import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyC1KYYHNbFmH87pBBCgQwsQ1bzjaAd0I",
  authDomain: "pro-folio-6a9d0.firebaseapp.com",
  projectId: "pro-folio-6a9d0",
  storageBucket: "pro-folio-6a9d0.firebasestorage.app",
  messagingSenderId: "243215346443",
  appId: "1:243215346443:web:b23f0576760eb9c14e900e"
};

export function getFirebaseApp(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}
