import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import FancyBackground from '../voter/FancyBackground';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const steps = [
  {
    text: "Step 1: Your details are being verified...",
    icon: "shield-checkmark-outline",
  },
  {
    text: "Step 2: Facial recognition processing with Vertex AI...",
    icon: "camera-outline",
  },
  {
    text: "Step 3: Verification complete. Welcome!",
    icon: "checkmark-done-circle-outline",
  },
];

export default function AdvancedVerify() {
  const [currentStep, setCurrentStep] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      // Cycle to next step
      setCurrentStep((prev) => (prev + 1) % steps.length);
      animatedValue.setValue(0);
    });
  };

  const rotateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  // Simple progress ratio: currentStep out of steps.length
  const progressRatio = (currentStep + 1) / steps.length;

  return (
    <View style={styles.root}>
      {/* Fancy geometric shapes in the background */}
      <FancyBackground />

      {/* Gradient Header */}
      <LinearGradient
        colors={["#4f46e5", "#3b82f6"]}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>Voter Verification</Text>
        <Text style={styles.headerSubtitle}>Facial & Identity Checks</Text>
      </LinearGradient>

      {/* Overlay container for the main content */}
      <View style={styles.overlay}>
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progressRatio * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressLabel}>
            Step {currentStep + 1} of {steps.length}
          </Text>
        </View>

        {/* 3D Flip Card */}
        <Animated.View
          style={[
            styles.card,
            { transform: [{ perspective: 1000 }, { rotateY }] },
          ]}
        >
          {/* Step Icon */}
          <Ionicons
            name={steps[currentStep].icon as any}
            size={40}
            color="#7dd3fc"
            style={{ marginBottom: 12 }}
          />
          <Text style={styles.cardText}>{steps[currentStep].text}</Text>
        </Animated.View>

        {/* Next Step Button */}
        <TouchableOpacity style={styles.button} onPress={flipCard}>
          <Text style={styles.buttonText}>
            {currentStep === steps.length - 1 ? "Restart" : "Next Step"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0f172a", // fallback color
  },
  headerGradient: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#e0e7ff",
    textAlign: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  progressContainer: {
    width: "90%",
    maxWidth: 400,
    marginBottom: 30,
    alignItems: "center",
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "#1e293b",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#7dd3fc",
  },
  progressLabel: {
    marginTop: 8,
    color: "#cbd5e1",
    fontSize: 14,
    textAlign: "center",
  },
  card: {
    width: "90%",
    maxWidth: 400,
    minHeight: 220,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backfaceVisibility: "hidden",
    padding: 20,
    marginBottom: 30,
  },
  cardText: {
    fontSize: 20,
    color: "#7dd3fc",
    textAlign: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
