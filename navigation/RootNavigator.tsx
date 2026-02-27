import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useAuth } from '../context/AuthContext'
import { LoginScreen } from '../screens/LoginScreen'
import { SignUpScreen } from '../screens/SignUpScreen'
import { DashboardScreen } from '../screens/DashboardScreen'
import { CyclesScreen } from '../screens/CyclesScreen'
import { LabsScreen } from '../screens/LabsScreen'
import { SettingsScreen } from '../screens/SettingsScreen'
import { Text } from 'react-native'

const COLORS = {
  primary: '#00FFFF',
  secondary: '#FF00FF',
  accent: '#39FF14',
  background: '#000000',
  surface: '#0A0E1A',
  border: '#1A2540',
  text: '#FFFFFF',
  textMid: '#A0A0A0',
}

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  )
}

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 16,
          paddingTop: 8,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMid,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Cycles"
        component={CyclesScreen}
        options={{
          tabBarLabel: 'Cycles',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>💊</Text>,
        }}
      />
      <Tab.Screen
        name="Labs"
        component={LabsScreen}
        options={{
          tabBarLabel: 'Labs',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🧪</Text>,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>⚙️</Text>,
        }}
      />
    </Tab.Navigator>
  )
}

export function RootNavigator() {
  const { user, loading } = useAuth()

  if (loading) {
    return null
  }

  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    {user ? (
      <Stack.Screen
        name="AppTabs"
        component={AppTabs}
      />
    ) : (
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
      />
    )}
  </Stack.Navigator>
}
