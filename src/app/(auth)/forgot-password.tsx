import { Link } from 'expo-router';
import { ArrowLeft, CircleCheck, Mail, Send } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandGradient } from '../../components/BrandGradient';
import { Logo } from '../../components/Logo';
import { colors, shadow, spacing } from '../../theme';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const submit = () => {
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) { setError('Enter a valid registered email address.'); return; }
    setError(''); setSent(true);
  };

  return <SafeAreaView style={styles.safe} edges={['top', 'bottom']}><BrandGradient style={styles.topBand} /><View style={styles.container}>
    <Logo dark centered large />
    {sent ? <View style={styles.card}>
      <View style={styles.successIcon}><CircleCheck size={30} color={colors.green} /></View>
      <Text style={styles.title}>Check your inbox</Text>
      <Text style={styles.subtitle}>If <Text style={styles.email}>{email.trim()}</Text> is registered, we’ll send password reset instructions shortly.</Text>
      <Link href="/(auth)/login" asChild><Pressable style={styles.button}><BrandGradient style={StyleSheet.absoluteFill} /><ArrowLeft size={18} color={colors.white} /><Text style={styles.buttonText}>Back to sign in</Text></Pressable></Link>
    </View> : <View style={styles.card}>
      <View style={styles.icon}><Send size={26} color={colors.gold} /></View>
      <Text style={styles.title}>Reset your password</Text>
      <Text style={styles.subtitle}>Enter the email address registered with the school. We’ll send you a secure reset link.</Text>
      <Text style={styles.label}>Email address</Text>
      <View style={styles.inputWrap}><Mail size={19} color={colors.slate} /><TextInput value={email} onChangeText={(value) => { setEmail(value); setError(''); }} keyboardType="email-address" autoCapitalize="none" autoComplete="email" placeholder="parent@example.com" placeholderTextColor={colors.muted} style={styles.input} onSubmitEditing={submit} /></View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable style={styles.button} onPress={submit}><BrandGradient style={StyleSheet.absoluteFill} /><Text style={styles.buttonText}>Send reset link</Text></Pressable>
      <Link href="/(auth)/login" style={styles.back}>Back to sign in</Link>
    </View>}
  </View></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas }, topBand: { position: 'absolute', top: 0, left: 0, right: 0, height: 270, borderBottomLeftRadius: 38, borderBottomRightRadius: 38 }, container: { flex: 1, padding: spacing.lg, paddingTop: 14 },
  card: { backgroundColor: colors.white, borderRadius: 28, padding: 22, marginTop: 24, ...shadow },
  icon: { width: 52, height: 52, borderRadius: 17, backgroundColor: colors.maroon, alignItems: 'center', justifyContent: 'center' },
  successIcon: { width: 58, height: 58, borderRadius: 29, backgroundColor: colors.greenSoft, alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.ink, fontSize: 28, lineHeight: 34, fontWeight: '900', marginTop: 20 },
  subtitle: { color: colors.slate, fontSize: 14, lineHeight: 22, marginTop: 9, marginBottom: 26 }, email: { color: colors.ink, fontWeight: '800' },
  label: { color: colors.ink, fontSize: 13, fontWeight: '800', marginBottom: 8 }, inputWrap: { minHeight: 54, borderWidth: 1.2, borderColor: colors.line, borderRadius: 14, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, color: colors.ink, fontSize: 15, paddingHorizontal: 11, paddingVertical: 14 }, error: { color: colors.red, fontSize: 12, marginTop: 8 },
  button: { backgroundColor: colors.maroon, minHeight: 52, borderRadius: 14, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, marginTop: 20 },
  buttonText: { color: colors.white, fontWeight: '900', fontSize: 15 }, back: { color: colors.maroon, textAlign: 'center', marginTop: 20, fontWeight: '800' },
});
