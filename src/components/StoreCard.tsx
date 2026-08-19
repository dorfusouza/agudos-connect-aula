import { View, Text, Image, StyleSheet } from 'react-native';
import type { Store } from '../data/stores';

type Props = {
  store: Store;
};

// Um "cartão" de loja: imagem à esquerda, texto à direita.
// É o exemplo perfeito pra ensinar Flexbox porque tem dois eixos em jogo:
// - eixo principal (main axis) = horizontal, por causa de flexDirection: 'row'
// - eixo cruzado (cross axis) = vertical, controlado por alignItems
export default function StoreCard({ store }: Props) {
  return (
    <View style={styles.card}>
      {/* Image SEMPRE precisa de width/height (diferente da web, que usa o
          tamanho natural da imagem) */}
      <Image source={{ uri: store.imageUrl }} style={styles.image} />

      {/* Este View interno também é flex — ele ocupa o espaço restante
          da linha graças ao flex: 1 (ver StyleSheet abaixo) */}
      <View style={styles.info}>
        <Text style={styles.name}>{store.name}</Text>
        <Text style={styles.details}>
          {store.category} · {store.rating}★ · {store.distance}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    // flexDirection: 'row' -> filhos lado a lado (o padrão do React Native
    // já é 'column', diferente da web onde o padrão é 'row')
    flexDirection: 'row',
    // alignItems controla o eixo CRUZADO (aqui, vertical) -> centraliza
    // a imagem e o texto verticalmente, mesmo que tenham alturas diferentes
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F2F2F2',
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#DDD',
  },
  info: {
    // flex: 1 -> "ocupe todo o espaço que sobrar nessa linha"
    // sem isso, o texto ficaria espremido do tamanho do próprio conteúdo
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  details: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
});
