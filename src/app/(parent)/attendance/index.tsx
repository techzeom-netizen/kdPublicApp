import {
  CalendarCheck2,
  Check,
  ChevronDown,
  Clock3,
} from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenSkeleton } from "../../../components/ScreenSkeleton";
import { usePreviewLoading } from "../../../hooks/usePreviewLoading";
import { colors, shadow, spacing } from "../../../theme";

type MonthItem = { key: string; label: string; month: number; year: number };
type DayStatus = "present" | "absent" | "late" | "leave" | "holiday" | "future";

const now = new Date();
const academicStartYear =
  now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
const months: MonthItem[] = [];
for (
  let year = now.getFullYear(), month = now.getMonth();
  year > academicStartYear || month >= 3;
  month -= 1
) {
  if (month < 0) {
    month = 11;
    year -= 1;
  }
  const date = new Date(year, month, 1);
  months.push({
    key: `${year}-${month}`,
    year,
    month,
    label: date.toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
  });
  if (year === academicStartYear && month === 3) break;
}

function statusFor(item: MonthItem, day: number): DayStatus {
  const date = new Date(item.year, item.month, day);
  const isCurrentMonth =
    item.year === now.getFullYear() && item.month === now.getMonth();
  if (isCurrentMonth && day > now.getDate()) return "future";
  if (date.getDay() === 0 || date.getDay() === 6) return "holiday";
  const seed = day + item.month * 3;
  if (seed % 17 === 0) return "absent";
  if (seed % 11 === 0) return "late";
  if (seed % 23 === 0) return "leave";
  return "present";
}

function getStats(item: MonthItem) {
  const total = new Date(item.year, item.month + 1, 0).getDate();
  const statuses = Array.from({ length: total }, (_, index) =>
    statusFor(item, index + 1),
  );
  const present = statuses.filter(
    (value) => value === "present" || value === "late",
  ).length;
  const absent = statuses.filter((value) => value === "absent").length;
  const late = statuses.filter((value) => value === "late").length;
  const leave = statuses.filter((value) => value === "leave").length;
  const working = present + absent + leave;
  return {
    present,
    absent,
    late,
    leave,
    working,
    percentage: working ? Math.round((present / working) * 100) : 0,
  };
}

export default function Attendance() {
  const [expanded, setExpanded] = React.useState(months[0]?.key ?? "");
  const isLoading = usePreviewLoading();
  if (isLoading) return <ScreenSkeleton variant="attendance" />;
  const todayStatus = statusFor(months[0], now.getDate());
  const todayPresent = todayStatus === "present" || todayStatus === "late";

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.kicker}>AARAV KUMAR · CLASS 5-A</Text>
        <Text style={styles.title}>Attendance</Text>
        <Text style={styles.description}>
          Daily status and month-by-month attendance for the current academic
          year.
        </Text>

        <View
          style={[
            styles.todayCard,
            { borderColor: todayPresent ? colors.green : colors.red },
          ]}
        >
          <View
            style={[
              styles.todayIcon,
              {
                backgroundColor: todayPresent
                  ? colors.greenSoft
                  : colors.redSoft,
              },
            ]}
          >
            {todayPresent ? (
              <Check size={24} color={colors.green} strokeWidth={3} />
            ) : (
              <CalendarCheck2 size={23} color={colors.red} />
            )}
          </View>
          <View style={styles.todayCopy}>
            <Text style={styles.todayLabel}>
              TODAY ·{" "}
              {now
                .toLocaleDateString("en-IN", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })
                .toUpperCase()}
            </Text>
            <Text style={styles.todayStatus}>
              {todayPresent
                ? "Present today"
                : todayStatus === "holiday"
                  ? "School holiday"
                  : "Absent today"}
            </Text>
            <View style={styles.timeRow}>
              <Clock3 size={13} color={colors.slate} />
              <Text style={styles.todayMeta}>
                {todayPresent ? "Marked at 8:14 AM" : "No check-in recorded"}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.statusPill,
              {
                backgroundColor: todayPresent
                  ? colors.greenSoft
                  : colors.redSoft,
              },
            ]}
          >
            <Text
              style={[
                styles.statusPillText,
                { color: todayPresent ? colors.green : colors.red },
              ]}
            >
              {todayStatus === "late"
                ? "Late"
                : todayPresent
                  ? "On time"
                  : "Not present"}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Monthly record</Text>
        <Text style={styles.sectionHint}>
          Tap a month to view its full calendar.
        </Text>
        {months.map((item, index) => {
          const isOpen = item.key === expanded;
          const stats = getStats(item);
          return (
            <View
              key={item.key}
              style={[styles.monthCard, isOpen && styles.monthCardOpen]}
            >
              <Pressable
                style={styles.monthHeader}
                onPress={() => setExpanded(isOpen ? "" : item.key)}
                accessibilityRole="button"
                accessibilityState={{ expanded: isOpen }}
              >
                <View style={styles.monthBadge}>
                  <Text style={styles.monthBadgeText}>
                    {item.label.slice(0, 3).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.monthCopy}>
                  <Text style={styles.monthName}>
                    {item.label}
                    {index === 0 ? " · Current" : ""}
                  </Text>
                  <Text style={styles.monthSummary}>
                    {stats.percentage}% attendance · {stats.present} present ·{" "}
                    {stats.absent} absent
                  </Text>
                </View>
                <View style={[styles.chevron, isOpen && styles.chevronOpen]}>
                  <ChevronDown size={20} color={colors.maroon} />
                </View>
              </Pressable>
              {isOpen ? <MonthCalendar item={item} /> : null}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

function MonthCalendar({ item }: { item: MonthItem }) {
  const total = new Date(item.year, item.month + 1, 0).getDate();
  const first = new Date(item.year, item.month, 1).getDay();
  const mondayOffset = first === 0 ? 6 : first - 1;
  const cells: (number | null)[] = [
    ...Array.from({ length: mondayOffset }, () => null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];
  const stats = getStats(item);
  return (
    <View style={styles.calendarWrap}>
      <View style={styles.statsRow}>
        <MiniStat
          value={`${stats.percentage}%`}
          label="Attendance"
          color={colors.maroon}
        />
        <MiniStat
          value={`${stats.present}`}
          label="Present"
          color={colors.green}
        />
        <MiniStat value={`${stats.absent}`} label="Absent" color={colors.red} />
        <MiniStat value={`${stats.late}`} label="Late" color={colors.amber} />
      </View>
      <View style={styles.weekRow}>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <Text key={day} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.daysGrid}>
        {cells.map((day, index) => {
          if (!day)
            return <View key={`empty-${index}`} style={styles.dayCell} />;
          const status = statusFor(item, day);
          const isToday =
            item.year === now.getFullYear() &&
            item.month === now.getMonth() &&
            day === now.getDate();
          return (
            <View
              key={day}
              style={[styles.dayCell, isToday && styles.todayCell]}
              accessibilityLabel={`${day} ${item.label}, ${status}`}
            >
              <Text
                style={[
                  styles.dayNumber,
                  status === "future" && styles.futureText,
                  isToday && styles.todayNumber,
                ]}
              >
                {day}
              </Text>
              <View style={[styles.dot, styles[`${status}Dot`]]} />
            </View>
          );
        })}
      </View>
      <View style={styles.legend}>
        <Legend color={colors.green} label="Present" />
        <Legend color={colors.red} label="Absent" />
        <Legend color={colors.amber} label="Late" />
        <Legend color={colors.maroon} label="Leave" />
        <Legend color={colors.muted} label="Holiday" />
      </View>
    </View>
  );
}

function MiniStat({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) {
  return (
    <View style={styles.miniStat}>
      <Text style={[styles.miniValue, { color }]}>{value}</Text>
      <Text style={styles.miniLabel}>{label}</Text>
    </View>
  );
}
function Legend({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  page: { flex: 1 },
  content: { padding: spacing.md, paddingTop: 24, paddingBottom: 10 },
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
    maxWidth: 440,
  },
  todayCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 4,
    ...shadow,
  },
  todayIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  todayCopy: { flex: 1 },
  todayLabel: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.7,
  },
  todayStatus: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 4,
  },
  timeRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  todayMeta: { color: colors.slate, fontSize: 11 },
  statusPill: { borderRadius: 99, paddingHorizontal: 10, paddingVertical: 6 },
  statusPillText: { fontSize: 10, fontWeight: "900" },
  sectionTitle: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: "900",
    marginTop: 28,
  },
  sectionHint: {
    color: colors.slate,
    fontSize: 12,
    marginTop: 4,
    marginBottom: 13,
  },
  monthCard: {
    backgroundColor: colors.white,
    borderRadius: 17,
    marginBottom: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "transparent",
    ...shadow,
  },
  monthCardOpen: { borderColor: "#E9D8DB" },
  monthHeader: { padding: 14, flexDirection: "row", alignItems: "center" },
  monthBadge: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: colors.goldSoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  monthBadgeText: { color: colors.maroon, fontSize: 10, fontWeight: "900" },
  monthCopy: { flex: 1 },
  monthName: { color: colors.ink, fontSize: 15, fontWeight: "900" },
  monthSummary: { color: colors.slate, fontSize: 10, marginTop: 4 },
  chevron: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.canvas,
    alignItems: "center",
    justifyContent: "center",
  },
  chevronOpen: {
    transform: [{ rotate: "180deg" }],
    backgroundColor: colors.goldSoft,
  },
  calendarWrap: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    padding: 12,
    paddingTop: 14,
  },
  statsRow: {
    backgroundColor: colors.canvas,
    borderRadius: 13,
    flexDirection: "row",
    paddingVertical: 12,
    marginBottom: 15,
  },
  miniStat: { flex: 1, alignItems: "center" },
  miniValue: { fontSize: 16, fontWeight: "900" },
  miniLabel: { color: colors.muted, fontSize: 9, marginTop: 3 },
  weekRow: { flexDirection: "row", marginBottom: 6 },
  weekDay: {
    width: "14.285%",
    textAlign: "center",
    color: colors.muted,
    fontSize: 9,
    fontWeight: "900",
  },
  daysGrid: { flexDirection: "row", flexWrap: "wrap" },
  dayCell: {
    width: "14.285%",
    height: 43,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  todayCell: { backgroundColor: colors.maroon },
  dayNumber: { color: colors.ink, fontSize: 12, fontWeight: "800" },
  todayNumber: { color: colors.white },
  futureText: { color: colors.muted },
  dot: { width: 5, height: 5, borderRadius: 3, marginTop: 4 },
  presentDot: { backgroundColor: colors.green },
  absentDot: { backgroundColor: colors.red },
  lateDot: { backgroundColor: colors.amber },
  leaveDot: { backgroundColor: colors.maroon },
  holidayDot: { backgroundColor: colors.muted },
  futureDot: { backgroundColor: colors.line },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 13,
    marginBottom: 2,
  },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  legendDot: { width: 6, height: 6, borderRadius: 3 },
  legendText: { color: colors.slate, fontSize: 9 },
});
