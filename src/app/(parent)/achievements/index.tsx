import { Award, BookOpenCheck, Medal, Palette, Sparkles, Trophy } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandGradient } from '../../../components/BrandGradient';
import { ScreenHeader } from '../../../components/ScreenHeader';
import { ScreenSkeleton } from '../../../components/ScreenSkeleton';
import { usePreviewLoading } from '../../../hooks/usePreviewLoading';
import { achievements } from '../../../mocks/data';
import { colors, shadow, spacing } from '../../../theme';

const filters = ['All', 'Academic', 'Creative', 'Sports'] as const;
const icons = { Academic: BookOpenCheck, Creative: Palette, Sports: Medal, School: Sparkles };
const accents = { Academic: colors.navy, Creative: colors.maroon, Sports: colors.green, School: colors.amber };

export default function Achievements() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const visible = useMemo(() => achievements.filter((item) => filter === 'All' || item.category === filter), [filter]);
  const isLoading = usePreviewLoading();
  if (isLoading) return <ScreenSkeleton variant="achievements" />;
  return <SafeAreaView style={styles.safe} edges={['top']}><ScrollView style={styles.page} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <ScreenHeader title="Achievements" eyebrow="AARAV’S PROGRESS · 2026–27" subtitle="Celebrating academic, creative and sporting milestones." />
    <BrandGradient style={styles.hero}><View style={styles.trophy}><Trophy size={34} color={colors.gold} /></View><View style={styles.flex}><Text style={styles.heroLabel}>A YEAR OF PROGRESS</Text><Text style={styles.heroTitle}>4 achievements earned</Text><Text style={styles.heroText}>Keep learning, creating and leading.</Text></View></BrandGradient>
    <View style={styles.stats}><Stat value="2" label="Gold awards" /><Stat value="1" label="Silver award" /><Stat value="4" label="School badges" /></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>{filters.map((item) => <Pressable key={item} style={[styles.filter, filter === item && styles.filterActive]} onPress={() => setFilter(item)}><Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{item}</Text></Pressable>)}</ScrollView>
    <Text style={styles.section}>{filter === 'All' ? 'Achievement timeline' : `${filter} achievements`}</Text>
    {visible.map((item, index) => { const Icon = icons[item.category as keyof typeof icons] ?? Award; const accent = accents[item.category as keyof typeof accents] ?? colors.maroon; return <View key={item.id} style={styles.timelineRow}>
      <View style={styles.timeline}><View style={[styles.timelineIcon, { backgroundColor: `${accent}18` }]}><Icon size={20} color={accent} /></View>{index < visible.length - 1 ? <View style={styles.line} /> : null}</View>
      <View style={styles.card}><View style={styles.cardTop}><Text style={[styles.category, { color: accent }]}>{item.category.toUpperCase()}</Text><Text style={styles.date}>{item.date}</Text></View><Text style={styles.cardTitle}>{item.title}</Text><View style={styles.awardRow}><Award size={14} color={colors.gold} /><Text style={styles.award}>{item.award}</Text></View><Text style={styles.description}>{item.description}</Text></View>
    </View>; })}
  </ScrollView></SafeAreaView>;
}

function Stat({ value, label }: { value: string; label: string }) { return <View style={styles.stat}><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>; }

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas }, page: { flex: 1 }, content: { padding: spacing.md, paddingTop: 12, paddingBottom: 110 }, flex: { flex: 1 },
  hero: { backgroundColor: colors.navy, borderRadius: 23, padding: 20, flexDirection: 'row', alignItems: 'center', marginTop: 20, ...shadow }, trophy: { width: 66, height: 66, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 14 }, heroLabel: { color: colors.gold, fontSize: 8, fontWeight: '900', letterSpacing: 1 }, heroTitle: { color: colors.white, fontSize: 18, fontWeight: '900', marginTop: 5 }, heroText: { color: '#B8C7D7', fontSize: 9, marginTop: 5 },
  stats: { backgroundColor: colors.white, borderRadius: 17, paddingVertical: 14, flexDirection: 'row', marginTop: 10, ...shadow }, stat: { flex: 1, alignItems: 'center' }, statValue: { color: colors.ink, fontSize: 17, fontWeight: '900' }, statLabel: { color: colors.muted, fontSize: 8, marginTop: 4 },
  filters: { gap: 8, paddingVertical: 18 }, filter: { paddingHorizontal: 15, paddingVertical: 9, backgroundColor: colors.white, borderRadius: 99, borderWidth: 1, borderColor: colors.line }, filterActive: { backgroundColor: colors.maroon, borderColor: colors.maroon }, filterText: { color: colors.slate, fontSize: 10, fontWeight: '800' }, filterTextActive: { color: colors.white }, section: { color: colors.ink, fontSize: 18, fontWeight: '900', marginBottom: 13 },
  timelineRow: { flexDirection: 'row', minHeight: 180 }, timeline: { width: 50, alignItems: 'center' }, timelineIcon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', zIndex: 1 }, line: { flex: 1, width: 1, backgroundColor: colors.line }, card: { flex: 1, backgroundColor: colors.white, borderRadius: 18, padding: 15, marginBottom: 11, ...shadow }, cardTop: { flexDirection: 'row', justifyContent: 'space-between' }, category: { fontSize: 8, fontWeight: '900', letterSpacing: 0.7 }, date: { color: colors.muted, fontSize: 8 }, cardTitle: { color: colors.ink, fontSize: 14, lineHeight: 19, fontWeight: '900', marginTop: 8 }, awardRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 9 }, award: { color: colors.amber, fontSize: 10, fontWeight: '900' }, description: { color: colors.slate, fontSize: 10, lineHeight: 16, marginTop: 8 },
});
