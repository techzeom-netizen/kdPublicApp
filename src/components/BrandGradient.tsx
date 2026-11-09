import { LinearGradient } from 'expo-linear-gradient';
import { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { brandGradient } from '../theme';

export function BrandGradient({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  return <LinearGradient colors={brandGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={style}>{children}</LinearGradient>;
}
