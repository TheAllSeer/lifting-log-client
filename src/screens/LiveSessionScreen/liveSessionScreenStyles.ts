import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 80 },

  timerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  timerText: { color: colors.sessionAccent, fontSize: 28, fontWeight: '700', marginLeft: 8, fontVariant: ['tabular-nums'] },

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
  unitText: { color: colors.sessionAccent, fontSize: 13, fontWeight: '600', textAlign: 'center' },

  addSetBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 6, alignSelf: 'flex-start' },
  addSetText: { color: colors.sessionAccent, fontSize: 14, marginLeft: 4 },

  addExerciseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.sessionBanner,
    marginBottom: 24,
  },
  addExerciseText: { color: colors.sessionAccent, fontSize: 15, fontWeight: '500', marginLeft: 6 },

  finishBtn: {
    backgroundColor: colors.sessionAccent,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  finishText: { color: '#000', fontSize: 17, fontWeight: '700' },
});
