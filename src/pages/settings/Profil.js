import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, ScrollView, SafeAreaView, View, TouchableOpacity, InteractionManager, Alert } from 'react-native';
import { Avatar, Divider, FAB, TextInput, ProgressBar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { GlobalStyle, textTheme } from '../../style/GlobalStyle';
import { MaterialCommunityIcons, FontAwesome } from 'react-native-vector-icons';
import { auth, db,st } from '../../API/firebase';

export default function Profil() {
	
	const [ edit, setEdit ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const [ canRender, setCanRender ] = useState(false);
	const [ user, setUser ] = useState({
		email: '',
		accountType: false
	});

	const [ name, setName ] = useState('');
	const [ phone, setPhone ] = useState('');
	const [ location, setLocation ] = useState('');
	const [ image, setImage ] = useState('');
	const {currentUser}= auth

	useFocusEffect(
		useCallback(() => {
			InteractionManager.runAfterInteractions(async () => {
				var userRef = await db.collection('users').doc(currentUser.uid).get();
				setLoading(true);
				if (!edit) {
					await loadInfo(userRef.data()).then(() => {
						setLoading(false);
						setCanRender(true);
					});
				}
			});
		}, [])
	);

	const updateProfile = async () => {
		setEdit(!edit);
		if (edit) {
			setLoading(true);
			name || phone || image || location  
				? await db
						.collection('users')
						.doc(currentUser.uid)
						.update({
							name,
							phone,
							location,
							avatar:auth.currentUser.photoURL
						})
						.then(() => {
							setEdit(!edit);
							setLoading(false);
						})
						.catch((e) => console.log(e.message))
				: setLoading(false);
		}
	};

	const loadInfo = async (doc) => {
		setName(doc.name);
		setPhone(doc.phone);
		setLocation(doc.location);
		setUser({
			email: doc.email,
			accountType: doc.accountType
		});
	};

	async function updateProfileImage(uri) {
		setLoading(true)
		const response = await fetch(uri);
		const blob = await response.blob();
		 await st.ref().child('users/'+currentUser.uid+'/images/profile').put(blob).then(snap=>{
				snap.ref.getDownloadURL().then(async(link)=>{
					await currentUser.updateProfile({
						photoURL:link
					})
					setLoading(false)
				})
		})
	}

	async function openImagePicker() {
		if(edit){
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1],
				quality: .3,
				allowsMultipleSelection:true
				
			  });
		  		  
			  if (!result.cancelled) {
				setImage(result.uri);
			  }
			  updateProfileImage(result.uri)
		}
		else alert('Clicker sur modifier pour changer la photo')
	}
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>
		
			{canRender ? (
				<ScrollView showsVerticalScrollIndicator={false}>

					<View style={{ flex: 1, flexDirection: 'row' }}>

						<View
							style={{
								flex: 1,
								justifyContent: 'center',
								alignSelf: 'center',
								marginTop: 15,
								marginBottom: 15,
								alignItems: 'center'
							}}
						>	
						<View> 
							<TouchableOpacity
							delayPressIn={0}
							onPress={()=> openImagePicker() }>
								<Avatar.Image size={110} source={{ uri: image? image:currentUser.photoURL}} />
							</TouchableOpacity>
							<MaterialCommunityIcons
								name='camera-plus-outline'
								color='#fff'
								size={20}
								style={{ position: 'absolute', bottom: 15, right: 20 }}
								/>
							</View>
							
						</View>

						<View
							style={{
								flex: 1,
								justifyContent: 'center',
								alignSelf: 'center',
								marginTop: 15,
								marginBottom: 15
							}}
						>
							<Text style={GlobalStyle.usernameProfil}>{name}</Text>

							{user.accountType ? (
								<View style={{ flexDirection: 'row', alignSelf: 'center' }}>
									<MaterialCommunityIcons name="store" size={25} color="#F16E44" />
									<Text
										style={{
											fontWeight: 'bold',
											color: '#F16E44',
											textAlign: 'center',
											marginLeft: 5
										}}
									>
										Professionel
									</Text>
								</View>
							) : (
								<View style={{ flexDirection: 'row', alignSelf: 'center' }}>
									<FontAwesome name="user-o" color="#F16E44" size={20} />
									<Text
										style={{
											fontWeight: 'bold',
											color: '#F16E44',
											textAlign: 'center',
											marginLeft: 5
										}}
									>
										Particulier
									</Text>
								</View>
							)}
							
						</View>
						 
					</View>

					<Divider />

					<Divider />

					<View style={{ flex: 1, marginTop: 15, marginBottom: 15, marginStart: 15 }}>
						<TextInput
							theme={textTheme}
							mode="outlined"
							value={name}
							label="Nom d'utilisateur"
							maxLength={15}
							onChangeText={(e) => setName(e)}
							editable={edit}
							style={{ height: 50, width: '95%' }}
							left={
								<TextInput.Icon
									style={{ marginTop: '50%', marginRight: '50%' }}
									name="account-badge-horizontal"
									color="#4898D3"
									size={25}
								/>
							}
						/>
						<Divider style={{ marginVertical: 10 }} />
						<TextInput
							theme={textTheme}
							mode="outlined"
							value={phone}
							label="Téléphone"
							keyboardType="numeric"
							placeholder="(+212)6 123 456 78"
							maxLength={12}
							multiline={false}
							onChangeText={(e) => setPhone(e)}
							editable={edit}
							style={{ height: 50, width: '95%' }}
							left={
								<TextInput.Icon
									style={{ marginTop: '50%', marginRight: '50%' }}
									name="cellphone"
									color="#4898D3"
									size={25}
								/>
							}
						/>

						<Divider style={{ marginVertical: 10 }} />
						<TextInput
							theme={textTheme}
							mode="outlined"
							value={location}
							label="Adresse"
							maxLength={25}
							multiline={false}
							onChangeText={(e) => setLocation(e)}
							editable={edit}
							style={{ height: 50, width: '95%' }}
							left={
								<TextInput.Icon
									style={{ marginTop: '50%', marginRight: '50%' }}
									size={25}
									name="city-variant"
									color="#4898D3"
								/>
							}
						/>

						<Divider style={{ marginVertical: 10 }} />

						<TextInput
							theme={textTheme}
							mode="outlined"
							value={user.email}
							label="Email"
							keyboardType="email-address"
							editable={false}
							style={{ height: 50, width: '95%' }}
							left={
								<TextInput.Icon
									style={{ marginTop: '50%', marginRight: '50%' }}
									size={25}
									name="email-check-outline"
									color="#4898D3"
								/>
							}
						/>

						<Divider style={{ marginVertical: 10 }} />

						<Text
						style={{fontSize: 12, color: '#c2c2c2', textAlign: 'center'}}>user ID : {currentUser.uid}</Text>

	
					</View>
				</ScrollView>
			) : (
				<ProgressBar color="#4898D3" indeterminate={true} visible={true} />
			)}
			<FAB
				loading={loading}
				style={{ position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: '#4898D3' }}
				label={(edit) ? 'enregistrer' : 'modifier'}
				color="#fff"
				onPress={() => updateProfile()}
			/>
		</SafeAreaView>
	);
}
