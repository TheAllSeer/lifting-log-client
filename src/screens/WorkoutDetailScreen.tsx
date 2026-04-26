import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { Workout } from '../types';
import { workoutRepository } from '../storage';
import { WorkoutsStackParamList } from '../navigation';

type Nav = NativeStackNavigationProp<WorkoutsStackParamList, 'WorkoutDetail'>;
type Route = RouteProp<WorkoutsStackParamList, 'WorkoutDetail'>;

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export default function WorkoutDetailScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { workoutId } = route.params;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        const w = await workoutRepository.getById(workoutId);
        if (!active) return;
        setWorkout(w);
        setLoading(false);
      })();
      return () => { active = false; };
    }, [workoutId])
  );

  const handleDelete = () => {
    Alert.alert('Delete workout?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await workoutRepository.delete(workoutId);
          navigation.goBack();
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (!workout) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Workout not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      {workout.name ? <Text style={styles.title}>{workout.name}</Text> : null}
      <Text style={styles.date}>{formatDate(workout.date)}</Text>

      {/* Exercises */}
      {workout.exercises.map((exercise, exIdx) => (
        <View key={exercise.id} style={styles.exerciseCard}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>

          <View style={styles.setHeaderRow}>
            <Text style={[styles.setHeader, styles.setNumCol]}>Set</Text>
            <Text style={[styles.setHeader, styles.repsCol]}>Reps</Text>
            <Text style={[styles.setHeader, styles.weightCol]}>Weight</Text>
          </View>

          {exercise.sets.map((set, setIdx) => (
            <View key={set.id} style={styles.setRow}>
              <Text style={[styles.setValue, styles.setNumCol]}>{setIdx + 1}</Text>
              <Text style={[styles.setValue, styles.repsCol]}>{set.reps}</Text>
              <Text style={[styles.setValue, styles.weightCol]}>
                {set.weight} {set.unit}
              </Text>
            </View>
          ))}
        </View>
      ))}

      {/* Delete */}
      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
        <Text style={styles.deleteText}>Delete Workout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 48 },
  centered: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  errorText: { color: colors.textSecondary, fontSize: 16 },

  title: { color: colors.textPrimary, fontSize: 24, fontWeight: '700', marginBottom: 4 },
  date: { color: colors.textSecondary, fontSize: 14, marginBottom: 20 },

  exerciseCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  exerciseName: { color: colors.textPrimary, fontSize: 17, fontWeight: '600', marginBottom: 10 },

  setHeaderRow: { flexDirection: 'row', marginBottom: 4 },
  setHeader: { color: colors.textSecondary, fontSize: 12, fontWeight: '500' },
  setNumCol: { width: 40, textAlign: 'center' },
  repsCol: { flex: 1, textAlign: 'center' },
  weightCol: { flex: 1, textAlign: 'center' },

  setRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  setValue: { color: colors.textPrimary, fontSize: 15, textAlign: 'center' },

  deleteBtn: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.danger,
    alignItems: 'center',
  },
  deleteText: { color: colors.danger, fontSize: 16, fontWeight: '500' },
});
