import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Button} from 'react-native'

{
	/* import pages */
}
import Dasboard from '../pages/home/dashBoard';
{
	/* Product*/
}
import ProductDetails from '../pages/home/product/ProductDetails';
import AddProduct from '../pages/home/product/AddProduct';
import AddProductCat from '../pages/home/product/AddProductCat';

{
	/* Filtre */
}
import Filtre from '../pages/home/filtre/Filtre';
import FilterCat from '../pages/home/filtre/FilterCat';
import Results from '../Results';
{
	/* pages */
}
import Messages from '../pages/messages';
import Img from '../pages/home/product/ImagesBrowser';
import Header from '../components/Header';

export default function DashStack() {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator initialRouteName="Dasboard">
			<Stack.Screen name="Dasboard" component={Dasboard} options={{ headerShown: false }} />

			<Stack.Screen
				name="ProductDetails"
				component={ProductDetails}
				options={{
					title: 'Details',
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: '#4898D3'
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: '500'
					}
				}}
			/>

			<Stack.Screen
				name="AddProductCat"
				component={AddProductCat}
				options={{
					title: 'Choisissez votre catégorie',
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: '#4898D3'
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: '500'
					}
				}}
			/>

			<Stack.Screen
				name="AddProduct"
				component={AddProduct}
				options={{
					title: 'Ajouter votre Produit',
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: '#4898D3'
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: '500'
					}
				}}
			/>
			<Stack.Screen
				name="Filtre"
				component={Filtre}
				options={{
					title: 'Filtre',
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: '#4898D3'
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: '500'
					}
				}}
			/>

			<Stack.Screen
				name="FilterCat"
				component={FilterCat}
				options={{
					title: 'choisissez votre catégorie',
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: '#4898D3'
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: '500'
					}
				}}
			/>

			<Stack.Screen
				name="Messages"
				component={Messages}
				options={{
					title: 'Messages',
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: '#4898D3'
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: '500'
					}
				}}
			/>
			<Stack.Screen name="image"
				component={Img}
				options={{
					title: 'Images',
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: '#4898D3'
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: '500'
					}
				}}
			/>
			<Stack.Screen name="results"
				component={Results}
				options={{
					headerStyle: {
						backgroundColor: '#4898D3'
					},
					headerTitle: () => (
					<Header />
					),
				}}
			/>

		</Stack.Navigator>
	);
}
