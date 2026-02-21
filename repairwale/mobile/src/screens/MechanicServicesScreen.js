import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import { colors } from '../utils/colors';

export default function MechanicServicesScreen() {
  const [services, setServices] = useState([
    {
      id: '1',
      name: 'Engine Diagnostics',
      category: 'Diagnostics',
      price: 699,
      duration: '45 mins',
      active: true,
    },
    {
      id: '2',
      name: 'Brake Service',
      category: 'Repairs',
      price: 999,
      duration: '60 mins',
      active: true,
    },
    {
      id: '3',
      name: 'Oil Change',
      category: 'Maintenance',
      price: 499,
      duration: '30 mins',
      active: false,
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    duration: '',
  });

  const handleAddService = () => {
    if (!formData.name || !formData.category) {
      alert('Please enter service name and category');
      return;
    }

    const newService = {
      id: Date.now().toString(),
      ...formData,
      price: parseInt(formData.price) || 0,
      active: true,
    };

    setServices([...services, newService]);
    setFormData({ name: '', category: '', price: '', duration: '' });
    alert('Service added successfully!');
  };

  const toggleService = (id) => {
    setServices(
      services.map((s) =>
        s.id === id ? { ...s, active: !s.active } : s
      )
    );
  };

  const removeService = (id) => {
    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.bgPrimary, colors.bgTertiary]}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Services Provided</Text>
            <Text style={styles.subtitle}>
              Manage the services you offer to customers
            </Text>
          </View>

          {/* Add Service Form */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Add New Service</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>SERVICE NAME</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                placeholder="e.g. Brake Service"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>CATEGORY</Text>
              <TextInput
                style={styles.input}
                value={formData.category}
                onChangeText={(text) =>
                  setFormData({ ...formData, category: text })
                }
                placeholder="e.g. Repairs"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>PRICE (INR)</Text>
                <TextInput
                  style={styles.input}
                  value={formData.price}
                  onChangeText={(text) =>
                    setFormData({ ...formData, price: text })
                  }
                  placeholder="0"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>DURATION</Text>
                <TextInput
                  style={styles.input}
                  value={formData.duration}
                  onChangeText={(text) =>
                    setFormData({ ...formData, duration: text })
                  }
                  placeholder="e.g. 45 mins"
                  placeholderTextColor={colors.textMuted}
                />
              </View>
            </View>

            <Button title="Add Service" onPress={handleAddService} />
          </View>

          {/* Services List */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your Services</Text>

            {services.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No services added yet.</Text>
              </View>
            ) : (
              <View style={styles.servicesList}>
                {services.map((service) => (
                  <View key={service.id} style={styles.serviceCard}>
                    <View style={styles.serviceHeader}>
                      <Text style={styles.serviceName}>{service.name}</Text>
                      <View
                        style={[
                          styles.badge,
                          service.active ? styles.badgeActive : styles.badgeInactive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.badgeText,
                            service.active
                              ? styles.badgeTextActive
                              : styles.badgeTextInactive,
                          ]}
                        >
                          {service.active ? 'Active' : 'Inactive'}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.serviceMeta}>
                      {service.category}
                      {service.duration ? ` • ${service.duration}` : ''}
                    </Text>

                    <View style={styles.serviceFooter}>
                      <Text style={styles.servicePrice}>
                        ₹{service.price || 0}
                      </Text>
                      <View style={styles.serviceActions}>
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => toggleService(service.id)}
                        >
                          <Text style={styles.actionButtonText}>
                            {service.active ? 'Disable' : 'Enable'}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => removeService(service.id)}
                        >
                          <Text style={styles.actionButtonText}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
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
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: colors.bgSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  servicesList: {
    gap: 12,
  },
  serviceCard: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 14,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeActive: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  badgeInactive: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  badgeTextActive: {
    color: colors.success,
  },
  badgeTextInactive: {
    color: colors.error,
  },
  serviceMeta: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 12,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.accentLight,
  },
  serviceActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionButtonText: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
  },
});
