import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function Logo({ dark = false, centered = false, large = false }: { dark?: boolean; centered?: boolean; large?: boolean }) {
  return <View style={[styles.row, centered && styles.centered]}>
    <Image source={{ uri: 'https://kdpublic.vercel.app/frontendImages/KDPublicLogo.png' }} style={[styles.logo, large && styles.logoLarge]} />
    <View style={centered && styles.copyCentered}><Text style={[styles.name, dark && styles.light, large && styles.nameLarge]}>KD Public School</Text><Text style={[styles.caption, dark && styles.light]}>Parent Connect</Text></View>
  </View>;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 }, centered: { flexDirection: 'column', justifyContent: 'center', gap: 8 }, copyCentered: { alignItems: 'center' },
  logo: { width: 42, height: 42, resizeMode: 'contain' }, logoLarge: { width: 76, height: 76 },
  name: { color: colors.maroon, fontSize: 16, fontWeight: '800' }, nameLarge: { fontSize: 20 }, caption: { color: colors.maroon, fontSize: 11, fontWeight: '700', letterSpacing: 1 }, light: { color: colors.white },
});
