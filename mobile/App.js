import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from './Components/WelcomePage';
import Signup from './Components/Signup';
import Login from './Components/LoginComponent';
import { BudgetCard } from './Components/BudgetCard';
import RenderingCard from './Components/RenderingCard';
import { AuthProvider } from "./Provider/AuthContext";



const Stack = createStackNavigator();

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={WelcomePage} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={Signup} />
          <Stack.Screen name="BudgetCard" component={BudgetCard} />
          <Stack.Screen name="RenderingCard" component={RenderingCard} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
