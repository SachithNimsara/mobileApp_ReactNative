import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeartOff } from 'react-native-feather';
import Header from '../components/Header';
import Card from '../components/Card';
import { setFavorites, removeFavorite } from '../redux/slices/favoritesSlice';
import { COLORS, LAYOUT, STORAGE_KEYS, SCREENS } from '../utils/constants';

const FavoritesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (stored) {
        const data = JSON.parse(stored);
        dispatch(setFavorites(data));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const handleRemoveFavorite = async (id) => {
    dispatch(removeFavorite(id));
    const newFavorites = favorites.filter((fav) => fav.id !== id);
    await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newFavorites));
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View
        style={[
          styles.emptyIconContainer,
          {
            backgroundColor: isDarkMode
              ? COLORS.cardBackgroundDark
              : COLORS.gray100,
          },
        ]}
      >
        <HeartOff
          width={64}
          height={64}
          color={isDarkMode ? COLORS.gray600 : COLORS.gray400}
        />
      </View>
      <Text
        style={[
          styles.emptyTitle,
          { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
        ]}
      >
        No Favorites Yet
      </Text>
      <Text
        style={[
          styles.emptyMessage,
          { color: isDarkMode ? COLORS.gray400 : COLORS.gray600 },
        ]}
      >
        Start adding exercises and wellness tips to your favorites!
      </Text>
      <Text
        style={[
          styles.emptyHint,
          { color: isDarkMode ? COLORS.gray500 : COLORS.gray500 },
        ]}
      >
        Tap the heart icon on any exercise card to save it here.
      </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Card
      item={item}
      onPress={() => navigation.navigate(SCREENS.EXERCISE_DETAILS, { item })}
      onFavoritePress={() => handleRemoveFavorite(item.id)}
      isFavorite={true}
      isDarkMode={isDarkMode}
    />
  );

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
        title="Favorites"
        subtitle={`${favorites.length} saved item${favorites.length !== 1 ? 's' : ''}`}
        gradient
      />

      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          styles.listContent,
          favorites.length === 0 && styles.listContentEmpty,
        ]}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: LAYOUT.PADDING,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: LAYOUT.PADDING_LARGE,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyHint: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default FavoritesScreen;
