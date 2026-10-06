import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSchedules } from '../hooks/useSchedules';

export default function ScheduleScreen() {
  const { schedules, loading, error, cancelSchedule } = useSchedules();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1E2761" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda</Text>

      {/* Aula 11: a falha aparece na tela em vez de ficar só no console. */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={schedules}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        // Estado vazio "honesto": diz que não há nada em vez de mostrar tela em branco.
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum agendamento ainda. Escolha uma loja e agende um horário.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardStore}>{item.storeName}</Text>
              <Text style={styles.cardSlot}>Horário: {item.slot}</Text>
            </View>
            <Pressable style={styles.cancelButton} onPress={() => cancelSchedule(item.id)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 16, backgroundColor: '#fff' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700' },
  list: { paddingTop: 16, paddingBottom: 24, gap: 12 },
  errorText: { color: '#B00020', fontSize: 14, marginTop: 8 },
  empty: { fontSize: 14, color: '#666', marginTop: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    padding: 14,
  },
  cardInfo: { flex: 1 },
  cardStore: { fontSize: 16, fontWeight: '700' },
  cardSlot: { fontSize: 14, color: '#666', marginTop: 4 },
  cancelButton: { borderWidth: 1, borderColor: '#B00020', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12 },
  cancelText: { color: '#B00020', fontWeight: '600' },
});
