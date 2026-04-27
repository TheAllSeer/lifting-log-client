import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
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
