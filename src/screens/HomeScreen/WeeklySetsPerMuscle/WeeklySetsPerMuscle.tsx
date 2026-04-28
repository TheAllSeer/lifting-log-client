import React from 'react';
import { View, Text } from 'react-native';
import { WeeklySetsPerMuscleProps } from './weeklySetsPerMuscleTypes';
import { styles } from './weeklySetsPerMuscleStyles';

function formatSets(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export default function WeeklySetsPerMuscle({ data }: WeeklySetsPerMuscleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sets This Week</Text>
      {data.length === 0 ? (
        <Text style={styles.empty}>No workouts this week</Text>
      ) : (
        data.map(({ muscle, value }, index) => (
          <View
            key={muscle}
            style={[styles.row, index === data.length - 1 && styles.lastRow]}
          >
            <Text style={styles.muscle}>{muscle}</Text>
            <Text style={styles.value}>{formatSets(value)}</Text>
          </View>
        ))
      )}
    </View>
  );
}
