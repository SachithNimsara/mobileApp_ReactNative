import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, LAYOUT, ANIMATION } from '../utils/constants';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
  isDarkMode = false,
  gradient = false,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getBackgroundColor = () => {
    if (disabled) return isDarkMode ? COLORS.gray700 : COLORS.gray300;
    
    switch (variant) {
      case 'primary':
        return COLORS.primary;
      case 'secondary':
        return COLORS.secondary;
      case 'outline':
        return 'transparent';
      case 'danger':
        return COLORS.error;
      default:
        return COLORS.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return isDarkMode ? COLORS.gray500 : COLORS.gray400;
    if (variant === 'outline') return isDarkMode ? COLORS.textDark : COLORS.primary;
    return COLORS.white;
  };

  const buttonContent = (
    <Animated.View
      style={[
        styles.button,
        {
          backgroundColor: gradient ? 'transparent' : getBackgroundColor(),
          borderColor: variant === 'outline' ? COLORS.primary : 'transparent',
          borderWidth: variant === 'outline' ? 2 : 0,
          transform: [{ scale: scaleAnim }],
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
          {title}
        </Text>
      )}
    </Animated.View>
  );

  if (gradient && !disabled && variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.button, style]}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={[styles.text, { color: COLORS.white }, textStyle]}>
              {title}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {buttonContent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: LAYOUT.BORDER_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;
