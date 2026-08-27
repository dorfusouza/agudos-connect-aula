import { Pressable, StyleSheet, Text, View } from "react-native";
import { stores } from "../data/stores";
import StoreCard from "../components/StoreCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
    const navigation = useNavigation<RootNavigationProp>();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Serviços perto de você</Text>
            </View>

            {/* Container em coluna (o padrão do React Native) — cada StoreCard
          empilha um embaixo do outro, com espaçamento uniforme via `gap` */}
            <View style={styles.list}>
                {stores.map((store) => (
                    <Pressable key={store.id} onPress={() => navigation.navigate('StoreDetail', { StoreId: store.id})}>
                        <StoreCard store={store} />
                    </Pressable>
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
