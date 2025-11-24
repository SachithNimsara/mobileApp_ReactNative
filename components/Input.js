import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { COLORS, LAYOUT } from '../utils/constants';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  isDarkMode = false,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text
          style={[
            styles.label,
            { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
          ]}
        >
          {label}
        </Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDarkMode ? COLORS.gray400 : COLORS.gray500}
        secureTextEntry={secureTextEntry}
        style={[
          styles.input,
          {
            backgroundColor: isDarkMode
              ? COLORS.cardBackgroundDark
              : COLORS.cardBackgroundLight,
            color: isDarkMode ? COLORS.textDark : COLORS.textLight,
            borderColor: error
              ? COLORS.error
              : isDarkMode
              ? COLORS.gray700
              : COLORS.gray200,
          },
        ]}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: LAYOUT.BORDER_RADIUS,
    fontSize: 16,
    borderWidth: 1,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default Input;
