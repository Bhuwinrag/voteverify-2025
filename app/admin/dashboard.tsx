// app/admin/dashboard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FancyBackground from '../voter/FancyBackground';

export default function AdminDashboard() {
  return (
    <View style={styles.root}>
      {/* Fancy background behind everything */}
      <FancyBackground />

      {/* Overlay for the dashboard content */}
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Admin Dashboard</Text>
          <Text style={styles.subtitle}>Manage Elections Efficiently</Text>

          {/* Example Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Total Voters</Text>
              <Text style={styles.statValue}>1,234</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Verified</Text>
              <Text style={styles.statValue}>900</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Queue</Text>
              <Text style={styles.statValue}>45</Text>
            </View>
          </View>

          {/* New Middle Section to fill space */}
          <View style={styles.middleSection}>
            <Text style={styles.middleHeader}>Election Tasks</Text>

            <View style={styles.taskItem}>
              <Ionicons
                name="checkmark-circle-outline"
                size={22}
                color="#34D399"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.taskText}>Verify new voter registrations</Text>
            </View>
            <View style={styles.taskItem}>
              <Ionicons
                name="alert-circle-outline"
                size={22}
                color="#F59E0B"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.taskText}>Check queue length & manage tokens</Text>
            </View>
            <View style={styles.taskItem}>
              <Ionicons
                name="calendar-outline"
                size={22}
                color="#60A5FA"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.taskText}>Review upcoming election schedules</Text>
            </View>
          </View>

          {/* Footer info */}
          <View style={styles.footerInfo}>
            <Text style={styles.footerText}>
              Stay on top of real-time stats and manage the election seamlessly!
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0f172a', // fallback color if shapes don't load
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#7dd3fc',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    width: '28%',
  },
  statLabel: {
    color: '#cbd5e1',
    fontSize: 14,
    marginBottom: 6,
    textAlign: 'center',
  },
  statValue: {
    color: '#7dd3fc',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // New middle section
  middleSection: {
    width: '100%',
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  middleHeader: {
    color: '#7dd3fc',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskText: {
    color: '#cbd5e1',
    fontSize: 14,
    flexShrink: 1, // allows text to wrap if needed
  },

  footerInfo: {
    marginTop: 'auto',
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    color: '#cbd5e1',
    fontSize: 14,
    textAlign: 'center',
  },
});
