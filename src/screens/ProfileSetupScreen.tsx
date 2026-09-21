import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../theme/ThemeContext";

export function ProfileSetupScreen({ onComplete }: { onComplete: () => void }) {
  const { colors } = useTheme();
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");

  return (
    <KeyboardAvoidingView style={[styles.safe, { backgroundColor: colors.background }]} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={[styles.step, { backgroundColor: colors.accentSoft }]}><Text style={[styles.stepText, { color: colors.accent }]}>01 / 01</Text></View>
        <Text style={[styles.title, { color: colors.text }]}>Build your profile</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Start with the essentials. You can complete everything else later.</Text>

        <Text style={[styles.label, { color: colors.text }]}>Professional headline</Text>
        <TextInput value={headline} onChangeText={setHeadline} placeholder="e.g. Software Developer" placeholderTextColor={colors.textMuted} style={[styles.input, { color: colors.text, backgroundColor: colors.surfaceRaised, borderColor: colors.border }]} />

        <Text style={[styles.label, { color: colors.text }]}>Location</Text>
        <TextInput value={location} onChangeText={setLocation} placeholder="City, Country" placeholderTextColor={colors.textMuted} style={[styles.input, { color: colors.text, backgroundColor: colors.surfaceRaised, borderColor: colors.border }]} />

        <Text style={[styles.label, { color: colors.text }]}>About you</Text>
        <TextInput value={about} onChangeText={setAbout} placeholder="A short professional introduction" placeholderTextColor={colors.textMuted} multiline textAlignVertical="top" style={[styles.input, styles.about, { color: colors.text, backgroundColor: colors.surfaceRaised, borderColor: colors.border }]} />

        <TouchableOpacity style={[styles.button, { backgroundColor: colors.accent }]} onPress={onComplete} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Continue to Pro-Filio</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onComplete} style={styles.skip}><Text style={{ color: colors.textMuted, fontWeight: "700" }}>Skip for now</Text></TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1}, container:{padding:24,paddingTop:48,paddingBottom:40},
  step:{alignSelf:"flex-start",paddingHorizontal:12,paddingVertical:7,borderRadius:20,marginBottom:18},
  stepText:{fontSize:12,fontWeight:"800"}, title:{fontSize:30,fontWeight:"800"}, subtitle:{fontSize:15,lineHeight:22,marginTop:8,marginBottom:28},
  label:{fontSize:14,fontWeight:"800",marginBottom:8,marginTop:10}, input:{height:52,borderWidth:1,borderRadius:14,paddingHorizontal:15,fontSize:15},
  about:{height:120,paddingTop:14}, button:{height:54,borderRadius:15,alignItems:"center",justifyContent:"center",marginTop:28}, buttonText:{color:"#FFF",fontSize:16,fontWeight:"800"},
  skip:{alignItems:"center",paddingVertical:18}
});
