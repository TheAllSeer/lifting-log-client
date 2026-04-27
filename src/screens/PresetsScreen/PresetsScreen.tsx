import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './presetsScreenStyles';

export default function PresetsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Presets</Text>
      <Text style={styles.sub}>Presets coming soon.</Text>
    </View>
  );
}

