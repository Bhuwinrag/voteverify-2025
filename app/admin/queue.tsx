import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import FancyBackground from '../voter/FancyBackground';

interface Voter {
  id: string;
  name: string;
  tokenNumber: number;
}

export default function AdminQueue() {
  // Dummy queue data for demonstration
  const [queue, setQueue] = useState<Voter[]>([
    { id: '1', name: 'Bhuwin', tokenNumber: 101 },
    { id: '2', name: 'DSP', tokenNumber: 102 },
    { id: '3', name: 'Nikhil', tokenNumber: 103 },
  ]);

  // "Call Next" logic: remove the first item from the queue
  const handleCallNext = () => {
    if (queue.length === 0) {
      Alert.alert('No Voters', 'No voters in queue right now.');
      return;
    }
    const [first, ...rest] = queue;
    setQueue(rest);
    Alert.alert('Called Token', `Called token #${first.tokenNumber} - ${first.name}`);
  };

  // For an optional fade-in effect on each item:
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const onRenderItem = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Render each voter in a "card"
  const renderItem = ({ item }: { item: Voter }) => (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ scale: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1],
          }) }],
        },
      ]}
    >
      <Ionicons name="ticket-outline" size={24} color="#7dd3fc" style={{ marginRight: 10 }} />
      <View>
        <Text style={styles.cardText}>Token #{item.tokenNumber}</Text>
        <Text style={styles.cardSubText}>{item.name}</Text>
      </View>
    </Animated.View>
  );

  // Queue summary
  const totalQueue = queue.length;
  const nextToken = totalQueue > 0 ? `#${queue[0].tokenNumber}` : 'None';

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
          <Text style={styles.headerTitle}>Queue Management</Text>
          <Text style={styles.headerSubtitle}>Handle real-time queue of voters</Text>
        </LinearGradient>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Queue Summary</Text>
          <View style={styles.summaryRow}>
            <Ionicons name="people-outline" size={22} color="#7dd3fc" style={{ marginRight: 8 }} />
            <Text style={styles.summaryText}>Total in Queue: {totalQueue}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Ionicons name="arrow-forward-circle-outline" size={22} color="#7dd3fc" style={{ marginRight: 8 }} />
            <Text style={styles.summaryText}>Next Token: {nextToken}</Text>
          </View>
        </View>

        {/* Queue List */}
        <View style={styles.listContainer}>
          {queue.length === 0 ? (
            <Text style={styles.emptyText}>No voters in queue right now.</Text>
          ) : (
            <FlatList
              data={queue}
              keyExtractor={(item) => item.id}
              renderItem={(info) => {
                // Trigger fade-in on each item
                onRenderItem();
                return renderItem(info);
              }}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}
        </View>

        {/* Call Next Button */}
        <TouchableOpacity style={styles.callButton} onPress={handleCallNext}>
          <Ionicons name="arrow-forward-circle-outline" size={24} color="#fff" />
          <Text style={styles.callButtonText}>Call Next Token</Text>
        </TouchableOpacity>
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
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
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
  summaryCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 16,
    marginTop: -20, // pull up over the gradient
    borderRadius: 12,
    padding: 16,
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
  listContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    color: '#7dd3fc',
    fontWeight: 'bold',
  },
  cardSubText: {
    fontSize: 14,
    color: '#cbd5e1',
  },
  callButton: {
    flexDirection: 'row',
    backgroundColor: '#4f46e5',
    padding: 15,
    borderRadius: 10,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
