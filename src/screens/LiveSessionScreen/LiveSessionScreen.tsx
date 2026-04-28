import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Exercise, WorkoutSet, WeightUnit } from '../../types/types';
import { useSession } from '../../contexts/SessionContext';
import { WorkoutsStackParamList } from '../../navigation/navigationTypes';
import { uuid } from '../../utils/uuid';
import { ExercisePicker } from '../../components/ExercisePicker/ExercisePicker';
import { styles } from './liveSessionScreenStyles';

type Nav = NativeStackNavigationProp<WorkoutsStackParamList, 'LiveSession'>;

function formatElapsed(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function makeSet(): WorkoutSet {
  return { id: uuid(), reps: 0, weight: 0, unit: 'lbs' };
}

export default function LiveSessionScreen() {
  const navigation = useNavigation<Nav>();
  const { activeSession, elapsed, updateSession, finishSession } = useSession();

  if (!activeSession) return null;

  const updateSessionName = async (value: string) => {
    await updateSession({ ...activeSession, name: value || null });
  };

  const addExercise = async () => {
    const exercise: Exercise = { id: uuid(), name: '', sets: [makeSet()] };
    const updated = { ...activeSession, exercises: [...activeSession.exercises, exercise] };
    await updateSession(updated);
  };

  const removeExercise = (exId: string) => {
    Alert.alert('Remove exercise?', 'All sets for this exercise will be deleted.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          const updated = {
            ...activeSession,
            exercises: activeSession.exercises.filter((e) => e.id !== exId),
          };
          await updateSession(updated);
        },
      },
    ]);
  };

  const updateExerciseName = async (exId: string, value: string) => {
    const updated = {
      ...activeSession,
      exercises: activeSession.exercises.map((ex) =>
        ex.id === exId ? { ...ex, name: value } : ex
      ),
    };
    await updateSession(updated);
  };

  const addSet = async (exId: string) => {
    const updated = {
      ...activeSession,
      exercises: activeSession.exercises.map((ex) =>
        ex.id === exId ? { ...ex, sets: [...ex.sets, makeSet()] } : ex
      ),
    };
    await updateSession(updated);
  };

  const removeSet = async (exId: string, setId: string) => {
    const updated = {
      ...activeSession,
      exercises: activeSession.exercises.map((ex) =>
        ex.id === exId ? { ...ex, sets: ex.sets.filter((s) => s.id !== setId) } : ex
      ),
    };
    await updateSession(updated);
  };

  const updateSet = async (exId: string, setId: string, field: 'reps' | 'weight', value: number) => {
    const updated = {
      ...activeSession,
      exercises: activeSession.exercises.map((ex) =>
        ex.id === exId
          ? { ...ex, sets: ex.sets.map((s) => (s.id === setId ? { ...s, [field]: value } : s)) }
          : ex
      ),
    };
    await updateSession(updated);
  };

  const toggleUnit = async (exId: string, setId: string) => {
    const updated = {
      ...activeSession,
      exercises: activeSession.exercises.map((ex) =>
        ex.id === exId
          ? {
              ...ex,
              sets: ex.sets.map((s) =>
                s.id === setId ? { ...s, unit: (s.unit === 'lbs' ? 'kg' : 'lbs') as WeightUnit } : s
              ),
            }
          : ex
      ),
    };
    await updateSession(updated);
  };

  const handleFinish = () => {
    Alert.alert('End live session?', 'This will save your workout and end the session.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Finish',
        style: 'default',
        onPress: async () => {
          await finishSession();
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Timer */}
        <View style={styles.timerRow}>
          <Ionicons name="time-outline" size={20} color={colors.sessionAccent} />
          <Text style={styles.timerText}>{formatElapsed(elapsed)}</Text>
        </View>

        {/* Session name */}
        <TextInput
          style={styles.nameInput}
          placeholder="Workout name (optional)"
          placeholderTextColor={colors.textSecondary}
          value={activeSession.name || ''}
          onChangeText={updateSessionName}
        />

        {/* Exercises */}
        {activeSession.exercises.map((exercise, exIdx) => (
          <View key={exercise.id} style={styles.exerciseCard}>
            <View style={styles.exerciseHeader}>
              <ExercisePicker
                value={exercise.name}
                placeholder={`Exercise ${exIdx + 1}`}
                onSelect={(name) => updateExerciseName(exercise.id, name)}
                accentColor={colors.sessionAccent}
              />
              <TouchableOpacity onPress={() => removeExercise(exercise.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="trash-outline" size={20} color={colors.danger} />
              </TouchableOpacity>
            </View>

            <View style={styles.setHeaderRow}>
              <Text style={[styles.setHeaderText, styles.setNumCol]}>Set</Text>
              <Text style={[styles.setHeaderText, styles.repsCol]}>Reps</Text>
              <Text style={[styles.setHeaderText, styles.weightCol]}>Weight</Text>
              <Text style={[styles.setHeaderText, styles.unitCol]}>Unit</Text>
              <View style={styles.actionCol} />
            </View>

            {exercise.sets.map((set, setIdx) => (
              <View key={set.id} style={styles.setRow}>
                <Text style={[styles.setNum, styles.setNumCol]}>{setIdx + 1}</Text>
                <TextInput
                  style={[styles.setInput, styles.repsCol]}
                  keyboardType="number-pad"
                  value={set.reps > 0 ? String(set.reps) : ''}
                  placeholder="0"
                  placeholderTextColor={colors.textDisabled}
                  onChangeText={(v) => updateSet(exercise.id, set.id, 'reps', parseInt(v, 10) || 0)}
                />
                <TextInput
                  style={[styles.setInput, styles.weightCol]}
                  keyboardType="decimal-pad"
                  value={set.weight > 0 ? String(set.weight) : ''}
                  placeholder="0"
                  placeholderTextColor={colors.textDisabled}
                  onChangeText={(v) => updateSet(exercise.id, set.id, 'weight', parseFloat(v) || 0)}
                />
                <TouchableOpacity style={[styles.unitToggle, styles.unitCol]} onPress={() => toggleUnit(exercise.id, set.id)}>
                  <Text style={styles.unitText}>{set.unit}</Text>
                </TouchableOpacity>
                {exercise.sets.length > 1 ? (
                  <TouchableOpacity style={styles.actionCol} onPress={() => removeSet(exercise.id, set.id)}>
                    <Ionicons name="close-circle-outline" size={20} color={colors.danger} />
                  </TouchableOpacity>
                ) : (
                  <View style={styles.actionCol} />
                )}
              </View>
            ))}

            <TouchableOpacity style={styles.addSetBtn} onPress={() => addSet(exercise.id)}>
              <Ionicons name="add-circle-outline" size={18} color={colors.sessionAccent} />
              <Text style={styles.addSetText}>Add Set</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addExerciseBtn} onPress={addExercise}>
          <Ionicons name="add" size={20} color={colors.sessionAccent} />
          <Text style={styles.addExerciseText}>Add Exercise</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Finish button pinned at bottom */}
      <TouchableOpacity style={styles.finishBtn} onPress={handleFinish}>
        <Text style={styles.finishText}>Finish Workout</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
