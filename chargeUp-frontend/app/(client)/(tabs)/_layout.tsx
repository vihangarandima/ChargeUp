import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#00D1FF',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="map" 
        options={{ tabBarIcon: ({ color }) => <Ionicons name="location-outline" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="explore" 
        options={{ tabBarIcon: ({ color }) => <Ionicons name="reader-outline" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ tabBarIcon: ({ color }) => <Ionicons name="person-circle-outline" size={26} color={color} /> }} 
      />

      {/* Forcefully hiding all the extra group project files so they don't appear as arrows */}
      <Tabs.Screen name="station-details" options={{ href: null }} />
      <Tabs.Screen name="charger-info" options={{ href: null }} />
      <Tabs.Screen name="bookig-confirmation" options={{ href: null }} />
      <Tabs.Screen name="scan-qr" options={{ href: null }} />
      <Tabs.Screen name="charging-session" options={{ href: null }} />
      <Tabs.Screen name="payment" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1A2E33',
    borderTopWidth: 0,
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -5 },
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
