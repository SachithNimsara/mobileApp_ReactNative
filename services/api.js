import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS, STORAGE_KEYS } from '../utils/constants';

// Create axios instance
const api = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // Server responded with error
      const { status, data } = error.response;
      
      if (status === 401) {
        // Unauthorized - clear auth data
        await AsyncStorage.multiRemove([
          STORAGE_KEYS.AUTH_TOKEN,
          STORAGE_KEYS.USER_DATA,
        ]);
      }
      
      return Promise.reject({
        message: data.message || 'An error occurred',
        status,
      });
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        status: 0,
      });
    } else {
      // Something else happened
      return Promise.reject({
        message: error.message || 'An unexpected error occurred',
        status: 0,
      });
    }
  }
);

// Auth API
export const authAPI = {
  login: async (username, password) => {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await api.post(API_ENDPOINTS.REGISTER, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Mock Exercise Data (since API Ninjas requires API key)
export const MOCK_EXERCISES = [
  {
    id: 1,
    name: 'Push-ups',
    type: 'strength',
    muscle: 'chest',
    equipment: 'body_only',
    difficulty: 'beginner',
    instructions: 'Start in a plank position with hands shoulder-width apart. Lower your body until your chest nearly touches the floor. Push back up to starting position. Keep your core engaged throughout.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    caloriesBurned: 50,
    category: 'Strength Training',
    description: 'A classic upper body exercise that targets chest, shoulders, and triceps.',
  },
  {
    id: 2,
    name: 'Squats',
    type: 'strength',
    muscle: 'quadriceps',
    equipment: 'body_only',
    difficulty: 'beginner',
    instructions: 'Stand with feet shoulder-width apart. Lower your body by bending knees and pushing hips back. Keep chest up and knees behind toes. Return to starting position.',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400',
    caloriesBurned: 60,
    category: 'Leg Workout',
    description: 'Fundamental lower body exercise for building leg strength and stability.',
  },
  {
    id: 3,
    name: 'Plank',
    type: 'strength',
    muscle: 'abdominals',
    equipment: 'body_only',
    difficulty: 'beginner',
    instructions: 'Start in a forearm plank position. Keep body in a straight line from head to heels. Engage core and hold position. Breathe normally.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400',
    caloriesBurned: 40,
    category: 'Core Strength',
    description: 'Isometric core exercise that builds overall body strength and stability.',
  },
  {
    id: 4,
    name: 'Burpees',
    type: 'cardio',
    muscle: 'full_body',
    equipment: 'body_only',
    difficulty: 'intermediate',
    instructions: 'Start standing. Drop into squat, kick feet back to plank. Do a push-up. Jump feet back to squat. Jump up with arms overhead. Repeat.',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400',
    caloriesBurned: 100,
    category: 'Full Body HIIT',
    description: 'High-intensity exercise combining strength and cardio for maximum calorie burn.',
  },
  {
    id: 5,
    name: 'Lunges',
    type: 'strength',
    muscle: 'quadriceps',
    equipment: 'body_only',
    difficulty: 'beginner',
    instructions: 'Step forward with one leg. Lower hips until both knees are bent at 90 degrees. Push back to starting position. Alternate legs.',
    image: 'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=400',
    caloriesBurned: 55,
    category: 'Leg Workout',
    description: 'Unilateral leg exercise that improves balance and strengthens lower body.',
  },
  {
    id: 6,
    name: 'Mountain Climbers',
    type: 'cardio',
    muscle: 'abdominals',
    equipment: 'body_only',
    difficulty: 'intermediate',
    instructions: 'Start in plank position. Drive one knee toward chest. Quickly switch legs. Continue alternating at a fast pace.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
    caloriesBurned: 80,
    category: 'Cardio Core',
    description: 'Dynamic exercise that elevates heart rate while engaging core muscles.',
  },
  {
    id: 7,
    name: 'Dumbbell Rows',
    type: 'strength',
    muscle: 'lats',
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    instructions: 'Bend at waist with one hand on bench. Hold dumbbell in other hand. Pull weight up to ribcage. Lower with control. Switch sides.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400',
    caloriesBurned: 65,
    category: 'Back Strength',
    description: 'Essential back exercise for building upper body pulling strength.',
  },
  {
    id: 8,
    name: 'Deadlifts',
    type: 'strength',
    muscle: 'hamstrings',
    equipment: 'barbell',
    difficulty: 'advanced',
    instructions: 'Stand with feet hip-width. Grip barbell. Keep back straight. Lift by extending hips and knees. Lower bar with control.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    caloriesBurned: 90,
    category: 'Full Body Strength',
    description: 'Compound lift that builds total body strength and power.',
  },
  {
    id: 9,
    name: 'Jumping Jacks',
    type: 'cardio',
    muscle: 'full_body',
    equipment: 'body_only',
    difficulty: 'beginner',
    instructions: 'Start with feet together, arms at sides. Jump feet apart while raising arms overhead. Jump back to starting position. Repeat continuously.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
    caloriesBurned: 70,
    category: 'Cardio Warm-up',
    description: 'Classic cardio exercise for warming up and improving cardiovascular fitness.',
  },
  {
    id: 10,
    name: 'Bicycle Crunches',
    type: 'strength',
    muscle: 'abdominals',
    equipment: 'body_only',
    difficulty: 'intermediate',
    instructions: 'Lie on back, hands behind head. Bring opposite elbow to opposite knee while extending other leg. Alternate sides in a pedaling motion.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    caloriesBurned: 45,
    category: 'Ab Workout',
    description: 'Effective core exercise targeting obliques and rectus abdominis.',
  },
];

// Wellness Tips
export const WELLNESS_TIPS = [
  {
    id: 101,
    title: 'Stay Hydrated',
    description: 'Drink at least 8 glasses of water daily for optimal health and performance.',
    category: 'Nutrition',
    difficulty: 'beginner',
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400',
  },
  {
    id: 102,
    title: 'Get Enough Sleep',
    description: 'Aim for 7-9 hours of quality sleep each night to support recovery and well-being.',
    category: 'Recovery',
    difficulty: 'beginner',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400',
  },
  {
    id: 103,
    title: 'Warm Up Properly',
    description: 'Always spend 5-10 minutes warming up before exercise to prevent injuries.',
    category: 'Safety',
    difficulty: 'beginner',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400',
  },
  {
    id: 104,
    title: 'Practice Mindfulness',
    description: 'Take 10 minutes daily for meditation or breathing exercises to reduce stress.',
    category: 'Mental Health',
    difficulty: 'beginner',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
  },
];

// Exercise API
export const exerciseAPI = {
  getAllExercises: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return [...MOCK_EXERCISES, ...WELLNESS_TIPS];
  },
  
  getExerciseById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_EXERCISES.find(ex => ex.id === id) || WELLNESS_TIPS.find(tip => tip.id === id);
  },
  
  searchExercises: async (query) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const lowerQuery = query.toLowerCase();
    return [...MOCK_EXERCISES, ...WELLNESS_TIPS].filter(item => 
      item.name?.toLowerCase().includes(lowerQuery) ||
      item.title?.toLowerCase().includes(lowerQuery) ||
      item.category?.toLowerCase().includes(lowerQuery) ||
      item.muscle?.toLowerCase().includes(lowerQuery)
    );
  },
};

export default api;
