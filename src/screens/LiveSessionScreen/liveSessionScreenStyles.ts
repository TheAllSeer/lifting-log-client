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
    marginBottom: 16,
  },

  exerciseCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  exerciseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  exerciseName: { color: colors.textPrimary, fontSize: 16, fontWeight: '600' },

  setsTable: { marginBottom: 10 },
  setHeaderRow: { flexDirection: 'row', marginBottom: 4 },
  setHeader: { color: colors.textSecondary, fontSize: 12, fontWeight: '500' },
  setNumCol: { width: 36, textAlign: 'center' },
  repsCol: { flex: 1, textAlign: 'center' },
  weightCol: { flex: 1, textAlign: 'center' },
  delCol: { width: 28, alignItems: 'center' as const },

  loggedSetRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, borderTopWidth: 1, borderTopColor: colors.border },
  loggedSetText: { color: colors.textPrimary, fontSize: 14, textAlign: 'center' },

  pendingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  pendingInput: {
    backgroundColor: colors.surfaceAlt,
    color: colors.textPrimary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 15,
    textAlign: 'center',
  },
  unitBtn: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  unitBtnText: { color: colors.sessionAccent, fontSize: 13, fontWeight: '600' },
  logSetBtn: {
    backgroundColor: colors.sessionAccent,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  logSetText: { color: '#000', fontSize: 14, fontWeight: '600' },

  addExRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4, marginBottom: 24 },
  addExInput: {
    flex: 1,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addExBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.sessionAccent,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  addExBtnText: { color: '#000', fontSize: 15, fontWeight: '600', marginLeft: 4 },

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
