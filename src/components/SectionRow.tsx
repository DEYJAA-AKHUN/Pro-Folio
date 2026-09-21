import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
type Props={title:string;description:string;letter:string};
export function SectionRow({title,description,letter}:Props){const {colors}=useTheme();return <View style={[styles.item,{backgroundColor:colors.surface,borderColor:colors.border}]}>
  <View style={[styles.icon,{backgroundColor:colors.accentSoft}]}><Text style={[styles.iconText,{color:colors.accent}]}>{letter}</Text></View>
  <View style={styles.copy}><Text style={[styles.title,{color:colors.text}]}>{title}</Text><Text style={[styles.description,{color:colors.textMuted}]}>{description}</Text></View>
  <Text style={[styles.chevron,{color:colors.textMuted}]}>›</Text>
</View>}
const styles=StyleSheet.create({item:{flexDirection:"row",alignItems:"center",borderRadius:18,padding:15,marginBottom:10,borderWidth:1},icon:{width:44,height:44,borderRadius:14,alignItems:"center",justifyContent:"center"},iconText:{fontSize:15,fontWeight:"800"},copy:{flex:1,marginLeft:13},title:{fontSize:15,fontWeight:"700"},description:{fontSize:12,lineHeight:17,marginTop:3},chevron:{fontSize:27,marginLeft:8}});
