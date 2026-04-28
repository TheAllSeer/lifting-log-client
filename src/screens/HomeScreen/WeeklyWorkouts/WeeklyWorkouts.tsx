import React from 'react';
import { View, Text } from 'react-native';
import { WeeklyWorkoutsProps } from './weeklyWorkoutsTypes';
import { styles } from './weeklyWorkoutsStyles';

export default function WeeklyWorkouts({ count }: WeeklyWorkoutsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workouts This Week</Text>
      <View style={styles.countRow}>
        <Text style={styles.count}>{count}</Text>
      </View>
    </View>
  );
}
