import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft } from 'react-native-feather';
import { COLORS, LAYOUT } from '../utils/constants';

const Header = ({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  rightComponent,
  isDarkMode = false,
  gradient = false,
}) => {
  return (
    <View style={styles.container}>
      {gradient ? (
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.content}>
            {showBack && (
              <TouchableOpacity
                onPress={onBackPress}
                style={styles.backButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <ChevronLeft color={COLORS.white} width={28} height={28} />
              </TouchableOpacity>
            )}
            <View style={styles.titleContainer}>
              <Text style={styles.gradientTitle}>{title}</Text>
              {subtitle && (
                <Text style={styles.gradientSubtitle}>{subtitle}</Text>
              )}
            </View>
            {rightComponent && (
              <View style={styles.rightComponent}>{rightComponent}</View>
            )}
          </View>
        </LinearGradient>
      ) : (
        <View
          style={[
            styles.regularHeader,
            {
              backgroundColor: isDarkMode
                ? COLORS.backgroundDark
                : COLORS.backgroundLight,
            },
          ]}
        >
          <View style={styles.content}>
            {showBack && (
              <TouchableOpacity
                onPress={onBackPress}
                style={styles.backButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <ChevronLeft
                  color={isDarkMode ? COLORS.textDark : COLORS.textLight}
                  width={28}
                  height={28}
                />
              </TouchableOpacity>
            )}
            <View style={styles.titleContainer}>
              <Text
                style={[
                  styles.title,
                  { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
                ]}
              >
                {title}
              </Text>
              {subtitle && (
                <Text
                  style={[
                    styles.subtitle,
                    { color: isDarkMode ? COLORS.gray400 : COLORS.gray600 },
                  ]}
                >
                  {subtitle}
                </Text>
              )}
            </View>
            {rightComponent && (
              <View style={styles.rightComponent}>{rightComponent}</View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
  },
  gradient: {
    paddingBottom: 20,
  },
  regularHeader: {
    paddingBottom: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: LAYOUT.PADDING,
  },
  backButton: {
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  gradientTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  gradientSubtitle: {
    fontSize: 14,
    marginTop: 4,
    color: COLORS.white,
    opacity: 0.9,
  },
  rightComponent: {
    marginLeft: 12,
  },
});

export default Header;
