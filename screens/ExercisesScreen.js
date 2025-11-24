import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Search, Filter } from 'react-native-feather';
import Header from '../components/Header';
import Card from '../components/Card';
import {
  fetchExercisesStart,
  fetchExercisesSuccess,
  fetchExercisesFailure,
  setSearchQuery,
} from '../redux/slices/exercisesSlice';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';
import { exerciseAPI, MOCK_EXERCISES } from '../services/api';
import { COLORS, LAYOUT, STORAGE_KEYS, SCREENS } from '../utils/constants';

const ExercisesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, loading, searchQuery } = useSelector((state) => state.exercises);
  const favorites = useSelector((state) => state.favorites.items);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    if (items.length === 0) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      dispatch(fetchExercisesStart());
      const data = await exerciseAPI.getAllExercises();
      dispatch(fetchExercisesSuccess(data));
    } catch (error) {
      dispatch(fetchExercisesFailure(error.message));
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleFavoriteToggle = async (item) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);
    
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

  // Filter exercises only (not wellness tips)
  const exercises = MOCK_EXERCISES.filter((item) => {
    // Apply search filter
    const matchesSearch = searchQuery
      ? item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.muscle?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Apply difficulty filter
    const matchesDifficulty =
      selectedFilter === 'all' || item.difficulty === selectedFilter;

    return matchesSearch && matchesDifficulty;
  });

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Search Bar */}
      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: isDarkMode
              ? COLORS.cardBackgroundDark
              : COLORS.cardBackgroundLight,
          },
          LAYOUT.CARD_SHADOW,
        ]}
      >
        <Search
          width={20}
          height={20}
          color={isDarkMode ? COLORS.gray400 : COLORS.gray500}
        />
        <TextInput
          style={[
            styles.searchInput,
            { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
          ]}
          placeholder="Search exercises..."
          placeholderTextColor={isDarkMode ? COLORS.gray400 : COLORS.gray500}
          value={searchQuery}
          onChangeText={(text) => dispatch(setSearchQuery(text))}
        />
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <Text
          style={[
            styles.filterLabel,
            { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
          ]}
        >
          Difficulty:
        </Text>
        <View style={styles.filterButtons}>
          {['all', 'beginner', 'intermediate', 'advanced'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                {
                  backgroundColor:
                    selectedFilter === filter
                      ? COLORS.primary
                      : isDarkMode
                      ? COLORS.cardBackgroundDark
                      : COLORS.gray100,
                },
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  {
                    color:
                      selectedFilter === filter
                        ? COLORS.white
                        : isDarkMode
                        ? COLORS.textDark
                        : COLORS.textLight,
                  },
                ]}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text
        style={[
          styles.sectionTitle,
          { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
        ]}
      >
        {exercises.length} Exercise{exercises.length !== 1 ? 's' : ''}
      </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Card
      item={item}
      onPress={() => navigation.navigate(SCREENS.EXERCISE_DETAILS, { item })}
      onFavoritePress={() => handleFavoriteToggle(item)}
      isFavorite={favorites.some((fav) => fav.id === item.id)}
      isDarkMode={isDarkMode}
    />
  );

  if (loading && items.length === 0) {
    return (
      <View
        style={[
          styles.centerContainer,
          {
            backgroundColor: isDarkMode
              ? COLORS.backgroundDark
              : COLORS.backgroundLight,
          },
        ]}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

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
      <Header title="Exercises" subtitle="Browse workout library" gradient />
      
      <FlatList
        data={exercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: LAYOUT.PADDING,
  },
  headerContainer: {
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: LAYOUT.BORDER_RADIUS,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
});

export default ExercisesScreen;
