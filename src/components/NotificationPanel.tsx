import { router } from 'expo-router';
import { BellRing, BookOpenCheck, BusFront, CalendarCheck2, CheckCheck, IndianRupee, Megaphone, X } from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import { Animated, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, shadow } from '../theme';

const notifications = [
  { id: 'attendance', title: 'Attendance marked', message: 'Aarav is present today. Check-in recorded at 8:14 AM.', time: 'Now', icon: CalendarCheck2, color: colors.green, tint: colors.greenSoft, route: '/(parent)/attendance' as const },
  { id: 'fees', title: 'Fee reminder', message: 'The November fee instalment is due on 15 November.', time: '42 min', icon: IndianRupee, color: colors.maroon, tint: colors.redSoft, route: '/(parent)/fees' as const },
  { id: 'notice', title: 'New school notice', message: 'Parent-teacher meeting slots are now available.', time: '2 hr', icon: Megaphone, color: colors.amber, tint: colors.goldSoft, route: '/(parent)/notices' as const },
  { id: 'homework', title: 'Homework added', message: 'Science: Parts of a flower diagram is due on 12 Nov.', time: 'Yesterday', icon: BookOpenCheck, color: colors.maroon, tint: colors.maroonTint, route: '/(parent)/homework' as const },
  { id: 'bus', title: 'Bus route updated', message: 'Bus 04 is running on time for the Green Park stop.', time: '6 Nov', icon: BusFront, color: colors.green, tint: colors.greenSoft, route: '/(parent)/transport' as const },
];

export function NotificationPanel({ visible, onClose, onUnreadCountChange }: { visible: boolean; onClose: () => void; onUnreadCountChange?: (count: number) => void }) {
  const [translateX] = useState(() => new Animated.Value(420));
  const [readIds, setReadIds] = useState<string[]>(['homework', 'bus']);
  const unreadCount = useMemo(() => notifications.filter((item) => !readIds.includes(item.id)).length, [readIds]);

  useEffect(() => {
    if (visible) {
      translateX.setValue(420);
      Animated.spring(translateX, { toValue: 0, damping: 22, stiffness: 210, mass: 0.9, useNativeDriver: true }).start();
    }
  }, [translateX, visible]);

  useEffect(() => onUnreadCountChange?.(unreadCount), [onUnreadCountChange, unreadCount]);

  const openItem = (item: (typeof notifications)[number]) => {
    setReadIds((current) => current.includes(item.id) ? current : [...current, item.id]);
    onClose();
    router.push(item.route);
  };

  return <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
    <View style={styles.overlay}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close notifications" />
      <Animated.View style={[styles.panel, { transform: [{ translateX }] }]}>
        <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
          <View style={styles.header}>
            <View style={styles.headerIcon}><BellRing size={21} color={colors.gold} /></View>
            <View style={styles.flex}><Text style={styles.title}>Notifications</Text><Text style={styles.subtitle}>{unreadCount ? `${unreadCount} unread updates` : 'You are all caught up'}</Text></View>
            <Pressable style={styles.close} onPress={onClose} accessibilityLabel="Close notification panel"><X size={20} color={colors.ink} /></Pressable>
          </View>

          <View style={styles.todayRow}><Text style={styles.today}>RECENT UPDATES</Text>{unreadCount ? <Pressable style={styles.markAll} onPress={() => setReadIds(notifications.map((item) => item.id))}><CheckCheck size={14} color={colors.maroon} /><Text style={styles.markAllText}>Mark all read</Text></Pressable> : null}</View>

          <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
            {notifications.map((item) => { const Icon = item.icon; const unread = !readIds.includes(item.id); return <Pressable key={item.id} style={({ pressed }) => [styles.notification, unread && styles.notificationUnread, pressed && styles.pressed]} onPress={() => openItem(item)}>
              <View style={[styles.itemIcon, { backgroundColor: item.tint }]}><Icon size={20} color={item.color} /></View>
              <View style={styles.flex}><View style={styles.itemTop}><Text style={styles.itemTitle}>{item.title}</Text><Text style={styles.time}>{item.time}</Text></View><Text style={styles.message}>{item.message}</Text></View>
              {unread ? <View style={styles.unreadDot} /> : null}
            </Pressable>; })}
          </ScrollView>

          <View style={styles.footer}><Text style={styles.footerText}>Tap an update to open its full page</Text></View>
        </SafeAreaView>
      </Animated.View>
    </View>
  </Modal>;
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.48)', alignItems: 'flex-end' },
  panel: { width: '90%', maxWidth: 410, height: '100%', backgroundColor: colors.canvas, borderTopLeftRadius: 30, borderBottomLeftRadius: 30, overflow: 'hidden', ...shadow },
  safe: { flex: 1 }, flex: { flex: 1 }, pressed: { opacity: 0.82 },
  header: { minHeight: 104, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.maroon },
  headerIcon: { width: 43, height: 43, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  title: { color: colors.white, fontSize: 20, fontWeight: '900' }, subtitle: { color: '#F0DADF', fontSize: 10, marginTop: 4 },
  close: { width: 38, height: 38, borderRadius: 13, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  todayRow: { paddingHorizontal: 18, paddingTop: 20, paddingBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, today: { color: colors.slate, fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  markAll: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 5 }, markAllText: { color: colors.maroon, fontSize: 9, fontWeight: '900' },
  list: { paddingHorizontal: 12, paddingBottom: 24 },
  notification: { minHeight: 92, borderRadius: 18, padding: 13, marginBottom: 9, backgroundColor: colors.white, flexDirection: 'row', alignItems: 'flex-start', borderWidth: 1, borderColor: 'transparent', ...shadow },
  notificationUnread: { backgroundColor: '#FFF8F8', borderColor: '#F2D6DA' }, itemIcon: { width: 43, height: 43, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  itemTop: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 }, itemTitle: { flex: 1, color: colors.ink, fontSize: 12, fontWeight: '900' }, time: { color: colors.muted, fontSize: 8 }, message: { color: colors.slate, fontSize: 9, lineHeight: 14, marginTop: 5, paddingRight: 5 },
  unreadDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.maroon, marginTop: 4 }, footer: { padding: 14, borderTopWidth: 1, borderTopColor: colors.line, backgroundColor: colors.white }, footerText: { color: colors.muted, fontSize: 9, textAlign: 'center' },
});
