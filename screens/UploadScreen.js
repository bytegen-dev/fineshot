import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ThemeContext } from '../components/ThemeProvider';
import { useRouter, useLocalSearchParams } from 'expo-router';

// UploadScreen: Pick and crop an image
export default function UploadScreen() {
  const theme = useContext(ThemeContext);
  const router = useRouter();
  const { frame } = useLocalSearchParams();
  const [image, setImage] = useState(null);

  // Pick image from device with cropping
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Enable cropping
      aspect: [9, 16], // Default aspect ratio
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <Text style={[styles.title, { color: theme.text }]}>Upload & Crop Image</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.button }]}
        onPress={pickImage}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>Pick Image</Text>
      </TouchableOpacity>
      {/* Show cropped image preview */}
      {image && (
        <Image source={{ uri: image }} style={styles.imagePreview} resizeMode="contain" />
      )}
      {/* Continue to background selection if image is picked */}
      {image && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.button, marginTop: 24 }]}
          onPress={() => router.push({ pathname: '/background-selection', params: { frame, image } })}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>Next</Text>
        </TouchableOpacity>
      )}
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
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'System',
  },
  imagePreview: {
    width: 220,
    height: 400,
    borderRadius: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#ccc',
  },
}); 