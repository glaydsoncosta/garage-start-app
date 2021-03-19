import React from 'react'
import { Container, StatusBar } from './src/styles'
import { Provider } from 'react-redux'
import { store } from './src/store'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import Garage from './src/screens/Garage';
import CarDetails from './src/screens/CarDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }} >
          <Stack.Screen name="Garage" component={Garage} />
          <Stack.Screen name="CarDetails" component={CarDetails} />
        </Stack.Navigator>       
      </NavigationContainer>
    </Provider>
  )
}
