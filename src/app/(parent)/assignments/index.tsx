import { CalendarDays, CheckCircle2, ClipboardList, Clock3, FileText, Paperclip, Send } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandGradient } from '../../../components/BrandGradient';
import { ScreenHeader } from '../../../components/ScreenHeader';
import { ScreenSkeleton } from '../../../components/ScreenSkeleton';
import { usePreviewLoading } from '../../../hooks/usePreviewLoading';
import { colors, shadow, spacing } from '../../../theme';

type Filter = 'Active' | 'Submitted' | 'Graded';

const assignments = [
  { id: 'science-herbarium', subject: 'Science', title: 'Create a mini herbarium', detail: 'Collect and label four different leaves. Add one fact about each plant.', due: 'Due 13 Nov', teacher: 'Mr. Dev', files: '2 resources', color: colors.green, status: 'Active' as Filter },
  { id: 'math-model', subject: 'Mathematics', title: 'Fractions model activity', detail: 'Make a working fractions model using coloured paper and upload one photo.', due: 'Due 16 Nov', teacher: 'Ms. Ritu', files: '1 worksheet', color: colors.navy, status: 'Active' as Filter },
  { id: 'english-book', subject: 'English', title: 'Book review: The Blue Umbrella', detail: 'Write a 250-word review using the template shared in class.', due: 'Submitted 7 Nov', teacher: 'Mrs. Mehta', files: '1 submission', color: colors.maroon, status: 'Submitted' as Filter },
  { id: 'sst-map', subject: 'Social Science', title: 'India rivers map', detail: 'Mark and label ten major rivers on the outline map.', due: '18 / 20 marks', teacher: 'Mrs. Kaur', files: 'Teacher feedback', color: colors.amber, status: 'Graded' as Filter },
];

export default function Assignments() {
  const [filter, setFilter] = useState<Filter>('Active');
  const [submittedIds, setSubmittedIds] = useState<string[]>([]);
  const isLoading = usePreviewLoading();
  const visible = useMemo(() => assignments.filter((item) => filter === 'Submitted' ? item.status === 'Submitted' || submittedIds.includes(item.id) : item.status === filter && !submittedIds.includes(item.id)), [filter, submittedIds]);
  if (isLoading) return <ScreenSkeleton variant="homework" />;

  return <SafeAreaView style={styles.safe} edges={['top']}><ScrollView style={styles.page} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <ScreenHeader title="Assignments" eyebrow="CLASS 5-A · ACADEMIC WORK" subtitle="Resources, submissions and teacher feedback in one place." />

    <BrandGradient style={styles.summary}>
      <View style={styles.summaryIcon}><ClipboardList size={24} color={colors.gold} /></View>
      <View style={styles.flex}><Text style={styles.summaryLabel}>ACTIVE ASSIGNMENTS</Text><Text style={styles.summaryTitle}>{assignments.filter((item) => item.status === 'Active').length - submittedIds.length} need submission</Text><Text style={styles.summaryText}>Next deadline · Thursday, 13 Nov</Text></View>
      <View style={styles.score}><Text style={styles.scoreValue}>1</Text><Text style={styles.scoreLabel}>GRADED</Text></View>
    </BrandGradient>

    <View style={styles.filters}>{(['Active', 'Submitted', 'Graded'] as Filter[]).map((item) => <Pressable key={item} style={[styles.filter, filter === item && styles.filterActive]} onPress={() => setFilter(item)}><Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{item}</Text></Pressable>)}</View>

    <View style={styles.sectionRow}><Text style={styles.sectionTitle}>{filter} work</Text><Text style={styles.sectionCount}>{visible.length} items</Text></View>
    {visible.map((item) => <View key={item.id} style={styles.card}>
      <View style={styles.cardTop}><View style={[styles.subjectIcon, { backgroundColor: `${item.color}18` }]}><FileText size={20} color={item.color} /></View><View style={styles.flex}><Text style={[styles.subject, { color: item.color }]}>{item.subject.toUpperCase()}</Text><Text style={styles.assignmentTitle}>{item.title}</Text></View>{item.status === 'Graded' ? <View style={styles.gradedBadge}><CheckCircle2 size={13} color={colors.green} /><Text style={styles.gradedText}>Graded</Text></View> : null}</View>
      <Text style={styles.detail}>{item.detail}</Text>
      <View style={styles.metaRow}><View style={styles.meta}><Clock3 size={13} color={filter === 'Active' ? colors.red : colors.slate} /><Text style={[styles.metaText, filter === 'Active' && styles.due]}>{submittedIds.includes(item.id) ? 'Submitted just now' : item.due}</Text></View><View style={styles.meta}><Paperclip size={13} color={colors.slate} /><Text style={styles.metaText}>{item.files}</Text></View></View>
      <View style={styles.teacherRow}><View><Text style={styles.teacherLabel}>ASSIGNED BY</Text><Text style={styles.teacher}>{item.teacher}</Text></View>{filter === 'Active' ? <Pressable style={({ pressed }) => [styles.submitButton, pressed && styles.pressed]} onPress={() => setSubmittedIds((current) => [...current, item.id])}><Send size={14} color={colors.white} /><Text style={styles.submitText}>Submit work</Text></Pressable> : filter === 'Submitted' ? <View style={styles.statusPill}><CheckCircle2 size={13} color={colors.green} /><Text style={styles.statusText}>Turned in</Text></View> : <Pressable style={styles.feedbackButton}><Text style={styles.feedbackText}>View feedback</Text></Pressable>}</View>
    </View>)}

    {!visible.length ? <View style={styles.empty}><View style={styles.emptyIcon}><CheckCircle2 size={27} color={colors.green} /></View><Text style={styles.emptyTitle}>Nothing pending here</Text><Text style={styles.emptyText}>Submitted work will appear in the Submitted tab.</Text></View> : null}

    <View style={styles.tip}><CalendarDays size={20} color={colors.gold} /><View style={styles.flex}><Text style={styles.tipTitle}>Plan ahead</Text><Text style={styles.tipText}>Assignments also appear in the timetable and homework diary.</Text></View></View>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas }, page: { flex: 1 }, content: { padding: spacing.md, paddingTop: 12, paddingBottom: 110 }, flex: { flex: 1 }, pressed: { opacity: 0.84 },
  summary: { minHeight: 116, borderRadius: 22, padding: 16, marginTop: 20, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', ...shadow }, summaryIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.11)', alignItems: 'center', justifyContent: 'center', marginRight: 12 }, summaryLabel: { color: colors.gold, fontSize: 8, fontWeight: '900', letterSpacing: 0.8 }, summaryTitle: { color: colors.white, fontSize: 16, fontWeight: '900', marginTop: 5 }, summaryText: { color: '#E6CBD0', fontSize: 9, marginTop: 5 }, score: { alignItems: 'center', borderLeftWidth: 1, borderLeftColor: 'rgba(255,255,255,0.18)', paddingLeft: 13 }, scoreValue: { color: colors.white, fontSize: 24, fontWeight: '900' }, scoreLabel: { color: colors.gold, fontSize: 7, fontWeight: '900' },
  filters: { flexDirection: 'row', backgroundColor: '#E9EDF2', borderRadius: 14, padding: 4, marginTop: 15 }, filter: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 11 }, filterActive: { backgroundColor: colors.white, ...shadow }, filterText: { color: colors.slate, fontSize: 10, fontWeight: '800' }, filterTextActive: { color: colors.maroon },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25, marginBottom: 11 }, sectionTitle: { color: colors.ink, fontSize: 18, fontWeight: '900' }, sectionCount: { color: colors.slate, fontSize: 9, fontWeight: '800' },
  card: { backgroundColor: colors.white, borderRadius: 20, padding: 15, marginBottom: 11, ...shadow }, cardTop: { flexDirection: 'row', alignItems: 'flex-start' }, subjectIcon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 11 }, subject: { fontSize: 8, fontWeight: '900', letterSpacing: 0.7 }, assignmentTitle: { color: colors.ink, fontSize: 14, lineHeight: 19, fontWeight: '900', marginTop: 4 }, gradedBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: colors.greenSoft, borderRadius: 99, paddingHorizontal: 7, paddingVertical: 5 }, gradedText: { color: colors.green, fontSize: 8, fontWeight: '900' }, detail: { color: colors.slate, fontSize: 10, lineHeight: 16, marginTop: 13 }, metaRow: { flexDirection: 'row', gap: 16, borderBottomWidth: 1, borderBottomColor: colors.line, paddingVertical: 13 }, meta: { flexDirection: 'row', alignItems: 'center', gap: 4 }, metaText: { color: colors.slate, fontSize: 8, fontWeight: '700' }, due: { color: colors.red },
  teacherRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12 }, teacherLabel: { color: colors.muted, fontSize: 7, fontWeight: '900', letterSpacing: 0.6 }, teacher: { color: colors.ink, fontSize: 10, fontWeight: '800', marginTop: 3 }, submitButton: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.maroon, borderRadius: 11, paddingHorizontal: 13, paddingVertical: 9 }, submitText: { color: colors.white, fontSize: 9, fontWeight: '900' }, statusPill: { flexDirection: 'row', gap: 4, alignItems: 'center', backgroundColor: colors.greenSoft, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8 }, statusText: { color: colors.green, fontSize: 8, fontWeight: '900' }, feedbackButton: { backgroundColor: colors.navyTint, borderRadius: 10, paddingHorizontal: 11, paddingVertical: 8 }, feedbackText: { color: colors.navy, fontSize: 8, fontWeight: '900' },
  empty: { backgroundColor: colors.white, borderRadius: 20, padding: 30, alignItems: 'center', ...shadow }, emptyIcon: { width: 54, height: 54, borderRadius: 18, backgroundColor: colors.greenSoft, alignItems: 'center', justifyContent: 'center' }, emptyTitle: { color: colors.ink, fontSize: 16, fontWeight: '900', marginTop: 13 }, emptyText: { color: colors.slate, fontSize: 10, marginTop: 5, textAlign: 'center' },
  tip: { flexDirection: 'row', alignItems: 'center', gap: 11, backgroundColor: colors.navy, borderRadius: 17, padding: 14, marginTop: 10 }, tipTitle: { color: colors.white, fontSize: 11, fontWeight: '900' }, tipText: { color: '#B8C7D7', fontSize: 8, lineHeight: 13, marginTop: 3 },
});
