import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

export default function HostDetailsScreen() {
  const router = useRouter();

  // State for all the form inputs
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [telephone, setTelephone] = useState(""); // Changed to telephone to match backend
  const [chargerType, setChargerType] = useState("");

  const handleContinue = async () => {
    // 1. Basic validation to make sure they didn't leave anything blank
    if (!fullName || !address || !idNumber || !telephone || !chargerType) {
      Alert.alert("Missing Info", "Please fill out all the fields.");
      return;
    }

    try {
      // 2. Send the data to your backend
      const response = await fetch("http://10.139.222.178:5000/api/host-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          address,
          idNumber,
          telephone,
          chargerType,
        }),
      });

      const data = await response.json();

      // 3. If successful, go to the Charger Details screen!
      if (response.status === 201) {
        router.push("/(host)/charger-details" as any);
      } else {
        Alert.alert("Error", data.message || "Failed to save details.");
      }
    } catch (error) {
      console.error("Network error:", error);
      Alert.alert("Connection Error", "Could not connect to the server. Make sure it is running!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Brand Header */}
        <Text style={styles.headerTitle}>ChargeUp</Text>

        {/* Hero Icon & Title */}
        <View style={styles.heroSection}>
          <MaterialCommunityIcons name="ev-station" size={80} color="white" />
          <Text style={styles.heroTitle}>Share & Earn</Text>
        </View>

        <Text style={styles.subtitle}>Add your details here.</Text>

        {/* The Big Form Card */}
        <View style={styles.formCard}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />

          <Text style={styles.label}>ID/Passport number</Text>
          <TextInput
            style={styles.input}
            value={idNumber}
            onChangeText={setIdNumber}
          />

          <Text style={styles.label}>Telephone number</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={telephone}
            onChangeText={setTelephone}
          />

          <Text style={styles.label}>Charging unit type</Text>
          <View style={styles.dropdownFake}>
            <TextInput
              style={styles.dropdownInput}
              placeholder="Ex : Fast charger"
              placeholderTextColor="#889"
              value={chargerType}
              onChangeText={setChargerType}
            />
            <Ionicons name="chevron-down-circle" size={24} color="white" />
          </View>

          {/* Continue Button */}
          <Pressable style={styles.continueBtn} onPress={handleContinue}>
            <Text style={styles.continueBtnText}>continue</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E3F47", // Matching your dark bluish-grey theme
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 40,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  heroSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  heroTitle: {
    color: "white",
    fontSize: 18,
    marginTop: 10,
    fontWeight: "500",
  },
  subtitle: {
    color: "white",
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 10,
  },
  formCard: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: 20,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.05)", // Slight glass effect
  },
  label: {
    color: "white",
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: 10,
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  dropdownFake: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  dropdownInput: {
    flex: 1,
    color: "white",
    paddingVertical: 12,
    fontSize: 16,
  },
  continueBtn: {
    alignSelf: "flex-end",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  continueBtnText: {
    color: "white",
    fontSize: 16,
  },
});