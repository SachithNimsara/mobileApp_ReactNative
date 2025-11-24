import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Droplet } from 'react-native-feather';
import { COLORS, LAYOUT, WATER_INTAKE } from '../utils/constants';

const WaterTracker = ({ glasses, onIncrement, onDecrement, isDarkMode }) => {
  const renderGlass = (index) => {
    const filled = index < glasses;
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handlePress = () => {
      // Animate
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();

      // Toggle glass
      if (filled && index === glasses - 1) {
        onDecrement();
      } else if (!filled && index === glasses) {
        onIncrement();
      }
    };

    return (
      <TouchableOpacity key={index} onPress={handlePress}>
        <Animated.View
          style={[
            styles.glassContainer,
            {
              backgroundColor: filled
                ? COLORS.primary
                : isDarkMode
                ? COLORS.gray700
                : COLORS.gray200,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Droplet
            width={20}
            height={20}
            color={filled ? COLORS.white : isDarkMode ? COLORS.gray500 : COLORS.gray400}
            fill={filled ? COLORS.white : 'none'}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const percentage = (glasses / WATER_INTAKE.MAX_GLASSES) * 100;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? COLORS.cardBackgroundDark
            : COLORS.cardBackgroundLight,
        },
        LAYOUT.CARD_SHADOW,
      ]}
    >
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.title,
              { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
            ]}
          >
            Water Intake
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: isDarkMode ? COLORS.gray400 : COLORS.gray600 },
            ]}
          >
            Daily Goal: {WATER_INTAKE.MAX_GLASSES} glasses
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={[styles.glassCount, { color: COLORS.primary }]}>
            {glasses}/{WATER_INTAKE.MAX_GLASSES}
          </Text>
          <Text
            style={[
              styles.percentage,
              { color: isDarkMode ? COLORS.gray400 : COLORS.gray600 },
            ]}
          >
            {percentage.toFixed(0)}%
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View
        style={[
          styles.progressBarContainer,
          { backgroundColor: isDarkMode ? COLORS.gray700 : COLORS.gray200 },
        ]}
      >
        <View
          style={[
            styles.progressBar,
            {
              width: `${percentage}%`,
              backgroundColor: COLORS.primary,
            },
          ]}
        />
      </View>

      {/* Glass Circles */}
      <View style={styles.glassesContainer}>
        {Array.from({ length: WATER_INTAKE.MAX_GLASSES }).map((_, index) =>
          renderGlass(index)
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: LAYOUT.BORDER_RADIUS_LARGE,
    padding: LAYOUT.PADDING,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  statsContainer: {
    alignItems: 'flex-end',
  },
  glassCount: {
    fontSize: 24,
    fontWeight: '700',
  },
  percentage: {
    fontSize: 12,
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  glassesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  glassContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default WaterTracker;
