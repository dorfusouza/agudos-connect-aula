import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { login, user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  function handleLogin() {
    login(name, email);
    // Teste temporário da Aula 06 — confirma que o AuthContext guardou os
    // dados certos. Sai daqui quando a navegação condicional entrar (Aula 07).
    console.log('[Aula 06] usuário logado no contexto:', { name, email });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Seu nome"
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="seu@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Só pra visualizar o estado do contexto ao vivo durante a aula —
          mostra que o AuthContext guardou o que foi digitado. Sai depois. */}
      {user && (
        <Text style={styles.debug}>Contexto guardou: {user.name} ({user.email})</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 80, paddingHorizontal: 24, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 24 },
  label: { fontSize: 13, color: '#666', marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#1E2761',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  debug: { marginTop: 20, fontSize: 13, color: '#1E2761' },
});
