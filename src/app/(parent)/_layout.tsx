import { Tabs } from 'expo-router';
import { BookOpenText, CalendarCheck2, House, UserRound, WalletCards } from 'lucide-react-native';
import { colors } from '../../theme';

export default function ParentLayout() {
  return <Tabs screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: colors.maroon,
    tabBarInactiveTintColor: colors.muted,
    tabBarLabelStyle: { fontSize: 10, fontWeight: '700', marginTop: 2 },
    tabBarStyle: { height: 72, paddingTop: 8, paddingBottom: 8, borderTopColor: colors.line, backgroundColor: colors.white },
  }}>
    <Tabs.Screen name="dashboard" options={{ title: 'Home', tabBarIcon: ({ color }) => <House size={21} color={color} strokeWidth={2.2} /> }} />
    <Tabs.Screen name="attendance/index" options={{ title: 'Attendance', tabBarIcon: ({ color }) => <CalendarCheck2 size={21} color={color} strokeWidth={2.2} /> }} />
    <Tabs.Screen name="fees/index" options={{ title: 'Fees', tabBarIcon: ({ color }) => <WalletCards size={21} color={color} strokeWidth={2.2} /> }} />
    <Tabs.Screen name="academics/index" options={{ title: 'Academics', tabBarIcon: ({ color }) => <BookOpenText size={21} color={color} strokeWidth={2.2} /> }} />
    <Tabs.Screen name="profile/index" options={{ title: 'Profile', tabBarIcon: ({ color }) => <UserRound size={21} color={color} strokeWidth={2.2} /> }} />
    <Tabs.Screen name="transport/index" options={{ href: null }} />
    <Tabs.Screen name="results/index" options={{ href: null }} />
    <Tabs.Screen name="notices/index" options={{ href: null }} />
    <Tabs.Screen name="achievements/index" options={{ href: null }} />
    <Tabs.Screen name="homework/index" options={{ href: null }} />
    <Tabs.Screen name="timetable/index" options={{ href: null }} />
    <Tabs.Screen name="assignments/index" options={{ href: null }} />
  </Tabs>;
}
