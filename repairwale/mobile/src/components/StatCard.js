import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';

export default function StatCard({ icon, value, label, change }) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {change && (
        <Text style={[styles.change, change > 0 ? styles.changePositive : styles.changeNegative]}>
          {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    minWidth: 150,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.accentLight,
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
  },
  change: {
    fontSize: 11,
    marginTop: 6,
    fontWeight: '600',
  },
  changePositive: {
    color: colors.success,
  },
  changeNegative: {
    color: colors.error,
  },
});
