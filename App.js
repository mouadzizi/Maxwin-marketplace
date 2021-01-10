import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AuthenticationStack from './src/navigation/AuthenticationStack';


export default function App() {
	const [isloading, setisloading] = useState(true);

	useEffect(() => {
		//BackHandler.exitApp();
		setTimeout(() => {
			setisloading(false);
		}, 1000)

	}, []);




	if (isloading) {
		return (
			<View style={{ alignContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size='small' color="#F16E44" />
			</View>
		);
	}

	return (
		<AuthenticationStack />
	);
}
