// app/voter/FancyBackground.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Shape {
  key: string;
  style: any; // using any to allow string-based percentage values
}

export default function FancyBackground() {
  const shapes: Shape[] = [
    // Big circles on corners
    {
      key: 'circle1',
      style: {
        position: 'absolute',
        top: '-20%',
        left: '-20%',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: '#4f46e5',
        opacity: 0.3,
      },
    },
    {
      key: 'circle2',
      style: {
        position: 'absolute',
        top: '-10%',
        right: '-15%',
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: '#3b82f6',
        opacity: 0.25,
      },
    },
    {
      key: 'circle3',
      style: {
        position: 'absolute',
        bottom: '-20%',
        left: '-15%',
        width: 320,
        height: 320,
        borderRadius: 160,
        backgroundColor: '#1e293b',
        opacity: 0.2,
      },
    },
    {
      key: 'circle4',
      style: {
        position: 'absolute',
        bottom: '-15%',
        right: '-20%',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: '#111827',
        opacity: 0.2,
      },
    },
    // Medium circles within the screen
    {
      key: 'circle5',
      style: {
        position: 'absolute',
        top: '30%',
        left: '10%',
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: '#4f46e5',
        opacity: 0.15,
      },
    },
    {
      key: 'circle6',
      style: {
        position: 'absolute',
        top: '60%',
        right: '5%',
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: '#3b82f6',
        opacity: 0.15,
      },
    },
    // Bars
    {
      key: 'bar1',
      style: {
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: 250,
        height: 40,
        backgroundColor: '#4f46e5',
        opacity: 0.1,
        transform: [{ rotate: '15deg' }],
        borderRadius: 10,
      },
    },
    {
      key: 'bar2',
      style: {
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: 230,
        height: 40,
        backgroundColor: '#3b82f6',
        opacity: 0.1,
        transform: [{ rotate: '-20deg' }],
        borderRadius: 10,
      },
    },
    // Squares
    {
      key: 'square1',
      style: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 100,
        height: 100,
        backgroundColor: '#1e293b',
        opacity: 0.15,
      },
    },
    {
      key: 'square2',
      style: {
        position: 'absolute',
        bottom: '20%',
        left: '40%',
        width: 120,
        height: 120,
        backgroundColor: '#111827',
        opacity: 0.15,
      },
    },
    // Additional small circles/bars if desired…
    {
      key: 'circle7',
      style: {
        position: 'absolute',
        top: '80%',
        left: '20%',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#4f46e5',
        opacity: 0.2,
      },
    },
    {
      key: 'bar3',
      style: {
        position: 'absolute',
        top: '70%',
        right: '30%',
        width: 150,
        height: 30,
        backgroundColor: '#3b82f6',
        opacity: 0.2,
        transform: [{ rotate: '25deg' }],
        borderRadius: 8,
      },
    },
  ];

  return (
    <View style={StyleSheet.absoluteFill}>
      {shapes.map((shape) => (
        <View key={shape.key} style={shape.style} />
      ))}
    </View>
  );
}
