import React from 'react'
import { View, Text } from 'react-native'

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ color: '#00FFFF', fontSize: 32, fontWeight: 'bold', marginBottom: 20 }}>🧊 Biohacker</Text>
      <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>App is running!</Text>
      <Text style={{ color: '#A0A0A0', fontSize: 12, marginTop: 20, textAlign: 'center' }}>If you see this, the app loaded successfully.</Text>
    </View>
  )
}
