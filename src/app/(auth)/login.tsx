import { Link, router } from 'expo-router';
import { Eye, EyeOff, LockKeyhole, LogIn, Mail, ShieldCheck } from 'lucide-react-native';
import type { ComponentRef } from 'react';
import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandGradient } from '../../components/BrandGradient';
import { Logo } from '../../components/Logo';
import { colors, shadow, spacing } from '../../theme';

export default function Login() {
  const passwordInput = useRef<ComponentRef<typeof TextInput>>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const submit = () => {
    const normalizedEmail = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) { setError('Enter the email address registered with the school.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setError(''); router.replace('/(parent)/dashboard');
  };

  return <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
    <BrandGradient style={styles.topBand} />
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0}>
      <ScrollView style={styles.flex} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'} showsVerticalScrollIndicator={false}>
        <Logo dark centered large />
        <View style={styles.portalPill}><ShieldCheck size={13} color={colors.gold} /><Text style={styles.portalText}>SECURE PARENT PORTAL</Text></View>
        <Text style={styles.title}>Welcome back</Text><Text style={styles.subtitle}>Sign in with your registered parent account.</Text>

        <View style={styles.formCard}>
          <View style={styles.handle} /><Text style={styles.formTitle}>Sign in</Text><Text style={styles.formSubtitle}>Enter your school account credentials</Text>
          <Text style={styles.label}>Email address</Text><View style={[styles.inputWrap, error && !email.trim() ? styles.inputError : null]}><Mail size={19} color={colors.maroon} /><TextInput value={email} onChangeText={(value) => { setEmail(value); setError(''); }} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} autoComplete="email" placeholder="parent@example.com" placeholderTextColor={colors.muted} style={styles.input} returnKeyType="next" onSubmitEditing={() => passwordInput.current?.focus()} blurOnSubmit={false} /></View>
          <Text style={[styles.label, styles.passwordLabel]}>Password</Text><View style={styles.inputWrap}><LockKeyhole size={19} color={colors.maroon} /><TextInput ref={passwordInput} value={password} onChangeText={(value) => { setPassword(value); setError(''); }} secureTextEntry={!showPassword} autoComplete="current-password" placeholder="Enter your password" placeholderTextColor={colors.muted} style={styles.input} returnKeyType="done" onSubmitEditing={submit} /><Pressable onPress={() => setShowPassword((value) => !value)} hitSlop={10} accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={20} color={colors.slate} /> : <Eye size={20} color={colors.slate} />}</Pressable></View>
          {error ? <Text style={styles.error} accessibilityLiveRegion="polite">{error}</Text> : null}
          <View style={styles.options}><Pressable style={styles.remember} onPress={() => setRemember((value) => !value)} accessibilityRole="checkbox" accessibilityState={{ checked: remember }}><View style={[styles.checkbox, remember && styles.checkboxChecked]}>{remember ? <Text style={styles.check}>✓</Text> : null}</View><Text style={styles.rememberText}>Remember me</Text></Pressable><Link href="/(auth)/forgot-password" style={styles.forgot}>Forgot password?</Link></View>
          <Pressable onPress={submit} style={({ pressed }) => [styles.button, pressed && styles.pressed]} accessibilityRole="button"><BrandGradient style={StyleSheet.absoluteFill} /><LogIn size={19} color={colors.white} /><Text style={styles.buttonText}>Sign in securely</Text></Pressable>
          <View style={styles.secure}><ShieldCheck size={15} color={colors.green} /><Text style={styles.secureText}>Protected school account access</Text></View>
        </View>
        <Text style={styles.help}>Need help? Contact the KD Public School office.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  flex: { flex: 1 }, safe: { flex: 1, backgroundColor: colors.canvas }, topBand: { position: 'absolute', top: 0, left: 0, right: 0, height: 350, borderBottomLeftRadius: 38, borderBottomRightRadius: 38 }, content: { flexGrow: 1, padding: spacing.lg, paddingTop: 14, paddingBottom: 30 },
  portalPill: { alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,255,255,0.11)', borderRadius: 99, paddingHorizontal: 11, paddingVertical: 6, marginTop: 15 }, portalText: { color: colors.gold, fontSize: 8, fontWeight: '900', letterSpacing: 0.8 },
  title: { color: colors.white, fontSize: 30, fontWeight: '900', textAlign: 'center', marginTop: 15 }, subtitle: { color: '#F0DADF', fontSize: 13, textAlign: 'center', marginTop: 5 },
  formCard: { backgroundColor: colors.white, borderRadius: 28, padding: 20, marginTop: 25, ...shadow }, handle: { width: 38, height: 4, backgroundColor: colors.line, borderRadius: 3, alignSelf: 'center', marginBottom: 15 }, formTitle: { color: colors.ink, fontSize: 23, fontWeight: '900' }, formSubtitle: { color: colors.slate, fontSize: 11, marginTop: 4, marginBottom: 22 },
  label: { color: colors.ink, fontSize: 12, fontWeight: '800', marginBottom: 8 }, passwordLabel: { marginTop: 16 }, inputWrap: { minHeight: 54, borderWidth: 1.2, borderColor: colors.line, borderRadius: 14, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FCFDFE' }, inputError: { borderColor: colors.red }, input: { flex: 1, color: colors.ink, fontSize: 14, paddingHorizontal: 11, paddingVertical: 14 },
  error: { color: colors.red, fontSize: 11, lineHeight: 17, marginTop: 8 }, options: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 17 }, remember: { flexDirection: 'row', alignItems: 'center' }, checkbox: { width: 21, height: 21, borderWidth: 1.2, borderColor: colors.line, borderRadius: 6, marginRight: 8, alignItems: 'center', justifyContent: 'center' }, checkboxChecked: { backgroundColor: colors.maroon, borderColor: colors.maroon }, check: { color: colors.white, fontSize: 13, fontWeight: '900' }, rememberText: { color: colors.slate, fontSize: 11 }, forgot: { color: colors.maroon, fontSize: 11, fontWeight: '900' },
  button: { minHeight: 55, borderRadius: 15, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 23 }, pressed: { opacity: 0.88 }, buttonText: { color: colors.white, fontWeight: '900', fontSize: 14 }, secure: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 15 }, secureText: { color: colors.slate, fontSize: 9 }, help: { color: colors.slate, fontSize: 10, textAlign: 'center', marginTop: 18 },
});
