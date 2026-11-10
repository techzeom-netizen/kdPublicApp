import {
  Bell,
  CalendarDays,
  ChevronDown,
  Megaphone,
  Pin,
  Search,
  Share2,
  Paperclip,
} from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { ScreenSkeleton } from "../../../components/ScreenSkeleton";
import { usePreviewLoading } from "../../../hooks/usePreviewLoading";
import { notices } from "../../../mocks/data";
import { colors, shadow, spacing } from "../../../theme";

const categories = ["All", "Academic", "Meeting", "School", "Event"] as const;

export default function Notices() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [expanded, setExpanded] = useState<string>("winter-exams");
  const [query, setQuery] = useState("");
  const [readIds, setReadIds] = useState<string[]>(["ptm", "sports-day"]);
  const visible = useMemo(
    () =>
      notices.filter(
        (notice) =>
          (category === "All" || notice.category === category) &&
          `${notice.title} ${notice.body}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
      ),
    [category, query],
  );
  const isLoading = usePreviewLoading();
  if (isLoading) return <ScreenSkeleton variant="notices" />;
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Notice board"
          eyebrow="KD PUBLIC SCHOOL"
          subtitle="Official circulars, events and parent updates."
        />
        <View style={styles.alert}>
          <View style={styles.alertIcon}>
            <Bell size={20} color={colors.gold} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.alertTitle}>
              {notices.length - readIds.length} unread notices
            </Text>
            <Text style={styles.alertText}>
              Important updates are pinned at the top.
            </Text>
          </View>
        </View>
        <View style={styles.search}>
          <Search size={18} color={colors.muted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search notices"
            placeholderTextColor={colors.muted}
            style={styles.searchInput}
            returnKeyType="search"
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {categories.map((item) => (
            <Pressable
              key={item}
              style={[styles.filter, category === item && styles.filterActive]}
              onPress={() => setCategory(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  category === item && styles.filterTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        <View style={styles.sectionRow}>
          <Text style={styles.section}>
            {category === "All" ? "Latest notices" : category}
          </Text>
          <Text style={styles.count}>{visible.length} updates</Text>
        </View>
        {visible.map((notice, index) => {
          const isOpen = expanded === notice.id;
          const isRead = readIds.includes(notice.id);
          return (
            <View
              key={notice.id}
              style={[
                styles.notice,
                index === 0 && styles.pinnedNotice,
                !isRead && styles.unreadNotice,
              ]}
            >
              <Pressable
                style={styles.noticeHeader}
                onPress={() => {
                  setExpanded(isOpen ? "" : notice.id);
                  setReadIds((ids) =>
                    ids.includes(notice.id) ? ids : [...ids, notice.id],
                  );
                }}
                accessibilityState={{ expanded: isOpen }}
              >
                <View
                  style={[
                    styles.noticeIcon,
                    notice.priority === "Important"
                      ? styles.noticeIconImportant
                      : null,
                  ]}
                >
                  {index === 0 ? (
                    <Pin size={18} color={colors.maroon} />
                  ) : (
                    <Megaphone size={18} color={colors.amber} />
                  )}
                </View>
                <View style={styles.flex}>
                  <View style={styles.metaRow}>
                    <Text style={styles.category}>
                      {notice.category.toUpperCase()}
                    </Text>
                    <Text style={styles.priority}>{notice.priority}</Text>
                    {!isRead ? <View style={styles.unreadDot} /> : null}
                  </View>
                  <Text style={styles.noticeTitle}>{notice.title}</Text>
                  <View style={styles.dateRow}>
                    <CalendarDays size={12} color={colors.muted} />
                    <Text style={styles.date}>
                      {notice.date} · KD Public School
                    </Text>
                  </View>
                </View>
                <View style={[styles.chevron, isOpen && styles.chevronOpen]}>
                  <ChevronDown size={18} color={colors.maroon} />
                </View>
              </Pressable>
              {isOpen ? (
                <View style={styles.noticeBody}>
                  <Text style={styles.bodyText}>{notice.body}</Text>
                  <View style={styles.fileRow}>
                    <Paperclip size={13} color={colors.maroon} />
                    <Text style={styles.fileText}>
                      Circular attachment · PDF
                    </Text>
                  </View>
                  <Pressable
                    style={styles.share}
                    onPress={() =>
                      Alert.alert(
                        "Share notice",
                        "Sharing will use the device share sheet when document services are connected.",
                      )
                    }
                  >
                    <Share2 size={14} color={colors.maroon} />
                    <Text style={styles.shareText}>Share notice</Text>
                  </Pressable>
                </View>
              ) : null}
            </View>
          );
        })}
        {!visible.length ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No notices found</Text>
            <Text style={styles.emptyText}>
              Try another search or category.
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  page: { flex: 1 },
  content: { padding: spacing.md, paddingTop: 12, paddingBottom: 10 },
  flex: { flex: 1 },
  alert: {
    backgroundColor: colors.maroon,
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  alertIcon: {
    width: 41,
    height: 41,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  alertTitle: { color: colors.white, fontSize: 13, fontWeight: "900" },
  alertText: { color: "#B8C7D7", fontSize: 9, marginTop: 4 },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    backgroundColor: colors.white,
    borderRadius: 15,
    paddingHorizontal: 13,
    marginTop: 12,
    ...shadow,
  },
  searchInput: { flex: 1, minHeight: 46, color: colors.ink, fontSize: 12 },
  filters: { gap: 8, paddingVertical: 17 },
  filter: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: colors.white,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: colors.line,
  },
  filterActive: { backgroundColor: colors.maroon, borderColor: colors.maroon },
  filterText: { color: colors.slate, fontSize: 10, fontWeight: "800" },
  filterTextActive: { color: colors.white },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  section: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 12,
  },
  count: { color: colors.slate, fontSize: 9, marginBottom: 8 },
  notice: {
    backgroundColor: colors.white,
    borderRadius: 18,
    marginBottom: 10,
    overflow: "hidden",
    ...shadow,
  },
  pinnedNotice: { borderWidth: 1, borderColor: "#ECD7DB" },
  unreadNotice: { borderLeftWidth: 4, borderLeftColor: colors.maroon },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.maroon,
  },
  noticeHeader: { padding: 14, flexDirection: "row", alignItems: "flex-start" },
  noticeIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.goldSoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  noticeIconImportant: { backgroundColor: colors.redSoft },
  metaRow: { flexDirection: "row", gap: 7, alignItems: "center" },
  category: {
    color: colors.maroon,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.7,
  },
  priority: { color: colors.amber, fontSize: 8, fontWeight: "800" },
  noticeTitle: {
    color: colors.ink,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900",
    marginTop: 6,
    paddingRight: 4,
  },
  dateRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 8 },
  date: { color: colors.muted, fontSize: 8 },
  chevron: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.canvas,
    alignItems: "center",
    justifyContent: "center",
  },
  chevronOpen: { transform: [{ rotate: "180deg" }] },
  noticeBody: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    padding: 15,
    paddingTop: 13,
  },
  bodyText: { color: colors.slate, fontSize: 11, lineHeight: 18 },
  fileRow: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    backgroundColor: colors.maroonTint,
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
  },
  fileText: { color: colors.maroon, fontSize: 9, fontWeight: "800" },
  share: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  shareText: { color: colors.maroon, fontSize: 10, fontWeight: "900" },
  empty: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 28,
    alignItems: "center",
    ...shadow,
  },
  emptyTitle: { color: colors.ink, fontSize: 15, fontWeight: "900" },
  emptyText: { color: colors.slate, fontSize: 10, marginTop: 5 },
});
