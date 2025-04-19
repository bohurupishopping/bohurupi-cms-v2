import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text, TextInput, Button, useTheme, Surface, HelperText } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

const AuthScreen = () => {
  const { login, register, loading } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState(false);
  const theme = useTheme();

  const handleAuth = async () => {
    Keyboard.dismiss();
    setError('');
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }
    } catch (e: any) {
      setError(e.message || 'Authentication failed');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.topWaveContainer}>
          {!imageError ? (
            <Image
              source={{ uri: 'https://svgshare.com/i/13hY.svg' }}
              style={styles.topWave}
              resizeMode="cover"
              onError={() => setImageError(true)}
              accessibilityIgnoresInvertColors
            />
          ) : (
            <View style={[styles.topWave, { backgroundColor: '#4154f1' }]} />
          )}
        </View>
        <View style={styles.centeredContainer}>
          <Surface style={styles.surface} elevation={4}>
            <Text style={styles.brand}>Bohurupi CMS</Text>
            <Text style={styles.title}>{isRegister ? 'Create Account' : 'Welcome Back'}</Text>
            <Text style={styles.subtitle}>{isRegister ? 'Sign up to get started' : 'Sign in to continue'}</Text>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
              mode="outlined"
              left={<TextInput.Icon icon="email-outline" />}
              error={!!error && !validateEmail(email)}
              autoFocus
              returnKeyType="next"
              textContentType="emailAddress"
              accessibilityLabel="Email input"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              mode="outlined"
              left={<TextInput.Icon icon="lock-outline" />}
              error={!!error && password.length < 6}
              returnKeyType="done"
              textContentType="password"
              accessibilityLabel="Password input"
            />
            {!!error && (
              <HelperText type="error" visible style={styles.error} accessibilityLiveRegion="polite">
                {error}
              </HelperText>
            )}
            <Button
              mode="contained"
              onPress={handleAuth}
              loading={loading}
              style={styles.button}
              contentStyle={{ paddingVertical: 8 }}
              labelStyle={{ fontWeight: 'bold', fontSize: 16 }}
              accessibilityLabel={isRegister ? 'Sign up' : 'Sign in'}
            >
              {isRegister ? 'Sign Up' : 'Sign In'}
            </Button>
            <TouchableOpacity onPress={() => {
              setIsRegister(!isRegister);
              setError('');
            }} accessibilityRole="button">
              <Text style={styles.toggleText}>
                {isRegister ? 'Already have an account? Sign In' : "Don’t have an account? Sign Up"}
              </Text>
            </TouchableOpacity>
          </Surface>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  topWaveContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    height: width * 0.4,
  },
  topWave: {
    width: '100%',
    height: '100%',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  surface: {
    width: width * 0.9,
    maxWidth: 420,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
  },
  brand: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4154f1',
    marginBottom: 6,
    letterSpacing: 1.2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#1a1a2e',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#7b809a',
    marginBottom: 18,
  },
  input: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#f6f8fa',
  },
  button: {
    width: '100%',
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: '#4154f1',
  },
  toggleText: {
    marginTop: 18,
    color: '#4154f1',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.2,
  },
  error: {
    color: '#e63946',
    marginBottom: 8,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left',
  },
});

export default AuthScreen;
