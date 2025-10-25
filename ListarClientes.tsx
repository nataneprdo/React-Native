import { View, StyleSheet, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import Cliente, { propCliente } from '../componentes/Cliente'; 
import api from '../componentes/Api';

import { useNavigation } from '@react-navigation/native';

export default function ListarClientes() {
  
  const [clientes, setClientes] = useState<propCliente[]>([]);
  const navigation = useNavigation();

  async function buscarClientes() {
    try {
      const response = await api.get('clientes');
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  }

  async function excluir(id:number){
    try{
      const r = await api.delete(`clientes/${id}`); 
      Alert.alert("Sucesso", "Cliente excluído."); 
      buscarClientes(); 
    } catch(e:any) {
      Alert.alert("Erro ao Excluir", e?.message ?? "Erro desconhecido");
    }
  }

  function editar(item: propCliente) {
    navigation.navigate('TelaEditCliente' as never, { cliente: item } as never);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      buscarClientes();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      
      <View style={styles.bloco}>
        <TouchableOpacity style={styles.btn}
          onPress={() => navigation.navigate('TelaCadCliente' as never)}>
          <Text style={styles.txtBtn}>Cadastrar Novo Cliente</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo}>Listagem de clientes</Text>
      
      <FlatList
        style={styles.lista} 
        data={clientes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Cliente
            nome={item.nome}
            cpf={item.cpf}
            saldo={item.saldo}
            id={item.id}
        t   onEditar={() => editar(item)}
            onExcluir={() => excluir(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20, 
  },
  bloco: {
    width: '100%'
  },
  btn: {
    backgroundColor: '#669988',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 20,
    padding: 10, 
    borderRadius: 20,
  },
  txtBtn: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff', 
  },
  lista: {
    width: '90%', 
  }
});