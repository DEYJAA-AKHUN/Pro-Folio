import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { defaultTheme, getTheme, type ThemeColors, type ThemeName } from "./themes";
const THEME_KEY="pro-filio-theme-v1";
type ThemeContextValue={themeName:ThemeName;colors:ThemeColors;setTheme:(name:ThemeName)=>void};
const ThemeContext=createContext<ThemeContextValue|undefined>(undefined);
export function ThemeProvider({children}:PropsWithChildren){
 const [themeName,setThemeName]=useState<ThemeName>(defaultTheme);
 useEffect(()=>{AsyncStorage.getItem(THEME_KEY).then(raw=>{if(raw)setThemeName(raw as ThemeName)}).catch(()=>{})},[]);
 const setTheme=(name:ThemeName)=>{setThemeName(name);AsyncStorage.setItem(THEME_KEY,name).catch(()=>{})};
 const theme=useMemo(()=>getTheme(themeName),[themeName]);
 const value=useMemo(()=>({themeName,colors:theme.colors,setTheme}),[themeName,theme.colors]);
 return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export function useTheme(){const value=useContext(ThemeContext);if(!value)throw new Error("useTheme must be used inside ThemeProvider");return value;}
