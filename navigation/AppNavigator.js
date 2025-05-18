import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FrameSelectionScreen from '../screens/FrameSelectionScreen';
import UploadScreen from '../screens/UploadScreen';
import BackgroundSelectionScreen from '../screens/BackgroundSelectionScreen';
import PreviewScreen from '../screens/PreviewScreen';

const Stack = createStackNavigator();

// Main app navigator with all screens
export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="FrameSelection"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="FrameSelection" component={FrameSelectionScreen} />
      <Stack.Screen name="Upload" component={UploadScreen} />
      <Stack.Screen name="BackgroundSelection" component={BackgroundSelectionScreen} />
      <Stack.Screen name="Preview" component={PreviewScreen} />
    </Stack.Navigator>
  );
} 