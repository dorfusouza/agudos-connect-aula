import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import StoreCard from "../components/StoreCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useEffect } from "react";
import { api } from "../services/api";
import { useStores } from "../hooks/useStores";

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
    const navigation = useNavigation<RootNavigationProp>();
    const { stores, loading, error } = useStores();
    
    if(loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#1E2761" />
                <Text style={styles.hint}>Carregando lojas...</Text>
            </View>
        )
    }

    if(error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
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
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    hint: {
        marginTop: 12,
        fontSize: 14,
        color: '#666',
    },
    errorText: {
        color: '#B00020',
        textAlign: 'center',
        fontSize: 15,
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
