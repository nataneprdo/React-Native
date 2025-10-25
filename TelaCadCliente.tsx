import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import api from '../componentes/Api';

export default function TelaCadCliente() {

  const navigation = useNavigation();

  const [nome, setNome] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [saldo, setSaldo] = useState<string>('');

  async function handleSalvar() {
    if (!nome || !cpf || !saldo) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await api.post('clientes', {
        nome: nome,
        cpf: cpf,
        saldo: parseFloat(saldo) || 0 
      });

      Alert.alert('Sucesso', response.data.message || 'Cliente salvo!');
      navigation.navigate('ListarClientes' as never);

    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Deu erro ao salvar!";
      Alert.alert("Erro", errorMessage);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Cadastro de Clientes
      </Text>

      <View style={styles.bloco}>
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
      
      <TouchableOpacity style={styles.btn} onPress={handleSalvar}>
        <Text style={styles.txtBtn}> Salvar Cliente </Text>
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
  btn: {
    backgroundColor: '#669988',
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