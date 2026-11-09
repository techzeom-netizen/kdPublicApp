import { Platform } from 'react-native';

export const colors = {
  navy: '#233F77',
  navySoft: '#34528A',
  navyTint: '#E9EDF7',
  ink: '#0F172A',
  maroon: '#7A1724',
  maroonSoft: '#A63145',
  gold: '#D4A62F',
  goldSoft: '#FFF4CF',
  cream: '#F7F3E8',
  canvas: '#F6F7FB',
  white: '#FFFFFF',
  slate: '#64748B',
  muted: '#94A3B8',
  line: '#E2E8F0',
  green: '#188B62',
  greenSoft: '#DCF7EC',
  red: '#DC2626',
  redSoft: '#FEE7E7',
  amber: '#D97706',
  amberSoft: '#FFF3D6',
};

export const brandGradient = ['#4F0F19', '#7A1724', '#9A3342'] as const;

export const shadow = Platform.select({
  ios: { shadowColor: '#0F172A', shadowOpacity: 0.08, shadowRadius: 14, shadowOffset: { width: 0, height: 6 } },
  android: { elevation: 3 },
  default: {},
});

export const spacing = { xs: 6, sm: 10, md: 16, lg: 22, xl: 30, xxl: 40 };
