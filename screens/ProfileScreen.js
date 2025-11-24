import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Award, Droplet, Moon, Sun } from 'react-native-feather';
import Header from '../components/Header';
import Button from '../components/Button';
import { logout } from '../redux/slices/authSlice';
import { toggleTheme } from '../redux/slices/themeSlice';
import { clearFavorites } from '../redux/slices/favoritesSlice';
import { clearExercises } from '../redux/slices/exercisesSlice';
import { COLORS, LAYOUT, STORAGE_KEYS } from '../utils/constants';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const waterIntake = useSelector((state) => state.waterIntake);
  const favorites = useSelector((state) => state.favorites.items);

  const handleToggleTheme = async () => {
    dispatch(toggleTheme());
    await AsyncStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(!isDarkMode));
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            dispatch(logout());
            dispatch(clearFavorites());
            dispatch(clearExercises());
            await AsyncStorage.multiRemove([
              STORAGE_KEYS.AUTH_TOKEN,
              STORAGE_KEYS.USER_DATA,
            ]);
          },
        },
      ]
    );
  };

  // Calculate stats
  const exercisesCompleted = favorites.length;
  const avgWaterIntake = waterIntake.glasses;

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
      <Header title="Profile" gradient />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: isDarkMode
                ? COLORS.cardBackgroundDark
                : COLORS.cardBackgroundLight,
            },
            LAYOUT.CARD_SHADOW,
          ]}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            style={styles.avatarGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.avatarText}>
              {(user?.firstName?.[0] || user?.username?.[0] || 'U').toUpperCase()}
            </Text>
          </LinearGradient>
          
          <Text
            style={[
              styles.userName,
              { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
            ]}
          >
            {user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName}`
              : user?.username || 'User'}
          </Text>
          
          <Text
            style={[
              styles.userEmail,
              { color: isDarkMode ? COLORS.gray400 : COLORS.gray600 },
            ]}
          >
            {user?.email || 'user@fitbuddy.com'}
          </Text>
        </View>

        {/* Weekly Stats */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
            ]}
          >
            Weekly Stats
          </Text>
          
          <View style={styles.statsGrid}>
            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: isDarkMode
                    ? COLORS.cardBackgroundDark
                    : COLORS.cardBackgroundLight,
                },
                LAYOUT.CARD_SHADOW,
              ]}
            >
              <View
                style={[
                  styles.statIconContainer,
                  { backgroundColor: COLORS.primary + '20' },
                ]}
              >
                <Award color={COLORS.primary} width={28} height={28} />
              </View>
              <Text
                style={[
                  styles.statValue,
                  { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
                ]}
              >
                {exercisesCompleted}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: isDarkMode ? COLORS.gray400 : COLORS.gray600 },
                ]}
              >
                Favorites
              </Text>
            </View>

            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: isDarkMode
                    ? COLORS.cardBackgroundDark
                    : COLORS.cardBackgroundLight,
                },
                LAYOUT.CARD_SHADOW,
              ]}
            >
              <View
                style={[
                  styles.statIconContainer,
                  { backgroundColor: COLORS.secondary + '20' },
                ]}
              >
                <Droplet color={COLORS.secondary} width={28} height={28} />
              </View>
              <Text
                style={[
                  styles.statValue,
                  { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
                ]}
              >
                {avgWaterIntake}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: isDarkMode ? COLORS.gray400 : COLORS.gray600 },
                ]}
              >
                Today's Water
              </Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
            ]}
          >
            Settings
          </Text>

          <View
            style={[
              styles.settingCard,
              {
                backgroundColor: isDarkMode
                  ? COLORS.cardBackgroundDark
                  : COLORS.cardBackgroundLight,
              },
              LAYOUT.CARD_SHADOW,
            ]}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View
                  style={[
                    styles.settingIconContainer,
                    {
                      backgroundColor: isDarkMode
                        ? COLORS.accent + '20'
                        : COLORS.accent + '15',
                    },
                  ]}
                >
                  {isDarkMode ? (
                    <Moon color={COLORS.accent} width={20} height={20} />
                  ) : (
                    <Sun color={COLORS.accent} width={20} height={20} />
                  )}
                </View>
                <View style={styles.settingTextContainer}>
                  <Text
                    style={[
                      styles.settingTitle,
                      { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
                    ]}
                  >
                    Dark Mode
                  </Text>
                  <Text
                    style={[
                      styles.settingSubtitle,
                      { color: isDarkMode ? COLORS.gray400 : COLORS.gray600 },
                    ]}
                  >
                    {isDarkMode ? 'Enabled' : 'Disabled'}
                  </Text>
                </View>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={handleToggleTheme}
                trackColor={{ false: COLORS.gray300, true: COLORS.primary + '80' }}
                thumbColor={isDarkMode ? COLORS.primary : COLORS.gray200}
              />
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="danger"
          style={styles.logoutButton}
        />

        {/* App Version */}
        <Text
          style={[
            styles.version,
            { color: isDarkMode ? COLORS.gray500 : COLORS.gray400 },
          ]}
        >
          FitBuddy v1.0.0
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: LAYOUT.PADDING,
    paddingBottom: 32,
  },
  profileCard: {
    borderRadius: LAYOUT.BORDER_RADIUS_LARGE,
    padding: LAYOUT.PADDING_LARGE,
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 42,
    fontWeight: '700',
    color: COLORS.white,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: LAYOUT.BORDER_RADIUS_LARGE,
    padding: LAYOUT.PADDING,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  settingCard: {
    borderRadius: LAYOUT.BORDER_RADIUS_LARGE,
    padding: LAYOUT.PADDING,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
  },
  logoutButton: {
    marginTop: 8,
  },
  version: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
  },
});

export default ProfileScreen;
