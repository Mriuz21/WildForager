import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../utils/firebase';

const RED = '#D7263D';
const WHITE = '#FFFFFF';
const LIGHT_GRAY = '#F5F5F5';
const DARK = '#222';

function validateEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

function getFriendlyError(error: string) {
  if (error.includes('user-not-found')) return 'No account found with this email.';
  if (error.includes('wrong-password')) return 'Incorrect password.';
  if (error.includes('invalid-email')) return 'Invalid email address.';
  if (error.includes('too-many-requests')) return 'Too many attempts. Please try again later.';
  return 'Login failed. Please try again.';
}

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace('Home');
      } else {
        setCheckingAuth(false);
      }
    });
    return unsubscribe;
  }, []);

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 6;
  const canSubmit = isEmailValid && isPasswordValid && !loading;

  const handleLogin = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // navigation.replace('Home') will be handled by onAuthStateChanged
    } catch (err: any) {
      setError(getFriendlyError(err.message));
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={RED} />
        <Text style={{ color: DARK, marginTop: 16 }}>Checking authentication...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>
      <TextInput
        style={[styles.input, !isEmailValid && email.length > 0 && styles.inputError]}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <View style={styles.passwordRow}>
        <TextInput
          style={[styles.input, styles.passwordInput, !isPasswordValid && password.length > 0 && styles.inputError]}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <Pressable style={styles.showHide} onPress={() => setShowPassword((v) => !v)}>
          <Text style={{ color: RED, fontWeight: 'bold' }}>{showPassword ? 'Hide' : 'Show'}</Text>
        </Pressable>
      </View>
      {!isEmailValid && email.length > 0 && <Text style={styles.error}>Enter a valid email.</Text>}
      {!isPasswordValid && password.length > 0 && <Text style={styles.error}>Password must be at least 6 characters.</Text>}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable
        style={({ pressed }) => [styles.button, (!canSubmit || pressed) && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={!canSubmit}
      >
        {loading ? <ActivityIndicator color={WHITE} /> : <Text style={styles.buttonText}>Login</Text>}
      </Pressable>
      <Pressable style={styles.link} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Don't have an account? <Text style={{ color: RED, fontWeight: 'bold' }}>Register</Text></Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: RED,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: DARK,
    marginBottom: 32,
  },
  input: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    color: DARK,
  },
  inputError: {
    borderColor: RED,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    marginBottom: 8,
  },
  passwordInput: {
    flex: 1,
    marginBottom: 0,
  },
  showHide: {
    marginLeft: 8,
    padding: 8,
  },
  button: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: RED,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: RED,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  link: {
    marginTop: 8,
  },
  linkText: {
    color: DARK,
    fontSize: 15,
  },
  error: {
    color: RED,
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen; 