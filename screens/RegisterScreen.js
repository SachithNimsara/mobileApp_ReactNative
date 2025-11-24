import React from 'react';
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
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LinearGradient } from 'expo-linear-gradient';
import { UserPlus } from 'react-native-feather';
import Input from '../components/Input';
import Button from '../components/Button';
import { authAPI } from '../services/api';
import { COLORS, LAYOUT } from '../utils/constants';

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleRegister = async (values) => {
    try {
      setLoading(true);
      
      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        username: values.username,
        password: values.password,
      };
      
      await authAPI.register(userData);
      
      Alert.alert(
        'Success',
        'Account created successfully! Please login.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Registration Failed', error.message || 'Please try again');
    } finally {
      setLoading(false);
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
            <UserPlus color={COLORS.white} width={48} height={48} />
          </LinearGradient>
          <Text
            style={[
              styles.title,
              { color: isDarkMode ? COLORS.textDark : COLORS.textLight },
            ]}
          >
            Create Account
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: isDarkMode ? COLORS.gray400 : COLORS.gray600 },
            ]}
          >
            Join FitBuddy and start your wellness journey
          </Text>
        </View>

        {/* Form Section */}
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
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
                label="First Name"
                placeholder="Enter your first name"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                error={touched.firstName && errors.firstName}
                isDarkMode={isDarkMode}
              />

              <Input
                label="Last Name"
                placeholder="Enter your last name"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                error={touched.lastName && errors.lastName}
                isDarkMode={isDarkMode}
              />

              <Input
                label="Email"
                placeholder="Enter your email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email}
                isDarkMode={isDarkMode}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Input
                label="Username"
                placeholder="Choose a username"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                error={touched.username && errors.username}
                isDarkMode={isDarkMode}
                autoCapitalize="none"
              />

              <Input
                label="Password"
                placeholder="Create a password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password && errors.password}
                secureTextEntry
                isDarkMode={isDarkMode}
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                error={touched.confirmPassword && errors.confirmPassword}
                secureTextEntry
                isDarkMode={isDarkMode}
              />

              <Button
                title="Create Account"
                onPress={handleSubmit}
                loading={loading}
                gradient
                style={styles.registerButton}
              />

              <View style={styles.loginContainer}>
                <Text
                  style={[
                    styles.loginText,
                    { color: isDarkMode ? COLORS.gray400 : COLORS.gray600 },
                  ]}
                >
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={[styles.loginLink, { color: COLORS.primary }]}>
                    Login
                  </Text>
                </TouchableOpacity>
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
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
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
  registerButton: {
    marginTop: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default RegisterScreen;
