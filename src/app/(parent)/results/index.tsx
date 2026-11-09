import { Download, MessageSquareText, TrendingUp } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandGradient } from '../../../components/BrandGradient';
import { ScreenHeader } from '../../../components/ScreenHeader';
import { ScreenSkeleton } from '../../../components/ScreenSkeleton';
import { usePreviewLoading } from '../../../hooks/usePreviewLoading';
import { results } from '../../../mocks/data';
import { colors, shadow, spacing } from '../../../theme';

export default function Results() {
  const [term, setTerm] = useState<'Half-yearly' | 'Periodic test'>('Half-yearly');
  const isLoading = usePreviewLoading();
  if (isLoading) return <ScreenSkeleton variant="results" />;
  const multiplier = term === 'Half-yearly' ? 1 : 0.92;
  const average = Math.round(results.reduce((sum, item) => sum + item.marks * multiplier, 0) / results.length);
  return <SafeAreaView style={styles.safe} edges={['top']}><ScrollView style={styles.page} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <ScreenHeader title="Examination results" eyebrow="ACADEMIC SESSION 2026–27" subtitle="Detailed marks, progress and teacher feedback." />
    <View style={styles.segment}>{(['Half-yearly', 'Periodic test'] as const).map((item) => <Pressable key={item} style={[styles.segmentItem, term === item && styles.segmentActive]} onPress={() => setTerm(item)}><Text style={[styles.segmentText, term === item && styles.segmentTextActive]}>{item}</Text></Pressable>)}</View>

    <BrandGradient style={styles.hero}><View><Text style={styles.heroLabel}>OVERALL SCORE</Text><Text style={styles.heroValue}>{average}%</Text><View style={styles.improvement}><TrendingUp size={14} color={colors.green} /><Text style={styles.improvementText}>Improved 3.2% from last term</Text></View></View><View style={styles.rankCircle}><Text style={styles.rankValue}>6</Text><Text style={styles.rankLabel}>CLASS RANK</Text></View></BrandGradient>

    <View style={styles.summaryRow}><Summary value="A2" label="Overall grade" /><Summary value="412/500" label="Total marks" /><Summary value="92%" label="Attendance" /></View>
    <View style={styles.sectionRow}><Text style={styles.section}>Subject performance</Text><Pressable style={styles.download}><Download size={14} color={colors.maroon} /><Text style={styles.downloadText}>Report</Text></Pressable></View>
    {results.map((result) => { const marks = Math.round(result.marks * multiplier); return <View key={result.subject} style={styles.subjectCard}>
      <View style={styles.subjectTop}><View><Text style={styles.subjectName}>{result.subject}</Text><Text style={styles.subjectMeta}>{marks} of {result.total} marks</Text></View><View style={styles.grade}><Text style={styles.gradeText}>{marks >= 90 ? 'A1' : marks >= 80 ? 'A2' : 'B1'}</Text></View></View>
      <View style={styles.progress}><View style={[styles.progressFill, { width: `${marks}%`, backgroundColor: marks >= 85 ? colors.green : colors.gold }]} /></View><View style={styles.cardBottom}><Text style={styles.percent}>{marks}%</Text><Text style={styles.trend}>{result.trend} this term</Text></View>
    </View>; })}

    <Text style={styles.section}>Class teacher’s note</Text><View style={styles.comment}><View style={styles.commentIcon}><MessageSquareText size={20} color={colors.maroon} /></View><View style={styles.flex}><Text style={styles.commentTitle}>Consistent progress</Text><Text style={styles.commentText}>Aarav participates actively and has shown excellent improvement in Mathematics and Science. More reading practice will strengthen written expression.</Text><Text style={styles.teacher}>— Mrs. Neha Sharma</Text></View></View>
  </ScrollView></SafeAreaView>;
}

function Summary({ value, label }: { value: string; label: string }) { return <View style={styles.summary}><Text style={styles.summaryValue}>{value}</Text><Text style={styles.summaryLabel}>{label}</Text></View>; }

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas }, page: { flex: 1 }, content: { padding: spacing.md, paddingTop: 12, paddingBottom: 10 }, flex: { flex: 1 },
  segment: { flexDirection: 'row', backgroundColor: '#E9EDF2', borderRadius: 14, padding: 4, marginTop: 20 }, segmentItem: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 11 }, segmentActive: { backgroundColor: colors.white, ...shadow }, segmentText: { color: colors.slate, fontSize: 11, fontWeight: '800' }, segmentTextActive: { color: colors.maroon },
  hero: { backgroundColor: colors.navy, borderRadius: 23, padding: 20, marginTop: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...shadow }, heroLabel: { color: colors.gold, fontSize: 9, fontWeight: '900', letterSpacing: 1.1 }, heroValue: { color: colors.white, fontSize: 40, fontWeight: '900', marginTop: 5 }, improvement: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 }, improvementText: { color: '#BBD8CA', fontSize: 9 },
  rankCircle: { width: 82, height: 82, borderRadius: 41, borderWidth: 6, borderColor: colors.gold, alignItems: 'center', justifyContent: 'center' }, rankValue: { color: colors.white, fontSize: 26, fontWeight: '900' }, rankLabel: { color: '#B8C7D7', fontSize: 7, fontWeight: '900' },
  summaryRow: { flexDirection: 'row', backgroundColor: colors.white, borderRadius: 17, marginTop: 10, paddingVertical: 15, ...shadow }, summary: { flex: 1, alignItems: 'center' }, summaryValue: { color: colors.ink, fontSize: 15, fontWeight: '900' }, summaryLabel: { color: colors.muted, fontSize: 8, marginTop: 4 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, section: { color: colors.ink, fontSize: 18, fontWeight: '900', marginTop: 28, marginBottom: 12 }, download: { flexDirection: 'row', gap: 5, alignItems: 'center', marginTop: 19 }, downloadText: { color: colors.maroon, fontSize: 10, fontWeight: '900' },
  subjectCard: { backgroundColor: colors.white, borderRadius: 17, padding: 15, marginBottom: 9, ...shadow }, subjectTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, subjectName: { color: colors.ink, fontSize: 13, fontWeight: '900' }, subjectMeta: { color: colors.muted, fontSize: 9, marginTop: 4 }, grade: { width: 34, height: 34, borderRadius: 11, backgroundColor: colors.greenSoft, alignItems: 'center', justifyContent: 'center' }, gradeText: { color: colors.green, fontSize: 11, fontWeight: '900' }, progress: { height: 7, backgroundColor: colors.line, borderRadius: 5, marginTop: 14, overflow: 'hidden' }, progressFill: { height: 7, borderRadius: 5 }, cardBottom: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }, percent: { color: colors.ink, fontSize: 10, fontWeight: '900' }, trend: { color: colors.green, fontSize: 9, fontWeight: '700' },
  comment: { backgroundColor: colors.goldSoft, borderRadius: 18, padding: 15, flexDirection: 'row' }, commentIcon: { width: 40, height: 40, borderRadius: 13, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginRight: 11 }, commentTitle: { color: colors.ink, fontSize: 13, fontWeight: '900' }, commentText: { color: colors.slate, fontSize: 11, lineHeight: 18, marginTop: 5 }, teacher: { color: colors.maroon, fontSize: 10, fontWeight: '800', marginTop: 9 },
});
