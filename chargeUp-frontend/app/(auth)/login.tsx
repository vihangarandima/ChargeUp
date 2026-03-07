import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function LoginScreen() {
  const router = useRouter();

  // 1. Added State (Memory) for the inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Bonus: toggle password visibility!

  // Login handler - navigates based on role
  const handleLogin = async () => {
    const role = await AsyncStorage.getItem("userRole");

    if (role === "host") {
      router.replace("/(host)/host-details" as any);
    } else {
      router.replace("/(client)/(tabs)" as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.brandTitle}>ChargeUp</Text>

        <View style={styles.brandCenter}>
          <Ionicons name="flash" size={80} color="white" />
          <Text style={styles.brandTagline}>Find, book and pay</Text>
        </View>

        <View style={styles.inputContainer}>
          {/* 3. Wired up the Email Input */}
          <TextInput
            placeholder="Email address"
            placeholderTextColor="#999"
            style={styles.underlineInput}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <View style={styles.passwordRow}>
            {/* 4. Wired up the Password Input */}
            <TextInput
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              style={[styles.underlineInput, { flex: 1 }]}
              value={password}
              onChangeText={setPassword}
            />
            {/* 5. Made the eye icon clickable */}
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="white"
              />
            </Pressable>
          </View>
        </View>

        {/* 6. Wired up the Login Button */}
        <Pressable style={styles.pillButton} onPress={handleLogin}>
          <Text style={styles.pillButtonText}>Login</Text>
        </Pressable>

        <Text style={styles.orText}>or</Text>

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.loginWithText}>Login with</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialRow}>
          <FontAwesome name="apple" size={40} color="white" />
          <FontAwesome name="google" size={40} color="#DB4437" />
        </View>

        <View style={styles.signupRow}>
          <Text style={styles.noAccountText}>Don't have an Account? </Text>
          <Pressable onPress={() => router.push("/(auth)/register")}>
            <Text style={styles.signupLink}>Signup</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Your styles remained 100% untouched!
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B1D21" },
  inner: { paddingHorizontal: 30, flex: 1, alignItems: "center" },
  brandTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: 20,
  },
  brandCenter: { alignItems: "center", marginVertical: 40 },
  brandTagline: { color: "white", fontSize: 16, marginTop: 10 },
  inputContainer: { width: "100%", marginBottom: 30 },
  underlineInput: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    color: "white",
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  passwordRow: { flexDirection: "row", alignItems: "center" },
  pillButton: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 60,
  },
  pillButtonText: { color: "white", fontSize: 18 },
  orText: { color: "white", marginVertical: 10 },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 15,
  },
  line: { flex: 1, height: 1, backgroundColor: "white", opacity: 0.3 },
  loginWithText: { color: "white", marginHorizontal: 10 },
  socialRow: { flexDirection: "row", gap: 50, marginVertical: 20 },
  signupRow: { flexDirection: "row", marginTop: 20 },
  noAccountText: { color: "white" },
  signupLink: { color: "#83B4BB", fontWeight: "bold" },
});