import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 48 },
  centered: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  errorText: { color: colors.textSecondary, fontSize: 16 },

  title: { color: colors.textPrimary, fontSize: 24, fontWeight: '700', marginBottom: 4 },
  date: { color: colors.textSecondary, fontSize: 14, marginBottom: 20 },

  exerciseCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  exerciseName: { color: colors.textPrimary, fontSize: 17, fontWeight: '600', marginBottom: 10 },

  setHeaderRow: { flexDirection: 'row', marginBottom: 4 },
  setHeader: { color: colors.textSecondary, fontSize: 12, fontWeight: '500' },
  setNumCol: { width: 40, textAlign: 'center' },
  repsCol: { flex: 1, textAlign: 'center' },
  weightCol: { flex: 1, textAlign: 'center' },

  setRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  setValue: { color: colors.textPrimary, fontSize: 15, textAlign: 'center' },

  deleteBtn: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.danger,
    alignItems: 'center',
  },
  deleteText: { color: colors.danger, fontSize: 16, fontWeight: '500' },
});
