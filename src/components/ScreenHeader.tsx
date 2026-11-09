import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, shadow } from '../theme';

export function ScreenHeader({ title, eyebrow, subtitle }: { title: string; eyebrow?: string; subtitle?: string }) {
  return <>
    <View style={styles.row}>
      <Pressable style={({ pressed }) => [styles.back, pressed && styles.pressed]} onPress={() => router.back()} accessibilityLabel="Go back"><ArrowLeft size={21} color={colors.ink} /></Pressable>
      <Text style={styles.centerTitle}>{title}</Text><View style={styles.spacer} />
    </View>
    {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </>;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 21 },
  back: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', ...shadow }, pressed: { opacity: 0.82 }, spacer: { width: 42 },
  centerTitle: { color: colors.ink, fontSize: 15, fontWeight: '900' }, eyebrow: { color: colors.maroon, fontSize: 10, fontWeight: '900', letterSpacing: 1.2 },
  title: { color: colors.ink, fontSize: 31, lineHeight: 38, fontWeight: '900', marginTop: 6 }, subtitle: { color: colors.slate, fontSize: 13, lineHeight: 20, marginTop: 6 },
});
