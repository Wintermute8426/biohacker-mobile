import 'react-native-gesture-handler'
import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from './screens/LoginScreen'
import { DashboardScreen } from './screens/DashboardScreen'
import { CyclesScreen } from './screens/CyclesScreen'
import { LabsScreen } from './screens/LabsScreen'
import { SettingsScreen } from './screens/SettingsScreen'
import { AuthProvider, useAuth } from './context/AuthContext'

const Stack = createNativeStackNavigator()

function RootNavigator() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00FFFF" />
      </View>
    )
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Cycles" component={CyclesScreen} />
          <Stack.Screen name="Labs" component={LabsScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  )
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
