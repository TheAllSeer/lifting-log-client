import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  countRow: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  count: {
    color: colors.textPrimary,
    fontSize: 80,
    fontWeight: '700',
    lineHeight: 88,
  },
});
