import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { colors } from '../utils/colors';

export default function RoleSelectionScreen({ navigation }) {
  const { selectRole } = useAuth();

  const handleRoleSelect = async (role) => {
    await selectRole(role);
    if (role === 'mechanic') {
      navigation.replace('MechanicDashboard');
    } else {
      navigation.replace('CustomerHome');
    }
  };

  return (
    <LinearGradient
      colors={[colors.bgPrimary, colors.bgTertiary]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Role</Text>
          <Text style={styles.subtitle}>
            Select how you want to use RepairWale
          </Text>
        </View>

        <View style={styles.rolesContainer}>
          {/* Customer Role */}
          <TouchableOpacity
            style={styles.roleCard}
            onPress={() => handleRoleSelect('customer')}
            activeOpacity={0.7}
          >
            <View style={styles.roleIconContainer}>
              <Text style={styles.roleIcon}>👤</Text>
            </View>
            <Text style={styles.roleTitle}>Customer</Text>
            <Text style={styles.roleDescription}>
              Request roadside assistance and track mechanics
            </Text>
            <View style={styles.roleFeatures}>
              <Text style={styles.roleFeature}>• Find nearby mechanics</Text>
              <Text style={styles.roleFeature}>• Request services</Text>
              <Text style={styles.roleFeature}>• Track repairs</Text>
              <Text style={styles.roleFeature}>• Order history</Text>
            </View>
          </TouchableOpacity>

          {/* Mechanic Role */}
          <TouchableOpacity
            style={styles.roleCard}
            onPress={() => handleRoleSelect('mechanic')}
            activeOpacity={0.7}
          >
            <View style={styles.roleIconContainer}>
              <Text style={styles.roleIcon}>🔧</Text>
            </View>
            <Text style={styles.roleTitle}>Mechanic</Text>
            <Text style={styles.roleDescription}>
              Accept service requests and manage your business
            </Text>
            <View style={styles.roleFeatures}>
              <Text style={styles.roleFeature}>• View service requests</Text>
              <Text style={styles.roleFeature}>• Manage services</Text>
              <Text style={styles.roleFeature}>• Track earnings</Text>
              <Text style={styles.roleFeature}>• Customer reviews</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  rolesContainer: {
    gap: 20,
  },
  roleCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  roleIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: colors.glass,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  roleIcon: {
    fontSize: 32,
  },
  roleTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  roleFeatures: {
    gap: 8,
  },
  roleFeature: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
});
