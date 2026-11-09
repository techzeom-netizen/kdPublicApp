import { router } from "expo-router";
import {
  Check,
  ChevronRight,
  Clock3,
  ReceiptText,
  ShieldCheck,
  WalletCards,
} from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BrandGradient } from "../../../components/BrandGradient";
import { ScreenSkeleton } from "../../../components/ScreenSkeleton";
import { usePreviewLoading } from "../../../hooks/usePreviewLoading";
import { feePayments } from "../../../mocks/data";
import { colors, shadow, spacing } from "../../../theme";

export default function Fees() {
  const isLoading = usePreviewLoading();
  if (isLoading) return <ScreenSkeleton variant="fees" />;
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.kicker}>AARAV KUMAR · 2026–27</Text>
        <Text style={styles.title}>School fees</Text>
        <Text style={styles.description}>
          Track pending dues and all verified payments in one place.
        </Text>

        <BrandGradient style={styles.balanceCard}>
          <View style={styles.balanceTop}>
            <View>
              <Text style={styles.cardLabel}>CURRENT PENDING</Text>
              <Text style={styles.amount}>₹10,000</Text>
            </View>
            <View style={styles.walletIcon}>
              <WalletCards size={27} color={colors.gold} />
            </View>
          </View>
          <View style={styles.dueRow}>
            <Clock3 size={14} color="#F4DDE0" />
            <Text style={styles.due}>Due by 15 November 2026</Text>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.detailsButton,
              pressed && styles.pressed,
            ]}
            onPress={() => router.push("/(parent)/fees/details")}
            accessibilityRole="button"
          >
            <View>
              <Text style={styles.detailsTitle}>Review & pay now</Text>
              <Text style={styles.detailsSub}>
                Breakdown, due dates and payment methods
              </Text>
            </View>
            <ChevronRight size={21} color={colors.navy} />
          </Pressable>
        </BrandGradient>

        <View style={styles.secureNote}>
          <ShieldCheck size={18} color={colors.green} />
          <Text style={styles.secureText}>
            Payments are securely verified by the school.
          </Text>
        </View>

        <Text style={styles.section}>Pending instalments</Text>
        <DueCard
          label="Activity fee"
          amount="₹5,000"
          date="15 Nov 2026"
          urgent
        />
        <DueCard label="Examination fee" amount="₹5,000" date="15 Dec 2026" />

        <View style={styles.sectionRow}>
          <Text style={styles.section}>Payment history</Text>
          <Text style={styles.count}>{feePayments.length} receipts</Text>
        </View>
        {feePayments.map((payment) => (
          <Payment key={payment.id} {...payment} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function DueCard({
  label,
  amount,
  date,
  urgent = false,
}: {
  label: string;
  amount: string;
  date: string;
  urgent?: boolean;
}) {
  return (
    <View style={styles.dueCard}>
      <View style={[styles.dueIcon, urgent ? styles.dueIconUrgent : null]}>
        <Clock3 size={19} color={urgent ? colors.red : colors.amber} />
      </View>
      <View style={styles.flex}>
        <Text style={styles.rowTitle}>{label}</Text>
        <Text style={styles.rowMeta}>Due {date}</Text>
      </View>
      <Text style={styles.rowAmount}>{amount}</Text>
    </View>
  );
}

function Payment({
  id,
  label,
  amount,
  date,
}: {
  id: string;
  label: string;
  amount: string;
  date: string;
}) {
  return (
    <View style={styles.payment}>
      <View style={styles.paidIcon}>
        <Check size={17} color={colors.green} strokeWidth={3} />
      </View>
      <View style={styles.flex}>
        <Text style={styles.rowTitle}>{label}</Text>
        <Text style={styles.rowMeta}>
          Paid {date} · {id}
        </Text>
      </View>
      <View style={styles.paymentRight}>
        <Text style={styles.rowAmount}>{amount}</Text>
        <View style={styles.receiptRow}>
          <ReceiptText size={11} color={colors.green} />
          <Text style={styles.paidText}>Receipt</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  page: { flex: 1 },
  content: { padding: spacing.md, paddingTop: 24, paddingBottom: 10 },
  flex: { flex: 1 },
  kicker: {
    color: colors.maroon,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  title: { color: colors.ink, fontSize: 32, fontWeight: "900", marginTop: 7 },
  description: {
    color: colors.slate,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
  },
  balanceCard: {
    backgroundColor: colors.maroon,
    borderRadius: 23,
    padding: 20,
    marginTop: 22,
    ...shadow,
  },
  balanceTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardLabel: {
    color: "#EEC9CE",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  amount: {
    color: colors.white,
    fontSize: 38,
    lineHeight: 46,
    fontWeight: "900",
    marginTop: 4,
  },
  walletIcon: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  dueRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
  due: { color: "#F4DDE0", fontSize: 12 },
  detailsButton: {
    backgroundColor: colors.gold,
    borderRadius: 14,
    padding: 14,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pressed: { opacity: 0.88 },
  detailsTitle: { color: colors.navy, fontWeight: "900", fontSize: 14 },
  detailsSub: { color: colors.navySoft, fontSize: 10, marginTop: 3 },
  secureNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 4,
    marginTop: 14,
  },
  secureText: { color: colors.slate, fontSize: 11 },
  section: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 28,
    marginBottom: 12,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  count: { color: colors.slate, fontSize: 11, marginTop: 20 },
  dueCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    ...shadow,
  },
  dueIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.amberSoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  dueIconUrgent: { backgroundColor: colors.redSoft },
  payment: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    ...shadow,
  },
  paidIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.greenSoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  rowTitle: { color: colors.ink, fontWeight: "800", fontSize: 13 },
  rowMeta: { color: colors.muted, marginTop: 5, fontSize: 10 },
  rowAmount: { color: colors.ink, fontWeight: "900", fontSize: 13 },
  paymentRight: { alignItems: "flex-end" },
  receiptRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 5,
  },
  paidText: { color: colors.green, fontSize: 9, fontWeight: "800" },
});
