import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FancyBackground from '../voter/FancyBackground'; // Ensure correct path
import { Ionicons } from '@expo/vector-icons';

export default function QueueScreen() {
  const [voterToken, setVoterToken] = useState<number | null>(null);
  const [currentToken, setCurrentToken] = useState<number>(1);
  const [isJoining, setIsJoining] = useState(false);

  // Animation for the summary card or token display
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Function to simulate joining the queue and being assigned a token
  const joinQueue = () => {
    setIsJoining(true);
    // Simulate a delay for token assignment
    setTimeout(() => {
      // For simulation, assign a token number between currentToken+1 and currentToken+10
      const assignedToken = currentToken + Math.floor(Math.random() * 10) + 1;
      setVoterToken(assignedToken);
      setIsJoining(false);

      // Start fade-in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1000);
  };

  // Simulate the polling process: the current token increments every 10 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentToken((prev) => prev + 1);
    }, 10000); // every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Calculate estimated wait time: assume each token takes 2 minutes.
  const estimatedWait = voterToken ? Math.max(0, voterToken - currentToken) * 2 : 0;

  // People ahead
  const peopleAhead = voterToken ? Math.max(0, voterToken - currentToken) : 0;

  // Optional progress bar ratio: from currentToken to voterToken
  // If your token is 105 and now serving is 100, that's 5 steps total. 
  // We can do ratio = (currentToken + stepsSoFar) / voterToken, but let's keep it simple:
  const totalSteps = voterToken ? voterToken - currentToken : 0;
  const progressRatio = voterToken && totalSteps > 0 ? 1 - (peopleAhead / totalSteps) : 1;

  return (
    <View style={styles.root}>
      {/* Fancy shapes behind everything */}
      <FancyBackground />

      {/* Container for the entire screen */}
      <View style={styles.container}>
        {/* Gradient Header */}
        <LinearGradient
          colors={['#4f46e5', '#3b82f6']}
          style={styles.headerGradient}
        >
          <Text style={styles.headerTitle}>Voter Queue</Text>
          <Text style={styles.headerSubtitle}>Manage your waiting time effectively</Text>
        </LinearGradient>

        <View style={styles.content}>
          <Text style={styles.title}>Your Queue Status</Text>

          {voterToken === null ? (
            isJoining ? (
              <ActivityIndicator size="large" color="#7dd3fc" style={{ marginTop: 20 }} />
            ) : (
              <TouchableOpacity style={styles.joinButton} onPress={joinQueue}>
                <Text style={styles.buttonText}>Join Queue</Text>
              </TouchableOpacity>
            )
          ) : (
            <Animated.View
              style={[
                styles.statusContainer,
                { opacity: fadeAnim, transform: [{ scale: fadeAnim }] },
              ]}
            >
              <Ionicons name="people-outline" size={32} color="#7dd3fc" style={{ marginBottom: 10 }} />
              <Text style={styles.statusText}>Now Serving: {currentToken}</Text>
              <Text style={styles.statusText}>Your Token: {voterToken}</Text>
              <Text style={styles.statusText}>People Ahead: {peopleAhead}</Text>
              <Text style={styles.statusText}>Estimated Wait: {estimatedWait} mins</Text>

              {/* Optional progress bar */}
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${progressRatio * 100}%` }]} />
              </View>
              <Text style={styles.progressLabel}>
                {Math.round(progressRatio * 100)}% to Your Turn
              </Text>

              <LinearGradient
                colors={['#3b82f6', '#06b6d4']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.tokenBadge}
              >
                <Text style={styles.tokenBadgeText}>Token #{voterToken}</Text>
              </LinearGradient>
            </Animated.View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0f172a', // Base background color
  },
  container: {
    flex: 1,
  },
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
    marginBottom: 6,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e7ff',
    textAlign: 'center',
  },
  content: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'rgba(255,255,255,0.05)', // Semi-transparent card background
    borderRadius: 12,
    padding: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#7dd3fc',
    textAlign: 'center',
    marginBottom: 20,
  },
  joinButton: {
    backgroundColor: '#4f46e5',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statusContainer: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: 18,
    color: '#cbd5e1',
    marginBottom: 6,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#1e293b',
    borderRadius: 4,
    marginVertical: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#7dd3fc',
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 16,
  },
  tokenBadge: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  tokenBadgeText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
