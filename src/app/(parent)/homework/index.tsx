import {
  BookOpen,
  Check,
  Circle,
  Clock3,
  FileText,
  Paperclip,
  X,
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
import { ScreenHeader } from "../../../components/ScreenHeader";
import { ScreenSkeleton } from "../../../components/ScreenSkeleton";
import { usePreviewLoading } from "../../../hooks/usePreviewLoading";
import { homework } from "../../../mocks/data";
import { colors, shadow, spacing } from "../../../theme";

type Filter = "All" | "Pending" | "Completed" | "Overdue";
type HomeworkItem = (typeof homework)[number];
const teacherFor: Record<string, string> = {
  Mathematics: "Ms. Ritu",
  English: "Mrs. Mehta",
  Science: "Mr. Dev",
  Hindi: "Mrs. Joshi",
};

export default function Homework() {
  const [filter, setFilter] = useState<Filter>("Pending");
  const [selected, setSelected] = useState<HomeworkItem | null>(null);
  const [completed, setCompleted] = useState<string[]>(
    homework
      .filter((item) => item.status === "Completed")
      .map((item) => item.id),
  );
  const visible = useMemo(
    () =>
      homework.filter((item) =>
        filter === "Completed"
          ? completed.includes(item.id)
          : filter === "Overdue"
            ? item.id === "science-plants" && !completed.includes(item.id)
            : filter === "Pending"
              ? !completed.includes(item.id) && item.id !== "science-plants"
              : true,
      ),
    [completed, filter],
  );
  const isLoading = usePreviewLoading();
  if (isLoading) return <ScreenSkeleton variant="homework" />;
  const toggle = (id: string) =>
    setCompleted((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    );
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Homework diary"
          eyebrow="CLASS 5-A · NOVEMBER 2026"
          subtitle="Assignments, due dates and completion status."
        />
        <View style={styles.summary}>
          <View style={styles.summaryIcon}>
            <BookOpen size={22} color={colors.gold} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.summaryTitle}>
              {homework.length - completed.length} tasks pending
            </Text>
            <Text style={styles.summaryText}>1 assignment is due today</Text>
          </View>
          <Text style={styles.summaryPercent}>
            {Math.round((completed.length / homework.length) * 100)}%
          </Text>
        </View>
        <View style={styles.filters}>
          {(["All", "Pending", "Completed", "Overdue"] as Filter[]).map(
            (item) => (
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
            ),
          )}
        </View>
        <Text style={styles.dateHeading}>
          {filter === "Completed"
            ? "Completed work"
            : filter === "Overdue"
              ? "Past due"
              : "Needs attention"}
        </Text>
        {visible.length ? (
          visible.map((item) => {
            const isDone = completed.includes(item.id);
            return (
              <View key={item.id} style={styles.task}>
                <View
                  style={[
                    styles.subjectStripe,
                    { backgroundColor: item.color },
                  ]}
                />
                <View style={styles.taskContent}>
                  <View style={styles.taskTop}>
                    <View style={styles.subjectPill}>
                      <Text style={[styles.subjectText, { color: item.color }]}>
                        {item.subject}
                      </Text>
                    </View>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                  <Text style={[styles.taskTitle, isDone && styles.taskDone]}>
                    {item.title}
                  </Text>
                  <Text style={styles.taskDetail}>{item.detail}</Text>
                  <Text style={styles.teacher}>
                    Assigned by {teacherFor[item.subject]} · {item.date}
                  </Text>
                  <View style={styles.taskBottom}>
                    <View style={styles.dueRow}>
                      <Clock3
                        size={13}
                        color={
                          item.due === "Due today" ? colors.red : colors.slate
                        }
                      />
                      <Text
                        style={[
                          styles.due,
                          item.due === "Due today" && styles.dueUrgent,
                        ]}
                      >
                        {isDone ? "Completed" : item.due}
                      </Text>
                    </View>
                    <View style={styles.attachment}>
                      <Paperclip size={12} color={colors.slate} />
                      <Text style={styles.attachmentText}>1 file</Text>
                    </View>
                  </View>
                  <Pressable
                    style={styles.detailButton}
                    onPress={() => setSelected(item)}
                  >
                    <Text style={styles.detailButtonText}>
                      View details & attachment
                    </Text>
                  </Pressable>
                </View>
                <Pressable
                  style={[styles.check, isDone && styles.checkDone]}
                  onPress={() => toggle(item.id)}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: isDone }}
                >
                  {isDone ? (
                    <Check size={18} color={colors.white} strokeWidth={3} />
                  ) : (
                    <Circle size={20} color={colors.muted} />
                  )}
                </Pressable>
              </View>
            );
          })
        ) : (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <FileText size={25} color={colors.green} />
            </View>
            <Text style={styles.emptyTitle}>You’re all caught up</Text>
            <Text style={styles.emptyText}>No homework in this category.</Text>
          </View>
        )}
      </ScrollView>
      <Modal
        visible={Boolean(selected)}
        transparent
        animationType="slide"
        onRequestClose={() => setSelected(null)}
      >
        <View style={styles.modalShade}>
          <View style={styles.modalCard}>
            <View style={styles.modalTop}>
              <View>
                <Text style={styles.modalKicker}>
                  {selected?.subject.toUpperCase()}
                </Text>
                <Text style={styles.modalTitle}>{selected?.title}</Text>
              </View>
              <Pressable
                style={styles.close}
                onPress={() => setSelected(null)}
                accessibilityLabel="Close homework details"
              >
                <X size={20} color={colors.ink} />
              </Pressable>
            </View>
            <Text style={styles.modalBody}>{selected?.detail}</Text>
            <View style={styles.attachmentPreview}>
              <FileText size={24} color={colors.maroon} />
              <View style={styles.flex}>
                <Text style={styles.previewTitle}>Homework resource.pdf</Text>
                <Text style={styles.previewMeta}>
                  PDF attachment · Preview only
                </Text>
              </View>
            </View>
            <Text style={styles.modalMeta}>
              Teacher: {selected ? teacherFor[selected.subject] : ""}
            </Text>
            <Text style={styles.modalMeta}>
              Assigned: {selected?.date} · {selected?.due}
            </Text>
            {selected ? (
              <Pressable
                style={styles.modalAction}
                onPress={() => {
                  toggle(selected.id);
                  setSelected(null);
                }}
              >
                <Text style={styles.modalActionText}>
                  {completed.includes(selected.id)
                    ? "Mark as pending"
                    : "Mark as completed"}
                </Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  page: { flex: 1 },
  content: { padding: spacing.md, paddingTop: 12, paddingBottom: 10 },
  flex: { flex: 1 },
  summary: {
    backgroundColor: colors.maroon,
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    ...shadow,
  },
  summaryIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  summaryTitle: { color: colors.white, fontSize: 14, fontWeight: "900" },
  summaryText: { color: "#B8C7D7", fontSize: 9, marginTop: 4 },
  summaryPercent: { color: colors.gold, fontSize: 20, fontWeight: "900" },
  filters: {
    flexDirection: "row",
    backgroundColor: "#E9EDF2",
    borderRadius: 14,
    padding: 4,
    marginTop: 15,
  },
  filter: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 11,
  },
  filterActive: { backgroundColor: colors.white, ...shadow },
  filterText: { color: colors.slate, fontSize: 10, fontWeight: "800" },
  filterTextActive: { color: colors.maroon },
  dateHeading: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 25,
    marginBottom: 11,
  },
  task: {
    backgroundColor: colors.white,
    borderRadius: 18,
    marginBottom: 10,
    flexDirection: "row",
    overflow: "hidden",
    ...shadow,
  },
  subjectStripe: { width: 4 },
  taskContent: { flex: 1, padding: 14 },
  taskTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subjectPill: {
    backgroundColor: colors.canvas,
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  subjectText: { fontSize: 8, fontWeight: "900", letterSpacing: 0.5 },
  dateText: { color: colors.muted, fontSize: 8 },
  taskTitle: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "900",
    marginTop: 11,
  },
  taskDone: { textDecorationLine: "line-through", color: colors.muted },
  taskDetail: {
    color: colors.slate,
    fontSize: 10,
    lineHeight: 16,
    marginTop: 5,
  },
  teacher: {
    color: colors.muted,
    fontSize: 8,
    marginTop: 6,
    fontWeight: "700",
  },
  taskBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  dueRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  due: { color: colors.slate, fontSize: 9, fontWeight: "700" },
  dueUrgent: { color: colors.red },
  attachment: { flexDirection: "row", alignItems: "center", gap: 3 },
  attachmentText: { color: colors.slate, fontSize: 8 },
  detailButton: {
    alignSelf: "flex-start",
    marginTop: 11,
    backgroundColor: colors.maroonTint,
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  detailButtonText: { color: colors.maroon, fontSize: 8, fontWeight: "900" },
  check: {
    width: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.canvas,
  },
  checkDone: { backgroundColor: colors.green },
  empty: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    ...shadow,
  },
  emptyIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: colors.greenSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 14,
  },
  emptyText: { color: colors.slate, fontSize: 11, marginTop: 5 },
  modalShade: {
    flex: 1,
    backgroundColor: "rgba(15,23,42,0.45)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 20,
    paddingBottom: 34,
  },
  modalTop: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  modalKicker: {
    color: colors.maroon,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  modalTitle: {
    color: colors.ink,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "900",
    marginTop: 5,
  },
  close: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: colors.canvas,
    alignItems: "center",
    justifyContent: "center",
  },
  modalBody: {
    color: colors.slate,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 16,
  },
  attachmentPreview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    backgroundColor: colors.redSoft,
    borderRadius: 15,
    padding: 14,
    marginTop: 16,
  },
  previewTitle: { color: colors.ink, fontSize: 11, fontWeight: "900" },
  previewMeta: { color: colors.slate, fontSize: 9, marginTop: 3 },
  modalMeta: { color: colors.slate, fontSize: 10, marginTop: 10 },
  modalAction: {
    backgroundColor: colors.maroon,
    borderRadius: 14,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  modalActionText: { color: colors.white, fontSize: 12, fontWeight: "900" },
});
