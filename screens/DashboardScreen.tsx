import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import { supabase } from '../supabaseClient'
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
  warning: '#FFAA00',
}

export function DashboardScreen() {
  const { user } = useAuth()
  const [activeCycle, setActiveCycle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadCycleData = async () => {
    try {
      if (!user) return

      // Get active cycle
      const { data: cycles } = await supabase
        .from('user_cycles')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single()

      setActiveCycle(cycles)
    } catch (error) {
      console.error('Error loading cycle:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadCycleData()
  }, [user])

  const onRefresh = () => {
    setRefreshing(true)
    loadCycleData()
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={[COLORS.background, '#0A0A15']} style={styles.gradient}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </LinearGradient>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.background, '#0A0A15']} style={styles.gradient}>
        <ScrollView
          style={styles.scrollView}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
        >
          <View style={styles.header}>
            <Text style={styles.title}>DASHBOARD</Text>
          </View>

          {activeCycle ? (
            <View style={styles.cycleCard}>
              <Text style={styles.cardTitle}>ACTIVE CYCLE</Text>
              <Text style={styles.peptideName}>{activeCycle.peptide_name}</Text>
              <Text style={styles.dosageInfo}>
                {activeCycle.dosage} {activeCycle.unit}
              </Text>

              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.min(
                          ((new Date().getTime() - new Date(activeCycle.start_date).getTime()) /
                            (new Date(activeCycle.end_date).getTime() - new Date(activeCycle.start_date).getTime())) *
                            100,
                          100
                        )}%`,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  Day {Math.ceil((new Date().getTime() - new Date(activeCycle.start_date).getTime()) / (1000 * 60 * 60 * 24))} of{' '}
                  {Math.ceil((new Date(activeCycle.end_date).getTime() - new Date(activeCycle.start_date).getTime()) / (1000 * 60 * 60 * 24))}
                </Text>
              </View>

              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.buttonText}>DOSE NOW</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No active cycle</Text>
              <Text style={styles.emptySubtext}>Create one in the Cycles tab</Text>
            </View>
          )}

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statCardContent}>
                <Text style={styles.statLabel}>Weight</Text>
                <Text style={styles.statValue}>185</Text>
                <Text style={styles.statUnit}>lbs</Text>
              </View>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statCardContent}>
                <Text style={styles.statLabel}>Protein</Text>
                <Text style={styles.statValue}>160</Text>
                <Text style={styles.statUnit}>g</Text>
              </View>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statCardContent}>
                <Text style={styles.statLabel}>Water</Text>
                <Text style={styles.statValue}>3.2</Text>
                <Text style={styles.statUnit}>L</Text>
              </View>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statCardContent}>
                <Text style={styles.statLabel}>Sleep</Text>
                <Text style={styles.statValue}>7.5</Text>
                <Text style={styles.statUnit}>h</Text>
              </View>
            </View>
          </View>
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
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  cycleCard: {
    margin: 16,
    padding: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    shadowColor: 'rgba(0, 255, 255, 0.2)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 12,
    color: COLORS.textMid,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 8,
  },
  peptideName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  dosageInfo: {
    fontSize: 14,
    color: COLORS.textMid,
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.textMid,
  },
  primaryButton: {
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 255, 255, 0.3)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  emptyCard: {
    margin: 16,
    padding: 32,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.textMid,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textDim,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
  statCard: {
    width: '50%',
    padding: 8,
  },
  statCardContent: {
    padding: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textMid,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statUnit: {
    fontSize: 12,
    color: COLORS.textDim,
  },
})
