import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExerciseName } from '../../constants/exercises';
import { colors } from '../../theme/colors';
import { styles } from './exercisePickerStyles';

const ALL_EXERCISES = Object.values(ExerciseName);

interface ExercisePickerProps {
  value: string;
  placeholder: string;
  onSelect: (name: string) => void;
  accentColor?: string;
}

export function ExercisePicker({ value, placeholder, onSelect, accentColor = colors.primary }: ExercisePickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? ALL_EXERCISES.filter((n) => n.toLowerCase().includes(query.toLowerCase()))
    : ALL_EXERCISES;

  const handleSelect = (name: string) => {
    onSelect(name);
    setOpen(false);
    setQuery('');
  };

  const handleClose = () => {
    setOpen(false);
    setQuery('');
  };

  return (
    <>
      <TouchableOpacity style={styles.trigger} onPress={() => setOpen(true)} activeOpacity={0.7}>
        <Text style={[styles.triggerText, !value && styles.triggerPlaceholder]}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={handleClose}>
        <View style={styles.modalRoot}>
          {/* Backdrop — tapping outside dismisses */}
          <TouchableOpacity style={styles.backdrop} onPress={handleClose} activeOpacity={1} />

          {/* KAV lifts the sheet above the keyboard */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.kavWrapper}
          >
            <View style={styles.sheet}>
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>Select Exercise</Text>
                <TouchableOpacity onPress={handleClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Ionicons name="close" size={22} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <View style={styles.searchRow}>
                <Ionicons name="search" size={16} color={colors.textSecondary} style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search exercises…"
                  placeholderTextColor={colors.textSecondary}
                  value={query}
                  onChangeText={setQuery}
                  autoFocus
                  autoCorrect={false}
                />
                {query.length > 0 && (
                  <TouchableOpacity onPress={() => setQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Ionicons name="close-circle" size={16} color={colors.textSecondary} />
                  </TouchableOpacity>
                )}
              </View>

              <FlatList
                data={filtered}
                keyExtractor={(item) => item}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.option, item === value && { backgroundColor: colors.surfaceAlt }]}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={[styles.optionText, item === value && { color: accentColor }]}>{item}</Text>
                    {item === value && <Ionicons name="checkmark" size={16} color={accentColor} />}
                  </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No exercises found</Text>}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
}
