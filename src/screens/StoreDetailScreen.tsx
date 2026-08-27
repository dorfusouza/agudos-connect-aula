import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'
import { stores } from '../data/stores'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'

type Props = NativeStackScreenProps<RootStackParamList, 'StoreDetail'>

export default function StoreDetailScreen({ route }: Props) {
    const store = stores.find((s) => s.id === route.params.StoreId)

    if (!store) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Loja não encontrada.</Text>
            </View>
        )
    }
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Image source={{ uri: store.imageUrl }} style={styles.image} />
            <Text style={styles.title}>{store.name}</Text>
            <Text style={styles.subtitle}>
                {store.category} · {store.rating}★ · {store.distance}
            </Text>
            <Text style={styles.address}>{store.address}</Text>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 40 },
  image: { width: '100%', height: 180, borderRadius: 12, backgroundColor: '#DDD' },
  title: { fontSize: 22, fontWeight: '700', marginTop: 16 },
  subtitle: { fontSize: 14, color: '#666', marginTop: 8 },
  address: { fontSize: 14, color: '#333', marginTop: 4 },
  errorText: { color: '#B00020', textAlign: 'center', marginTop: 40 },
});
