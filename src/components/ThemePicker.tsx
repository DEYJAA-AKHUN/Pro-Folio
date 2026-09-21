import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { themes } from "../theme/themes";
import { useTheme } from "../theme/ThemeContext";

export function ThemePicker() {
  const { themeName, setTheme, colors } = useTheme();
  return <View style={styles.grid}>{themes.map(theme=>{
    const selected=theme.name===themeName;
    return <TouchableOpacity key={theme.name} style={[styles.card,{borderColor:selected?theme.colors.accent:colors.border,backgroundColor:selected?colors.surfaceRaised:colors.surface}]} onPress={()=>setTheme(theme.name)} activeOpacity={0.8}>
      <View style={[styles.preview,{backgroundColor:theme.colors.background,borderColor:theme.colors.border}]}>
        <View style={[styles.previewBar,{backgroundColor:theme.colors.surfaceRaised,borderColor:theme.colors.border}]}/>
        <View style={styles.previewRow}><View style={[styles.previewCircle,{backgroundColor:theme.colors.accentSoft}]}/><View style={{flex:1,gap:4}}><View style={[styles.previewLine,{backgroundColor:theme.colors.text,width:"70%"}]}/><View style={[styles.previewLine,{backgroundColor:theme.colors.textMuted,width:"50%"}]}/></View></View>
        <View style={[styles.previewCard,{backgroundColor:theme.colors.surface,borderColor:theme.colors.border}]}/>
      </View>
      <View style={styles.nameRow}><Text style={[styles.name,{color:colors.text}]}>{theme.label}</Text>{selected&&<Text style={[styles.check,{color:theme.colors.accent}]}>✓</Text>}</View>
      <Text style={[styles.description,{color:colors.textMuted}]}>{theme.description}</Text>
    </TouchableOpacity>;
  })}</View>;
}
const styles=StyleSheet.create({grid:{gap:12},card:{borderRadius:18,borderWidth:1,padding:12},preview:{height:92,borderRadius:13,borderWidth:1,padding:9},previewBar:{height:10,borderRadius:6,borderWidth:1,marginBottom:10},previewRow:{flexDirection:"row",alignItems:"center",gap:8},previewCircle:{width:25,height:25,borderRadius:13},previewLine:{height:5,borderRadius:4},previewCard:{height:25,borderRadius:7,borderWidth:1,marginTop:10},nameRow:{flexDirection:"row",alignItems:"center",marginTop:10},name:{flex:1,fontSize:14,fontWeight:"700"},check:{fontSize:17,fontWeight:"800"},description:{fontSize:11,lineHeight:16,marginTop:3}});
