import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function RegisterScreen() {
  const router = useRouter();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      emailRef.current?.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <LinearGradient
        colors={['#101922', '#15252E', '#193038', '#1D3B42', '#0E4548']}
        locations={[0.13, 0.35, 0.55, 0.74, 1.0]}
        style={StyleSheet.absoluteFillObject}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.inner}>

              <Text style={styles.brandTitle}>ChargeUp</Text>

              <View style={styles.brandCenter}>
                <Ionicons name="flash" size={80} color="white" />
                <Text style={styles.brandTagline}>Find, book and pay</Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  ref={emailRef}
                  placeholder="Email address"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  style={styles.underlineInput}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  blurOnSubmit={false}
                />

                <View style={styles.passwordRow}>
                  <TextInput
                    ref={passwordRef}
                    placeholder="Password"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    secureTextEntry={!isPasswordVisible}
                    style={[styles.underlineInput, { flex: 1, borderBottomWidth: 0, marginBottom: 0 }]}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  <Pressable
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                      size={22}
                      color="white"
                    />
                  </Pressable>
                </View>
              </View>

              {/* UPDATED: Navigates back to Login */}
              <Pressable
                style={({ pressed }) => [styles.pillButton, pressed && { opacity: 0.7 }]}
                onPress={() => router.push("/(auth)/login")}
              >
                <Text style={styles.pillButtonText}>Signup</Text>
              </Pressable>

              <Text style={styles.orText}>or</Text>

              <View style={styles.dividerContainer}>
                <View style={styles.line} />
                <Text style={styles.loginWithText}>Signup with</Text>
                <View style={styles.line} />
              </View>

              <View style={styles.socialRow}>
                <Pressable style={styles.socialBtn} onPress={() => {}}>
                  <FontAwesome name="apple" size={40} color="white" />
                </Pressable>
                <Pressable style={styles.socialBtn} onPress={() => {}}>
                  <FontAwesome name="google" size={36} color="#DB4437" />
                </Pressable>
              </View>

              <View style={styles.signupRow}>
                <Text style={styles.noAccountText}>Already have an Account? </Text>
                <Pressable onPress={() => router.push("/(auth)/login")}>
                  <Text style={styles.signupLink}>Login</Text>
                </Pressable>
              </View>

              <View style={styles.legalContainer}>
                <Text style={styles.legalNotice}>
                  By continuing, you are agree to our{" "}
                  <Text style={styles.legalLink}>Terms and conditions</Text> and{" "}
                  <Text style={styles.legalLink}>Privacy Policy</Text>.
                </Text>
              </View>

            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  inner: { paddingHorizontal: 35, flex: 1, alignItems: "center" },
  brandTitle: { color: "white", fontSize: 24, fontWeight: "800", alignSelf: "flex-start", marginTop: 20 },
  brandCenter: { alignItems: "center", marginVertical: 30 },
  brandTagline: { color: "white", fontSize: 18, marginTop: 10, fontWeight: '300' },
  inputContainer: { width: "100%", marginBottom: 20 },
  underlineInput: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.5)",
    color: "white",
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    minHeight: 50,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.5)",
    marginBottom: 20,
    height: 50,
  },
  eyeIcon: { paddingLeft: 10 },
  pillButton: {
    width: width * 0.7,
    borderWidth: 1.2,
    borderColor: "rgba(255,255,255,0.6)",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  pillButtonText: { color: "white", fontSize: 20, fontWeight: '500' },
  orText: { color: "white", marginVertical: 10, opacity: 0.8 },
  dividerContainer: { flexDirection: "row", alignItems: "center", width: "100%", marginVertical: 10 },
  line: { flex: 1, height: 1, backgroundColor: "white", opacity: 0.2 },
  loginWithText: { color: "white", marginHorizontal: 15, fontSize: 14, opacity: 0.7 },
  socialRow: { flexDirection: "row", gap: 50, marginVertical: 15, alignItems: 'center' },
  socialBtn: { padding: 10 },
  signupRow: { flexDirection: "row", marginTop: 10 },
  noAccountText: { color: "rgba(255,255,255,0.8)" },
  signupLink: { color: "#81D4FA", fontWeight: "bold" },
  legalContainer: { marginTop: 20, paddingHorizontal: 10 },
  legalNotice: { color: "rgba(255,255,255,0.5)", fontSize: 11, textAlign: "center", lineHeight: 18 },
  legalLink: { color: "#81D4FA", textDecorationLine: "underline" },
});