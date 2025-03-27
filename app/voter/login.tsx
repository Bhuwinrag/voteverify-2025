import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseConfig } from '../firebaseConfig';
import { useRouter } from 'expo-router';
import FancyBackground from './FancyBackground'; // Reusable shapes background
import { LinearGradient } from 'expo-linear-gradient';

// Initialize Firebase only once
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const auth = getAuth();

export default function VoterLogin() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (isRegister) {
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match.');
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'Voter registered successfully.');
        // Redirect to Voter Home Panel after registration
        router.replace('/(tabs)/home');
      } catch (error: any) {
        Alert.alert('Registration Error', error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'Voter logged in successfully.');
        // Redirect to Voter Home Panel after login
        router.replace('/(tabs)/home');
      } catch (error: any) {
        Alert.alert('Login Error', error.message);
      }
    }
  };

  return (
    <View style={styles.root}>
      {/* Fancy geometric shapes in the background */}
      <FancyBackground />

      {/* Optional gradient overlay for extra style */}
      <LinearGradient
        colors={['rgba(255,153,51,0.3)', 'rgba(255,255,255,0.1)', 'rgba(19,136,8,0.3)']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Overlay container for the login UI */}
      <View style={styles.overlay}>
        <View style={styles.loginCard}>
          <Text style={styles.title}>
            {isRegister ? 'Voter Registration' : 'Voter Login'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {isRegister && (
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#ccc"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {isRegister ? 'Register' : 'Login'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
            <Text style={styles.toggleText}>
              {isRegister
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/** Styles updated to separate background (root) from the login card. */
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0f172a', // Fallback color if shapes or gradient fail
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginCard: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'rgba(15,23,42,0.8)', // Dark translucent background for the card
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#7dd3fc',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#1e293b',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#fff',
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#7dd3fc',
    textAlign: 'center',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});
