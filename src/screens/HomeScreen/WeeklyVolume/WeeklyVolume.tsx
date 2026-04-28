import React from 'react';
import { View, Text } from 'react-native';
import { WeeklyVolumeProps } from './weeklyVolumeTypes';
import { styles } from './weeklyVolumeStyles';

function formatVolume(value: number): string {
  return Math.round(value).toString();
}

export default function WeeklyVolume({ data, displayUnit }: WeeklyVolumeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Volume This Week</Text>
      {data.length === 0 ? (
        <Text style={styles.empty}>No workouts this week</Text>
      ) : (
        data.map(({ muscle, value }) => (
          <View key={muscle} style={styles.row}>
            <Text style={styles.muscle}>{muscle}</Text>
            <Text style={styles.value}>
              {formatVolume(value)}{' '}
              <Text style={styles.unit}>{displayUnit}</Text>
            </Text>
          </View>
        ))
      )}
    </View>
  );
}
