import { router } from 'expo-router';
import { Award, BookCheck, BusFront, CalendarCheck2, CalendarClock, ChevronRight, ClipboardList, GraduationCap, Megaphone, TrendingUp, WalletCards } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandGradient } from '../../../components/BrandGradient';
import { ScreenSkeleton } from '../../../components/ScreenSkeleton';
import { usePreviewLoading } from '../../../hooks/usePreviewLoading';
import { results } from '../../../mocks/data';
import { colors, shadow, spacing } from '../../../theme';

const modules = [
  { title: 'Results', note: 'Term scores & report', icon: GraduationCap, color: colors.maroon, tint: colors.redSoft, route: '/(parent)/results' as const },
  { title: 'Homework', note: '3 tasks pending', icon: BookCheck, color: colors.navy, tint: colors.navyTint, route: '/(parent)/homework' as const },
  { title: 'Timetable', note: 'Today’s 6 periods', icon: CalendarClock, color: colors.green, tint: colors.greenSoft, route: '/(parent)/timetable' as const },
  { title: 'Achievements', note: '4 awards this year', icon: Award, color: colors.amber, tint: colors.amberSoft, route: '/(parent)/achievements' as const },
  { title: 'Notices', note: '2 new updates', icon: Megaphone, color: colors.maroon, tint: colors.goldSoft, route: '/(parent)/notices' as const },
  { title: 'Assignments', note: 'View submissions', icon: ClipboardList, color: colors.navy, tint: '#E8EEF4', route: '/(parent)/assignments' as const },
  { title: 'Attendance', note: 'Monthly record', icon: CalendarCheck2, color: colors.green, tint: colors.greenSoft, route: '/(parent)/attendance' as const },
  { title: 'School fees', note: 'Payments & dues', icon: WalletCards, color: colors.maroon, tint: colors.redSoft, route: '/(parent)/fees' as const },
  { title: 'Bus tracking', note: 'Live route', icon: BusFront, color: colors.navy, tint: colors.navyTint, route: '/(parent)/transport' as const },
];

export default function Academics() {
  const isLoading = usePreviewLoading();
  if (isLoading) return <ScreenSkeleton variant="academics" />;
  const average = Math.round(results.reduce((sum, item) => sum + item.marks, 0) / results.length);
  return <SafeAreaView style={styles.safe} edges={['top']}><ScrollView style={styles.page} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <Text style={styles.kicker}>AARAV KUMAR · CLASS 5-A</Text><Text style={styles.title}>Academics</Text><Text style={styles.subtitle}>Learning progress, daily work and school milestones.</Text>

    <Pressable style={styles.performance} onPress={() => router.push('/(parent)/results')}>
      <BrandGradient style={StyleSheet.absoluteFill} />
      <View style={styles.performanceTop}><View><Text style={styles.performanceLabel}>HALF-YEARLY PERFORMANCE</Text><Text style={styles.performanceValue}>{average}%</Text></View><View style={styles.trend}><TrendingUp size={15} color={colors.green} /><Text style={styles.trendText}>+3.2%</Text></View></View>
      <View style={styles.performanceBottom}><View><Text style={styles.performanceMeta}>Class rank</Text><Text style={styles.performanceStrong}>6 of 42</Text></View><View><Text style={styles.performanceMeta}>Attendance</Text><Text style={styles.performanceStrong}>92%</Text></View><View style={styles.openCircle}><ChevronRight size={20} color={colors.navy} /></View></View>
    </Pressable>

    <Text style={styles.section}>Tools & services</Text><View style={styles.grid}>{modules.map(({ title, note, icon: Icon, color, tint, route }) => <Pressable key={title} style={({ pressed }) => [styles.module, pressed && styles.pressed]} onPress={() => router.push(route)}>
      <View style={[styles.moduleIcon, { backgroundColor: tint }]}><Icon size={21} color={color} /></View><Text style={styles.moduleTitle}>{title}</Text><Text style={styles.moduleNote}>{note}</Text>
    </Pressable>)}</View>

    <Text style={styles.section}>Next up</Text><View style={styles.nextCard}><View style={styles.dateBadge}><Text style={styles.dateDay}>10</Text><Text style={styles.dateMonth}>NOV</Text></View><View style={styles.flex}><Text style={styles.nextKicker}>TOMORROW · 8:00 AM</Text><Text style={styles.nextTitle}>Mathematics · Fractions</Text><Text style={styles.nextMeta}>Bring geometry box and completed worksheet</Text></View></View>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas }, page: { flex: 1 }, content: { padding: spacing.md, paddingTop: 24, paddingBottom: 110 }, flex: { flex: 1 }, pressed: { opacity: 0.84 },
  kicker: { color: colors.maroon, fontSize: 10, fontWeight: '900', letterSpacing: 1.2 }, title: { color: colors.ink, fontSize: 32, fontWeight: '900', marginTop: 7 }, subtitle: { color: colors.slate, fontSize: 13, marginTop: 6 },
  performance: { backgroundColor: colors.maroon, borderRadius: 23, padding: 20, marginTop: 22, overflow: 'hidden', ...shadow }, performanceTop: { flexDirection: 'row', justifyContent: 'space-between' }, performanceLabel: { color: colors.gold, fontSize: 9, fontWeight: '900', letterSpacing: 1 }, performanceValue: { color: colors.white, fontSize: 39, fontWeight: '900', marginTop: 5 },
  trend: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.greenSoft, alignSelf: 'flex-start', paddingHorizontal: 9, paddingVertical: 6, borderRadius: 99 }, trendText: { color: colors.green, fontSize: 10, fontWeight: '900' },
  performanceBottom: { flexDirection: 'row', alignItems: 'center', gap: 28, borderTopWidth: 1, borderTopColor: '#30465C', paddingTop: 14, marginTop: 12 }, performanceMeta: { color: '#9FB0C1', fontSize: 9 }, performanceStrong: { color: colors.white, fontSize: 13, fontWeight: '900', marginTop: 3 }, openCircle: { marginLeft: 'auto', width: 36, height: 36, borderRadius: 18, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  section: { color: colors.ink, fontSize: 18, fontWeight: '900', marginTop: 28, marginBottom: 12 }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 }, module: { width: '31.6%', minHeight: 130, backgroundColor: colors.white, borderRadius: 17, paddingHorizontal: 7, paddingVertical: 13, alignItems: 'center', justifyContent: 'center', ...shadow }, moduleIcon: { width: 43, height: 43, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }, moduleTitle: { color: colors.ink, fontSize: 10, lineHeight: 14, fontWeight: '900', marginTop: 9, textAlign: 'center' }, moduleNote: { color: colors.muted, fontSize: 7, lineHeight: 10, marginTop: 3, textAlign: 'center' },
  nextCard: { backgroundColor: colors.white, borderRadius: 18, padding: 14, flexDirection: 'row', alignItems: 'center', ...shadow }, dateBadge: { width: 49, height: 55, borderRadius: 14, backgroundColor: colors.redSoft, alignItems: 'center', justifyContent: 'center', marginRight: 12 }, dateDay: { color: colors.maroon, fontSize: 18, fontWeight: '900' }, dateMonth: { color: colors.maroon, fontSize: 8, fontWeight: '900' }, nextKicker: { color: colors.amber, fontSize: 8, fontWeight: '900', letterSpacing: 0.7 }, nextTitle: { color: colors.ink, fontSize: 13, fontWeight: '900', marginTop: 4 }, nextMeta: { color: colors.slate, fontSize: 10, marginTop: 4 },
});
