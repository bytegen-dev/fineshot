import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../components/ThemeProvider';
import { useRouter } from 'expo-router';

// FrameSelectionScreen: Select a device frame
export default function FrameSelectionScreen() {
  const theme = useContext(ThemeContext);
  const router = useRouter();

  // Placeholder device frames
  const frames = [
    { name: 'iPhone 16', key: 'iphone16' },
    { name: 'MacBook Pro', key: 'macbookpro' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <Text style={[styles.title, { color: theme.text }]}>Select Device Frame</Text>
      {/* List of device frames */}
      {frames.map(frame => (
        <TouchableOpacity
          key={frame.key}
          style={[styles.frameButton, { backgroundColor: theme.button }]}
          onPress={() => router.push({ pathname: '/upload', params: { frame: frame.key } })}
          activeOpacity={0.8}
        >
          <Text style={[styles.frameText, { color: theme.buttonText }]}>{frame.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// Minimal styles using system font and spacing
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 32,
    fontFamily: 'System', // Use system font
  },
  frameButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  frameText: {
    fontSize: 18,
    fontFamily: 'System',
  },
}); 