import React, { useState } from 'react';
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
import { styles } from './liveSessionScreenStyles';

type Nav = NativeStackNavigationProp<WorkoutsStackParamList, 'LiveSession'>;

function formatElapsed(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export default function LiveSessionScreen() {
  const navigation = useNavigation<Nav>();
  const { activeSession, elapsed, updateSession, finishSession } = useSession();

  const [pendingReps, setPendingReps] = useState<Record<string, string>>({});
  const [pendingWeight, setPendingWeight] = useState<Record<string, string>>({});
  const [pendingUnit, setPendingUnit] = useState<Record<string, WeightUnit>>({});
  const [newExerciseName, setNewExerciseName] = useState('');

  if (!activeSession) return null;

  const addExercise = async () => {
    const name = newExerciseName.trim();
    if (!name) {
      Alert.alert('Enter exercise name');
      return;
    }
    const exercise: Exercise = { id: uuid(), name, sets: [] };
    const updated = { ...activeSession, exercises: [...activeSession.exercises, exercise] };
    await updateSession(updated);
    setNewExerciseName('');
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

  const logSet = async (exId: string) => {
    const reps = parseInt(pendingReps[exId] || '0', 10);
    const weight = parseFloat(pendingWeight[exId] || '0');
    const unit = pendingUnit[exId] || 'lbs';

    if (reps <= 0) {
      Alert.alert('Enter reps');
      return;
    }

    const newSet: WorkoutSet = { id: uuid(), reps, weight, unit };
    const updated = {
      ...activeSession,
      exercises: activeSession.exercises.map((ex) =>
        ex.id === exId ? { ...ex, sets: [...ex.sets, newSet] } : ex
      ),
    };
    await updateSession(updated);
    setPendingReps((p) => ({ ...p, [exId]: '' }));
    setPendingWeight((p) => ({ ...p, [exId]: '' }));
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

  const togglePendingUnit = (exId: string) => {
    setPendingUnit((p) => ({ ...p, [exId]: (p[exId] || 'lbs') === 'lbs' ? 'kg' : 'lbs' }));
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

  const updateSessionName = async (value: string) => {
    await updateSession({ ...activeSession, name: value || null });
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

        {/* Logged exercises */}
        {activeSession.exercises.map((exercise) => (
          <View key={exercise.id} style={styles.exerciseCard}>
            <View style={styles.exerciseHeader}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <TouchableOpacity onPress={() => removeExercise(exercise.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="trash-outline" size={18} color={colors.danger} />
              </TouchableOpacity>
            </View>

            {/* Logged sets */}
            {exercise.sets.length > 0 && (
              <View style={styles.setsTable}>
                <View style={styles.setHeaderRow}>
                  <Text style={[styles.setHeader, styles.setNumCol]}>Set</Text>
                  <Text style={[styles.setHeader, styles.repsCol]}>Reps</Text>
                  <Text style={[styles.setHeader, styles.weightCol]}>Weight</Text>
                  <View style={styles.delCol} />
                </View>
                {exercise.sets.map((set, si) => (
                  <View key={set.id} style={styles.loggedSetRow}>
                    <Text style={[styles.loggedSetText, styles.setNumCol]}>{si + 1}</Text>
                    <Text style={[styles.loggedSetText, styles.repsCol]}>{set.reps}</Text>
                    <Text style={[styles.loggedSetText, styles.weightCol]}>{set.weight} {set.unit}</Text>
                    <TouchableOpacity style={styles.delCol} onPress={() => removeSet(exercise.id, set.id)}>
                      <Ionicons name="close-circle-outline" size={18} color={colors.danger} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Pending set input */}
            <View style={styles.pendingRow}>
              <TextInput
                style={[styles.pendingInput, styles.repsCol]}
                keyboardType="number-pad"
                placeholder="Reps"
                placeholderTextColor={colors.textDisabled}
                value={pendingReps[exercise.id] || ''}
                onChangeText={(v) => setPendingReps((p) => ({ ...p, [exercise.id]: v }))}
              />
              <TextInput
                style={[styles.pendingInput, styles.weightCol]}
                keyboardType="decimal-pad"
                placeholder="Weight"
                placeholderTextColor={colors.textDisabled}
                value={pendingWeight[exercise.id] || ''}
                onChangeText={(v) => setPendingWeight((p) => ({ ...p, [exercise.id]: v }))}
              />
              <TouchableOpacity style={styles.unitBtn} onPress={() => togglePendingUnit(exercise.id)}>
                <Text style={styles.unitBtnText}>{pendingUnit[exercise.id] || 'lbs'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logSetBtn} onPress={() => logSet(exercise.id)}>
                <Text style={styles.logSetText}>Log</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Add exercise */}
        <View style={styles.addExRow}>
          <TextInput
            style={styles.addExInput}
            placeholder="Exercise name"
            placeholderTextColor={colors.textSecondary}
            value={newExerciseName}
            onChangeText={setNewExerciseName}
          />
          <TouchableOpacity style={styles.addExBtn} onPress={addExercise}>
            <Ionicons name="add" size={20} color={colors.textPrimary} />
            <Text style={styles.addExBtnText}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Finish button pinned at bottom */}
      <TouchableOpacity style={styles.finishBtn} onPress={handleFinish}>
        <Text style={styles.finishText}>Finish Workout</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
