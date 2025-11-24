import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Activity } from 'react-native-feather';
import Input from '../components/Input';
import Button from '../components/Button';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { authAPI } from '../services/api';
import { COLORS, LAYOUT, STORAGE_KEYS } from '../utils/constants';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleLogin = async (values) => {
    try {
      dispatch(loginStart());
      
      // Call dummy API
      const response = await authAPI.login(values.username, values.password);
      
      // Store token and user data
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response));
      
      dispatch(loginSuccess({
        user: response,
        token: response.token,
      }));
    } catch (error) {
      dispatch(loginFailure(error.message || 'Login failed'));
      Alert.alert('Login Failed', error.message || 'Please check your credentials');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? COLORS.backgroundDark
            : COLORS.backgroundLight,
        },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            style={styles.logoGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Activity color={COLORS.white} width={48} height={48} />
          </LinearGradient>
          <Text
            style={[
              styles.title,
              { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
            ]}
          >
            Welcome to FitBuddy
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: isDarkMode ? COLORS.gray400 : COLORS.gray600 },
            ]}
          >
            Your personal health & wellness companion
          </Text>
        </View>

        {/* Form Section */}
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              <Input
                label="Username"
                placeholder="Enter your username"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                error={touched.username && errors.username}
                isDarkMode={isDarkMode}
                autoCapitalize="none"
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password && errors.password}
                secureTextEntry
                isDarkMode={isDarkMode}
              />

              <Button
                title="Login"
                onPress={handleSubmit}
                loading={loading}
                gradient
                style={styles.loginButton}
              />

              <View style={styles.registerContainer}>
                <Text
                  style={[
                    styles.registerText,
                    { color: isDarkMode ? COLORS.gray400 : COLORS.gray600 },
                  ]}
                >
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={[styles.registerLink, { color: COLORS.primary }]}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Demo Credentials */}
              <View
                style={[
                  styles.demoContainer,
                  {
                    backgroundColor: isDarkMode
                      ? COLORS.cardBackgroundDark
                      : COLORS.gray100,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.demoTitle,
                    { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
                  ]}
                >
                  Demo Credentials
                </Text>
                <Text
                  style={[
                    styles.demoText,
                    { color: isDarkMode ? COLORS.gray400 : COLORS.gray600 },
                  ]}
                >
                  Username: emilys
                </Text>
                <Text
                  style={[
                    styles.demoText,
                    { color: isDarkMode ? COLORS.gray400 : COLORS.gray600 },
                  ]}
                >
                  Password: emilyspass
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: LAYOUT.PADDING_LARGE,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  loginButton: {
    marginTop: 8,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  registerText: {
    fontSize: 14,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '600',
  },
  demoContainer: {
    marginTop: 32,
    padding: LAYOUT.PADDING,
    borderRadius: LAYOUT.BORDER_RADIUS,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 12,
    marginBottom: 4,
  },
});

export default LoginScreen;
