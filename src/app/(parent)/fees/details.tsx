import { router } from 'expo-router';
import { ArrowLeft, CalendarDays, CreditCard, IndianRupee, ShieldCheck } from 'lucide-react-native';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandGradient } from '../../../components/BrandGradient';
import { ScreenSkeleton } from '../../../components/ScreenSkeleton';
import { usePreviewLoading } from '../../../hooks/usePreviewLoading';
import { colors, shadow, spacing } from '../../../theme';

export default function FeeDetails() {
  const isLoading = usePreviewLoading();
  if (isLoading) return <ScreenSkeleton variant="feeDetails" />;
  return <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
    <ScrollView style={styles.page} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Pressable style={styles.back} onPress={() => router.back()} accessibilityLabel="Back to fees"><ArrowLeft size={21} color={colors.ink} /></Pressable>
      <Text style={styles.kicker}>FEE INVOICE · 2026–27</Text><Text style={styles.title}>Payment details</Text><Text style={styles.subtitle}>Aarav Kumar · Class 5-A · Admission KDPS-2026-0142</Text>

      <BrandGradient style={styles.totalCard}>
        <View style={styles.rupeeIcon}><IndianRupee size={25} color={colors.gold} /></View>
        <Text style={styles.totalLabel}>TOTAL AMOUNT DUE</Text><Text style={styles.totalAmount}>₹10,000</Text>
        <View style={styles.duePill}><CalendarDays size={14} color={colors.maroon} /><Text style={styles.dueText}>Pay by 15 November 2026</Text></View>
      </BrandGradient>

      <Text style={styles.section}>Fee breakdown</Text>
      <View style={styles.invoice}><Line label="Activity fee" detail="Annual co-curricular activities" value="₹5,000" /><Line label="Examination fee" detail="Term examination charges" value="₹5,000" /><Line label="Late fee" detail="No late charge applied" value="₹0" /><View style={styles.divider} /><View style={styles.totalLine}><Text style={styles.totalLineLabel}>Total pending</Text><Text style={styles.totalLineValue}>₹10,000</Text></View></View>

      <View style={styles.secure}><ShieldCheck size={21} color={colors.green} /><View style={styles.flex}><Text style={styles.secureTitle}>Secure school payment</Text><Text style={styles.secureText}>Your payment status updates after confirmation from the school gateway.</Text></View></View>

      <Pressable style={({ pressed }) => [styles.payButton, pressed && styles.pressed]} onPress={() => Alert.alert('Continue to payment', 'The school payment gateway will open here after the live payment service is connected.')}>
        <CreditCard size={20} color={colors.white} /><Text style={styles.payText}>Pay ₹10,000 securely</Text>
      </Pressable>
      <Text style={styles.note}>By continuing, you agree to the school’s fee and refund policy.</Text>
    </ScrollView>
  </SafeAreaView>;
}

function Line({ label, detail, value }: { label: string; detail: string; value: string }) { return <View style={styles.line}><View style={styles.flex}><Text style={styles.lineLabel}>{label}</Text><Text style={styles.lineDetail}>{detail}</Text></View><Text style={styles.lineValue}>{value}</Text></View>; }

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas }, page: { flex: 1 }, content: { padding: spacing.md, paddingTop: 14, paddingBottom: 34 }, flex: { flex: 1 },
  back: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', ...shadow },
  kicker: { color: colors.maroon, fontSize: 11, fontWeight: '900', letterSpacing: 1.2, marginTop: 24 }, title: { color: colors.ink, fontSize: 31, fontWeight: '900', marginTop: 7 },
  subtitle: { color: colors.slate, marginTop: 7, fontSize: 12 }, totalCard: { backgroundColor: colors.navy, borderRadius: 23, padding: 22, marginTop: 22, alignItems: 'center', ...shadow },
  rupeeIcon: { width: 50, height: 50, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.10)', alignItems: 'center', justifyContent: 'center', marginBottom: 13 },
  totalLabel: { color: '#B8C7D7', fontSize: 10, fontWeight: '900', letterSpacing: 1.2 }, totalAmount: { color: colors.white, fontSize: 40, fontWeight: '900', marginTop: 5 },
  duePill: { backgroundColor: colors.gold, borderRadius: 99, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 7, marginTop: 11 }, dueText: { color: colors.maroon, fontSize: 10, fontWeight: '900' },
  section: { color: colors.ink, fontSize: 18, fontWeight: '900', marginTop: 28, marginBottom: 12 }, invoice: { backgroundColor: colors.white, borderRadius: 18, padding: 4, overflow: 'hidden', ...shadow },
  line: { padding: 14, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.line }, lineLabel: { color: colors.ink, fontWeight: '800', fontSize: 13 },
  lineDetail: { color: colors.muted, fontSize: 10, marginTop: 4 }, lineValue: { color: colors.ink, fontWeight: '900' }, divider: { height: 4, backgroundColor: colors.canvas },
  totalLine: { padding: 15, flexDirection: 'row', justifyContent: 'space-between' }, totalLineLabel: { color: colors.maroon, fontWeight: '900' }, totalLineValue: { color: colors.maroon, fontSize: 18, fontWeight: '900' },
  secure: { flexDirection: 'row', gap: 10, backgroundColor: colors.greenSoft, borderRadius: 15, padding: 14, marginTop: 16 }, secureTitle: { color: colors.green, fontWeight: '900', fontSize: 12 }, secureText: { color: colors.slate, fontSize: 10, lineHeight: 15, marginTop: 3 },
  payButton: { minHeight: 56, borderRadius: 15, backgroundColor: colors.maroon, flexDirection: 'row', gap: 9, alignItems: 'center', justifyContent: 'center', marginTop: 22 }, pressed: { opacity: 0.88 }, payText: { color: colors.white, fontSize: 15, fontWeight: '900' },
  note: { color: colors.muted, textAlign: 'center', fontSize: 10, lineHeight: 16, marginTop: 10 },
});
