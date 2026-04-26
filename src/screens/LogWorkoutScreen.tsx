import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
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
import { colors } from '../theme/colors';
import { Exercise, Workout, WorkoutSet, WeightUnit } from '../types';
import { workoutRepository } from '../storage';
import { WorkoutsStackParamList } from '../navigation';
import { uuid } from '../utils/uuid';

type Nav = NativeStackNavigationProp<WorkoutsStackParamList, 'LogWorkout'>;

function todayISO(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function makeSet(): WorkoutSet {
  return { id: uuid(), reps: 0, weight: 0, unit: 'lbs' };
}

function makeExercise(): Exercise {
  return { id: uuid(), name: '', sets: [makeSet()] };
}

export default function LogWorkoutScreen() {
  const navigation = useNavigation<Nav>();
  const [name, setName] = useState('');
  const [date, setDate] = useState(todayISO());
  const [exercises, setExercises] = useState<Exercise[]>([makeExercise()]);
  const dirty = useRef(false);

  const markDirty = () => { dirty.current = true; };

  const updateExerciseName = (exIdx: number, value: string) => {
    markDirty();
    setExercises((prev) => prev.map((ex, i) => (i === exIdx ? { ...ex, name: value } : ex)));
  };

  const updateSet = (exIdx: number, setIdx: number, field: keyof WorkoutSet, value: string | number) => {
    markDirty();
    setExercises((prev) =>
      prev.map((ex, ei) =>
        ei === exIdx
          ? { ...ex, sets: ex.sets.map((s, si) => (si === setIdx ? { ...s, [field]: value } : s)) }
          : ex
      )
    );
  };

  const toggleUnit = (exIdx: number, setIdx: number) => {
    setExercises((prev) =>
      prev.map((ex, ei) =>
        ei === exIdx
          ? {
              ...ex,
              sets: ex.sets.map((s, si) =>
                si === setIdx ? { ...s, unit: (s.unit === 'lbs' ? 'kg' : 'lbs') as WeightUnit } : s
              ),
            }
          : ex
      )
    );
  };

  const addSet = (exIdx: number) => {
    markDirty();
    setExercises((prev) =>
      prev.map((ex, i) => (i === exIdx ? { ...ex, sets: [...ex.sets, makeSet()] } : ex))
    );
  };

  const removeSet = (exIdx: number, setIdx: number) => {
    markDirty();
    setExercises((prev) =>
      prev.map((ex, i) =>
        i === exIdx ? { ...ex, sets: ex.sets.filter((_, si) => si !== setIdx) } : ex
      )
    );
  };

  const addExercise = () => {
    markDirty();
    setExercises((prev) => [...prev, makeExercise()]);
  };

  const removeExercise = (exIdx: number) => {
    markDirty();
    setExercises((prev) => prev.filter((_, i) => i !== exIdx));
  };

  const handleSave = async () => {
    const trimmedExercises = exercises.filter((ex) => ex.name.trim().length > 0);
    if (trimmedExercises.length === 0) {
      Alert.alert('Missing data', 'Add at least one exercise with a name.');
      return;
    }
    for (const ex of trimmedExercises) {
      const validSets = ex.sets.filter((s) => s.reps > 0);
      if (validSets.length === 0) {
        Alert.alert('Missing data', `"${ex.name}" needs at least one set with reps > 0.`);
        return;
      }
    }

    const workout: Workout = {
      id: uuid(),
      name: name.trim() || null,
      date,
      exercises: trimmedExercises.map((ex) => ({
        ...ex,
        sets: ex.sets.filter((s) => s.reps > 0),
      })),
      savedAt: new Date().toISOString(),
    };

    await workoutRepository.save(workout);
    dirty.current = false;
    navigation.goBack();
  };

  // Intercept all back navigation (gesture, header back, cancel button) when dirty
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!dirty.current) return;
      e.preventDefault();
      Alert.alert('Discard workout?', 'You have unsaved changes.', [
        { text: 'Keep editing', style: 'cancel' },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => {
            dirty.current = false;
            navigation.dispatch(e.data.action);
          },
        },
      ]);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Workout name */}
        <TextInput
          style={styles.nameInput}
          placeholder="Workout name (optional)"
          placeholderTextColor={colors.textSecondary}
          value={name}
          onChangeText={(v) => { markDirty(); setName(v); }}
        />

        {/* Date */}
        <View style={styles.dateRow}>
          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.dateInput}
            value={date}
            onChangeText={(v) => { markDirty(); setDate(v); }}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        {/* Exercises */}
        {exercises.map((exercise, exIdx) => (
          <View key={exercise.id} style={styles.exerciseCard}>
            <View style={styles.exerciseHeader}>
              <TextInput
                style={styles.exerciseNameInput}
                placeholder={`Exercise ${exIdx + 1}`}
                placeholderTextColor={colors.textSecondary}
                value={exercise.name}
                onChangeText={(v) => updateExerciseName(exIdx, v)}
              />
              {exercises.length > 1 && (
                <TouchableOpacity onPress={() => removeExercise(exIdx)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Ionicons name="trash-outline" size={20} color={colors.danger} />
                </TouchableOpacity>
              )}
            </View>

            {/* Column headers */}
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
                  onChangeText={(v) => updateSet(exIdx, setIdx, 'reps', parseInt(v, 10) || 0)}
                />
                <TextInput
                  style={[styles.setInput, styles.weightCol]}
                  keyboardType="decimal-pad"
                  value={set.weight > 0 ? String(set.weight) : ''}
                  placeholder="0"
                  placeholderTextColor={colors.textDisabled}
                  onChangeText={(v) => updateSet(exIdx, setIdx, 'weight', parseFloat(v) || 0)}
                />
                <TouchableOpacity style={[styles.unitToggle, styles.unitCol]} onPress={() => toggleUnit(exIdx, setIdx)}>
                  <Text style={styles.unitText}>{set.unit}</Text>
                </TouchableOpacity>
                {exercise.sets.length > 1 ? (
                  <TouchableOpacity style={styles.actionCol} onPress={() => removeSet(exIdx, setIdx)}>
                    <Ionicons name="close-circle-outline" size={20} color={colors.danger} />
                  </TouchableOpacity>
                ) : (
                  <View style={styles.actionCol} />
                )}
              </View>
            ))}

            <TouchableOpacity style={styles.addSetBtn} onPress={() => addSet(exIdx)}>
              <Ionicons name="add-circle-outline" size={18} color={colors.primary} />
              <Text style={styles.addSetText}>Add Set</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addExerciseBtn} onPress={addExercise}>
          <Ionicons name="add" size={20} color={colors.primary} />
          <Text style={styles.addExerciseText}>Add Exercise</Text>
        </TouchableOpacity>

        {/* Action buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save Workout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 48 },

  nameInput: {
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },

  dateRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  label: { color: colors.textSecondary, fontSize: 14, marginRight: 12 },
  dateInput: {
    flex: 1,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },

  exerciseCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  exerciseHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  exerciseNameInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 6,
    marginRight: 8,
  },

  setHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  setHeaderText: { color: colors.textSecondary, fontSize: 12, fontWeight: '500' },
  setNumCol: { width: 32, textAlign: 'center' },
  repsCol: { flex: 1, marginHorizontal: 4 },
  weightCol: { flex: 1, marginHorizontal: 4 },
  unitCol: { width: 44, alignItems: 'center' as const },
  actionCol: { width: 28, alignItems: 'center' as const },

  setRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  setNum: { color: colors.textSecondary, fontSize: 14, textAlign: 'center' },
  setInput: {
    backgroundColor: colors.surfaceAlt,
    color: colors.textPrimary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 15,
    textAlign: 'center',
  },
  unitToggle: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  unitText: { color: colors.primary, fontSize: 13, fontWeight: '600', textAlign: 'center' },

  addSetBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 6, alignSelf: 'flex-start' },
  addSetText: { color: colors.primary, fontSize: 14, marginLeft: 4 },

  addExerciseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primaryMuted,
    marginBottom: 24,
  },
  addExerciseText: { color: colors.primary, fontSize: 15, fontWeight: '500', marginLeft: 6 },

  actions: { flexDirection: 'row', gap: 12 },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  cancelText: { color: colors.textSecondary, fontSize: 16, fontWeight: '500' },
  saveBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  saveText: { color: colors.textPrimary, fontSize: 16, fontWeight: '600' },
});
