import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  Dimensions, 
  StyleSheet, 
  Animated 
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import FancyBackground from '../voter/FancyBackground'; 
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function Analytics() {
  const screenWidth = Dimensions.get('window').width;

  // Sample data; in production, fetch real-time data from Firestore or Gemini APIs
  const data = {
    labels: ["1 PM", "2 PM", "3 PM", "4 PM", "5 PM"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99],
        color: (opacity = 1) => `rgba(125, 211, 252, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  // Fade-in animation for the chart
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start fade-in after mount
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.root}>
      {/* Fancy geometric shapes in the background */}
      <FancyBackground />

      {/* Gradient Header */}
      <LinearGradient
        colors={['#4f46e5', '#3b82f6']}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>Voting Analytics</Text>
        <Text style={styles.headerSubtitle}>Trends & Insights</Text>
      </LinearGradient>

      {/* Main content container */}
      <View style={styles.content}>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Today’s Highlights</Text>
          <View style={styles.summaryRow}>
            <Ionicons 
              name="stats-chart-outline" 
              size={20} 
              color="#7dd3fc" 
              style={{ marginRight: 6 }} 
            />
            <Text style={styles.summaryText}>Peak Votes at 4 PM</Text>
          </View>
          <View style={styles.summaryRow}>
            <Ionicons 
              name="people-outline" 
              size={20} 
              color="#7dd3fc" 
              style={{ marginRight: 6 }} 
            />
            <Text style={styles.summaryText}>Total Voters: 750</Text>
          </View>
          <View style={styles.summaryRow}>
            <Ionicons 
              name="checkmark-done-circle-outline" 
              size={20} 
              color="#34D399" 
              style={{ marginRight: 6 }} 
            />
            <Text style={styles.summaryText}>Verified: 680</Text>
          </View>
        </View>

        {/* Fade-in for the chart */}
        <Animated.View style={[styles.chartContainer, { opacity: fadeAnim }]}>
          <LineChart
            data={data}
            width={screenWidth * 0.9}   // slightly narrower than full screen
            height={220}
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: "#1e293b",
              backgroundGradientFrom: "#1e293b",
              backgroundGradientTo: "#1e293b",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(125, 211, 252, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(203, 213, 224, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: "6", strokeWidth: "2", stroke: "#4f46e5" },
            }}
            style={{ borderRadius: 16 }}
          />
        </Animated.View>

        <Text style={styles.info}>
          This chart simulates voting trends. In production, real-time data from Firestore or Gemini APIs can provide deeper insights.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0f172a', 
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
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  summaryCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    width: '90%',
    maxWidth: 500,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    color: '#7dd3fc',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  summaryText: {
    color: '#cbd5e1',
    fontSize: 14,
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    marginTop: 10,
    width: '90%',
    maxWidth: 500,
  },
});
