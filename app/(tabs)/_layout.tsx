import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from './home';
import Verify from './verify';
import Queue from './queue';
import Results from './result';
import Profile from './profile';

const Tab = createBottomTabNavigator();

export default function VoterLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: '#4f46e5',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: { backgroundColor: '#f1f5f9', height: 60 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home-outline';
          // MATCH the exact route names: 'Home', 'Verify', etc.
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Verify') iconName = 'camera-outline';
          else if (route.name === 'Queue') iconName = 'list-outline';
          else if (route.name === 'Results') iconName = 'bar-chart-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Verify" component={Verify} options={{ headerShown: false }} />
      <Tab.Screen name="Queue" component={Queue} options={{ headerShown: false }} />
      <Tab.Screen name="Results" component={Results} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
