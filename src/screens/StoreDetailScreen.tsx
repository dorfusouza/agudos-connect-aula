import { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'
import { useStore } from '../hooks/useStore'
import { scheduleRepository, DuplicateScheduleError } from '../storage/ScheduleRepository'
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

type Props = NativeStackScreenProps<RootStackParamList, 'StoreDetail'>

// Horários fixos (estáticos): nesta UC o foco é o agendamento em si e, na Sprint 4,
// a persistência dele — a origem dos horários (uma API de agenda real) fica fora do escopo.
const TIME_SLOTS = ['09:00', '10:30', '13:00', '14:30', '16:00']

export default function StoreDetailScreen({ route }: Props) {
    const { store, loading, error } = useStore(route.params.StoreId)
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
    const [confirmed, setConfirmed] = useState(false)
    // Aula 11: estados da AÇÃO de salvar. `saving` desabilita o botão enquanto o
    // AsyncStorage trabalha (evita toque duplo); `saveError` mostra a falha na tela.
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState<string | null>(null)

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#1E2761" />
            </View>
        )
    }

    if (error || !store) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error ?? 'Loja não encontrada.'}</Text>
            </View>
        )
    }

    const handleSchedule = async () => {
        if (!selectedSlot) return
        setSaving(true)
        setSaveError(null)
        try {
            await scheduleRepository.create({ storeId: store.id, storeName: store.name, slot: selectedSlot })
            setConfirmed(true)
        } catch (error) {
            // Falhou: não mostra "Agendado!" e deixa o aluno tentar de novo.
            // instanceof distingue o erro da REGRA (duplicado) de uma falha qualquer.
            setSaveError(
                error instanceof DuplicateScheduleError
                    ? 'Você já tem esse horário agendado nesta loja.'
                    : 'Não foi possível salvar o agendamento. Tente novamente.'
            )
        } finally {
            setSaving(false) // roda sempre: com sucesso ou com erro, o botão volta ao normal
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Image source={{ uri: store.imageUrl }} style={styles.image} />
            <Text style={styles.title}>{store.name}</Text>
            <Text style={styles.subtitle}>
                {store.category} · {store.rating}★ · {store.distance}
            </Text>
            <Text style={styles.address}>{store.address}</Text>

            <Text style={styles.sectionTitle}>Horários disponíveis</Text>
            <View style={styles.slots}>
                {TIME_SLOTS.map((slot) => (
                    <Pressable
                        key={slot}
                        style={[styles.slot, selectedSlot === slot && styles.slotSelected]}
                        onPress={() => {
                            setSelectedSlot(slot)
                            setConfirmed(false) // trocou de horário: a confirmação anterior não vale mais
                            setSaveError(null)
                        }}
                    >
                        <Text style={[styles.slotText, selectedSlot === slot && styles.slotTextSelected]}>
                            {slot}
                        </Text>
                    </Pressable>
                ))}
            </View>

            {/* Desabilitado sem horário, durante o salvamento e depois de confirmado
                (evita agendar o mesmo horário duas vezes sem querer). */}
            <Pressable
                style={[styles.confirmButton, (!selectedSlot || saving || confirmed) && styles.confirmButtonDisabled]}
                disabled={!selectedSlot || saving || confirmed}
                onPress={handleSchedule}
            >
                <Text style={styles.confirmButtonText}>{saving ? 'Salvando…' : 'Agendar Agora'}</Text>
            </Pressable>

            {saveError && <Text style={styles.saveErrorText}>{saveError}</Text>}

            {confirmed && selectedSlot && (
                <Text style={styles.confirmedText}>
                    Agendado para {selectedSlot} em {store.name}! Confira na aba Agenda.
                </Text>
            )}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 40 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  image: { width: '100%', height: 180, borderRadius: 12, backgroundColor: '#DDD' },
  title: { fontSize: 22, fontWeight: '700', marginTop: 16 },
  subtitle: { fontSize: 14, color: '#666', marginTop: 8 },
  address: { fontSize: 14, color: '#333', marginTop: 4 },
  errorText: { color: '#B00020', textAlign: 'center', fontSize: 15 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginTop: 24, marginBottom: 12 },
  slots: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  slot: {
    borderWidth: 1,
    borderColor: '#1E2761',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  slotSelected: { backgroundColor: '#1E2761' },
  slotText: { color: '#1E2761', fontWeight: '600' },
  slotTextSelected: { color: '#fff' },
  confirmButton: {
    marginTop: 24,
    backgroundColor: '#1E2761',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmButtonDisabled: { opacity: 0.4 },
  confirmButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  saveErrorText: { marginTop: 16, color: '#B00020', textAlign: 'center' },
  confirmedText: { marginTop: 16, color: '#2C5F2D', textAlign: 'center' },
});
