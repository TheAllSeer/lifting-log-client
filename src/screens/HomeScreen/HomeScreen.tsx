import React, { useCallback, useLayoutEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Workout } from '../../types/types';
import { workoutRepository } from '../../storage/storage';
import { useSettings } from '../../contexts/SettingsContext';
import {
  getWeeklyWorkoutCount,
  getWeeklySetsPerMuscle,
  getWeeklyVolumePerMuscle,
} from '../../utils/weeklyStats';
import WeeklyWorkouts from './WeeklyWorkouts/WeeklyWorkouts';
import WeeklySetsPerMuscle from './WeeklySetsPerMuscle/WeeklySetsPerMuscle';
import WeeklyVolume from './WeeklyVolume/WeeklyVolume';
import SettingsModal from './SettingsModal/SettingsModal';
import { styles } from './homeScreenStyles';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useSettings();

  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        setLoading(true);
        const all = await workoutRepository.getAll();
        if (!active) return;
        setWorkouts(all);
        setLoading(false);
      })();
      return () => { active = false; };
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setSettingsVisible(true)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={{ marginRight: 4 }}
        >
          <Ionicons name="settings-outline" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const weeklyCount = getWeeklyWorkoutCount(workouts, settings.weekStart);
  const setsData = getWeeklySetsPerMuscle(workouts, settings.weekStart);
  const volumeData = getWeeklyVolumePerMuscle(workouts, settings.weekStart, settings.displayUnit);

  return (
    <>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      ) : (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <WeeklyWorkouts count={weeklyCount} />
          <WeeklySetsPerMuscle data={setsData} />
          <WeeklyVolume data={volumeData} displayUnit={settings.displayUnit} />
        </ScrollView>
      )}
      <SettingsModal visible={settingsVisible} onClose={() => setSettingsVisible(false)} />
    </>
  );
}
