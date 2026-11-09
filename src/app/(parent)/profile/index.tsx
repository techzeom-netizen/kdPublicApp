import { router } from 'expo-router';
import { Bell, ChevronRight, CircleHelp, FileText, LogOut, Settings, ShieldCheck, UserRound } from 'lucide-react-native';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '../../../components/Logo';
import { BrandGradient } from '../../../components/BrandGradient';
import { ScreenSkeleton } from '../../../components/ScreenSkeleton';
import { usePreviewLoading } from '../../../hooks/usePreviewLoading';
import { student } from '../../../mocks/data';
import { colors, shadow, spacing } from '../../../theme';

const settings = [
  { label: 'Personal information', note: 'Contact and account details', icon: UserRound },
  { label: 'School documents', note: 'Forms, policies and certificates', icon: FileText },
  { label: 'Notification preferences', note: 'Attendance, fees and notices', icon: Bell },
  { label: 'Privacy & security', note: 'Password and connected devices', icon: ShieldCheck },
  { label: 'Help and support', note: 'Contact the school office', icon: CircleHelp },
];

export default function Profile() {
  const isLoading = usePreviewLoading();
  if (isLoading) return <ScreenSkeleton variant="profile" />;
  return <SafeAreaView style={styles.safe} edges={['top']}><ScrollView style={styles.page} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <View style={styles.header}><Logo /><View style={styles.settingsIcon}><Settings size={20} color={colors.navy} /></View></View>
    <Text style={styles.kicker}>PARENT ACCOUNT</Text><Text style={styles.title}>Ananya Kumar</Text><Text style={styles.sub}>ananya.kumar@example.com · 1 child connected</Text>

    <Text style={styles.section}>My child</Text><Pressable style={styles.child} onPress={() => router.push('/(parent)/student/aarav')}><BrandGradient style={StyleSheet.absoluteFill} /><Image source={{ uri: student.avatar }} style={styles.avatar} /><View style={styles.flex}><Text style={styles.childName}>{student.name}</Text><Text style={styles.childMeta}>{student.className} · Roll no. {student.rollNo}</Text><Text style={styles.admission}>{student.admissionNo}</Text></View><ChevronRight size={20} color={colors.white} /></Pressable>

    <Text style={styles.section}>Account settings</Text><View style={styles.list}>{settings.map(({ label, note, icon: Icon }, index) => <Pressable key={label} style={[styles.row, index === settings.length - 1 && styles.rowLast]} onPress={() => Alert.alert(label, 'This preview screen will connect to the school account service in production.')}>
      <View style={styles.rowIcon}><Icon size={19} color={colors.maroon} /></View><View style={styles.flex}><Text style={styles.rowTitle}>{label}</Text><Text style={styles.rowNote}>{note}</Text></View><ChevronRight size={18} color={colors.muted} />
    </Pressable>)}</View>
    <Pressable style={styles.signOut} onPress={() => router.replace('/(auth)/login')}><LogOut size={19} color={colors.red} /><Text style={styles.signOutText}>Sign out</Text></Pressable>
    <Text style={styles.version}>KD Parent Connect · Preview 1.0.0</Text>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas }, page: { flex: 1 }, content: { padding: spacing.md, paddingTop: 14, paddingBottom: 110 }, flex: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, settingsIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', ...shadow },
  kicker: { color: colors.maroon, fontSize: 10, fontWeight: '900', letterSpacing: 1.1, marginTop: 28 }, title: { color: colors.ink, fontSize: 29, fontWeight: '900', marginTop: 7 }, sub: { color: colors.slate, fontSize: 11, marginTop: 6 },
  section: { color: colors.ink, fontSize: 18, fontWeight: '900', marginTop: 28, marginBottom: 11 }, child: { backgroundColor: colors.maroon, borderRadius: 20, padding: 15, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', ...shadow }, avatar: { width: 55, height: 55, borderRadius: 18, marginRight: 12 }, childName: { color: colors.white, fontSize: 15, fontWeight: '900' }, childMeta: { color: '#F0DADF', fontSize: 9, marginTop: 4 }, admission: { color: colors.gold, fontSize: 8, fontWeight: '800', marginTop: 5 },
  list: { backgroundColor: colors.white, borderRadius: 19, paddingHorizontal: 14, ...shadow }, row: { minHeight: 69, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.line }, rowLast: { borderBottomWidth: 0 }, rowIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.redSoft, alignItems: 'center', justifyContent: 'center', marginRight: 11 }, rowTitle: { color: colors.ink, fontSize: 12, fontWeight: '900' }, rowNote: { color: colors.muted, fontSize: 8, marginTop: 4 },
  signOut: { minHeight: 52, borderRadius: 15, backgroundColor: colors.redSoft, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 18 }, signOutText: { color: colors.red, fontSize: 13, fontWeight: '900' }, version: { color: colors.muted, fontSize: 9, textAlign: 'center', marginTop: 20 },
});
