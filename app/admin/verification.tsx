import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { collection, onSnapshot, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import FancyBackground from '../voter/FancyBackground';

interface Voter {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  timestamp: { seconds: number; nanoseconds: number };
}

export default function Verification() {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [loading, setLoading] = useState(true);

  // For a slight fade-in effect on each card
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const q = query(collection(db, 'voters'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        if (snapshot.size === 0) {
          // If Firestore returns no documents, use dummy data for demonstration.
          setVoters([
            {
              id: '1',
              name: 'Bhuwin',
              email: 'bhuwin@gmail.com',
              verified: false,
              timestamp: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
            },
            {
              id: '2',
              name: 'DSP',
              email: 'dsp@gmail.com',
              verified: false,
              timestamp: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
            },
            {
              id: '3',
              name: 'Nikhil',
              email: 'nikhil@gmail.com',
              verified: true,
              timestamp: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
            },
          ]);
        } else {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Voter[];
          setVoters(data);
        }
        setLoading(false);
      },
      error => {
        Alert.alert('Error', error.message);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Start a fade-in animation once data loads
  useEffect(() => {
    if (!loading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [loading, fadeAnim]);

  const handleApprove = async (id: string) => {
    try {
      await updateDoc(doc(db, 'voters', id), { verified: true });
      Alert.alert('Success', 'Voter approved successfully.');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const verifiedCount = voters.filter(v => v.verified).length;
  const pendingCount = voters.length - verifiedCount;
  const total = voters.length;

  // For an optional progress bar: ratio of verified to total
  const verifiedRatio = total ? (verifiedCount / total) * 100 : 0;

  // Render each voter in a "card"
  const renderItem = ({ item }: { item: Voter }) => (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <View style={styles.cardHeader}>
        <Ionicons name="person-circle-outline" size={32} color="#7dd3fc" />
        <View style={styles.cardHeaderText}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.status}>
          Status: {item.verified ? 'Verified' : 'Pending'}
        </Text>
        {!item.verified && (
          <TouchableOpacity
            style={styles.approveButton}
            onPress={() => handleApprove(item.id)}
          >
            <Text style={styles.approveButtonText}>Approve</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.root}>
      {/* Fancy geometric shapes behind everything */}
      <FancyBackground />

      {/* Optional gradient overlay for extra style */}
      <LinearGradient
        colors={['rgba(79,70,229,0.2)', 'rgba(59,130,246,0.2)']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Main container */}
      <View style={styles.container}>
        {/* Gradient Header */}
        <LinearGradient
          colors={['#4f46e5', '#3b82f6']}
          style={styles.headerGradient}
        >
          <Text style={styles.headerTitle}>Voter Verification</Text>
          <Text style={styles.headerSubtitle}>Review and approve pending voters</Text>
        </LinearGradient>

        {/* Summary Card: verified vs. pending */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Verification Overview</Text>
          <View style={styles.summaryRow}>
            <Ionicons name="people-outline" size={20} color="#7dd3fc" style={{ marginRight: 6 }} />
            <Text style={styles.summaryText}>Total: {total}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Ionicons name="checkmark-done-circle-outline" size={20} color="#34D399" style={{ marginRight: 6 }} />
            <Text style={styles.summaryText}>Verified: {verifiedCount}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Ionicons name="time-outline" size={20} color="#FBBF24" style={{ marginRight: 6 }} />
            <Text style={styles.summaryText}>Pending: {pendingCount}</Text>
          </View>

          {/* Verified progress bar */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${verifiedRatio}%` }]} />
          </View>
          <Text style={styles.progressLabel}>
            {verifiedRatio.toFixed(1)}% Verified
          </Text>
        </View>

        {/* Voter List */}
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : voters.length === 0 ? (
          <Text style={styles.emptyText}>No pending voter verifications.</Text>
        ) : (
          <FlatList
            data={voters}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0f172a', // fallback color
  },
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingVertical: 40,
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
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e7ff',
    textAlign: 'center',
    marginTop: 4,
  },
  summaryCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
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
    marginBottom: 4,
  },
  summaryText: {
    color: '#cbd5e1',
    fontSize: 14,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#2d3748',
    borderRadius: 4,
    marginVertical: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#7dd3fc',
    borderRadius: 4,
  },
  progressLabel: {
    color: '#cbd5e1',
    fontSize: 14,
    textAlign: 'center',
  },
  loadingText: {
    color: '#cbd5e1',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  emptyText: {
    color: '#cbd5e1',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderText: {
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    color: '#f1f5f9',
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#cbd5e1',
  },
  cardFooter: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    fontSize: 16,
    color: '#cbd5e1',
  },
  approveButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  approveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
