import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../components/ThemeProvider';
import { useRouter, useLocalSearchParams } from 'expo-router';

// BackgroundSelectionScreen: Choose background color or image
export default function BackgroundSelectionScreen() {
  const theme = useContext(ThemeContext);
  const router = useRouter();
  const { frame, image } = useLocalSearchParams();
  const [background, setBackground] = useState('#FFFFFF'); // Default solid color

  // Placeholder solid colors
  const colors = ['#FFFFFF', '#F5F5F7', '#E0E0E0', '#18181A', '#232326'];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <Text style={[styles.title, { color: theme.text }]}>Select Background</Text>
      {/* Solid color options */}
      <View style={styles.colorRow}>
        {colors.map(color => (
          <TouchableOpacity
            key={color}
            style={[styles.colorCircle, { backgroundColor: color, borderWidth: background === color ? 3 : 1 }]}
            onPress={() => setBackground(color)}
          />
        ))}
      </View>
      {/* Continue to preview with selected background */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.button, marginTop: 32 }]}
        onPress={() => router.push({ pathname: '/preview', params: { frame, image, background } })}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>Preview</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 32,
    fontFamily: 'System',
  },
  colorRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
    borderColor: '#888',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'System',
  },
}); 