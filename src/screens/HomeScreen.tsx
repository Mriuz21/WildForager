import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';

const RED = '#D7263D';
const WHITE = '#FFFFFF';
const DARK = '#222';

const HomeScreen = ({ navigation }) => {
  const handleSignOut = async () => {
    await signOut(auth);
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Wild Forager!</Text>
      <Text style={styles.subtitle}>You are logged in.</Text>
      <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: RED,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: DARK,
    marginBottom: 32,
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
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default HomeScreen; 