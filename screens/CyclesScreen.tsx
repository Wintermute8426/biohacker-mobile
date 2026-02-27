import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
  RefreshControl,
} from 'react-native'
import { supabase } from '../supabaseClient'
import { useAuth } from '../context/AuthContext'
import { LinearGradient } from 'expo-linear-gradient'
import { Picker } from '@react-native-picker/picker'

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

const PEPTIDES = ['BPC-157', 'TB-500', 'Epitalon', 'MK-677', 'Semax']

export function CyclesScreen() {
  const { user } = useAuth()
  const [cycles, setCycles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedPeptide, setSelectedPeptide] = useState('BPC-157')
  const [dosage, setDosage] = useState('200')
  const [duration, setDuration] = useState('8')
  const [frequency, setFrequency] = useState('daily')

  const loadCycles = async () => {
    try {
      if (!user) return

      const { data } = await supabase
        .from('user_cycles')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setCycles(data || [])
    } catch (error) {
      console.error('Error loading cycles:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadCycles()
  }, [user])

  const onRefresh = () => {
    setRefreshing(true)
    loadCycles()
  }

  const handleCreateCycle = async () => {
    if (!dosage || !duration) {
      Alert.alert('Missing fields', 'Please fill in all fields')
      return
    }

    try {
      const startDate = new Date()
      const endDate = new Date(startDate.getTime() + parseInt(duration) * 24 * 60 * 60 * 1000)

      const { error } = await supabase.from('user_cycles').insert({
        user_id: user.id,
        peptide_name: selectedPeptide,
        dosage: parseInt(dosage),
        unit: 'mcg',
        frequency,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        status: 'active',
      })

      if (error) throw error

      Alert.alert('Success', 'Cycle created!')
      setShowModal(false)
      setDosage('200')
      setDuration('8')
      loadCycles()
    } catch (error: any) {
      Alert.alert('Error', error.message)
    }
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
            <Text style={styles.title}>CYCLES</Text>
            <TouchableOpacity style={styles.headerButton} onPress={() => setShowModal(true)}>
              <Text style={styles.headerButtonText}>+ NEW</Text>
            </TouchableOpacity>
          </View>

          {cycles.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No cycles</Text>
              <Text style={styles.emptySubtext}>Create your first cycle to get started</Text>
            </View>
          ) : (
            cycles.map((cycle) => (
              <View key={cycle.id} style={styles.cycleCard}>
                <Text style={styles.peptideName}>{cycle.peptide_name}</Text>
                <Text style={styles.dosageText}>
                  {cycle.dosage} {cycle.unit}
                </Text>
                <Text style={styles.statusText}>{cycle.status.toUpperCase()}</Text>

                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.min(
                          ((new Date().getTime() - new Date(cycle.start_date).getTime()) /
                            (new Date(cycle.end_date).getTime() - new Date(cycle.start_date).getTime())) *
                            100,
                          100
                        )}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            ))
          )}
        </ScrollView>

        <Modal visible={showModal} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>NEW CYCLE</Text>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalForm}>
                <Text style={styles.label}>Peptide</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedPeptide}
                    onValueChange={setSelectedPeptide}
                    style={styles.picker}
                    dropdownIconColor={COLORS.primary}
                  >
                    {PEPTIDES.map((peptide) => (
                      <Picker.Item key={peptide} label={peptide} value={peptide} />
                    ))}
                  </Picker>
                </View>

                <Text style={styles.label}>Dosage (mcg)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="200"
                  placeholderTextColor={COLORS.textDim}
                  value={dosage}
                  onChangeText={setDosage}
                  keyboardType="number-pad"
                />

                <Text style={styles.label}>Duration (days)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="8"
                  placeholderTextColor={COLORS.textDim}
                  value={duration}
                  onChangeText={setDuration}
                  keyboardType="number-pad"
                />

                <Text style={styles.label}>Frequency</Text>
                <View style={styles.frequencyContainer}>
                  {['daily', 'every2days', 'weekly'].map((freq) => (
                    <TouchableOpacity
                      key={freq}
                      style={[styles.frequencyButton, frequency === freq && styles.frequencyButtonActive]}
                      onPress={() => setFrequency(freq)}
                    >
                      <Text
                        style={[
                          styles.frequencyButtonText,
                          frequency === freq && styles.frequencyButtonTextActive,
                        ]}
                      >
                        {freq === 'daily' ? 'Daily' : freq === 'every2days' ? 'Every 2 Days' : 'Weekly'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setShowModal(false)}>
                  <Text style={styles.cancelButtonText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.startButton} onPress={handleCreateCycle}>
                  <Text style={styles.startButtonText}>START CYCLE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 2,
  },
  headerButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  headerButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 12,
  },
  cycleCard: {
    margin: 12,
    padding: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
  },
  peptideName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  dosageText: {
    fontSize: 14,
    color: COLORS.textMid,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 11,
    color: COLORS.accent,
    fontWeight: '600',
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: '90%',
  },
  modalHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  closeButton: {
    fontSize: 24,
    color: COLORS.textMid,
  },
  modalForm: {
    padding: 16,
  },
  label: {
    fontSize: 12,
    color: COLORS.textMid,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    color: COLORS.text,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
  },
  picker: {
    color: COLORS.text,
    height: 48,
  },
  frequencyContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  frequencyButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  frequencyButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  frequencyButtonText: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '600',
  },
  frequencyButtonTextActive: {
    color: COLORS.background,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: 32,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  startButton: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
})
