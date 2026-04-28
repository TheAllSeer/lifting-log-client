import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
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
