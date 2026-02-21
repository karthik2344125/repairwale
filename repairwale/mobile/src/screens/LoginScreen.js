import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { colors } from '../utils/colors';

export default function LoginScreen({ navigation }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigation.replace('RoleSelection');
    } catch (error) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[colors.bgPrimary, colors.bgTertiary]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            {/* Logo */}
            <View style={styles.logo}>
              <Text style={styles.logoText}>RW</Text>
            </View>

            {/* Title */}
            <Text style={styles.title}>
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </Text>
            <Text style={styles.subtitle}>
              {isSignup
                ? 'Sign up to get started with RepairWale'
                : 'Login to access your account'}
            </Text>

            {/* Form */}
            <View style={styles.form}>
              {isSignup && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                    placeholderTextColor={colors.textMuted}
                    autoCapitalize="words"
                  />
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry
                />
              </View>

              <Button
                title={isSignup ? 'Sign Up' : 'Login'}
                onPress={handleSubmit}
                loading={loading}
                style={styles.submitButton}
              />

              <TouchableOpacity
                onPress={() => setIsSignup(!isSignup)}
                style={styles.switchButton}
              >
                <Text style={styles.switchText}>
                  {isSignup
                    ? 'Already have an account? '
                    : "Don't have an account? "}
                  <Text style={styles.switchTextBold}>
                    {isSignup ? 'Login' : 'Sign Up'}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: colors.border,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: colors.accentPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.accentLight,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: colors.bgSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: colors.textPrimary,
  },
  submitButton: {
    marginTop: 8,
  },
  switchButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  switchText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  switchTextBold: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
});
