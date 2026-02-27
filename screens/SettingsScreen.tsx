import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'
import { useAuth } from '../context/AuthContext'
import { LinearGradient } from 'expo-linear-gradient'

const COLORS = {
  primary: '#00FFFF',
  secondary: '#FF00FF',
  accent: '#39FF14',
  background: '#000000',
  surface: '#0A0E1A',
  border: '#1A2540',
  text: '#FFFFFF',
  textMid: '#A0A0A0',
  textDim: '#606060',
  error: '#FF0040',
}

export function SettingsScreen() {
  const { user, signOut } = useAuth()

  const handleLogOut = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      {
        text: 'Log Out',
        onPress: async () => {
          try {
            await signOut()
          } catch (error: any) {
            Alert.alert('Error', error.message)
          }
        },
        style: 'destructive',
      },
    ])
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.background, '#0A0A15']} style={styles.gradient}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.title}>SETTINGS</Text>
          </View>

          <View style={styles.profileSection}>
            <Text style={styles.sectionTitle}>PROFILE</Text>
            <View style={styles.profileCard}>
              <View style={styles.profileRow}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{user?.email}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
            <View style={styles.settingCard}>
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Dose Reminders</Text>
                <View style={styles.toggle}>
                  <Text style={styles.toggleText}>ON</Text>
                </View>
              </View>
            </View>
            <View style={styles.settingCard}>
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Cycle Reminders</Text>
                <View style={styles.toggle}>
                  <Text style={styles.toggleText}>ON</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>INTEGRATIONS</Text>
            <View style={styles.integrationCard}>
              <Text style={styles.integrationName}>Google Calendar</Text>
              <Text style={styles.integrationStatus}>Not Connected</Text>
              <TouchableOpacity style={styles.integrationButton}>
                <Text style={styles.integrationButtonText}>CONNECT</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.aboutCard}>
              <Text style={styles.aboutTitle}>BIOHACKER</Text>
              <Text style={styles.aboutVersion}>v1.0.0</Text>
              <Text style={styles.aboutBuild}>Build: 2026.02.27</Text>
            </View>
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
              <Text style={styles.logoutText}>LOG OUT</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.spacing} />
        </ScrollView>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 2,
  },
  profileSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 12,
    color: COLORS.textMid,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 12,
  },
  profileCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 16,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: COLORS.textMid,
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  toggle: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  toggleText: {
    color: COLORS.background,
    fontSize: 11,
    fontWeight: 'bold',
  },
  integrationCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 16,
  },
  integrationName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  integrationStatus: {
    fontSize: 12,
    color: COLORS.textDim,
    marginBottom: 12,
  },
  integrationButton: {
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  integrationButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  aboutCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  aboutVersion: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 4,
  },
  aboutBuild: {
    fontSize: 12,
    color: COLORS.textMid,
  },
  logoutButton: {
    height: 48,
    backgroundColor: COLORS.error,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  spacing: {
    height: 80,
  },
})
