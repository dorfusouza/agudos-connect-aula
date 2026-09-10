import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const navigation = useNavigation<RootNavigationProp>()
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      {user ? (
        <Text>Logado como {user.name} ({user.email})</Text>
      ):(
        <Text>Ninguém logado ainda</Text>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Ir para Login (teste)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 16 },
  title: { fontSize: 22, fontWeight: '700' },
  hint: { fontSize: 14, color: '#666', marginTop: 12 },
});
