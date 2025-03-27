import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import FancyBackground from '../voter/FancyBackground';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  // 3D flip effect for the welcome card
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Bounce animation for the "Get Started" button
  const bounceAnim = useRef(new Animated.Value(1)).current;

  // State for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Animate the card flip from -90deg to 0deg on mount
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [rotateAnim]);

  const handleGetStarted = () => {
    // Bounce animation instead of the "shake" effect
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After the bounce animation, open the modal
      setModalVisible(true);
    });
  };

  const handleProceed = () => {
    // Close the modal when "Proceed" is pressed
    setModalVisible(false);
  };

  // Interpolate rotateAnim for the 3D flip effect
  const rotateY = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '0deg'],
  });

  return (
    <View style={styles.root}>
      {/* Fancy geometric shapes in the background */}
      <FancyBackground />

      {/* Optional gradient header */}
      <LinearGradient
        colors={['#4f46e5', '#3b82f6']}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>Voter Dashboard</Text>
      </LinearGradient>

      {/* Overlay container for the main content */}
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.card,
            { transform: [{ perspective: 1000 }, { rotateY }] },
          ]}
        >
          <Text style={styles.title}>Welcome to Voting App</Text>
          <Text style={styles.subtitle}>Your voice. Your vote. Your future.</Text>
        </Animated.View>

        {/* The "Get Started" button now bounces */}
        <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Modal Pop-Up */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={handleProceed}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>App Features</Text>
              <Text style={styles.modalText}>
                • Secure Voter Verification using facial recognition and QR codes.{"\n\n"}
                • Real-Time Queue Management with token assignments.{"\n\n"}
                • Live Voting Results with dynamic updates.{"\n\n"}
                • User-friendly, intuitive interface for all voters.
              </Text>
              <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
                <Text style={styles.proceedButtonText}>Proceed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  // Gradient header
  headerGradient: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '90%',
    maxWidth: 500,
    minHeight: 250,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    marginBottom: 40,
    alignItems: 'center',
    padding: 30,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7dd3fc',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#cbd5e1',
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    paddingTop: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4f46e5',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  proceedButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
