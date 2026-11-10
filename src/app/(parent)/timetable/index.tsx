import { BellRing, BookOpenText, Clock3, MapPin } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { ScreenSkeleton } from "../../../components/ScreenSkeleton";
import { usePreviewLoading } from "../../../hooks/usePreviewLoading";
import { timetable } from "../../../mocks/data";
import { colors, shadow, spacing } from "../../../theme";

type Day = keyof typeof timetable;
const days = Object.keys(timetable) as Day[];
const subjectColors: Record<string, string> = {
  Mathematics: colors.maroon,
  English: colors.maroon,
  Science: colors.green,
  Hindi: colors.amber,
};
const today = new Date();
const todayName = today.toLocaleDateString("en-IN", { weekday: "long" });
const todayDay = days.includes(todayName as Day)
  ? (todayName as Day)
  : "Monday";
const currentMinutes = today.getHours() * 60 + today.getMinutes();
const currentIndex =
  currentMinutes < 520
    ? 0
    : currentMinutes < 560
      ? 1
      : currentMinutes < 600
        ? 2
        : currentMinutes < 660
          ? 3
          : currentMinutes < 700
            ? 4
            : currentMinutes < 740
              ? 5
              : -1;

export default function Timetable() {
  const [day, setDay] = useState<Day>(todayDay);
  const isLoading = usePreviewLoading();
  if (isLoading) return <ScreenSkeleton variant="timetable" />;
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Class timetable"
          eyebrow={`TODAY · ${today.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }).toUpperCase()}`}
          subtitle="Class 5-A · Weekly schedule and room details."
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayRow}
        >
          {days.map((item, index) => (
            <Pressable
              key={item}
              style={[styles.dayChip, day === item && styles.dayChipActive]}
              onPress={() => setDay(item)}
            >
              <Text
                style={[styles.dayShort, day === item && styles.dayActiveText]}
              >
                {item.slice(0, 3)}
              </Text>
              <Text
                style={[styles.dayDate, day === item && styles.dayActiveText]}
              >
                {9 + index}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.nowCard}>
          <View style={styles.nowIcon}>
            <BellRing size={20} color={colors.gold} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.nowLabel}>NEXT CLASS</Text>
            <Text style={styles.nowTitle}>
              {timetable[day][0].subject} · {timetable[day][0].time}
            </Text>
            <Text style={styles.nowMeta}>
              {timetable[day][0].teacher} · {timetable[day][0].room}
            </Text>
          </View>
        </View>

        <View style={styles.sectionRow}>
          <Text style={styles.section}>{day} schedule</Text>
          <Text style={styles.periodCount}>
            {timetable[day].length} periods
          </Text>
        </View>
        {timetable[day].map((period, index) => {
          const color = subjectColors[period.subject] ?? colors.maroon;
          const isCurrent = day === todayDay && index === currentIndex;
          return (
            <View key={`${period.time}-${period.subject}`}>
              <View style={styles.period}>
                <View style={styles.timeline}>
                  <View
                    style={[styles.timelineDot, { backgroundColor: color }]}
                  />
                  {index < timetable[day].length - 1 ? (
                    <View style={styles.timelineLine} />
                  ) : null}
                </View>
                <View style={styles.timeCol}>
                  <Text style={styles.periodNo}>PERIOD {index + 1}</Text>
                  <Text style={styles.time}>{period.time}</Text>
                </View>
                <View
                  style={[styles.subjectCard, isCurrent && styles.currentCard]}
                >
                  <View style={styles.subjectTop}>
                    <View
                      style={[
                        styles.subjectIcon,
                        { backgroundColor: `${color}18` },
                      ]}
                    >
                      <BookOpenText size={18} color={color} />
                    </View>
                    <Text style={styles.subject}>{period.subject}</Text>
                    {isCurrent ? (
                      <View style={styles.currentPill}>
                        <Text style={styles.currentText}>NOW</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={styles.teacher}>{period.teacher}</Text>
                  <View style={styles.roomRow}>
                    <MapPin size={11} color={colors.muted} />
                    <Text style={styles.room}>{period.room}</Text>
                  </View>
                </View>
              </View>
              {index === 2 ? (
                <View style={styles.breakNote}>
                  <Clock3 size={17} color={colors.amber} />
                  <Text style={styles.breakText}>
                    Morning break · 10:00–10:20 AM
                  </Text>
                </View>
              ) : null}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  page: { flex: 1 },
  content: { padding: spacing.md, paddingTop: 12, paddingBottom: 10 },
  flex: { flex: 1 },
  dayRow: { gap: 8, paddingVertical: 20 },
  dayChip: {
    width: 60,
    height: 68,
    borderRadius: 17,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    ...shadow,
  },
  dayChipActive: { backgroundColor: colors.maroon },
  dayShort: {
    color: colors.slate,
    fontSize: 9,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  dayDate: { color: colors.ink, fontSize: 17, fontWeight: "900", marginTop: 5 },
  dayActiveText: { color: colors.white },
  nowCard: {
    backgroundColor: colors.maroon,
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  nowIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  nowLabel: {
    color: colors.gold,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  nowTitle: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "900",
    marginTop: 4,
  },
  nowMeta: { color: "#B8C7D7", fontSize: 9, marginTop: 3 },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  section: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 27,
    marginBottom: 13,
  },
  periodCount: { color: colors.slate, fontSize: 10, marginTop: 17 },
  period: { flexDirection: "row", minHeight: 105 },
  timeline: { width: 20, alignItems: "center" },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 18,
    zIndex: 1,
  },
  timelineLine: { width: 1, flex: 1, backgroundColor: colors.line },
  timeCol: { width: 83, paddingTop: 14, paddingLeft: 4 },
  periodNo: { color: colors.muted, fontSize: 7, fontWeight: "900" },
  time: { color: colors.ink, fontSize: 10, fontWeight: "800", marginTop: 5 },
  subjectCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 13,
    marginBottom: 9,
    ...shadow,
  },
  subjectTop: { flexDirection: "row", alignItems: "center" },
  subjectIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },
  subject: { color: colors.ink, fontSize: 13, fontWeight: "900" },
  teacher: { color: colors.slate, fontSize: 9, marginTop: 7, marginLeft: 43 },
  roomRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 5,
    marginLeft: 43,
  },
  room: { color: colors.muted, fontSize: 8 },
  currentCard: { borderWidth: 2, borderColor: colors.gold },
  currentPill: {
    marginLeft: "auto",
    backgroundColor: colors.goldSoft,
    borderRadius: 99,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  currentText: { color: colors.amber, fontSize: 7, fontWeight: "900" },
  breakNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    backgroundColor: colors.amberSoft,
    borderRadius: 14,
    padding: 13,
    marginBottom: 10,
    marginLeft: 103,
  },
  breakText: { color: colors.amber, fontSize: 10, fontWeight: "800" },
});
