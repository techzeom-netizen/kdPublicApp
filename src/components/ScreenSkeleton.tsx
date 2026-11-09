import { useEffect, useState } from 'react';
import { Animated, DimensionValue, ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';

export type SkeletonVariant = 'dashboard' | 'attendance' | 'fees' | 'feeDetails' | 'academics' | 'student' | 'results' | 'homework' | 'timetable' | 'notices' | 'achievements' | 'transport' | 'profile';

export function ScreenSkeleton({ variant }: { variant: SkeletonVariant }) {
  const [opacity] = useState(() => new Animated.Value(0.45));

  useEffect(() => {
    const animation = Animated.loop(Animated.sequence([
      Animated.timing(opacity, { toValue: 0.9, duration: 650, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0.45, duration: 650, useNativeDriver: true }),
    ]));
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  const block = (height: number, width: DimensionValue = '100%', style?: StyleProp<ViewStyle>) => <Animated.View style={[styles.block, { height, width, opacity }, style]} />;
  const title = (back = false) => <>
    <View style={styles.headerRow}>{back ? block(42, 42, styles.rounded) : block(42, 145, styles.brand)}{block(18, back ? 110 : 42, back ? undefined : styles.rounded)}{back ? block(42, 42, styles.invisible) : null}</View>
    {block(9, 120, styles.line)}{block(34, '72%', styles.title)}{block(12, '88%', styles.line)}
  </>;
  const section = () => <>{block(18, 145, styles.sectionTitle)}{[0, 1, 2].map((item) => <View key={item} style={styles.listRow}>{block(42, 42, styles.rounded)}<View style={styles.flex}>{block(12, '64%', styles.line)}{block(9, '88%', styles.smallLine)}</View>{block(28, 28, styles.rounded)}</View>)}</>;
  const cardGrid = (count = 4) => <View style={styles.grid}>{Array.from({ length: count }, (_, item) => <View key={item} style={styles.gridCard}>{block(42, 42, styles.rounded)}{block(13, '68%', styles.line)}{block(9, '84%', styles.smallLine)}</View>)}</View>;
  const toolGrid = () => <View style={styles.grid}>{Array.from({ length: 9 }, (_, item) => <View key={item} style={styles.toolCard}>{block(43, 43, styles.rounded)}{block(11, '72%', styles.line)}</View>)}</View>;
  const calendar = () => <View style={styles.calendar}>{block(14, 150, styles.line)}<View style={styles.calendarGrid}>{Array.from({ length: 35 }, (_, item) => block(28, '12.4%', [styles.day, item % 9 === 0 && styles.dayAccent]))}</View></View>;
  const timeline = () => <>{[0, 1, 2, 3].map((item) => <View key={item} style={styles.timelineRow}><View style={styles.timelineRail}>{block(38, 38, styles.rounded)}{item < 3 ? <View style={styles.rail} /> : null}</View><View style={styles.timelineCard}>{block(9, '32%', styles.line)}{block(15, '72%', styles.line)}{block(10, '92%', styles.smallLine)}{block(10, '65%', styles.smallLine)}</View></View>)}</>;

  let body;
  switch (variant) {
    case 'dashboard': body = <>{title()}{block(86, '100%', styles.hero)}{block(18, 150, styles.sectionTitle)}<View style={styles.twoCol}><View style={styles.tallCard}>{block(42, 42, styles.rounded)}{block(12, '60%', styles.line)}{block(22, '72%', styles.line)}</View><View style={styles.tallCard}>{block(42, 42, styles.rounded)}{block(12, '60%', styles.line)}{block(22, '72%', styles.line)}</View></View>{section()}</>; break;
    case 'attendance': body = <>{title()}{block(82, '100%', styles.card)}<View style={styles.stats}>{block(38, '27%')}{block(38, '27%')}{block(38, '27%')}</View>{block(66, '100%', styles.card)}{calendar()}</>; break;
    case 'fees': body = <>{title()}{block(210, '100%', styles.hero)}{block(44, '92%', styles.smallCard)}{section()}</>; break;
    case 'feeDetails': body = <>{title(true)}{block(205, '100%', styles.hero)}{section()}{block(56, '100%', styles.button)}</>; break;
    case 'academics': body = <>{title()}{block(178, '100%', styles.hero)}{block(18, 120, styles.sectionTitle)}{toolGrid()}</>; break;
    case 'student': body = <>{title(true)}{block(210, '100%', styles.hero)}{block(18, 140, styles.sectionTitle)}{cardGrid(4)}{section()}</>; break;
    case 'results': body = <>{title(true)}{block(46, '100%', styles.segment)}{block(155, '100%', styles.hero)}<View style={styles.stats}>{block(48, '27%')}{block(48, '27%')}{block(48, '27%')}</View>{section()}</>; break;
    case 'homework': body = <>{title(true)}{block(76, '100%', styles.hero)}{block(46, '100%', styles.segment)}{section()}</>; break;
    case 'timetable': body = <>{title(true)}<View style={styles.chipRow}>{[0, 1, 2, 3, 4].map((item) => block(66, 58, [styles.rounded, item === 0 && styles.accent]))}</View>{block(74, '100%', styles.hero)}{timeline()}</>; break;
    case 'notices': body = <>{title(true)}{block(70, '100%', styles.hero)}<View style={styles.chipRow}>{[0, 1, 2, 3].map((item) => block(34, 74, styles.pill))}</View>{section()}</>; break;
    case 'achievements': body = <>{title(true)}{block(112, '100%', styles.hero)}<View style={styles.stats}>{block(42, '27%')}{block(42, '27%')}{block(42, '27%')}</View>{timeline()}</>; break;
    case 'transport': body = <>{title(true)}{block(46, '100%', styles.segment)}{block(245, '100%', styles.map)}{block(84, '100%', styles.hero)}{section()}</>; break;
    case 'profile': body = <>{title()}{block(90, '100%', styles.hero)}{section()}</>; break;
    default: body = <>{title()}{section()}</>;
  }

  return <SafeAreaView style={styles.safe} edges={['top']} accessibilityLabel="Loading screen content" accessibilityLiveRegion="polite"><ScrollView style={styles.page} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>{body}</ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas }, page: { flex: 1 }, content: { padding: spacing.md, paddingTop: 14, paddingBottom: 110 }, flex: { flex: 1 },
  block: { backgroundColor: '#E2E7EC', borderRadius: 8 }, line: { marginTop: 8 }, smallLine: { marginTop: 7 }, title: { marginTop: 9, borderRadius: 11 }, sectionTitle: { marginTop: 28, marginBottom: 12 }, rounded: { borderRadius: 14 }, brand: { borderRadius: 12 }, invisible: { opacity: 0 },
  headerRow: { minHeight: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }, hero: { borderRadius: 22, marginTop: 20, backgroundColor: '#D8DEE5' }, card: { borderRadius: 18, marginTop: 20 }, smallCard: { borderRadius: 14, marginTop: 12 }, button: { borderRadius: 15, marginTop: 22 }, segment: { borderRadius: 14, marginTop: 18 }, map: { borderRadius: 23, marginTop: 13 },
  twoCol: { flexDirection: 'row', gap: 10 }, tallCard: { flex: 1, minHeight: 155, backgroundColor: '#E8EBEF', borderRadius: 18, padding: 14 }, stats: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#E8EBEF', borderRadius: 16, paddingVertical: 14, marginTop: 11 },
  listRow: { minHeight: 72, backgroundColor: '#E8EBEF', borderRadius: 16, padding: 14, marginBottom: 9, flexDirection: 'row', alignItems: 'center', gap: 11 }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 }, gridCard: { width: '48.5%', minHeight: 135, backgroundColor: '#E8EBEF', borderRadius: 18, padding: 14 }, toolCard: { width: '31.6%', minHeight: 116, backgroundColor: '#E8EBEF', borderRadius: 17, padding: 12, alignItems: 'center', justifyContent: 'center' },
  calendar: { backgroundColor: '#E8EBEF', borderRadius: 18, padding: 13, marginTop: 12 }, calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 14 }, day: { borderRadius: 9, marginBottom: 3 }, dayAccent: { backgroundColor: '#D4D9DF' },
  chipRow: { flexDirection: 'row', gap: 8, paddingVertical: 18 }, pill: { borderRadius: 99 }, accent: { backgroundColor: '#D8C5C8' }, timelineRow: { minHeight: 112, flexDirection: 'row' }, timelineRail: { width: 49, alignItems: 'center' }, rail: { width: 2, flex: 1, backgroundColor: '#D9DEE4' }, timelineCard: { flex: 1, minHeight: 96, backgroundColor: '#E8EBEF', borderRadius: 17, padding: 14, marginBottom: 9 },
});
