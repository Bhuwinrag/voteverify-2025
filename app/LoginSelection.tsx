import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import FancyBackground from './voter/FancyBackground'; // Ensure this file exists and exports your shapes

export default function LoginSelection() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      {/* Fill the background with dynamic shapes */}
      <FancyBackground />

      {/* Gradient overlay with Indian flag colors (saffron, white, green) */}
      <LinearGradient
        colors={['rgba(255,153,51,0.7)', 'rgba(255,255,255,0.5)', 'rgba(19,136,8,0.7)']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Centered overlay container for the login card */}
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.appName}>VoteVerify 2025</Text>
          <Text style={styles.subtitle}>Empowering every citizen. Your voice, your vote!</Text>
          <TouchableOpacity
            style={[styles.button, styles.adminButton]}
            onPress={() => router.push('/admin-login')}
          >
            <Text style={styles.buttonText}>Admin Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.voterButton]}
            onPress={() => router.push('/voter/login')}
          >
            <Text style={styles.buttonText}>Voter Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/**
 * In Expo Router, export an 'options' object to style or hide the header.
 * Setting 'headerShown: false' removes the "LoginSelection" title at the top.
 */
export const options = {
  headerShown: true,
  title: "VoteVerify 2025",
  headerStyle: { backgroundColor: "#4f46e5" },
  headerTitleStyle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'rgba(0,0,0,0.65)', // Dark translucent card for high contrast
    borderRadius: 12,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  appName: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: 'center',
  },
  // Now the admin button is the same color as the voter button
  adminButton: {
    backgroundColor: '#4f46e5',
  },
  voterButton: {
    backgroundColor: '#4f46e5',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
