import 'react-native-gesture-handler'
import React from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LoginScreen } from './screens/LoginScreen'
import { SignUpScreen } from './screens/SignUpScreen'
import { DashboardScreen } from './screens/DashboardScreen'
import { CyclesScreen } from './screens/CyclesScreen'
import { LabsScreen } from './screens/LabsScreen'
import { SettingsScreen } from './screens/SettingsScreen'
import { AuthProvider, useAuth } from './context/AuthContext'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const COLORS = {
  primary: '#00FFFF',
  textMid: '#A0A0A0',
}

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  )
}

function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0A0E1A',
          borderTopColor: '#1A2540',
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
        name="DashboardTab"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="CyclesTab"
        component={CyclesScreen}
        options={{
          tabBarLabel: 'Cycles',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>💊</Text>,
        }}
      />
      <Tab.Screen
        name="LabsTab"
        component={LabsScreen}
        options={{
          tabBarLabel: 'Labs',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🧪</Text>,
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>⚙️</Text>,
        }}
      />
    </Tab.Navigator>
  )
}

function RootNavigator() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    )
  }

  if (user) {
    return <AppNavigator />
  }

  return <AuthNavigator />
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  )
}
