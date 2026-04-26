import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { Workout } from '../types';
import { workoutRepository } from '../storage';
import { WorkoutsStackParamList } from '../navigation';
import { useSession } from '../contexts/SessionContext';

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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  centered: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: 32 },
  list: { padding: 16, paddingBottom: 96 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardDate: { color: colors.textSecondary, fontSize: 13 },
  cardName: { color: colors.textPrimary, fontSize: 16, fontWeight: '600' },
  cardExercises: { color: colors.textSecondary, fontSize: 14 },
  emptyTitle: { color: colors.textPrimary, fontSize: 20, fontWeight: '600', marginTop: 16 },
  emptySub: { color: colors.textSecondary, fontSize: 15, marginTop: 8, textAlign: 'center' },
  emptyActions: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 24 },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.sessionAccent,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 28,
    gap: 6,
  },
  startBtnText: { color: '#000', fontSize: 16, fontWeight: '600' },
  fabRow: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  startFab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.sessionAccent,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
