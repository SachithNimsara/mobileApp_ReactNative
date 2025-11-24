import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Search } from 'react-native-feather';
import Header from '../components/Header';
import Card from '../components/Card';
import WaterTracker from '../components/WaterTracker';
import {
  fetchExercisesStart,
  fetchExercisesSuccess,
  fetchExercisesFailure,
  setSearchQuery,
} from '../redux/slices/exercisesSlice';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';
import { incrementWater, decrementWater, setWaterIntake } from '../redux/slices/waterIntakeSlice';
import { exerciseAPI } from '../services/api';
import { COLORS, LAYOUT, STORAGE_KEYS, SCREENS } from '../utils/constants';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, loading, searchQuery } = useSelector((state) => state.exercises);
  const favorites = useSelector((state) => state.favorites.items);
  const waterIntake = useSelector((state) => state.waterIntake);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const user = useSelector((state) => state.auth.user);
  
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
    loadWaterIntake();
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

  const loadWaterIntake = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.WATER_INTAKE);
      if (stored) {
        const data = JSON.parse(stored);
        const today = new Date().toDateString();
        if (data.date === today) {
          dispatch(setWaterIntake(data));
        }
      }
    } catch (error) {
      console.error('Error loading water intake:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleWaterIncrement = async () => {
    dispatch(incrementWater());
    const newData = {
      glasses: Math.min(waterIntake.glasses + 1, 8),
      date: new Date().toDateString(),
    };
    await AsyncStorage.setItem(STORAGE_KEYS.WATER_INTAKE, JSON.stringify(newData));
  };

  const handleWaterDecrement = async () => {
    dispatch(decrementWater());
    const newData = {
      glasses: Math.max(waterIntake.glasses - 1, 0),
      date: new Date().toDateString(),
    };
    await AsyncStorage.setItem(STORAGE_KEYS.WATER_INTAKE, JSON.stringify(newData));
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

  const filteredItems = items.filter((item) =>
    searchQuery
      ? (item.name || item.title)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.muscle?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <WaterTracker
        glasses={waterIntake.glasses}
        onIncrement={handleWaterIncrement}
        onDecrement={handleWaterDecrement}
        isDarkMode={isDarkMode}
      />
      
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

      <Text
        style={[
          styles.sectionTitle,
          { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
        ]}
      >
        Exercises & Wellness Tips
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
      <Header
        title="FitBuddy"
        subtitle={`Welcome, ${user?.firstName || user?.username || 'User'}!`}
        gradient
      />
      
      <FlatList
        data={filteredItems}
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
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
});

export default HomeScreen;
