import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Workout } from '../../types/types';
import { workoutRepository } from '../../storage/storage';
import { WorkoutsStackParamList } from '../../navigation/navigationTypes';
import { useSession } from '../../contexts/SessionContext';
import { styles } from './workoutListScreenStyles';

type Nav = NativeStackNavigationProp<WorkoutsStackParamList, 'WorkoutList'>;

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

function exerciseSummary(workout: Workout): string {
  return workout.exercises.map((e) => e.name).join(', ') || 'No exercises';
}

export default function WorkoutListScreen() {
  const navigation = useNavigation<Nav>();
  const { activeSession, startSession } = useSession();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        setLoading(true);
        const all = await workoutRepository.getAll();
        if (!active) return;
        all.sort((a, b) => {
          const aKey = a.savedAt || a.date;
          const bKey = b.savedAt || b.date;
          return bKey.localeCompare(aKey);
        });
        setWorkouts(all);
        setLoading(false);
      })();
      return () => { active = false; };
    }, [])
  );

  const handleStartSession = async () => {
    await startSession();
    navigation.navigate('LiveSession');
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (workouts.length === 0) {
    return (
      <View style={styles.centered}>
        <Ionicons name="barbell-outline" size={64} color={colors.textDisabled} />
        <Text style={styles.emptyTitle}>No workouts yet</Text>
        <Text style={styles.emptySub}>Start a live session or log a workout.</Text>
        <View style={styles.emptyActions}>
          {!activeSession && (
            <TouchableOpacity style={styles.startBtn} onPress={handleStartSession}>
              <Ionicons name="play" size={18} color="#000" />
              <Text style={styles.startBtnText}>Start Workout</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('LogWorkout')}>
            <Ionicons name="add" size={28} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('WorkoutDetail', { workoutId: item.id })}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardDate}>{formatDate(item.date)}</Text>
              {item.name ? <Text style={styles.cardName}>{item.name}</Text> : null}
            </View>
            <Text style={styles.cardExercises} numberOfLines={2}>
              {exerciseSummary(item)}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.fabRow}>
        {!activeSession && (
          <TouchableOpacity style={styles.startFab} onPress={handleStartSession}>
            <Ionicons name="play" size={22} color="#000" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('LogWorkout')}>
          <Ionicons name="add" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

