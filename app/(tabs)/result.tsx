import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Dimensions,
} from 'react-native';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import FancyBackground from '../voter/FancyBackground'; // Or wherever your shapes file is
import { LinearGradient } from 'expo-linear-gradient';

interface Candidate {
  id: string;
  candidate: string;
  votes: number;
  timestamp: { seconds: number; nanoseconds: number };
}

export default function Results() {
  const [results, setResults] = useState<Candidate[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'votes'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Candidate[];
        setResults(data);
      },
      error => Alert.alert('Error', error.message)
    );
    return () => unsubscribe();
  }, []);

  // Calculate total votes and find the leading candidate
  const totalVotes = results.reduce((sum, c) => sum + c.votes, 0);
  const leadingCandidate =
    results.length > 0
      ? results.reduce((prev, curr) => (curr.votes > prev.votes ? curr : prev))
      : null;

  // Render each candidate with a progress bar
  const renderItem = ({ item }: { item: Candidate }) => {
    const percentageNum = totalVotes ? (item.votes / totalVotes) * 100 : 0;
    const percentageStr = percentageNum.toFixed(1);
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          "{item.candidate}": {item.votes} votes ({percentageStr}%)
        </Text>
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${percentageNum}%` }]} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {/* Fancy shapes in the background */}
      <FancyBackground />

      {/* Optional gradient overlay for extra style */}
      <LinearGradient
        colors={['rgba(255,153,51,0.2)', 'rgba(255,255,255,0.1)', 'rgba(19,136,8,0.2)']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Overlay container for the main content */}
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.header}>Live Voting Results</Text>

          {/* Summary card showing total votes + leading candidate */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryText}>
              Total Votes: {totalVotes}
            </Text>
            {leadingCandidate ? (
              <Text style={styles.summaryText}>
                Leading: "{leadingCandidate.candidate}" ({leadingCandidate.votes} votes)
              </Text>
            ) : (
              <Text style={styles.summaryText}>No votes yet.</Text>
            )}
          </View>

          {/* Note regarding operational analytics */}
          <Text style={styles.note}>
            Note: During the polling phase, these results reflect operational analytics only.
            Final candidate results will be displayed once the official count is released.
          </Text>

          {/* Candidate list */}
          <FlatList
            data={results}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingVertical: 10 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0f172a', // fallback color
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    width: '90%',
    maxWidth: 500,
    backgroundColor: 'rgba(15,23,42,0.8)', // semi-translucent card
    borderRadius: 12,
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#7dd3fc',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  summaryText: {
    color: '#cbd5e1',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 4,
  },
  note: {
    fontSize: 14,
    color: '#f1f5f9',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    color: '#f1f5f9',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#2d3748',
    borderRadius: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#7dd3fc',
    borderRadius: 4,
  },
});
