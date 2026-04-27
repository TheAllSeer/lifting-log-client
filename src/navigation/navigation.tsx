import React, { useRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { colors } from '../theme/colors';
import { WorkoutsStackParamList, TabParamList } from './navigationTypes';

import WorkoutListScreen from '../screens/WorkoutListScreen/WorkoutListScreen';
import LogWorkoutScreen from '../screens/LogWorkoutScreen/LogWorkoutScreen';
import WorkoutDetailScreen from '../screens/WorkoutDetailScreen/WorkoutDetailScreen';
import LiveSessionScreen from '../screens/LiveSessionScreen/LiveSessionScreen';
import PresetsScreen from '../screens/PresetsScreen/PresetsScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SessionBanner from '../components/SessionBanner/SessionBanner';

const Stack = createNativeStackNavigator<WorkoutsStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function WorkoutsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textPrimary,
      }}
    >
      <Stack.Screen name="WorkoutList" component={WorkoutListScreen} options={{ title: 'Workouts' }} />
      <Stack.Screen name="LogWorkout" component={LogWorkoutScreen} options={{ title: 'Log Workout' }} />
      <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} options={{ title: 'Workout' }} />
      <Stack.Screen
        name="LiveSession"
        component={LiveSessionScreen}
        options={{
          title: 'Live Session',
          headerStyle: { backgroundColor: colors.sessionBanner },
          headerTintColor: colors.sessionAccent,
        }}
      />
    </Stack.Navigator>
  );
}

export default function RootNavigation() {
  const navRef = useRef<NavigationContainerRef<any>>(null);

  const navigateToSession = () => {
    navRef.current?.navigate('WorkoutsTab', { screen: 'LiveSession' });
  };

  return (
    <NavigationContainer ref={navRef}>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textSecondary,
            tabBarStyle: { backgroundColor: colors.tabBar, borderTopColor: colors.border },
          }}
        >
          <Tab.Screen
            name="HomeTab"
            component={HomeScreen}
            options={{
              title: 'Home',
              tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
              headerShown: true,
              headerStyle: { backgroundColor: colors.surface },
              headerTintColor: colors.textPrimary,
            }}
          />
          <Tab.Screen
            name="WorkoutsTab"
            component={WorkoutsStack}
            options={{
              title: 'Workouts',
              tabBarIcon: ({ color, size }) => <Ionicons name="barbell-outline" size={size} color={color} />,
            }}
          />
          <Tab.Screen
            name="PresetsTab"
            component={PresetsScreen}
            options={{
              title: 'Presets',
              tabBarIcon: ({ color, size }) => <Ionicons name="bookmarks-outline" size={size} color={color} />,
              headerShown: true,
              headerStyle: { backgroundColor: colors.surface },
              headerTintColor: colors.textPrimary,
            }}
          />
        </Tab.Navigator>
        <SessionBanner onPress={navigateToSession} />
      </View>
    </NavigationContainer>
  );
}
