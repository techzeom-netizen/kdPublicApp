import {
  AlertTriangle,
  BusFront,
  Check,
  MapPin,
  Navigation,
  Phone,
  RefreshCw,
  ShieldCheck,
  UserRound,
} from "lucide-react-native";
import { useState } from "react";
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
import { colors, shadow, spacing } from "../../../theme";

const morningStops = [
  { name: "Saket Metro", time: "7:20 AM", status: "done" },
  { name: "Green Park", time: "7:42 AM", status: "active" },
  { name: "Hauz Khas", time: "7:55 AM", status: "next" },
  { name: "KD Public School", time: "8:12 AM", status: "next" },
];

export default function Transport() {
  const [trip, setTrip] = useState<"Morning pickup" | "Afternoon drop">(
    "Morning pickup",
  );
  const [updatedLabel, setUpdatedLabel] = useState("a few seconds ago");
  const isLoading = usePreviewLoading();
  if (isLoading) return <ScreenSkeleton variant="transport" />;
  const stops =
    trip === "Morning pickup"
      ? morningStops
      : [...morningStops]
          .reverse()
          .map((stop, index) => ({
            ...stop,
            time: ["2:20 PM", "2:37 PM", "2:51 PM", "3:05 PM"][index],
            status: index === 1 ? "active" : index < 1 ? "done" : "next",
          }));
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Bus tracking"
          eyebrow="TRANSPORT · ROUTE KDP-04"
          subtitle="Live trip status, route stops and transport contacts."
        />
        <View style={styles.segment}>
          {(["Morning pickup", "Afternoon drop"] as const).map((item) => (
            <Pressable
              key={item}
              style={[
                styles.segmentItem,
                trip === item && styles.segmentActive,
              ]}
              onPress={() => setTrip(item)}
            >
              <Text
                style={[
                  styles.segmentText,
                  trip === item && styles.segmentTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.map}>
          <View style={styles.mapGridOne} />
          <View style={styles.mapGridTwo} />
          <View style={styles.roadA} />
          <View style={styles.roadB} />
          <View style={styles.routeLine} />
          <View style={styles.schoolPin}>
            <MapPin size={18} color={colors.white} />
          </View>
          <View style={styles.busPin}>
            <BusFront size={22} color={colors.navy} />
          </View>
          <View style={styles.livePill}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <Pressable
            style={styles.refreshPill}
            onPress={() => setUpdatedLabel("just now")}
            accessibilityLabel="Refresh bus location"
          >
            <RefreshCw size={12} color={colors.navy} />
            <Text style={styles.refreshText}>Refresh</Text>
          </Pressable>
          <View style={styles.mapLabel}>
            <Text style={styles.mapLabelTitle}>Bus 04</Text>
            <Text style={styles.mapLabelText}>2.1 km away · moving</Text>
          </View>
        </View>

        <BrandGradient style={styles.etaCard}>
          <View style={styles.etaIcon}>
            <Navigation size={23} color={colors.gold} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.etaLabel}>ARRIVING AT GREEN PARK</Text>
            <Text style={styles.etaValue}>
              7:42 AM <Text style={styles.etaMinutes}>· 6 min</Text>
            </Text>
            <Text style={styles.etaMeta}>Updated {updatedLabel}</Text>
          </View>
        </BrandGradient>

        <View style={styles.safety}>
          <ShieldCheck size={18} color={colors.green} />
          <Text style={styles.safetyText}>Aarav boarded Bus 04 at 7:24 AM</Text>
        </View>
        <View style={styles.sectionRow}>
          <Text style={styles.section}>Route progress</Text>
          <Text style={styles.routeCount}>2 of 4 stops</Text>
        </View>
        <View style={styles.routeCard}>
          {stops.map((stop, index) => (
            <View key={stop.name} style={styles.stopRow}>
              <View style={styles.stopTimeline}>
                <View
                  style={[
                    styles.stopDot,
                    stop.status === "done" && styles.stopDone,
                    stop.status === "active" && styles.stopActive,
                  ]}
                >
                  {stop.status === "done" ? (
                    <Check size={11} color={colors.white} strokeWidth={3} />
                  ) : stop.status === "active" ? (
                    <BusFront size={12} color={colors.navy} />
                  ) : null}
                </View>
                {index < stops.length - 1 ? (
                  <View
                    style={[
                      styles.stopLine,
                      stop.status === "done" && styles.stopLineDone,
                    ]}
                  />
                ) : null}
              </View>
              <View style={styles.stopCopy}>
                <Text
                  style={[
                    styles.stopName,
                    stop.status === "active" && styles.stopNameActive,
                  ]}
                >
                  {stop.name}
                </Text>
                <Text style={styles.stopTime}>
                  {stop.time}
                  {stop.status === "active" ? " · Current stop" : ""}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.section}>Transport team</Text>
        <View style={styles.driver}>
          <View style={styles.driverAvatar}>
            <UserRound size={24} color={colors.maroon} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.driverName}>Rajesh Singh</Text>
            <Text style={styles.driverMeta}>Driver · Bus 04 · DL 1PC 4821</Text>
          </View>
          <Pressable
            style={styles.call}
            onPress={() =>
              Alert.alert(
                "Call transport desk",
                "For safety, calls are routed through the school transport desk.",
              )
            }
          >
            <Phone size={18} color={colors.green} />
          </Pressable>
        </View>
        <View style={styles.notice}>
          <AlertTriangle size={17} color={colors.amber} />
          <Text style={styles.noticeText}>
            Live location is demo data and updates when the production transport
            service is connected.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  page: { flex: 1 },
  content: { padding: spacing.md, paddingTop: 12, paddingBottom: 10 },
  flex: { flex: 1 },
  segment: {
    flexDirection: "row",
    backgroundColor: "#E9EDF2",
    borderRadius: 14,
    padding: 4,
    marginTop: 20,
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 11,
  },
  segmentActive: { backgroundColor: colors.white, ...shadow },
  segmentText: { color: colors.slate, fontSize: 10, fontWeight: "800" },
  segmentTextActive: { color: colors.maroon },
  map: {
    height: 245,
    borderRadius: 23,
    backgroundColor: "#E8EEF2",
    overflow: "hidden",
    marginTop: 14,
    ...shadow,
  },
  mapGridOne: {
    position: "absolute",
    width: 420,
    height: 1,
    top: 65,
    left: -20,
    backgroundColor: "#D0D9DF",
    transform: [{ rotate: "-8deg" }],
  },
  mapGridTwo: {
    position: "absolute",
    width: 380,
    height: 1,
    top: 165,
    left: -10,
    backgroundColor: "#D0D9DF",
    transform: [{ rotate: "12deg" }],
  },
  roadA: {
    position: "absolute",
    width: 330,
    height: 22,
    top: 118,
    left: 14,
    backgroundColor: "#D6DEE3",
    borderColor: colors.white,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    transform: [{ rotate: "-14deg" }],
  },
  roadB: {
    position: "absolute",
    width: 240,
    height: 17,
    top: 105,
    left: 106,
    backgroundColor: "#D6DEE3",
    borderColor: colors.white,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    transform: [{ rotate: "58deg" }],
  },
  routeLine: {
    position: "absolute",
    width: 220,
    height: 5,
    top: 126,
    left: 62,
    backgroundColor: colors.maroon,
    borderRadius: 4,
    transform: [{ rotate: "-14deg" }],
  },
  schoolPin: {
    position: "absolute",
    right: 55,
    top: 78,
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: colors.maroon,
    alignItems: "center",
    justifyContent: "center",
  },
  busPin: {
    position: "absolute",
    left: 145,
    top: 105,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.white,
  },
  livePill: {
    position: "absolute",
    top: 14,
    left: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.white,
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.red,
  },
  liveText: { color: colors.ink, fontSize: 8, fontWeight: "900" },
  refreshPill: {
    position: "absolute",
    top: 14,
    right: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.white,
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  refreshText: { color: colors.navy, fontSize: 8, fontWeight: "900" },
  mapLabel: {
    position: "absolute",
    left: 14,
    bottom: 14,
    backgroundColor: colors.white,
    borderRadius: 13,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  mapLabelTitle: { color: colors.ink, fontSize: 12, fontWeight: "900" },
  mapLabelText: { color: colors.slate, fontSize: 8, marginTop: 3 },
  etaCard: {
    backgroundColor: colors.navy,
    borderRadius: 19,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 11,
  },
  etaIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  etaLabel: {
    color: colors.gold,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  etaValue: {
    color: colors.white,
    fontSize: 19,
    fontWeight: "900",
    marginTop: 4,
  },
  etaMinutes: { color: "#B8C7D7", fontSize: 12 },
  etaMeta: { color: "#8FA2B6", fontSize: 8, marginTop: 4 },
  safety: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.greenSoft,
    borderRadius: 14,
    padding: 13,
    marginTop: 10,
  },
  safetyText: { color: colors.green, fontSize: 10, fontWeight: "800" },
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
    marginBottom: 12,
  },
  routeCount: { color: colors.slate, fontSize: 9, marginTop: 18 },
  routeCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 15,
    ...shadow,
  },
  stopRow: { flexDirection: "row", minHeight: 67 },
  stopTimeline: { width: 38, alignItems: "center" },
  stopDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  stopDone: { backgroundColor: colors.green, borderColor: colors.green },
  stopActive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  stopLine: { width: 2, flex: 1, backgroundColor: colors.line },
  stopLineDone: { backgroundColor: colors.green },
  stopCopy: { paddingTop: 2 },
  stopName: { color: colors.ink, fontSize: 12, fontWeight: "800" },
  stopNameActive: { color: colors.maroon, fontWeight: "900" },
  stopTime: { color: colors.muted, fontSize: 9, marginTop: 4 },
  driver: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    ...shadow,
  },
  driverAvatar: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: colors.redSoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  driverName: { color: colors.ink, fontSize: 13, fontWeight: "900" },
  driverMeta: { color: colors.slate, fontSize: 9, marginTop: 4 },
  call: {
    width: 39,
    height: 39,
    borderRadius: 13,
    backgroundColor: colors.greenSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  notice: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: colors.amberSoft,
    borderRadius: 14,
    padding: 13,
    marginTop: 11,
  },
  noticeText: { flex: 1, color: colors.slate, fontSize: 9, lineHeight: 14 },
});
