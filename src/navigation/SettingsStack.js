import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

{/* import pages */}
import Settings from '../pages/settings/Settings';
import Profil from '../pages/settings/Profil';
import Items from '../pages/settings/Items';
import EditProduct from '../pages/home/product/EditProductPage';
import Notifications from '../pages/settings/notofications';

export default function ProfilStack(){
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator  initialRouteName='Settings'>
        <Stack.Screen name="Settings" 
          component={Settings}
          options={{ 
          title: 'Paramètres', headerTitleAlign: 'center', 
          headerStyle: {
            backgroundColor: '#4898D3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
          },}}/>

          <Stack.Screen name="Profil" 
          component={Profil}
          options={{ 
          title: 'Mon Profil', headerTitleAlign: 'center', 
          headerStyle: {
            backgroundColor: '#4898D3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
          },}}/>
          
          <Stack.Screen 
          name="Items" 
          component={Items}
          options={{ 
          title: 'Mes produits', 
          headerTitleAlign: 'center', 
          headerStyle: {
            backgroundColor: '#4898D3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
          },}}/>

        <Stack.Screen 
          name="Notifications" 
          component={Notifications}
          options={{ 
          title: 'Notofications', headerTitleAlign: 'center', 
          headerStyle: {
            backgroundColor: '#4898D3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
          },}}/>

        <Stack.Screen 
          name="EditProduct" 
          component={EditProduct}
          options={{ 
          title: 'Modifier le produit', headerTitleAlign: 'center', 
          headerStyle: {
            backgroundColor: '#4898D3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
          },}}/>
        </Stack.Navigator>
    );
}
