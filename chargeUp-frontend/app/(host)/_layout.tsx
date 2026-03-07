import { Stack } from 'expo-router';

export default function HostLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="host-details" />
      <Stack.Screen name="charger-details" />
      <Stack.Screen name="charger-manager" />
      <Stack.Screen name="charger-status" />
      <Stack.Screen name="account-details" />
    </Stack>
  );
}
