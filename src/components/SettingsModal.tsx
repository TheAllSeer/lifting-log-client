import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useSettings } from '../contexts/SettingsContext';
import { workoutRepository } from '../storage/storage';
import { reseedMockData } from '../data/seedMockData';
import { SettingsModalProps } from './settingsModalTypes';

export default function SettingsModal({ visible, onClose }: SettingsModalProps) {
  const { settings, updateSettings } = useSettings();

  function handleReset() {
    Alert.alert(
      'Reset Data',
      'Are you sure? This will delete all your workout history.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await workoutRepository.clearAll();
            if (__DEV__) await reseedMockData();
          },
        },
      ],
    );
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Settings</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close" size={22} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Week</Text>
            <View style={styles.segmented}>
              <TouchableOpacity
                style={[styles.segment, settings.weekStart === 'sunday' && styles.segmentActive]}
                onPress={() => updateSettings({ weekStart: 'sunday' })}
              >
                <Text style={[styles.segmentText, settings.weekStart === 'sunday' && styles.segmentTextActive]}>
                  Sun – Sat
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.segment, settings.weekStart === 'monday' && styles.segmentActive]}
                onPress={() => updateSettings({ weekStart: 'monday' })}
              >
                <Text style={[styles.segmentText, settings.weekStart === 'monday' && styles.segmentTextActive]}>
                  Mon – Sun
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Display Unit</Text>
            <View style={styles.segmented}>
              <TouchableOpacity
                style={[styles.segment, settings.displayUnit === 'kg' && styles.segmentActive]}
                onPress={() => updateSettings({ displayUnit: 'kg' })}
              >
                <Text style={[styles.segmentText, settings.displayUnit === 'kg' && styles.segmentTextActive]}>
                  kg
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.segment, settings.displayUnit === 'lbs' && styles.segmentActive]}
                onPress={() => updateSettings({ displayUnit: 'lbs' })}
              >
                <Text style={[styles.segmentText, settings.displayUnit === 'lbs' && styles.segmentTextActive]}>
                  lbs
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetText}>Reset Data</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  segmented: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  segmentActive: {
    backgroundColor: colors.primary,
  },
  segmentText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  segmentTextActive: {
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: colors.danger,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  resetText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
});
