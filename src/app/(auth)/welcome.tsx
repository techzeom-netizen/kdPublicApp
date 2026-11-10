import { Link } from "expo-router";
import {
  CalendarCheck2,
  ChevronRight,
  LogIn,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BrandGradient } from "../../components/BrandGradient";
import { Logo } from "../../components/Logo";
import { colors, shadow, spacing } from "../../theme";

export default function Welcome() {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <BrandGradient style={styles.screen}>
        <View style={styles.glowOne} />
        <View style={styles.glowTwo} />
        <View style={styles.brand}>
          <Logo dark centered large />
        </View>
        <View style={styles.heroCopy}>
          <View style={styles.kickerPill}>
            <Sparkles size={14} color={colors.gold} />
            <Text style={styles.kicker}>A CARING SCHOOL COMMUNITY</Text>
          </View>
          <Text style={styles.title}>
            Your child’s school day, beautifully connected.
          </Text>
          <Text style={styles.body}>
            Attendance, learning, fees and every important update—together in
            one secure parent app.
          </Text>
        </View>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.sheetTitle}>Welcome to Parent Connect</Text>
          <Text style={styles.sheetText}>
            Everything you need, always close at hand.
          </Text>
          <View style={styles.featureRow}>
            <Feature
              icon={<CalendarCheck2 size={19} color={colors.maroon} />}
              label="Attendance"
            />
            <Feature
              icon={<WalletCards size={19} color={colors.maroon} />}
              label="Fees"
            />
            <Feature
              icon={<ShieldCheck size={19} color={colors.green} />}
              label="Secure"
            />
          </View>
          <Link href="/(auth)/login" asChild>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Continue to secure parent login"
            >
              <BrandGradient style={styles.buttonInner}>
                <View style={styles.buttonIcon}>
                  <LogIn size={20} color={colors.gold} />
                </View>
                <View style={styles.buttonCopy}>
                  <Text
                    style={styles.buttonText}
                    numberOfLines={1}
                    maxFontSizeMultiplier={1.2}
                  >
                    Continue as parent
                  </Text>
                  <Text
                    style={styles.buttonSubtext}
                    numberOfLines={1}
                    maxFontSizeMultiplier={1.2}
                  >
                    Secure login to Parent Connect
                  </Text>
                </View>
                <View style={styles.buttonArrow}>
                  <ChevronRight
                    size={19}
                    color={colors.maroon}
                    strokeWidth={2.6}
                  />
                </View>
              </BrandGradient>
            </Pressable>
          </Link>
          <Text style={styles.footer}>Knowledge · Discipline · Excellence</Text>
        </View>
      </BrandGradient>
    </SafeAreaView>
  );
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <View style={styles.feature}>
      <View style={styles.featureIcon}>{icon}</View>
      <Text style={styles.featureText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#4F0F19" },
  screen: { flex: 1, paddingTop: 12, overflow: "hidden" },
  glowOne: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(255,255,255,0.04)",
    top: -90,
    right: -80,
  },
  glowTwo: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    top: 190,
    left: -70,
  },
  brand: { alignItems: "center", paddingHorizontal: spacing.lg },
  heroCopy: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingBottom: 18,
  },
  kickerPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  kicker: {
    color: colors.gold,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },
  title: {
    color: colors.white,
    fontSize: 30,
    lineHeight: 37,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 18,
  },
  body: {
    color: "#F0DADF",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 12,
    maxWidth: 390,
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    padding: 22,
    paddingTop: 12,
    ...shadow,
  },
  handle: {
    width: 42,
    height: 4,
    borderRadius: 3,
    backgroundColor: colors.line,
    alignSelf: "center",
    marginBottom: 18,
  },
  sheetTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
  },
  sheetText: {
    color: colors.slate,
    fontSize: 11,
    textAlign: "center",
    marginTop: 5,
  },
  featureRow: { flexDirection: "row", gap: 10, marginTop: 18 },
  feature: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.canvas,
    borderRadius: 15,
    paddingVertical: 11,
  },
  featureIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    color: colors.ink,
    fontSize: 9,
    fontWeight: "800",
    marginTop: 6,
  },
  button: { borderRadius: 20, marginTop: 18, ...shadow },
  buttonPressed: { opacity: 0.9, transform: [{ scale: 0.985 }] },
  buttonInner: {
    width: "100%",
    minHeight: 68,
    borderRadius: 20,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
  },
  buttonIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  buttonCopy: { flex: 1, minWidth: 0, paddingRight: 8 },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900",
  },
  buttonSubtext: {
    color: "#F0DADF",
    fontSize: 9,
    lineHeight: 13,
    marginTop: 3,
  },
  buttonArrow: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    color: colors.muted,
    textAlign: "center",
    marginTop: 13,
    fontSize: 9,
  },
});
