import { router } from 'expo-router';
import { Award, Bell, BookCheck, BusFront, CalendarCheck2, Check, ChevronRight, Clock3, GraduationCap, IndianRupee } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '../../components/Logo';
import { BrandGradient } from '../../components/BrandGradient';
import { NotificationPanel } from '../../components/NotificationPanel';
import { ScreenSkeleton } from '../../components/ScreenSkeleton';
import { SectionTitle } from '../../components/SectionTitle';
import { usePreviewLoading } from '../../hooks/usePreviewLoading';
import { homework, notices, student } from '../../mocks/data';
import { colors, shadow, spacing } from '../../theme';

export default function Dashboard() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const isLoading = usePreviewLoading();
  if (isLoading) return <ScreenSkeleton variant="dashboard" />;
  return <><SafeAreaView style={styles.safe} edges={['top']}>
    <ScrollView style={styles.page} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <BrandGradient style={styles.topHero}>
        <View style={styles.header}><Logo dark /><Pressable style={styles.bell} onPress={() => setNotificationsOpen(true)} accessibilityLabel={`Notifications, ${unreadCount} unread`}><Bell size={21} color={colors.white} />{unreadCount ? <View style={styles.bellBadge}><Text style={styles.bellBadgeText}>{unreadCount}</Text></View> : null}</Pressable></View>
        <Text style={styles.greeting}>Good morning, Ananya</Text><Text style={styles.sub}>Here’s Aarav’s school day at a glance.</Text>
      </BrandGradient>
      <View style={styles.body}>

      <Pressable style={({ pressed }) => [styles.studentCard, pressed && styles.pressed]} onPress={() => router.push('/(parent)/student/aarav')} accessibilityRole="button" accessibilityLabel="Open Aarav Kumar student profile">
        <BrandGradient style={StyleSheet.absoluteFill} />
        <View style={styles.avatarRing}><Image source={{ uri: student.avatar }} style={styles.avatar} /></View>
        <View style={styles.flex}><Text style={styles.studentName}>{student.name}</Text><Text style={styles.studentMeta}>{student.className}</Text><Text style={styles.admission}>{student.admissionNo}</Text></View>
        <View style={styles.cardChevron}><ChevronRight size={21} color={colors.navy} /></View>
      </Pressable>

      <SectionTitle title="Today at a glance" />
      <View style={styles.grid}>
        <QuickCard icon={<CalendarCheck2 size={22} color={colors.green} />} label="Attendance" value="Present" note="Marked at 8:14 AM" tint={colors.greenSoft} onPress={() => router.push('/(parent)/attendance')} />
        <QuickCard icon={<IndianRupee size={22} color={colors.maroon} />} label="Fees pending" value="₹10,000" note="Due 15 Nov" tint={colors.redSoft} onPress={() => router.push('/(parent)/fees')} />
      </View>

      <SectionTitle title="Explore" />
      <View style={styles.shortcutRow}>
        <Shortcut icon={<GraduationCap size={19} color={colors.maroon} />} label="Results" onPress={() => router.push('/(parent)/results')} />
        <Shortcut icon={<BookCheck size={19} color={colors.navy} />} label="Homework" onPress={() => router.push('/(parent)/homework')} />
        <Shortcut icon={<Award size={19} color={colors.amber} />} label="Awards" onPress={() => router.push('/(parent)/achievements')} />
      </View>

      <SectionTitle title="School notice board" action="View all" onAction={() => router.push('/(parent)/notices')} />
      {notices.slice(0, 3).map((notice, index) => <Pressable key={notice.title} style={styles.notice} onPress={() => router.push('/(parent)/notices')}>
        <View style={[styles.noticeDate, index === 1 && styles.noticeDateGold]}><Text style={styles.dateTop}>{notice.date}</Text><Text style={styles.dateBottom}>{notice.priority}</Text></View>
        <View style={styles.flex}><Text style={styles.noticeCategory}>{notice.category}</Text><Text style={styles.noticeTitle}>{notice.title}</Text></View><ChevronRight size={18} color={colors.muted} />
      </Pressable>)}

      <SectionTitle title="Homework" action="View diary" onAction={() => router.push('/(parent)/homework')} />
      {homework.slice(0, 2).map((item) => <Pressable key={item.title} style={styles.homework} onPress={() => router.push('/(parent)/homework')}>
        <View style={styles.subjectDot}><Text style={styles.dotText}>{item.subject.slice(0, 1)}</Text></View>
        <View style={styles.flex}><Text style={styles.homeworkSubject}>{item.subject}</Text><Text style={styles.homeworkTitle}>{item.title}</Text></View>
        <View style={styles.dueTag}><Clock3 size={11} color={colors.red} /><Text style={styles.pending}>{item.due}</Text></View>
      </Pressable>)}

      <Pressable style={({ pressed }) => [styles.bus, pressed && styles.pressed]} onPress={() => router.push('/(parent)/transport')}><BrandGradient style={StyleSheet.absoluteFill} /><View style={styles.busIcon}><BusFront size={25} color={colors.gold} /></View><View style={styles.flex}><Text style={styles.busKicker}>SCHOOL TRANSPORT · LIVE</Text><Text style={styles.busTitle}>Bus 04 is on its way</Text><Text style={styles.busText}>Green Park stop · ETA 7:42 AM</Text></View><ChevronRight size={21} color={colors.white} /></Pressable>
      </View>
    </ScrollView>
  </SafeAreaView><NotificationPanel visible={notificationsOpen} onClose={() => setNotificationsOpen(false)} onUnreadCountChange={setUnreadCount} /></>;
}

function QuickCard({ icon, label, value, note, tint, onPress }: { icon: React.ReactNode; label: string; value: string; note: string; tint: string; onPress: () => void }) {
  return <Pressable style={({ pressed }) => [styles.quickCard, pressed && styles.pressed]} onPress={onPress} accessibilityRole="button">
    <View style={[styles.quickIcon, { backgroundColor: tint }]}>{icon}</View><Text style={styles.quickLabel}>{label}</Text><View style={styles.valueRow}><Text style={styles.quickValue}>{value}</Text>{value === 'Present' ? <Check size={16} color={colors.green} strokeWidth={3} /> : null}</View><Text style={styles.quickNote}>{note}</Text>
  </Pressable>;
}

function Shortcut({ icon, label, onPress }: { icon: React.ReactNode; label: string; onPress: () => void }) { return <Pressable style={({ pressed }) => [styles.shortcut, pressed && styles.pressed]} onPress={onPress}><View style={styles.shortcutIcon}>{icon}</View><Text style={styles.shortcutLabel}>{label}</Text></Pressable>; }

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas }, page: { flex: 1 }, content: { paddingBottom: 110 }, body: { backgroundColor: colors.canvas, borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -25, paddingHorizontal: spacing.md, paddingTop: 19 }, flex: { flex: 1 }, pressed: { opacity: 0.88 },
  topHero: { paddingHorizontal: spacing.md, paddingTop: 14, paddingBottom: 49, borderBottomLeftRadius: 34, borderBottomRightRadius: 34 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, bell: { width: 43, height: 43, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.13)', alignItems: 'center', justifyContent: 'center' }, bellBadge: { position: 'absolute', right: 5, top: 4, minWidth: 17, height: 17, borderRadius: 9, paddingHorizontal: 4, backgroundColor: colors.gold, borderWidth: 1.5, borderColor: colors.white, alignItems: 'center', justifyContent: 'center' }, bellBadgeText: { color: colors.navy, fontSize: 8, fontWeight: '900' },
  greeting: { color: colors.white, fontSize: 27, lineHeight: 34, fontWeight: '900', marginTop: 27 }, sub: { color: '#F0DADF', fontSize: 14, marginTop: 5 },
  studentCard: { backgroundColor: colors.maroon, borderRadius: 22, padding: 16, marginTop: 0, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', ...shadow },
  avatarRing: { borderWidth: 2, borderColor: colors.gold, borderRadius: 33, padding: 2, marginRight: 13 }, avatar: { width: 58, height: 58, borderRadius: 29 }, studentName: { color: colors.white, fontSize: 18, fontWeight: '900' }, studentMeta: { color: '#D5DEE8', marginTop: 4, fontSize: 12 }, admission: { color: colors.gold, marginTop: 7, fontSize: 10, fontWeight: '800', letterSpacing: 0.4 },
  cardChevron: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center' }, grid: { flexDirection: 'row', gap: 10 },
  quickCard: { flex: 1, minHeight: 160, backgroundColor: colors.white, borderRadius: 18, padding: 14, ...shadow }, quickIcon: { width: 41, height: 41, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  quickLabel: { color: colors.slate, fontSize: 10, fontWeight: '800' }, valueRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 6 }, quickValue: { color: colors.ink, fontSize: 20, fontWeight: '900' }, quickNote: { color: colors.muted, fontSize: 9, marginTop: 5 },
  shortcutRow: { flexDirection: 'row', gap: 9 }, shortcut: { flex: 1, backgroundColor: colors.white, borderRadius: 16, paddingVertical: 13, alignItems: 'center', ...shadow }, shortcutIcon: { width: 37, height: 37, borderRadius: 13, backgroundColor: colors.canvas, alignItems: 'center', justifyContent: 'center' }, shortcutLabel: { color: colors.ink, fontSize: 10, fontWeight: '800', marginTop: 7 },
  notice: { backgroundColor: colors.white, borderRadius: 16, padding: 13, marginBottom: 9, flexDirection: 'row', alignItems: 'center', ...shadow }, noticeDate: { width: 54, height: 52, borderRadius: 13, backgroundColor: colors.redSoft, alignItems: 'center', justifyContent: 'center', marginRight: 12 }, noticeDateGold: { backgroundColor: colors.goldSoft },
  dateTop: { color: colors.maroon, fontWeight: '900', fontSize: 12 }, dateBottom: { color: colors.slate, fontSize: 8, marginTop: 3 }, noticeCategory: { color: colors.amber, fontSize: 9, fontWeight: '900', letterSpacing: 0.5 }, noticeTitle: { color: colors.ink, fontWeight: '800', marginTop: 4, fontSize: 13, lineHeight: 18, paddingRight: 5 },
  homework: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 16, padding: 13, marginBottom: 9, ...shadow }, subjectDot: { width: 38, height: 38, borderRadius: 13, backgroundColor: colors.navyTint, alignItems: 'center', justifyContent: 'center', marginRight: 11 }, dotText: { color: colors.navy, fontWeight: '900' }, homeworkSubject: { color: colors.maroon, fontSize: 9, fontWeight: '900', letterSpacing: 0.4 }, homeworkTitle: { color: colors.ink, fontWeight: '800', marginTop: 3, fontSize: 12, paddingRight: 4 }, dueTag: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: colors.redSoft, borderRadius: 8, paddingHorizontal: 6, paddingVertical: 5 }, pending: { color: colors.red, fontSize: 8, fontWeight: '800' },
  bus: { backgroundColor: colors.maroon, borderRadius: 19, padding: 16, marginTop: 19, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }, busIcon: { width: 46, height: 46, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.10)', alignItems: 'center', justifyContent: 'center', marginRight: 12 }, busKicker: { color: colors.gold, fontSize: 8, fontWeight: '900', letterSpacing: 0.8 }, busTitle: { color: colors.white, fontSize: 15, fontWeight: '900', marginTop: 5 }, busText: { color: '#B8C7D7', marginTop: 4, fontSize: 10 },
});
