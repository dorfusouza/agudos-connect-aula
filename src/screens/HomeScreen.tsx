import { StyleSheet, Text, View } from "react-native";
import { stores } from "../data/stores";
import StoreCard from "../components/StoreCard";

export default function HomeScreen() {
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
        </View>
    )
};

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
