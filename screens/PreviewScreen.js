import React, { useContext, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { ThemeContext } from '../components/ThemeProvider';
import { useLocalSearchParams } from 'expo-router';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { Picker } from '@react-native-picker/picker';

// Import local frame assets (replace with Firebase logic later)
const frameImages = {
  iphone16: require('../assets/frames/iphone16.png'),
  macbookpro: require('../assets/frames/macbookpro.png'),
};

// PreviewScreen: Compose and export the mockup
export default function PreviewScreen() {
  const theme = useContext(ThemeContext);
  const { frame, image, background } = useLocalSearchParams();
  const viewShotRef = useRef();
  const [saving, setSaving] = useState(false);
  const [resizeMode, setResizeMode] = useState('cover');

  // Export the composed mockup as PNG
  const exportMockup = async () => {
    try {
      setSaving(true);
      const uri = await viewShotRef.current.capture();
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please allow media library access.');
        setSaving(false);
        return;
      }
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('Saved!', 'Mockup exported to your gallery.');
    } catch (e) {
      Alert.alert('Error', 'Failed to save image.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer, { backgroundColor: theme.background }]}> 
      <Text style={[styles.title, { color: theme.text }]}>Preview & Export</Text>
      {/* Compose mockup: background, cropped image, frame */}
      <ViewShot
        ref={viewShotRef}
        options={{ format: 'png', quality: 1.0 }}
        style={styles.mockupContainer}
      >
        {/* Background layer */}
        <View style={[styles.backgroundLayer, { backgroundColor: background }]} />
        {/* Cropped image, masked to screen area */}
        <View style={styles.screenMask}>
          <Image source={{ uri: image }} style={styles.screenImage} resizeMode={resizeMode} />
        </View>
        {/* Device frame overlay */}
        <Image source={frameImages[frame]} style={styles.frameLayer} resizeMode="contain" />
      </ViewShot>
      {/* Dropdown for resize mode */}
      <View style={styles.pickerContainer}>
        <Text style={[styles.pickerLabel, { color: theme.text }]}>Image Resize Mode:</Text>
        <Picker
          selectedValue={resizeMode}
          onValueChange={setResizeMode}
          style={styles.picker}
          dropdownIconColor={theme.text}
        >
          <Picker.Item label="Cover (Crop)" value="cover" />
          <Picker.Item label="Contain (Fit)" value="contain" />
        </Picker>
      </View>
      {/* Export button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.button, marginTop: 16 }]}
        onPress={exportMockup}
        activeOpacity={0.8}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color={theme.buttonText} />
        ) : (
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>Export as PNG</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const MOCKUP_WIDTH = 300;
const MOCKUP_HEIGHT = 600;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 32,
    fontFamily: 'System',
  },
  mockupContainer: {
    width: MOCKUP_WIDTH,
    height: MOCKUP_HEIGHT,
    borderRadius: 24,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  screenMask: {
    position: 'absolute',
    left: 20,
    top: 19,
    width: 260,
    height: 562,
    borderRadius: 24,
    overflow: 'hidden',
    zIndex: 2,
    backgroundColor: '#000',
  },
  screenImage: {
    width: '100%',
    height: '100%',
  },
  frameLayer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: MOCKUP_WIDTH,
    height: MOCKUP_HEIGHT,
    zIndex: 3,
  },
  pickerContainer: {
    width: 220,
    marginTop: 24,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  pickerLabel: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'System',
  },
  picker: {
    color: '#000',
    backgroundColor: '#E5E5EA',
    borderRadius: 8,
    fontFamily: 'System',
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