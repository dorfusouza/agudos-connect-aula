import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import StoreCard from './src/components/StoreCard';
import { stores } from './src/data/stores';

// Aula: Componentes Core (View, Text, Image) + Estilização Inicial + Flexbox I
//
// Este ecrã não tem navegação nem estado ainda (isso é assunto de aulas
// futuras) — o objetivo aqui é só a LAYOUT: como View, Text e Image se
// organizam na tela usando Flexbox.
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Serviços perto de você</Text>
      </View>

      {/* Container em coluna (o padrão do React Native) — cada StoreCard
          empilha um embaixo do outro, com espaçamento uniforme via `gap` */}
      <View style={styles.list}>
        {stores.map((store) => (
          <StoreCard key={store.name} store={store} />
        ))}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    // paddingTop maior aqui porque não temos SafeAreaView cuidando da
    // barra de status/notch — outra aula vai resolver isso "de verdade"
    paddingTop: 56,
    paddingBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  list: {
    paddingHorizontal: 16,
    gap: 12,
  },
});
