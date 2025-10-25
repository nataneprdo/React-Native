import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

interface propCliente {
  id: number,
  nome: string,
  cpf: string,
  saldo: number,
  onEditar?:()=>void
  onExcluir?:()=>void
}

export default function Cliente({ id, nome, cpf, saldo, onEditar, onExcluir}: propCliente) {
  return (
    <View style={styles.card}>
      <Text style={styles.texto}>Cod.: {id}</Text>
      <Text style={styles.texto}>Nome.: {nome}</Text>
      <Text style={styles.texto}>CPF.: {cpf}</Text>
      <Text style={styles.texto}>Saldo.: {saldo}</Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.btnEditar} onPress={onEditar}>
          <Text style={styles.txtBtn}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnExcluir}onPress={onExcluir}>
          <Text style={styles.txtBtn}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  texto: {
    fontSize: 20,
    margin: 5,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  btnExcluir: { 
    flex: 1,
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  btnEditar: { 
    flex: 1,
    backgroundColor: '#007bff', 
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  txtBtn: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },
});