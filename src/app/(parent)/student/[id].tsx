import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  BookOpenCheck,
  CalendarDays,
  Droplets,
  FileText,
  GraduationCap,
  Home,
  Mail,
  MapPin,
  Phone,
  School,
  UserRound,
} from "lucide-react-native";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BrandGradient } from "../../../components/BrandGradient";
import { ScreenSkeleton } from "../../../components/ScreenSkeleton";
import { usePreviewLoading } from "../../../hooks/usePreviewLoading";
import { parents, student } from "../../../mocks/data";
import { colors, shadow, spacing } from "../../../theme";

export default function StudentProfile() {
  useLocalSearchParams<{ id: string }>();
  const isLoading = usePreviewLoading();
  if (isLoading) return <ScreenSkeleton variant="student" />;
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <Pressable
            style={styles.back}
            onPress={() => router.back()}
            accessibilityLabel="Go back"
          >
            <ArrowLeft size={21} color={colors.ink} />
          </Pressable>
          <Text style={styles.topTitle}>Student profile</Text>
          <View style={styles.backSpacer} />
        </View>

        <BrandGradient style={styles.hero}>
          <View style={styles.avatarRing}>
            <Image source={{ uri: student.avatar }} style={styles.avatar} />
          </View>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.meta}>
            {student.className} · Roll no. {student.rollNo}
          </Text>
          <View style={styles.admissionPill}>
            <Text style={styles.admission}>{student.admissionNo}</Text>
          </View>
        </BrandGradient>

        <Text style={styles.section}>Student details</Text>
        <View style={styles.grid}>
          <Detail
            icon={<CalendarDays size={19} color={colors.maroon} />}
            label="Date of birth"
            value={student.dateOfBirth}
          />
          <Detail
            icon={<Droplets size={19} color={colors.maroon} />}
            label="Blood group"
            value={student.bloodGroup}
          />
          <Detail
            icon={<Home size={19} color={colors.amber} />}
            label="House"
            value={student.house}
          />
          <Detail
            icon={<BookOpenCheck size={19} color={colors.green} />}
            label="Session"
            value={student.session}
          />
        </View>

        <Text style={styles.section}>Academic information</Text>
        <View style={styles.card}>
          <InfoRow
            icon={<School size={20} color={colors.maroon} />}
            label="Class & section"
            value="Class 5 · Section A"
          />
          <InfoRow
            icon={<GraduationCap size={20} color={colors.green} />}
            label="Class teacher"
            value={student.classTeacher}
            last
          />
        </View>

        <Text style={styles.section}>Parents & guardians</Text>
        <ParentCard {...parents.mother} />
        <ParentCard {...parents.father} />

        <Text style={styles.section}>Address</Text>
        <View style={styles.addressCard}>
          <View style={styles.addressIcon}>
            <MapPin size={20} color={colors.maroon} />
          </View>
          <Text style={styles.address}>{student.address}</Text>
        </View>

        <View style={styles.sectionRow}>
          <Text style={styles.section}>Documents</Text>
          <Text style={styles.verified}>3 verified</Text>
        </View>
        <Document name="Birth certificate" detail="Verified · 12 Apr 2026" />
        <Document name="Previous report card" detail="Verified · 18 Apr 2026" />
        <Document name="Medical information" detail="Verified · 18 Apr 2026" />
      </ScrollView>
    </SafeAreaView>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.detail}>
      <View style={styles.detailIcon}>{icon}</View>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function InfoRow({
  icon,
  label,
  value,
  last = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.infoRow, last && styles.infoRowLast]}>
      <View style={styles.infoIcon}>{icon}</View>
      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

function ParentCard({
  name,
  relation,
  phone,
  email,
  occupation,
}: {
  name: string;
  relation: string;
  phone: string;
  email: string;
  occupation: string;
}) {
  return (
    <View style={styles.parentCard}>
      <View style={styles.parentTop}>
        <View style={styles.parentIcon}>
          <UserRound size={21} color={colors.maroon} />
        </View>
        <View style={styles.flex}>
          <Text style={styles.parentName}>{name}</Text>
          <Text style={styles.parentRole}>
            {relation} · {occupation}
          </Text>
        </View>
      </View>
      <View style={styles.contactRow}>
        <Phone size={14} color={colors.slate} />
        <Text style={styles.contact}>{phone}</Text>
      </View>
      <View style={styles.contactRow}>
        <Mail size={14} color={colors.slate} />
        <Text style={styles.contact}>{email}</Text>
      </View>
    </View>
  );
}

function Document({ name, detail }: { name: string; detail: string }) {
  return (
    <Pressable style={styles.document} accessibilityRole="button">
      <View style={styles.fileIcon}>
        <FileText size={20} color={colors.maroon} />
      </View>
      <View style={styles.flex}>
        <Text style={styles.documentName}>{name}</Text>
        <Text style={styles.documentDetail}>{detail}</Text>
      </View>
      <Text style={styles.pdf}>PDF</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  page: { flex: 1 },
  content: { padding: spacing.md, paddingTop: 12, paddingBottom: 10 },
  flex: { flex: 1 },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 17,
  },
  back: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    ...shadow,
  },
  backSpacer: { width: 42 },
  topTitle: { color: colors.ink, fontWeight: "900", fontSize: 16 },
  hero: {
    backgroundColor: colors.maroon,
    alignItems: "center",
    borderRadius: 24,
    padding: 23,
    ...shadow,
  },
  avatarRing: {
    borderWidth: 3,
    borderColor: colors.gold,
    borderRadius: 49,
    padding: 3,
  },
  avatar: { width: 86, height: 86, borderRadius: 43 },
  name: { color: colors.white, fontSize: 23, fontWeight: "900", marginTop: 13 },
  meta: { color: "#D5DEE8", marginTop: 5, fontSize: 12 },
  admissionPill: {
    backgroundColor: "rgba(212,166,47,0.16)",
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 11,
  },
  admission: {
    color: colors.gold,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.6,
  },
  section: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 28,
    marginBottom: 11,
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 9 },
  detail: {
    width: "48.5%",
    minHeight: 126,
    backgroundColor: colors.white,
    borderRadius: 17,
    padding: 14,
    ...shadow,
  },
  detailIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.canvas,
    alignItems: "center",
    justifyContent: "center",
  },
  detailLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 12,
  },
  detailValue: {
    color: colors.ink,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "800",
    marginTop: 4,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    paddingHorizontal: 15,
    ...shadow,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  infoRowLast: { borderBottomWidth: 0 },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.canvas,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  infoLabel: { color: colors.muted, fontSize: 10 },
  infoValue: { color: colors.ink, fontWeight: "800", marginTop: 4 },
  parentCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 15,
    marginBottom: 9,
    ...shadow,
  },
  parentTop: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  parentIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.redSoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  parentName: { color: colors.ink, fontWeight: "900", fontSize: 14 },
  parentRole: { color: colors.slate, fontSize: 10, marginTop: 4 },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 7,
    marginLeft: 3,
  },
  contact: { color: colors.slate, fontSize: 11 },
  addressCard: {
    backgroundColor: colors.white,
    borderRadius: 17,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    ...shadow,
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.redSoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  address: {
    flex: 1,
    color: colors.ink,
    lineHeight: 20,
    fontSize: 12,
    fontWeight: "700",
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  verified: {
    color: colors.green,
    fontSize: 10,
    fontWeight: "800",
    marginTop: 22,
  },
  document: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 13,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    ...shadow,
  },
  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.redSoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  documentName: { color: colors.ink, fontWeight: "800", fontSize: 13 },
  documentDetail: { color: colors.muted, fontSize: 10, marginTop: 4 },
  pdf: {
    color: colors.maroon,
    fontSize: 9,
    fontWeight: "900",
    backgroundColor: colors.redSoft,
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
});
