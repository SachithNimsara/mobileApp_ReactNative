import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Activity, Award } from 'react-native-feather';
import Header from '../components/Header';
import Button from '../components/Button';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';
import { COLORS, LAYOUT, STORAGE_KEYS } from '../utils/constants';

const ExerciseDetailsScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  
  const isFavorite = favorites.some((fav) => fav.id === item.id);

  const handleFavoriteToggle = async () => {
    if (isFavorite) {
      dispatch(removeFavorite(item.id));
      const newFavorites = favorites.filter((fav) => fav.id !== item.id);
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newFavorites));
    } else {
      dispatch(addFavorite(item));
      const newFavorites = [...favorites, item];
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newFavorites));
    }
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
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? COLORS.backgroundDark
            : COLORS.backgroundLight,
        },
      ]}
    >
      <Header
        title={item.name || item.title}
        showBack
        onBackPress={() => navigation.goBack()}
        isDarkMode={isDarkMode}
        rightComponent={
          <TouchableOpacity onPress={handleFavoriteToggle}>
            <Heart
              width={28}
              height={28}
              color={isFavorite ? COLORS.error : isDarkMode ? COLORS.textDark : COLORS.textLight}
              fill={isFavorite ? COLORS.error : 'none'}
              strokeWidth={2}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Image Section */}
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

        {/* Content Section */}
        <View style={styles.content}>
          {/* Stats Row */}
          {item.caloriesBurned && (
            <View
              style={[
                styles.statsContainer,
                {
                  backgroundColor: isDarkMode
                    ? COLORS.cardBackgroundDark
                    : COLORS.cardBackgroundLight,
                },
                LAYOUT.CARD_SHADOW,
              ]}
            >
              <View style={styles.statItem}>
                <Activity color={COLORS.accent} width={24} height={24} />
                <Text
                  style={[
                    styles.statValue,
                    { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
                  ]}
                >
                  {item.caloriesBurned}
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: isDarkMode ? COLORS.gray400 : COLORS.gray600 },
                  ]}
                >
                  Calories
                </Text>
              </View>
              
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <Award color={COLORS.primary} width={24} height={24} />
                <Text
                  style={[
                    styles.statValue,
                    { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
                  ]}
                >
                  {item.type || 'N/A'}
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: isDarkMode ? COLORS.gray400 : COLORS.gray600 },
                  ]}
                >
                  Type
                </Text>
              </View>
            </View>
          )}

          {/* Description */}
          {item.description && (
            <View style={styles.section}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
                ]}
              >
                Description
              </Text>
              <Text
                style={[
                  styles.sectionText,
                  { color: isDarkMode ? COLORS.gray400 : COLORS.gray600 },
                ]}
              >
                {item.description}
              </Text>
            </View>
          )}

          {/* Equipment */}
          {item.equipment && (
            <View style={styles.section}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
                ]}
              >
                Equipment
              </Text>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: isDarkMode
                      ? COLORS.secondary + '20'
                      : COLORS.secondary + '15',
                  },
                ]}
              >
                <Text style={[styles.badgeText, { color: COLORS.secondary }]}>
                  {item.equipment.replace(/_/g, ' ').toUpperCase()}
                </Text>
              </View>
            </View>
          )}

          {/* Muscle Groups */}
          {item.muscle && (
            <View style={styles.section}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
                ]}
              >
                Muscle Groups
              </Text>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: isDarkMode
                      ? COLORS.primary + '20'
                      : COLORS.primary + '15',
                  },
                ]}
              >
                <Text style={[styles.badgeText, { color: COLORS.primary }]}>
                  {item.muscle.replace(/_/g, ' ').toUpperCase()}
                </Text>
              </View>
            </View>
          )}

          {/* Instructions */}
          {item.instructions && (
            <View style={styles.section}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
                ]}
              >
                Instructions
              </Text>
              <Text
                style={[
                  styles.instructionsText,
                  { color: isDarkMode ? COLORS.gray400 : COLORS.gray600 },
                ]}
              >
                {item.instructions}
              </Text>
            </View>
          )}

          {/* Category */}
          {item.category && (
            <View style={styles.section}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
                ]}
              >
                Category
              </Text>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: isDarkMode
                      ? COLORS.accent + '20'
                      : COLORS.accent + '15',
                  },
                ]}
              >
                <Text style={[styles.badgeText, { color: COLORS.accent }]}>
                  {item.category}
                </Text>
              </View>
            </View>
          )}

          {/* Favorite Button */}
          <Button
            title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            onPress={handleFavoriteToggle}
            variant={isFavorite ? 'danger' : 'primary'}
            gradient={!isFavorite}
            style={styles.favoriteButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
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
    height: 150,
  },
  difficultyBadge: {
    position: 'absolute',
    top: 20,
    left: LAYOUT.PADDING,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  difficultyText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  content: {
    padding: LAYOUT.PADDING,
  },
  statsContainer: {
    flexDirection: 'row',
    borderRadius: LAYOUT.BORDER_RADIUS_LARGE,
    padding: LAYOUT.PADDING,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.gray300,
    marginHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
  },
  instructionsText: {
    fontSize: 15,
    lineHeight: 24,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  favoriteButton: {
    marginTop: 8,
  },
});

export default ExerciseDetailsScreen;
