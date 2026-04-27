import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { useSettings } from '../../../contexts/SettingsContext';
import { workoutRepository } from '../../../storage/storage';
import { reseedMockData } from '../../../data/seedMockData';
import { SettingsModalProps } from './settingsModalTypes';
import { styles } from './settingsModalStyles';

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
