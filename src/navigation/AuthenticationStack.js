import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

{/* import pages */}
import Splash from '../pages/authentication/Splash';
import SignIn from '../pages/authentication/SignIn';
import SignUp from '../pages/authentication/SignUp';
import Privacy from '../pages/authentication/Privacy';
import HomeTabs from './HomeTabs';

{/* Stack navigation */}
export default function AuthenticationStack() {
    
const Stack = createStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator  initialRouteName='Splash'>
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
          <Stack.Screen name="register" component={SignUp} options={{ headerShown: false }}/>
          <Stack.Screen name="Privacy" component={Privacy}
          options={{
					title: 'Politiques confidentialité',
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: '#4898D3'
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: '500'
					}
				}}/>
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }}/>

        </Stack.Navigator>
      </NavigationContainer>
    );
  }