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

export function LabsScreen() {
  const { user } = useAuth()
  const [labResults, setLabResults] = useState<any[]>([])
  const [expandedDates, setExpandedDates] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadLabResults = async () => {
    try {
      if (!user) return

      const { data } = await supabase
        .from('lab_results')
        .select('*')
        .eq('user_id', user.id)
        .order('test_date', { ascending: false })

      setLabResults(data || [])
    } catch (error) {
      console.error('Error loading lab results:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadLabResults()
  }, [user])

  const onRefresh = () => {
    setRefreshing(true)
    loadLabResults()
  }

  const toggleExpand = (date: string) => {
    setExpandedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    )
  }

  const groupedByDate = labResults.reduce((acc: any, result) => {
    const date = new Date(result.test_date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(result)
    return acc
  }, {})

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
            <Text style={styles.title}>LABS</Text>
          </View>

          {Object.keys(groupedByDate).length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No lab results</Text>
              <Text style={styles.emptySubtext}>Upload or log your lab results here</Text>
            </View>
          ) : (
            Object.entries(groupedByDate).map(([date, results]: [string, any]) => (
              <View key={date} style={styles.dateCard}>
                <TouchableOpacity
                  style={styles.dateHeader}
                  onPress={() => toggleExpand(date)}
                >
                  <View>
                    <Text style={styles.dateText}>📅 {date}</Text>
                    <Text style={styles.markerCount}>{results.length} markers</Text>
                  </View>
                  <Text style={styles.expandIcon}>
                    {expandedDates.includes(date) ? '▼' : '▶'}
                  </Text>
                </TouchableOpacity>

                {expandedDates.includes(date) && (
                  <View style={styles.resultsContainer}>
                    {results.map((result: any) => (
                      <View key={result.id} style={styles.resultItem}>
                        <Text style={styles.biomarkerName}>{result.biomarker_name}</Text>
                        <View style={styles.valueRow}>
                          <Text style={styles.value}>{result.value}</Text>
                          <Text style={styles.unit}>{result.unit}</Text>
                        </View>
                        {result.reference_range_min && result.reference_range_max && (
                          <Text style={styles.reference}>
                            REF: {result.reference_range_min}-{result.reference_range_max}
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))
          )}

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
  dateCard: {
    margin: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  dateHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 4,
  },
  markerCount: {
    fontSize: 12,
    color: COLORS.textMid,
  },
  expandIcon: {
    fontSize: 16,
    color: COLORS.primary,
  },
  resultsContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: 12,
    gap: 12,
  },
  resultItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 6,
  },
  biomarkerName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  unit: {
    fontSize: 12,
    color: COLORS.textMid,
  },
  reference: {
    fontSize: 11,
    color: COLORS.textDim,
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
  spacing: {
    height: 80,
  },
})
