import * as React from 'react';
import { Text, View } from 'react-native';
import { GlobalStyle } from '../../style/GlobalStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../API/firebase';
import {ProgressBar} from 'react-native-paper';
import * as Permissions from 'expo-permissions'

import * as Updates from 'expo-updates';

import ButtonGlobal from '../../components/ButtonGlobal';
import Slider from '../../components/Slider';


export default function Splash({ navigation }) {
	const [ loading, setLoading ] = React.useState(false);

	React.useEffect(() => {
		checkUpdate();
		setLoading(true);
		const unsub = auth.onAuthStateChanged((user) => {
			if (user) {
				navigation.replace('HomeTabs');
			} else {
				setLoading(false);
				console.log('no user');
			}
		});

		return () => {
			setLoading(false);

			unsub();
		};
	}, []);

	const checkUpdate = async () => {
		try {
			const update = await Updates.checkForUpdateAsync();
			if (update.isAvailable) {
				setLoading(true);
				await Updates.fetchUpdateAsync().then(() => setLoading(false));

				await Updates.reloadAsync();
			}
		} catch (e) {
			// handle or log error
		}
	};


	return (
		<SafeAreaView style={GlobalStyle.container}>
			<View style={{ flex: 5 }}>
				<ProgressBar indeterminate={true} visible={loading}  />
				
			<Text style={GlobalStyle.splashHeadTitle}> Maxwin </Text>
				<Slider />
			</View>

			<ButtonGlobal title="Se connecter" click={()=> navigation.replace('SignIn')}/>
			
		</SafeAreaView>
	);
}
