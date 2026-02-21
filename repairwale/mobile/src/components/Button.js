import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../utils/colors';

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false, 
  disabled = false,
  style,
  textStyle
}) {
  const buttonStyle = [
    styles.button,
    variant === 'primary' && styles.buttonPrimary,
    variant === 'ghost' && styles.buttonGhost,
    variant === 'danger' && styles.buttonDanger,
    (disabled || loading) && styles.buttonDisabled,
    style
  ];

  const textStyleCombined = [
    styles.buttonText,
    variant === 'primary' && styles.buttonTextPrimary,
    variant === 'ghost' && styles.buttonTextGhost,
    variant === 'danger' && styles.buttonTextDanger,
    textStyle
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.textPrimary : colors.accentLight} />
      ) : (
        <Text style={textStyleCombined}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonPrimary: {
    backgroundColor: colors.accentPrimary,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonDanger: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.error,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  buttonTextPrimary: {
    color: colors.textPrimary,
  },
  buttonTextGhost: {
    color: colors.textPrimary,
  },
  buttonTextDanger: {
    color: colors.error,
  },
});
