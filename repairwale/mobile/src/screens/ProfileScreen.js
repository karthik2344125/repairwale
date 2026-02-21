import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { colors } from '../utils/colors';

export default function ProfileScreen({ navigation }) {
  const { user, role, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[colors.bgPrimary, colors.bgTertiary]} style={styles.gradient}>
        <ScrollView style={styles.scrollView}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.fullName.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            <Text style={styles.name}>{user?.fullName || 'User'}</Text>
            <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>
                {role?.charAt(0).toUpperCase() + role?.slice(1) || 'User'}
              </Text>
            </View>
          </View>

          {/* Profile Stats */}
          {role === 'mechanic' && (
            <View style={styles.statsCard}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>47</Text>
                <Text style={styles.statLabel}>Jobs Completed</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>4.8</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>₹38.9K</Text>
                <Text style={styles.statLabel}>Earnings</Text>
              </View>
            </View>
          )}

          {/* Menu Items */}
          <View style={styles.card}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuIcon}>👤</Text>
              <Text style={styles.menuText}>Edit Profile</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            {role === 'mechanic' && (
              <>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuIcon}>🧰</Text>
                  <Text style={styles.menuText}>My Services</Text>
                  <Text style={styles.menuArrow}>›</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuIcon}>⭐</Text>
                  <Text style={styles.menuText}>Reviews</Text>
                  <Text style={styles.menuArrow}>›</Text>
                </TouchableOpacity>
              </>
            )}

            {role === 'customer' && (
              <>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuIcon}>🚗</Text>
                  <Text style={styles.menuText}>My Vehicles</Text>
                  <Text style={styles.menuArrow}>›</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuIcon}>📍</Text>
                  <Text style={styles.menuText}>Saved Addresses</Text>
                  <Text style={styles.menuArrow}>›</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuIcon}>❤️</Text>
                  <Text style={styles.menuText}>Favorites</Text>
                  <Text style={styles.menuArrow}>›</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuIcon}>⚙️</Text>
              <Text style={styles.menuText}>Settings</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuIcon}>❓</Text>
              <Text style={styles.menuText}>Help & Support</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <View style={styles.card}>
            <Button title="Logout" variant="danger" onPress={handleLogout} />
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 32,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 22,
    backgroundColor: colors.accentPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 12,
  },
  roleBadge: {
    backgroundColor: colors.glass,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 12,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  menuArrow: {
    fontSize: 24,
    color: colors.textMuted,
  },
});
