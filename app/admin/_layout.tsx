// app/admin/_layout.tsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router/tabs';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'expo-router';
import FancyBackground from '../voter/FancyBackground'; // or wherever your shapes file is

export default function AdminLayout() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (!user || !user.email || !user.email.endsWith('@admin.com')) {
        Alert.alert('Access Denied', 'You are not authorized to access the admin dashboard.');
        router.replace('/admin-login');
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7dd3fc" />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {/* Fancy background behind everything */}
      <FancyBackground />

      {/* Overlay for all tab content */}
      <View style={styles.overlay}>
        <Tabs
          screenOptions={{
            // Hide top header or set to false if you prefer to show
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: '#4f46e5',
            tabBarInactiveTintColor: '#94a3b8',
            tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
          }}
        >
          {/* The order of these <Tabs.Screen> controls the order of the tabs at the bottom */}
          <Tabs.Screen
            name="dashboard"
            options={{
              title: 'Dashboard',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="grid-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="queue"
            options={{
              title: 'Queue',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="list-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="results"
            options={{
              title: 'Results',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="bar-chart-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="verification"
            options={{
              title: 'Verification',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="checkmark-done-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="analytics"
            options={{
              title: 'Analytics',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="stats-chart-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-circle-outline" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  tabBar: {
    backgroundColor: 'rgba(241,245,249,0.9)', // light background for contrast
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: 60,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
