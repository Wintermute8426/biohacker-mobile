import React from 'react'
import { View, Text } from 'react-native'

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#00FFFF', fontSize: 24, fontWeight: 'bold' }}>🧊 Biohacker</Text>
      <Text style={{ color: '#fff', marginTop: 20 }}>App is loading...</Text>
    </View>
  )
}
