import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Heart } from 'react-native-feather';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, LAYOUT } from '../utils/constants';

const Card = ({
  item,
  onPress,
  onFavoritePress,
  isFavorite = false,
  isDarkMode = false,
  showFavorite = true,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
      case 'easy':
        return COLORS.difficultyEasy;
      case 'intermediate':
      case 'medium':
        return COLORS.difficultyMedium;
      case 'advanced':
      case 'hard':
        return COLORS.difficultyHard;
      default:
        return COLORS.primary;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: isDarkMode
              ? COLORS.cardBackgroundDark
              : COLORS.cardBackgroundLight,
            transform: [{ scale: scaleAnim }],
          },
          LAYOUT.CARD_SHADOW,
        ]}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image || 'https://via.placeholder.com/400' }}
            style={styles.image}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          />
          {showFavorite && (
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={onFavoritePress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Heart
                width={24}
                height={24}
                color={isFavorite ? COLORS.error : COLORS.white}
                fill={isFavorite ? COLORS.error : 'none'}
                strokeWidth={2}
              />
            </TouchableOpacity>
          )}
          {item.difficulty && (
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor(item.difficulty) },
              ]}
            >
              <Text style={styles.difficultyText}>
                {item.difficulty.toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.content}>
          <Text
            style={[
              styles.title,
              { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
            ]}
            numberOfLines={1}
          >
            {item.name || item.title}
          </Text>
          <Text
            style={[
              styles.description,
              { color: isDarkMode ? COLORS.gray400 : COLORS.gray600 },
            ]}
            numberOfLines={2}
          >
            {item.description}
          </Text>
          {item.category && (
            <View style={styles.categoryContainer}>
              <View
                style={[
                  styles.categoryBadge,
                  {
                    backgroundColor: isDarkMode
                      ? COLORS.primary + '20'
                      : COLORS.primary + '15',
                  },
                ]}
              >
                <Text style={[styles.categoryText, { color: COLORS.primary }]}>
                  {item.category}
                </Text>
              </View>
              {item.caloriesBurned && (
                <Text
                  style={[
                    styles.calories,
                    { color: isDarkMode ? COLORS.accent : COLORS.accent },
                  ]}
                >
                  {item.caloriesBurned} cal
                </Text>
              )}
            </View>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: LAYOUT.BORDER_RADIUS_LARGE,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  difficultyBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  difficultyText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  calories: {
    fontSize: 14,
    fontWeight: '700',
  },
});

export default Card;
