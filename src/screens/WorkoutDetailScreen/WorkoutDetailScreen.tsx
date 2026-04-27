import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../theme/colors';
import { Workout } from '../../types/types';
import { workoutRepository } from '../../storage/storage';
import { WorkoutsStackParamList } from '../../navigation/navigationTypes';
import { styles } from './workoutDetailScreenStyles';

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

