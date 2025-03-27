import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, 
      }}
    >
      
      <Stack.Screen name="LoginSelection" />
      <Stack.Screen name="admin-login" />
      <Stack.Screen name="voter-login" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="admin/dashboard" />
      <Stack.Screen name="admin/profile" />
      <Stack.Screen name="voter/home" />
      <Stack.Screen name="voter/profile" />
    </Stack>
  );
}
