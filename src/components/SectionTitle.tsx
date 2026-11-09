import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';
export function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) { return <View style={styles.row}><Text style={styles.title}>{title}</Text>{action ? <Pressable onPress={onAction} disabled={!onAction} hitSlop={8}><Text style={styles.action}>{action}</Text></Pressable> : null}</View>; }
const styles = StyleSheet.create({ row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.lg, marginBottom: spacing.sm }, title: { color: colors.ink, fontSize: 18, fontWeight: '800' }, action: { color: colors.maroon, fontSize: 13, fontWeight: '700' } });
