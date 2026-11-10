import {
  Award,
  BookOpenCheck,
  Medal,
  Palette,
  Sparkles,
  Trophy,
  X,
  FileBadge2,
} from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BrandGradient } from "../../../components/BrandGradient";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { ScreenSkeleton } from "../../../components/ScreenSkeleton";
import { usePreviewLoading } from "../../../hooks/usePreviewLoading";
import { achievements } from "../../../mocks/data";
import { colors, shadow, spacing } from "../../../theme";

const filters = ["All", "Academic", "Creative", "Sports"] as const;
const icons = {
  Academic: BookOpenCheck,
  Creative: Palette,
  Sports: Medal,
  School: Sparkles,
};
const accents = {
  Academic: colors.maroon,
  Creative: colors.maroon,
  Sports: colors.green,
  School: colors.amber,
};

export default function Achievements() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [certificate, setCertificate] = useState<
    (typeof achievements)[number] | null
  >(null);
  const visible = useMemo(
    () =>
      achievements.filter(
        (item) => filter === "All" || item.category === filter,
      ),
    [filter],
  );
  const isLoading = usePreviewLoading();
  if (isLoading) return <ScreenSkeleton variant="achievements" />;
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Achievements"
          eyebrow="AARAV’S PROGRESS · 2026–27"
          subtitle="Celebrating academic, creative and sporting milestones."
        />
        <BrandGradient style={styles.hero}>
          <View style={styles.trophy}>
            <Trophy size={34} color={colors.gold} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.heroLabel}>A YEAR OF PROGRESS</Text>
            <Text style={styles.heroTitle}>4 achievements earned</Text>
            <Text style={styles.heroText}>
              Keep learning, creating and leading.
            </Text>
          </View>
        </BrandGradient>
        <View style={styles.stats}>
          <Stat value="2" label="Gold awards" />
          <Stat value="1" label="Silver award" />
          <Stat value="4" label="School badges" />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {filters.map((item) => (
            <Pressable
              key={item}
              style={[styles.filter, filter === item && styles.filterActive]}
              onPress={() => setFilter(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === item && styles.filterTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        <Text style={styles.section}>
          {filter === "All" ? "Achievement timeline" : `${filter} achievements`}
        </Text>
        {visible.map((item, index) => {
          const Icon = icons[item.category as keyof typeof icons] ?? Award;
          const accent =
            accents[item.category as keyof typeof accents] ?? colors.maroon;
          return (
            <View key={item.id} style={styles.timelineRow}>
              <View style={styles.timeline}>
                <View
                  style={[
                    styles.timelineIcon,
                    { backgroundColor: `${accent}18` },
                  ]}
                >
                  <Icon size={20} color={accent} />
                </View>
                {index < visible.length - 1 ? (
                  <View style={styles.line} />
                ) : null}
              </View>
              <View style={styles.card}>
                <View style={styles.cardTop}>
                  <Text style={[styles.category, { color: accent }]}>
                    {item.category.toUpperCase()}
                  </Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.awardRow}>
                  <Award size={14} color={colors.gold} />
                  <Text style={styles.award}>{item.award}</Text>
                </View>
                <Text style={styles.description}>{item.description}</Text>
                <Pressable
                  style={styles.certificateButton}
                  onPress={() => setCertificate(item)}
                >
                  <FileBadge2 size={14} color={colors.maroon} />
                  <Text style={styles.certificateText}>View certificate</Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <Modal
        visible={Boolean(certificate)}
        transparent
        animationType="fade"
        onRequestClose={() => setCertificate(null)}
      >
        <View style={styles.modalShade}>
          <View style={styles.certificate}>
            <Pressable
              style={styles.close}
              onPress={() => setCertificate(null)}
              accessibilityLabel="Close certificate"
            >
              <X size={20} color={colors.ink} />
            </Pressable>
            <View style={styles.seal}>
              <Award size={34} color={colors.gold} />
            </View>
            <Text style={styles.certificateKicker}>KD PUBLIC SCHOOL</Text>
            <Text style={styles.certificateTitle}>
              Certificate of Achievement
            </Text>
            <Text style={styles.presented}>Proudly presented to</Text>
            <Text style={styles.studentName}>Aarav Kumar</Text>
            <Text style={styles.certificateBody}>
              for {certificate?.award.toLowerCase()} in {certificate?.title}.
            </Text>
            <Text style={styles.certificateDate}>{certificate?.date}</Text>
            <Text style={styles.previewNote}>
              Certificate preview · Demo document
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  page: { flex: 1 },
  content: { padding: spacing.md, paddingTop: 12, paddingBottom: 10 },
  flex: { flex: 1 },
  hero: {
    backgroundColor: colors.maroon,
    borderRadius: 23,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    ...shadow,
  },
  trophy: {
    width: 66,
    height: 66,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  heroLabel: {
    color: colors.gold,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 5,
  },
  heroText: { color: "#B8C7D7", fontSize: 9, marginTop: 5 },
  stats: {
    backgroundColor: colors.white,
    borderRadius: 17,
    paddingVertical: 14,
    flexDirection: "row",
    marginTop: 10,
    ...shadow,
  },
  stat: { flex: 1, alignItems: "center" },
  statValue: { color: colors.ink, fontSize: 17, fontWeight: "900" },
  statLabel: { color: colors.muted, fontSize: 8, marginTop: 4 },
  filters: { gap: 8, paddingVertical: 18 },
  filter: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    backgroundColor: colors.white,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: colors.line,
  },
  filterActive: { backgroundColor: colors.maroon, borderColor: colors.maroon },
  filterText: { color: colors.slate, fontSize: 10, fontWeight: "800" },
  filterTextActive: { color: colors.white },
  section: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 13,
  },
  timelineRow: { flexDirection: "row", minHeight: 180 },
  timeline: { width: 50, alignItems: "center" },
  timelineIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  line: { flex: 1, width: 1, backgroundColor: colors.line },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 15,
    marginBottom: 11,
    ...shadow,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between" },
  category: { fontSize: 8, fontWeight: "900", letterSpacing: 0.7 },
  date: { color: colors.muted, fontSize: 8 },
  cardTitle: {
    color: colors.ink,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "900",
    marginTop: 8,
  },
  awardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 9,
  },
  award: { color: colors.amber, fontSize: 10, fontWeight: "900" },
  description: {
    color: colors.slate,
    fontSize: 10,
    lineHeight: 16,
    marginTop: 8,
  },
  certificateButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-start",
    backgroundColor: colors.redSoft,
    borderRadius: 9,
    paddingHorizontal: 9,
    paddingVertical: 7,
    marginTop: 11,
  },
  certificateText: { color: colors.maroon, fontSize: 8, fontWeight: "900" },
  modalShade: {
    flex: 1,
    backgroundColor: "rgba(15,23,42,0.55)",
    padding: 22,
    justifyContent: "center",
  },
  certificate: {
    backgroundColor: colors.cream,
    borderRadius: 24,
    padding: 26,
    alignItems: "center",
    borderWidth: 5,
    borderColor: colors.goldSoft,
    ...shadow,
  },
  close: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  seal: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.maroon,
    alignItems: "center",
    justifyContent: "center",
  },
  certificateKicker: {
    color: colors.maroon,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.2,
    marginTop: 16,
  },
  certificateTitle: {
    color: colors.ink,
    fontSize: 23,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 8,
  },
  presented: { color: colors.slate, fontSize: 10, marginTop: 17 },
  studentName: {
    color: colors.maroon,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 5,
  },
  certificateBody: {
    color: colors.slate,
    fontSize: 11,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 12,
  },
  certificateDate: {
    color: colors.ink,
    fontSize: 10,
    fontWeight: "800",
    marginTop: 16,
  },
  previewNote: { color: colors.muted, fontSize: 8, marginTop: 18 },
});
