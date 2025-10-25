import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../componentes/Api';
import { propCliente } from '../componentes/Cliente'; // Reutilizando o tipo

export default function TelaEditCliente() {

  const navigation = useNavigation();
  const route = useRoute();
  
  const { cliente } = route.params as { cliente: propCliente };
  
  const [id, setId] = useState(String(cliente?.id ?? ''));
  const [nome, setNome] = useState(String(cliente?.nome ?? ''));
  const [cpf, setCpf] = useState(String(cliente?.cpf ?? ''));
  const [saldo, setSaldo] = useState(String(cliente?.saldo ?? ''));

  async function handleUpdate() {
    if (!nome || !cpf || !saldo) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await api.put(`clientes/${id}`, {
        nome: nome,
        cpf: cpf,
        saldo: parseFloat(saldo) || 0
      });

      Alert.alert('Sucesso', response.data.message || 'Cliente atualizado!');
      navigation.navigate('ListarClientes' as never);

    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Deu erro ao atualizar!";
      Alert.alert("Erro", errorMessage);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Editar Cliente
      </Text>

      <View style={styles.bloco}>
        <TextInput
          placeholder='Código'
          value={id}
          style={[styles.input, styles.inputDisabled]}
          editable={false}
        />
        
        <TextInput
          placeholder='Digite o nome do cliente...'
          value={nome}
          onChangeText={(value) => setNome(value)}
          style={styles.input}
        />

        <TextInput
          placeholder='Digite o CPF do cliente...'
          value={cpf}
          onChangeText={(value) => setCpf(value)}
          style={styles.input}
          keyboardType="numeric"
        />

        <TextInput
          placeholder='Digite o valor de saldo do cliente...'
          value={saldo}
          onChangeText={(value) => setSaldo(value)}
          style={styles.input}
          keyboardType="numeric"
        />
      </View>
      
      <TouchableOpacity style={styles.btn} onPress={handleUpdate}>
        <Text style={styles.txtBtn}> Atualizar Cliente </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  bloco: {
    width: '90%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  inputDisabled: {
    backgroundColor: '#eee',
    color: '#777',
  },
  btn: {
    backgroundColor: '#007bff',
    width: '80%',
    marginTop: 20,
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  txtBtn: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  }
});