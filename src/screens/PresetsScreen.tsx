import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function PresetsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Presets</Text>
      <Text style={styles.sub}>Presets coming soon.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  heading: { color: colors.textPrimary, fontSize: 20, fontWeight: '600', marginBottom: 8 },
  sub: { color: colors.textSecondary, fontSize: 15 },
});
