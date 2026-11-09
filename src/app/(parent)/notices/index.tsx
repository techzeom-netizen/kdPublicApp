import { Bell, CalendarDays, ChevronDown, Megaphone, Pin, Share2 } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../../../components/ScreenHeader';
import { ScreenSkeleton } from '../../../components/ScreenSkeleton';
import { usePreviewLoading } from '../../../hooks/usePreviewLoading';
import { notices } from '../../../mocks/data';
import { colors, shadow, spacing } from '../../../theme';

const categories = ['All', 'Academic', 'Meeting', 'School', 'Event'] as const;

export default function Notices() {
  const [category, setCategory] = useState<(typeof categories)[number]>('All');
  const [expanded, setExpanded] = useState<string>('winter-exams');
  const visible = useMemo(() => notices.filter((notice) => category === 'All' || notice.category === category), [category]);
  const isLoading = usePreviewLoading();
  if (isLoading) return <ScreenSkeleton variant="notices" />;
  return <SafeAreaView style={styles.safe} edges={['top']}><ScrollView style={styles.page} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <ScreenHeader title="Notice board" eyebrow="KD PUBLIC SCHOOL" subtitle="Official circulars, events and parent updates." />
    <View style={styles.alert}><View style={styles.alertIcon}><Bell size={20} color={colors.gold} /></View><View style={styles.flex}><Text style={styles.alertTitle}>2 unread notices</Text><Text style={styles.alertText}>Important updates are pinned at the top.</Text></View></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>{categories.map((item) => <Pressable key={item} style={[styles.filter, category === item && styles.filterActive]} onPress={() => setCategory(item)}><Text style={[styles.filterText, category === item && styles.filterTextActive]}>{item}</Text></Pressable>)}</ScrollView>
    <View style={styles.sectionRow}><Text style={styles.section}>{category === 'All' ? 'Latest notices' : category}</Text><Text style={styles.count}>{visible.length} updates</Text></View>
    {visible.map((notice, index) => { const isOpen = expanded === notice.id; return <View key={notice.id} style={[styles.notice, index === 0 && styles.pinnedNotice]}>
      <Pressable style={styles.noticeHeader} onPress={() => setExpanded(isOpen ? '' : notice.id)} accessibilityState={{ expanded: isOpen }}>
        <View style={[styles.noticeIcon, notice.priority === 'Important' ? styles.noticeIconImportant : null]}>{index === 0 ? <Pin size={18} color={colors.maroon} /> : <Megaphone size={18} color={colors.amber} />}</View>
        <View style={styles.flex}><View style={styles.metaRow}><Text style={styles.category}>{notice.category.toUpperCase()}</Text><Text style={styles.priority}>{notice.priority}</Text></View><Text style={styles.noticeTitle}>{notice.title}</Text><View style={styles.dateRow}><CalendarDays size={12} color={colors.muted} /><Text style={styles.date}>{notice.date} · KD Public School</Text></View></View>
        <View style={[styles.chevron, isOpen && styles.chevronOpen]}><ChevronDown size={18} color={colors.maroon} /></View>
      </Pressable>
      {isOpen ? <View style={styles.noticeBody}><Text style={styles.bodyText}>{notice.body}</Text><Pressable style={styles.share}><Share2 size={14} color={colors.maroon} /><Text style={styles.shareText}>Share notice</Text></Pressable></View> : null}
    </View>; })}
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas }, page: { flex: 1 }, content: { padding: spacing.md, paddingTop: 12, paddingBottom: 110 }, flex: { flex: 1 },
  alert: { backgroundColor: colors.navy, borderRadius: 18, padding: 15, flexDirection: 'row', alignItems: 'center', marginTop: 20 }, alertIcon: { width: 41, height: 41, borderRadius: 13, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 11 }, alertTitle: { color: colors.white, fontSize: 13, fontWeight: '900' }, alertText: { color: '#B8C7D7', fontSize: 9, marginTop: 4 },
  filters: { gap: 8, paddingVertical: 17 }, filter: { paddingHorizontal: 14, paddingVertical: 9, backgroundColor: colors.white, borderRadius: 99, borderWidth: 1, borderColor: colors.line }, filterActive: { backgroundColor: colors.maroon, borderColor: colors.maroon }, filterText: { color: colors.slate, fontSize: 10, fontWeight: '800' }, filterTextActive: { color: colors.white }, sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, section: { color: colors.ink, fontSize: 18, fontWeight: '900', marginBottom: 12 }, count: { color: colors.slate, fontSize: 9, marginBottom: 8 },
  notice: { backgroundColor: colors.white, borderRadius: 18, marginBottom: 10, overflow: 'hidden', ...shadow }, pinnedNotice: { borderWidth: 1, borderColor: '#ECD7DB' }, noticeHeader: { padding: 14, flexDirection: 'row', alignItems: 'flex-start' }, noticeIcon: { width: 40, height: 40, borderRadius: 13, backgroundColor: colors.goldSoft, alignItems: 'center', justifyContent: 'center', marginRight: 11 }, noticeIconImportant: { backgroundColor: colors.redSoft }, metaRow: { flexDirection: 'row', gap: 7, alignItems: 'center' }, category: { color: colors.maroon, fontSize: 8, fontWeight: '900', letterSpacing: 0.7 }, priority: { color: colors.amber, fontSize: 8, fontWeight: '800' }, noticeTitle: { color: colors.ink, fontSize: 13, lineHeight: 18, fontWeight: '900', marginTop: 6, paddingRight: 4 }, dateRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 }, date: { color: colors.muted, fontSize: 8 }, chevron: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.canvas, alignItems: 'center', justifyContent: 'center' }, chevronOpen: { transform: [{ rotate: '180deg' }] },
  noticeBody: { borderTopWidth: 1, borderTopColor: colors.line, padding: 15, paddingTop: 13 }, bodyText: { color: colors.slate, fontSize: 11, lineHeight: 18 }, share: { flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'flex-start', marginTop: 12 }, shareText: { color: colors.maroon, fontSize: 10, fontWeight: '900' },
});
