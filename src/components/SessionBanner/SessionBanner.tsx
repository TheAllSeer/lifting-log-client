import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { useSession } from '../../contexts/SessionContext';
import { SessionBannerProps } from './sessionBannerTypes';
import { styles } from './sessionBannerStyles';

export default function SessionBanner({ onPress }: SessionBannerProps) {
  const { activeSession } = useSession();
  if (!activeSession) return null;

  return (
    <TouchableOpacity style={styles.banner} activeOpacity={0.8} onPress={onPress}>
      <Ionicons name="pulse-outline" size={16} color={colors.sessionAccent} />
      <Text style={styles.text}>Workout in progress — tap to return</Text>
    </TouchableOpacity>
  );
}

