import {
  Download,
  GraduationCap,
  MessageSquareText,
  TrendingUp,
} from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  Alert,
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
import { results, student } from "../../../mocks/data";
import { colors, shadow, spacing } from "../../../theme";

const exams = [
  { name: "Unit Test", factor: 0.9, date: "18 Jul 2026" },
  { name: "Half Yearly", factor: 1, date: "25 Sep 2026" },
  { name: "Annual", factor: 0.96, date: "18 Mar 2027" },
] as const;
type ExamName = (typeof exams)[number]["name"];

export default function Results() {
  const [exam, setExam] = useState<ExamName>("Half Yearly");
  const isLoading = usePreviewLoading();
  const selected = exams.find((item) => item.name === exam) ?? exams[1];
  const subjects = useMemo(
    () =>
      results.map((item) => ({
        ...item,
        shownMarks: Math.round(item.marks * selected.factor),
      })),
    [selected.factor],
  );
  const average = Math.round(
    subjects.reduce((sum, item) => sum + item.shownMarks, 0) / subjects.length,
  );
  if (isLoading) return <ScreenSkeleton variant="results" />;

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Examination results"
          eyebrow={`ACADEMIC SESSION ${student.session}`}
          subtitle="Detailed marks, progress and teacher feedback."
        />
        <View style={styles.studentCard}>
          <View style={styles.studentIcon}>
            <GraduationCap size={22} color={colors.maroon} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.studentName}>{student.name}</Text>
            <Text style={styles.studentMeta}>
              {student.className} · Roll no. {student.rollNo}
            </Text>
          </View>
          <View style={styles.sessionPill}>
            <Text style={styles.sessionText}>{student.session}</Text>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.segment}
        >
          {exams.map((item) => (
            <Pressable
              key={item.name}
              style={[
                styles.segmentItem,
                exam === item.name && styles.segmentActive,
              ]}
              onPress={() => setExam(item.name)}
              accessibilityRole="tab"
              accessibilityState={{ selected: exam === item.name }}
            >
              <Text
                style={[
                  styles.segmentText,
                  exam === item.name && styles.segmentTextActive,
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        <BrandGradient style={styles.hero}>
          <View>
            <Text style={styles.heroLabel}>{exam.toUpperCase()} · OVERALL</Text>
            <Text style={styles.heroValue}>{average}%</Text>
            <View style={styles.improvement}>
              <TrendingUp size={14} color={colors.green} />
              <Text style={styles.improvementText}>
                Improved 3.2% from last exam
              </Text>
            </View>
          </View>
          <View style={styles.rankCircle}>
            <Text style={styles.rankValue}>6</Text>
            <Text style={styles.rankLabel}>OF 42</Text>
          </View>
        </BrandGradient>
        <View style={styles.summaryRow}>
          <Summary
            value={average >= 90 ? "A1" : average >= 80 ? "A2" : "B1"}
            label="Overall grade"
          />
          <Summary
            value={`${subjects.reduce((sum, item) => sum + item.shownMarks, 0)}/500`}
            label="Total marks"
          />
          <Summary value="6th" label="Class rank" />
        </View>
        <View style={styles.sectionRow}>
          <Text style={styles.section}>Subject performance</Text>
          <Pressable
            style={styles.download}
            onPress={() =>
              Alert.alert(
                "Report card",
                `${exam} report card download will be available when the school document service is connected.`,
              )
            }
          >
            <Download size={14} color={colors.maroon} />
            <Text style={styles.downloadText}>Report card</Text>
          </Pressable>
        </View>
        {subjects.map((result) => (
          <View key={result.subject} style={styles.subjectCard}>
            <View style={styles.subjectTop}>
              <View>
                <Text style={styles.subjectName}>{result.subject}</Text>
                <Text style={styles.subjectMeta}>
                  {result.shownMarks} of {result.total} marks
                </Text>
              </View>
              <View style={styles.grade}>
                <Text style={styles.gradeText}>
                  {result.shownMarks >= 90
                    ? "A1"
                    : result.shownMarks >= 80
                      ? "A2"
                      : "B1"}
                </Text>
              </View>
            </View>
            <View style={styles.progress}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${result.shownMarks}%`,
                    backgroundColor:
                      result.shownMarks >= 85 ? colors.green : colors.gold,
                  },
                ]}
              />
            </View>
            <View style={styles.cardBottom}>
              <Text style={styles.percent}>{result.shownMarks}%</Text>
              <Text style={styles.trend}>{result.trend} this term</Text>
            </View>
          </View>
        ))}
        <Text style={styles.section}>Recent examinations</Text>
        <View style={styles.recentCard}>
          {exams
            .slice()
            .reverse()
            .map((item, index) => {
              const score = Math.round(
                results.reduce(
                  (sum, result) => sum + result.marks * item.factor,
                  0,
                ) / results.length,
              );
              return (
                <Pressable
                  key={item.name}
                  style={[
                    styles.recentRow,
                    index < exams.length - 1 && styles.recentDivider,
                  ]}
                  onPress={() => setExam(item.name)}
                >
                  <View>
                    <Text style={styles.recentTitle}>{item.name}</Text>
                    <Text style={styles.recentDate}>{item.date}</Text>
                  </View>
                  <View style={styles.recentScore}>
                    <Text style={styles.recentScoreText}>{score}%</Text>
                  </View>
                </Pressable>
              );
            })}
        </View>
        <Text style={styles.section}>Class teacher’s note</Text>
        <View style={styles.comment}>
          <View style={styles.commentIcon}>
            <MessageSquareText size={20} color={colors.maroon} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.commentTitle}>Consistent progress</Text>
            <Text style={styles.commentText}>
              Aarav participates actively and has shown excellent improvement in
              Mathematics and Science. More reading practice will strengthen
              written expression.
            </Text>
            <Text style={styles.teacher}>— Mrs. Neha Sharma</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Summary({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.summary}>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  page: { flex: 1 },
  content: { padding: spacing.md, paddingTop: 12, paddingBottom: 32 },
  flex: { flex: 1 },
  studentCard: {
    backgroundColor: colors.white,
    borderRadius: 17,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    ...shadow,
  },
  studentIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: colors.redSoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  studentName: { color: colors.ink, fontSize: 14, fontWeight: "900" },
  studentMeta: { color: colors.slate, fontSize: 9, marginTop: 4 },
  sessionPill: {
    backgroundColor: colors.maroonTint,
    borderRadius: 99,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  sessionText: { color: colors.maroon, fontSize: 8, fontWeight: "900" },
  segment: { gap: 8, paddingVertical: 14 },
  segmentItem: {
    minWidth: 108,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#E9EDF2",
  },
  segmentActive: { backgroundColor: colors.maroon, ...shadow },
  segmentText: { color: colors.slate, fontSize: 10, fontWeight: "800" },
  segmentTextActive: { color: colors.white },
  hero: {
    borderRadius: 23,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...shadow,
  },
  heroLabel: {
    color: colors.gold,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.1,
  },
  heroValue: {
    color: colors.white,
    fontSize: 40,
    fontWeight: "900",
    marginTop: 5,
  },
  improvement: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
  },
  improvementText: { color: "#BBD8CA", fontSize: 9 },
  rankCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 6,
    borderColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  rankValue: { color: colors.white, fontSize: 26, fontWeight: "900" },
  rankLabel: { color: "#B8C7D7", fontSize: 7, fontWeight: "900" },
  summaryRow: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 17,
    marginTop: 10,
    paddingVertical: 15,
    ...shadow,
  },
  summary: { flex: 1, alignItems: "center" },
  summaryValue: { color: colors.ink, fontSize: 15, fontWeight: "900" },
  summaryLabel: { color: colors.muted, fontSize: 8, marginTop: 4 },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  section: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 28,
    marginBottom: 12,
  },
  download: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginTop: 19,
    padding: 6,
  },
  downloadText: { color: colors.maroon, fontSize: 10, fontWeight: "900" },
  subjectCard: {
    backgroundColor: colors.white,
    borderRadius: 17,
    padding: 15,
    marginBottom: 9,
    ...shadow,
  },
  subjectTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subjectName: { color: colors.ink, fontSize: 13, fontWeight: "900" },
  subjectMeta: { color: colors.muted, fontSize: 9, marginTop: 4 },
  grade: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: colors.greenSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  gradeText: { color: colors.green, fontSize: 11, fontWeight: "900" },
  progress: {
    height: 7,
    backgroundColor: colors.line,
    borderRadius: 5,
    marginTop: 14,
    overflow: "hidden",
  },
  progressFill: { height: 7, borderRadius: 5 },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  percent: { color: colors.ink, fontSize: 10, fontWeight: "900" },
  trend: { color: colors.green, fontSize: 9, fontWeight: "700" },
  recentCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    paddingHorizontal: 15,
    ...shadow,
  },
  recentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  recentDivider: { borderBottomWidth: 1, borderBottomColor: colors.line },
  recentTitle: { color: colors.ink, fontSize: 12, fontWeight: "900" },
  recentDate: { color: colors.muted, fontSize: 8, marginTop: 4 },
  recentScore: {
    backgroundColor: colors.greenSoft,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  recentScoreText: { color: colors.green, fontSize: 10, fontWeight: "900" },
  comment: {
    backgroundColor: colors.goldSoft,
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
  },
  commentIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  commentTitle: { color: colors.ink, fontSize: 13, fontWeight: "900" },
  commentText: {
    color: colors.slate,
    fontSize: 11,
    lineHeight: 18,
    marginTop: 5,
  },
  teacher: {
    color: colors.maroon,
    fontSize: 10,
    fontWeight: "800",
    marginTop: 9,
  },
});
