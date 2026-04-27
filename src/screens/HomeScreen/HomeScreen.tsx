import React, { useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import SettingsModal from './SettingsModal/SettingsModal';
import { styles } from './homeScreenStyles';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [settingsVisible, setSettingsVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setSettingsVisible(true)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={{ marginRight: 4 }}
        >
          <Ionicons name="settings-outline" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Workouts This Week</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sets This Week</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Volume This Week</Text>
        </View>
      </ScrollView>

      <SettingsModal visible={settingsVisible} onClose={() => setSettingsVisible(false)} />
    </>
  );
}

