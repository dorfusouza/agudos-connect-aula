import { StyleSheet, Text, View } from "react-native";

export default function SobreScreen() {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Sobre o Agudos Connect
            </Text>
            <Text style={styles.hint}>
                Um app para conectar clientes aos 
                negócios locais de Agudos-SP: lista de lojas,
                agendamento de visitas e check-in com câmera e 
                GPS.
            </Text>
            <Text style={styles.hint}>
                Esta tela é uma rota temporária, registrada na
                Stack (RootNavigator), não numa aba — por isso
                ela empilha por cima das Tabs em vez de
                aparecer como uma 4ª aba.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, paddingTop: 60, paddingHorizontal: 16},
    title: {fontSize: 22, fontWeight: '700'},
    hint: {fontSize: 13, color:'#666', marginTop:12}
})