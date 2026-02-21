import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StatCard from '../components/StatCard';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { colors } from '../utils/colors';

export default function MechanicDashboardScreen({ navigation }) {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    todayJobs: 3,
    todayEarnings: 2450,
    monthlyJobs: 47,
    monthlyEarnings: 38900,
  });
  const [requests, setRequests] = useState([
    {
      id: '1',
      customerName: 'Rahul Sharma',
      problem: 'Engine overheating',
      location: 'Kothrud, Pune',
      time: '15 mins ago',
    },
    {
      id: '2',
      customerName: 'Priya Patel',
      problem: 'Flat tire replacement',
      location: 'Deccan, Pune',
      time: '32 mins ago',
    },
    {
      id: '3',
      customerName: 'Amit Kumar',
      problem: 'Battery not charging',
      location: 'Wakad, Pune',
      time: '1 hour ago',
    },
  ]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleAcceptRequest = (requestId) => {
    alert(`Request ${requestId} accepted!`);
    setRequests(requests.filter(r => r.id !== requestId));
  };

  const handleRejectRequest = (requestId) => {
    alert(`Request ${requestId} rejected`);
    setRequests(requests.filter(r => r.id !== requestId));
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.bgPrimary, colors.bgTertiary]}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accentLight} />
          }
        >
          {/* Welcome Banner */}
          <LinearGradient
            colors={[colors.accentPrimary, colors.accentDark]}
            style={styles.banner}
          >
            <Text style={styles.bannerTitle}>
              Welcome back, {user?.fullName || 'Mechanic'}!
            </Text>
            <Text style={styles.bannerSubtitle}>
              You have {requests.length} pending requests
            </Text>
          </LinearGradient>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <StatCard
              icon="📅"
              value={stats.todayJobs}
              label="Today's Jobs"
              change={12}
            />
            <StatCard
              icon="💰"
              value={`₹${stats.todayEarnings}`}
              label="Today's Earnings"
              change={8}
            />
          </View>

          <View style={styles.statsGrid}>
            <StatCard
              icon="📊"
              value={stats.monthlyJobs}
              label="Monthly Jobs"
            />
            <StatCard
              icon="💵"
              value={`₹${stats.monthlyEarnings}`}
              label="Monthly Earnings"
            />
          </View>

          {/* Pending Requests */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🔔 Pending Requests</Text>
              <TouchableOpacity>
                <Text style={styles.sectionLink}>View All</Text>
              </TouchableOpacity>
            </View>

            {requests.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>📭</Text>
                <Text style={styles.emptyText}>No pending requests</Text>
              </View>
            ) : (
              requests.map((request) => (
                <View key={request.id} style={styles.requestCard}>
                  <View style={styles.requestHeader}>
                    <View>
                      <Text style={styles.requestCustomer}>
                        {request.customerName}
                      </Text>
                      <Text style={styles.requestProblem}>
                        {request.problem}
                      </Text>
                    </View>
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>New</Text>
                    </View>
                  </View>

                  <Text style={styles.requestLocation}>
                    📍 {request.location}
                  </Text>
                  <Text style={styles.requestTime}>⏰ {request.time}</Text>

                  <View style={styles.requestActions}>
                    <Button
                      title="Accept"
                      onPress={() => handleAcceptRequest(request.id)}
                      style={styles.acceptButton}
                    />
                    <Button
                      title="Reject"
                      variant="danger"
                      onPress={() => handleRejectRequest(request.id)}
                      style={styles.rejectButton}
                    />
                  </View>
                </View>
              ))
            )}
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
            <View style={styles.quickActions}>
              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => navigation.navigate('MechanicServices')}
              >
                <Text style={styles.actionIcon}>🧰</Text>
                <Text style={styles.actionLabel}>My Services</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => navigation.navigate('Profile')}
              >
                <Text style={styles.actionIcon}>👤</Text>
                <Text style={styles.actionLabel}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionCard}>
                <Text style={styles.actionIcon}>💬</Text>
                <Text style={styles.actionLabel}>Messages</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionCard}>
                <Text style={styles.actionIcon}>⭐</Text>
                <Text style={styles.actionLabel}>Reviews</Text>
              </TouchableOpacity>
            </View>
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
  banner: {
    margin: 20,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  bannerSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 12,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  sectionLink: {
    fontSize: 14,
fontSize: 14,
    color: colors.accentLight,
    fontWeight: '600',
  },
  requestCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  requestCustomer: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  requestProblem: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statusBadge: {
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.warning,
  },
  requestLocation: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 4,
  },
  requestTime: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 16,
  },
  requestActions: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptButton: {
    flex: 1,
  },
  rejectButton: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  actionCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
