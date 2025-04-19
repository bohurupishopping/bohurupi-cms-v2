import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Surface, Avatar, Button, useTheme } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const Dashboard = () => {
  const { user, logout } = useAuth();
  const theme = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.headerWaveContainer}>
        <Surface style={styles.headerWave}>
          {/* SVG Wave background */}
          <View style={styles.headerContent}>
            <Avatar.Text size={64} label={user?.email?.[0]?.toUpperCase() || '?'} style={styles.avatar} />
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.email}>{user?.email}</Text>
            <Text style={styles.subtitle}>Welcome to your dashboard!</Text>
          </View>
        </Surface>
      </View>
      <View style={styles.cardRow}>
        <Surface style={styles.card}>
          <Text style={styles.cardTitle}>Orders</Text>
          <Text style={styles.cardValue}>--</Text>
        </Surface>
        <Surface style={styles.card}>
          <Text style={styles.cardTitle}>Revenue</Text>
          <Text style={styles.cardValue}>--</Text>
        </Surface>
      </View>
      <View style={styles.cardRow}>
        <Surface style={styles.card}>
          <Text style={styles.cardTitle}>Products</Text>
          <Text style={styles.cardValue}>--</Text>
        </Surface>
        <Surface style={styles.card}>
          <Text style={styles.cardTitle}>Customers</Text>
          <Text style={styles.cardValue}>--</Text>
        </Surface>
      </View>
      <Button mode="outlined" onPress={logout} style={styles.logoutBtn} labelStyle={{color: '#e63946'}}>Logout</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerWaveContainer: {
    width: '100%',
    height: width * 0.55,
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  headerWave: {
    flex: 1,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: '#4154f1',
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 40,
  },
  avatar: {
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  greeting: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 2,
  },
  email: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#dbeafe',
    fontSize: 15,
    marginTop: 8,
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 18,
  },
  card: {
    width: width * 0.42,
    padding: 22,
    borderRadius: 18,
    backgroundColor: '#fff',
    elevation: 4,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 17,
    color: '#4154f1',
    fontWeight: '700',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 28,
    color: '#1a1a2e',
    fontWeight: 'bold',
  },
  logoutBtn: {
    marginTop: 32,
    marginHorizontal: width * 0.2,
    borderColor: '#e63946',
    borderWidth: 1.5,
    borderRadius: 10,
  },
});

export default Dashboard;
