import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarShowLabel: false, 
      tabBarStyle: { 
        backgroundColor: '#0B1315', 
        borderTopColor: '#163B46',
        height: 65,
      },
      tabBarActiveTintColor: '#00D1FF',
      tabBarInactiveTintColor: '#BDC3C7'
    }}>
      
      <Tabs.Screen 
        name="index" 
        options={{ 
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={26} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="map" 
        options={{ 
          tabBarIcon: ({ color }) => <Ionicons name="location-outline" size={26} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="explore" 
        options={{ 
          tabBarIcon: ({ color }) => <Ionicons name="list-outline" size={26} color={color} /> 
        }} 
      />

      {/* HIDDEN SCREENS */}
      <Tabs.Screen name="scan-qr" options={{ href: null }} />
      <Tabs.Screen name="charging-session" options={{ href: null }} />
      <Tabs.Screen name="charger-info" options={{ href: null }} />
      <Tabs.Screen name="station-details" options={{ href: null }} />
      <Tabs.Screen name="bookig-confirmation" options={{ href: null }} />

    </Tabs>
  );
}