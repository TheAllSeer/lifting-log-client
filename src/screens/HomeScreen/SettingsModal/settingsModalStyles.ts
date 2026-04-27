import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  segmented: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  segmentActive: {
    backgroundColor: colors.primary,
  },
  segmentText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  segmentTextActive: {
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: colors.danger,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  resetText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
});
