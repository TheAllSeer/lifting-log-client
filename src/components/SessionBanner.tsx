import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useSession } from '../contexts/SessionContext';

interface Props {
  onPress: () => void;
}

export default function SessionBanner({ onPress }: Props) {
  const { activeSession } = useSession();
  if (!activeSession) return null;

  return (
    <TouchableOpacity style={styles.banner} activeOpacity={0.8} onPress={onPress}>
      <Ionicons name="pulse-outline" size={16} color={colors.sessionAccent} />
      <Text style={styles.text}>Workout in progress — tap to return</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.sessionBanner,
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 8,
  },
  text: { color: colors.sessionAccent, fontSize: 13, fontWeight: '600' },
});
