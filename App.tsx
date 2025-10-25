import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './telas/Home';
import ListarClientes from './telas/ListarClientes';
import TelaCadClientes from './telas/TelaCadCliente';
import TelaEditCliente from './telas/TelaEditCliente';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ListarClientes" component={ListarClientes} />
        <Stack.Screen name="TelaCadCliente" component={TelaCadClientes} />
        <Stack.Screen name="TelaEditCliente" component={TelaEditCliente} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}