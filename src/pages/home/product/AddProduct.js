import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
	View,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	Text,
	Picker,
	Image,
	FlatList,
	Dimensions,
	InteractionManager,
	Alert
} from 'react-native';

import { TextInput, Checkbox, Button } from 'react-native-paper';
import { textTheme } from '../../../style/GlobalStyle';
import { MaterialIcons, MaterialCommunityIcons } from 'react-native-vector-icons';
import * as Animated from 'react-native-animatable'
import { addProduct } from './APIFunctions';
import { auth, db, st } from '../../../API/firebase';
import AsyncStorage from '@react-native-community/async-storage';

export default function AddProduct({ route, navigation }) {

	
	//Variables for inputs for standar product
	const [title, setTitle] = useState('');
	const [city, setCity] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');

	//Variables for inputs for Voiture
	const [marqueVoiture, setMarqueVoiture] = useState('');
	const [kilometrage, setKilometrage] = useState('');
	const [carburant, setCarburant] = useState('');
	const [fabrication, setFabrication] = useState('');
	const [puissance, setPuissance] = useState('');
	const [transtaction, setTransaction] = useState('');
	//TOBE ADD
	const [dedouan, setDedouan] = useState('');
	const [garantierVoiture, setGarantierVoiture] = useState('');
	const [modeleVoiture, setModeleVoiture] = useState('');
	//ADITIONAL INFO
	const [ voitureChips, setVoitureChips ] = useState(false);
	//Variables for equipments
	const [jantes, setJanets] = useState(false);
	const [airbags, setAirbags] = useState(false);
	const [clima, setClima] = useState(false);
	const [abs, setAbs] = useState(false);
	const [vitre, setVitre] = useState(false);
	const [radar, setRadar] = useState(false);
	const [gps, setGps] = useState(false);
	const [premierMain, setPremierMain] = useState(false);
	const [centraliser, setCentraliser] = useState(false);
	const [salon, setSalon] = useState(false);
	
	//TOBE ADD as equipments
	const [toitOuvrant, setToitOuvrant] = useState(false);
	const [cameraRecule, setCameraRecule] = useState(false);
	const [ordinateur, setOrdinateur] = useState(false);
	const [alarmeVoiture, setAlarmeVoiture] = useState(false);


	//Variables for inputs for Location
	const [piece, setPiece] = useState(0);
	const [superficie, setSuperficie] = useState(0);
	//TOBE ADD as equipments
	const [ascensseur, setAscensseur] = useState(false);
	const [balcon, setBalcon] = useState(false);
	const [terrase, setTerrase] = useState(false);
	const [meuble, setMeuble] = useState(false);

	//Variables for inputs for Services
	const [servicetype, setServiceType] = useState('');


	//Variables for inputs for Phone
	const [phoneMarque, setPhoneMarque] = useState('');
	//Variables for inputs for PC
	const [laptopMarque, setLaptopMarque] = useState('');
	//TOBE ADD for PC, Tabllete & phone
	const [ram, setRam] = useState('');
	const [rom, setRom] = useState('');
	const [batterie, setBatterie] = useState('');
	const [processeur, setProcesseur] = useState('');
	const [cameraphone, setCameraPhone] = useState('');
	const [ecrant, setEcrant] = useState('');
	const [graphique, setGraphique] = useState('');

	//Visibility for State
	const [etat, setEtat] = useState('');

	//Variables chips fro aditional services
	const [ phone, setPhone ] = useState(false);
	const [ laivraison, setLaivraison ] = useState(false);
	const [ paiement, setPaiement ] = useState(false);
	const [ negociable, setNegociable ] = useState(false);
	const [ bonCondition, setBonCondition ] = useState(false);

	//components Visibility
	const [chips, setChips] = useState(true);
	const [etatVisible, setEtatVisible] = useState(true);

	//Category Visibility
	const [ voiture, setVoiture ] = useState(false);
	const [ Location, setLocation ] = useState(false);
	const [ terrain, setTerrain ] = useState(false);
	const [ services, setServices ] = useState(false);
	const [ Telephone, setTelephone ] = useState(false);
	
	//Condition Rendering
	const [ canRender, setCanRender ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	//Dimensions
	const { width, height } = Dimensions.get('window');

	const height_image = height * 0.15;
	const width_image = width * 0.21;

	//Get pictures once the screen focused

	const [images, setImages] = useState([]);
	const [user, setUser] = useState(null);

	useFocusEffect(
		React.useCallback(() => {
			console.log(route.params.parent);
			InteractionManager.runAfterInteractions(async () => {
				await getPhotos().then((obj) => {
					let imgs = JSON.parse(obj);
					setImages(imgs);
				});
				await getUser().then((u) => {
					setUser(u);
					setCanRender(true);
				});
				console.log(images);
			});
			return () => {
				AsyncStorage.clear();
				setImages([]);
			};
		}, [])
	);

	const getPhotos = async () => {
		return await AsyncStorage.getItem('images');
	};
	const getUser = async () => {
		let aUser = null;
		await db.collection('users').doc(auth.currentUser.uid).get().then((snap) => {
			aUser = snap.data();
		});
		return aUser;
	};
	useEffect(() => {
		const { parent } = route.params;
		switch (true) {
			case parent.title == 'VEHICULES' && (parent.item == 'Voitures' || parent.item == 'Location de Voiture'):
				setVoitureChips(true);
				setVoiture(true);
				setChips(false);
				navigation.setOptions({ title: 'Vehicule' });
				break;

			case parent.title == 'VEHICULES':
				navigation.setOptions({ title: 'Véhicule' });
				setChips(false);
				setVoitureChips(true);
				break;

			case parent.title == 'INFORMATIQUE ET ELECTRONIQUE' &&
				(parent.item == 'Téléphones' || parent.item == 'Tablettes'):
				setTelephone(true);
				
				navigation.setOptions({ title: 'Électronique' });
				break;

			case parent.title == 'IMMOBILIER' &&
				(parent.item == 'Terrains'):
				setChips(false);
				setEtatVisible(false);
				setTerrain(true);
				navigation.setOptions({ title: 'Terrains' });
				break;

			case parent.title == 'IMMOBILIER':
				setChips(false);
				setEtatVisible(false);
				setLocation(true);
				setVoitureChips(true);
				navigation.setOptions({ title: 'Immobilier' });
				break;


			case parent.item == 'Matériels professionnels':
				navigation.setOptions({ title: 'Matériels professionnels' });
				break;

			case parent.item == 'Services et travaux professionnels':
				setChips(false);
				setEtatVisible(false);
				setServices(true);
				navigation.setOptions({ title: 'Services et travaux' });
				break;

			case parent.item == 'Formations & autres':
				setChips(false);
				setEtatVisible(false);
				navigation.setOptions({ title: 'Formations & autres' });
				break;

			default:
				break;
		}
		return () => { };
	}, []);

	const upload = () => {
		setLoading(true);
		var item = {
			//ALL Product
			title,
			city,
			price,
			etat,
			description,
			//Car Product
			dedouan,
			garantierVoiture,
			marqueVoiture,
			modeleVoiture,
			kilometrage,
			carburant,
			fabrication,
			puissance,
			transtaction,
			carSpecefications: {
				gps,
				radar,
				vitre,
				abs,
				clima,
				airbags,
				jantes,
				salon,
				premierMain,
				centraliser,
				toitOuvrant,
				cameraRecule,
				ordinateur,
				alarmeVoiture
			},
			//Phone Product
			phoneMarque,
			//laptop Product
			laptopMarque,
			mediaSpecefications: {
				ram,
				rom,
				processeur,
				cameraphone,
				batterie,
				ecrant,
				graphique
			},

			//Immobilier Product
			piece,
			superficie,
			ImmobilierSpecefications: {
				ascensseur,
				balcon,
				terrase,
				meuble
			},
			//Service Product
			servicetype,

			//Chips for services
			phone,
			laivraison,
			paiement,
			negociable,
			bonCondition,
			Telephone,
			addDate:new Date(),
			category: route.params.parent,
			user: {
				_id: user.uid,
				phoneNumber: user.phone,
				accountType: user.accountType,
				name: user.name,
				avatar:auth.currentUser.photoURL,
				expoPushNotif:user.expoPushNotif,
			}
		};

		if (images==null) {
			Alert.alert('Information:','Enter at least one images');
			setLoading(false)
			return;
		} else {
			uploadPics(images).then((imagesUrls) => {
				addProduct(item, imagesUrls).then(() => {
					setLoading(false);
					navigation.navigate('Dasboard');
				});
			});
		}
	};

	const uploadPics = async (pics) => {
		let urls = [];
		for (let p of pics) {
			const response = await fetch(p.uri);
			const blob = await response.blob();
			var ref = st.ref().child('images/' + auth.currentUser.uid + '/' + p.name);
			await ref.put(blob).then(async (snapShoot) => {
				await snapShoot.ref.getDownloadURL().then((link) => {
					urls.push(link);
				});
			});
		}

		return urls;
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			{canRender ? (
				<ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
					{images ? (
						<View >
							<FlatList
								showsHorizontalScrollIndicator
								horizontal
								style={{
									padding: 3,
									flexGrow: 0,
									borderBottomWidth: 1
								}}
								data={images}
								keyExtractor={(item)=>item.id}
								renderItem={({ item, index }) =>
									<Animated.View  animation='bounceIn' duration={1000} style={{ flex: 1, margin: 10 }}>
										<TouchableOpacity   activeOpacity={.6} delayPressIn={1} onPress={() => navigation.navigate('image')} >
											<Image  
												source={{ uri: item.uri }}
												style={{
													width: 200, height: 250, borderRadius: 16,
												}}
												resizeMode={'cover'}
											/>
										</TouchableOpacity>

										<View  style={{
											alignItems: 'center', letterSpacing: 3,
											justifyContent: 'center',
											position: 'absolute', right: 4,
											borderRadius: 50,
											backgroundColor: '#2980b9',
											width: 30,
											height: 30,
											opacity: .8,
										}} >

											<Text key={index} style={{ fontSize: 20, color: '#fff', marginLeft: 3 }}
											> {index + 1}  </Text>

										</View>
										<MaterialCommunityIcons 
											name='camera-plus-outline'
											color='#ecf0f1'
											size={30}
											style={{ position: 'absolute', bottom: 2, right: 5 }}
										/>
									</Animated.View>
								}

							/>
						</View>
					) : (
							<View>

								<View style={{ flexDirection: 'row' }}>
									<TouchableOpacity onPress={() => navigation.navigate('image')} delayPressIn={0}>
										<MaterialIcons name="add-a-photo" color="#444" size={100} />
									</TouchableOpacity>
								</View>

								<Text style={{ color: 'red', fontSize: 11 }}>Obligatoir *</Text>
								<Text style={{ color: '#4898D3', fontSize: 11 }}>
									Une bonne annonce commence par une bonne photo.
							</Text>
							</View>
						)}



					<View style={{ flex: 1, marginTop: 20 }}>

					<Text style={{ color: 'red', fontSize: 11}}>Obligatoir *</Text>
						<TextInput
							label="Titre de votre Produit"
							mode="outlined"
							maxLength={25}
							multiline={false}
							theme={textTheme}
							onChangeText={setTitle}
						/>
						<Text style={{ color: '#4898D3', fontSize: 11 }}>
							Merci d’entrer le Nom exacte de votre article
						</Text>
						



						<Text style={{ color: 'red', fontSize: 11, marginTop: 10, marginBottom: 5 }}>Obligatoir *</Text>
						<View style={{ borderWidth: 1, borderColor: '#444', borderRadius: 4 }}>
							<Picker
								selectedValue={city}
								style={{ height: 50, width: '100%' }}
								onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
							>
								<Picker.Item label="Choisissez une ville" value="" />
								<Picker.Item label="Agadir" value="Agadir" />
								<Picker.Item label="Al Hoceima" value="Al hoceima" />
								<Picker.Item label="Asilah" value="Asilah" />
								<Picker.Item label="Azrou" value="Azrou" />
								<Picker.Item label="Ben Guerir" value="Ben Guerir" />
								<Picker.Item label="Ben Slimane" value="Ben Slimane" />
								<Picker.Item label="Beni mellal" value="Beni mellal" />
								<Picker.Item label="Berkane" value="Berkane" />
								<Picker.Item label="Berrechid" value="Berrechid" />
								<Picker.Item label="Boujdour" value="Boujdour" />
								<Picker.Item label="Boulemane" value="Boulemane" />
								<Picker.Item label="Bouznika" value="Bouznika" />
								<Picker.Item label="Casablanca" value="Casablanca" />
								<Picker.Item label="chefchaouen" value="chefchaouen" />
								<Picker.Item label="Dakhla" value="Dakhla" />
								<Picker.Item label="El Hajeb" value="El Hajeb" />
								<Picker.Item label="El Jedida" value="El jedida" />
								<Picker.Item label="Errachidia" value="Errachidia" />
								<Picker.Item label="Essaouira" value="Essaouira" />
								<Picker.Item label="Essemara" value="Essemara" />
								<Picker.Item label="Fes" value="Fes" />
								<Picker.Item label="Figuig" value="Figuig" />
								<Picker.Item label="Guercif" value="Guercif" />
								<Picker.Item label="Ifrane" value="Ifrane" />
								<Picker.Item label="Kenitra" value="Kenitra" />
								<Picker.Item label="Khoribga" value="Khoribga" />
								<Picker.Item label="Ksar kebir" value="Ksar kebir" />
								<Picker.Item label="Khenifra" value="Khenifra" />
								<Picker.Item label="Larache" value="Larache" />
								<Picker.Item label="Laâyoune" value="Laâyoune" />
								<Picker.Item label="Marrakech" value="Marrakech" />
								<Picker.Item label="Meknes" value="Meknes" />
								<Picker.Item label="Mohammedia" value="Mohammedia" />
								<Picker.Item label="Nador" value="Nador" />
								<Picker.Item label="Ouad Zem" value="Ouad Zem" />
								<Picker.Item label="Ouarzzazate" value="Ouarzzazate" />
								<Picker.Item label="Ouazzane" value="Ouazzane" />
								<Picker.Item label="Oujda" value="Oujda" />
								<Picker.Item label="Rabat" value="Rabat" />
								<Picker.Item label="Safi" value="Safi" />
								<Picker.Item label="Sale" value="Sale" />
								<Picker.Item label="Safrou" value="Safrou" />
								<Picker.Item label="Settat" value="Settat" />
								<Picker.Item label="Tanger" value="Tanger" />
								<Picker.Item label="Tan-Tan" value="Tan-Tan" />
								<Picker.Item label="Taza" value="Taza" />
								<Picker.Item label="Taounate" value="Taounate" />
								<Picker.Item label="Tétouan" value="Tétouan" />
								<Picker.Item label="Temara-Sekhirate" value="Temara-Sekhirate" />
								<Picker.Item label="Youssoufia" value="Youssoufia" />
								<Picker.Item label="Zagora" value="Zagora" />
							</Picker>
						</View>


						<Text style={{ color: 'red', fontSize: 11, marginTop: 10 }}>Obligatoir *</Text>
						<TextInput
							label="Prix"
							mode="outlined"
							maxLength={7}
							multiline={false}
							placeholder="DHS"
							theme={textTheme}
							onChangeText={(e)=>setPrice(parseFloat(e))}
							keyboardType="number-pad"
						/>

						{etatVisible ? (
							<View>
								<Text style={{ color: '#4898D3', marginTop: 5 }}>Etat</Text>

								<View style={{ borderWidth: 1, borderColor: '#444', borderRadius: 4, marginTop: 5 }}>
									<Picker
										selectedValue={etat}
										prompt="Etat"
										style={{ height: 50, width: '100%' }}
										onValueChange={(itemValue, itemIndex) => setEtat(itemValue)}
									>
										<Picker.Item label="Choissisez votre Etat" value="" />
										<Picker.Item label="Neuf" value="Neuf" />
										<Picker.Item label="Utilisé" value="Utilisé" />
									</Picker>
								</View>
							</View>
						) : null}

						{Telephone ? (
							<View>
								<Text style={{ color: '#4898D3', marginTop: 5 }}>Marque</Text>

								<View
									style={{ borderWidth: 1, borderColor: '#8C8C8C', borderRadius: 4 }}
								>
									<Picker
										selectedValue={phoneMarque}
										prompt="Marque"
										style={{ height: 50, width: '100%' }}
										onValueChange={(itemValue, itemIndex) => setPhoneMarque(itemValue)}
									>
										<Picker.Item label="Choissisez une marque" value="*" />
										
										<Picker.Item label="SAMSUNG " value="SAMSUNG " />
										<Picker.Item label="IPHONE" value="IPHONE" />
										<Picker.Item label="Xiaomi" value="Xiaomi" />
										<Picker.Item label="OPPO" value="OPPO" />
										<Picker.Item label="HUAWEI" value="HUAWEI" />
										<Picker.Item label="SONY" value="SONY" />
										<Picker.Item label="NOKIA" value="NOKIA" />
										<Picker.Item label="Asus" value="Asus" />
										<Picker.Item label="Autre" value="Autre" />
									</Picker>
								</View>
							</View>
						) : null}

						{voiture ? (
							<View>

								<Text style={{ color: '#4898D3', marginTop: 10 }}>Marque</Text>

								<View style={{ borderWidth: 1, borderColor: '#8C8C8C', borderRadius: 4 }}>
									<Picker
										selectedValue={marqueVoiture}
										prompt="Marque"
										style={{ height: 50, width: '100%' }}
										onValueChange={(itemValue, itemIndex) => setMarqueVoiture(itemValue)}
									>
										<Picker.Item label="Choisissez une marque" value="*" />
										<Picker.Item label="AUDI" value="AUDI" />
										<Picker.Item label="BMW" value="BMW" />
										<Picker.Item label="CHEVROLET" value="CHEVROLET" />
										<Picker.Item label="CITROEN" value="CITROEN" />
										<Picker.Item label="DACIA" value="DACIA" />
										<Picker.Item label="FIAT" value="FIAT" />
										<Picker.Item label="FORD" value="FORD" />
										<Picker.Item label="HYUNDAI" value="HYUNDAI" />
										<Picker.Item label="INFINITI" value="INFINITI" />
										<Picker.Item label="JAGUAR" value="JAGUAR" />
										<Picker.Item label="KIA " value="KIA" />
										<Picker.Item label="LANDROVER" value="LANDROVER" />
										<Picker.Item label="MASERATI" value="MASERATI" />
										<Picker.Item label="MAZDA" value="MAZDA" />
										<Picker.Item label="MERCEDES" value="MERCEDES" />
										<Picker.Item label="MINI" value="MINI" />
										<Picker.Item label="MITSUBISHI" value="MITSUBISHI" />
										<Picker.Item label="NISSAN" value="NISSAN" />
										<Picker.Item label="OPEL" value="OPEL" />
										<Picker.Item label="PEUGEOT" value="PEUGEOT" />
										<Picker.Item label="PORSCHE" value="PORSCHE" />
										<Picker.Item label="RENAULT" value="RENAULT" />
										<Picker.Item label="ROVER" value="ROVER" />
										<Picker.Item label="SEAT" value="SEAT" />
										<Picker.Item label="SKODA" value="SKODA" />
										<Picker.Item label="SUZUKI" value="SUZUKI" />
										<Picker.Item label="TOYOTA" value="TOYOTA" />
										<Picker.Item label="VOLSWAGEN" value="VOLSWAGEN" />
										<Picker.Item label="VOLVO" value="VOLVO" />
										<Picker.Item label="AUTRE" value="AUTRE" />
									</Picker>
								</View>


								<TextInput
									onChangeText={(e)=>setKilometrage(parseFloat(e))}
									label="Kilometrage"
									mode="outlined"
									maxLength={7}
									placeholder="12.000 Km"
									keyboardType="numeric"
									theme={textTheme}
									style={{ marginTop: 10 }}
								/>

								<TextInput
									onChangeText={(e)=>setFabrication(parseInt(e))}
									label="Année de fabrication"
									mode="outlined"
									maxLength={4}
									placeholder="exemple: 2005"
									keyboardType="numeric"
									theme={textTheme}
									style={{ marginTop: 10 }}
								/>

								<Text style={{ color: '#4898D3', marginTop: 5 }}>Carburant</Text>
								<View style={{ borderWidth: 1, borderColor: '#8C8C8C', borderRadius: 4, marginTop: 5 }}>
									<Picker
										selectedValue={carburant}
										style={{ height: 50, width: '100%' }}
										prompt="Carburant"
										onValueChange={(itemValue, itemIndex) => setCarburant(itemValue)}
									>	
										<Picker.Item label="Choisissez le Carburant" value="*" />
										<Picker.Item label="Diesel " value="Diesel" />
										<Picker.Item label="Essence" value="Essence" />
										<Picker.Item label="Hybrid" value="Hybrid" />
										<Picker.Item label="Electrique" value="Electrique" />
									</Picker>
								</View>

								<Text style={{ color: '#4898D3', marginTop: 5 }}>Puissance fiscale</Text>
								<View style={{ borderWidth: 1, borderColor: '#444', borderRadius: 4, marginTop: 5 }}>
									<Picker
										selectedValue={puissance}
										prompt="Puissance Fiscale"
										style={{ height: 50, width: '100%' }}
										onValueChange={(itemValue, itemIndex) => setPuissance(itemValue)}
									>
									
										<Picker.Item label="Choisissez la puissance" value="*" />
										<Picker.Item label="4CH" value="4" />
										<Picker.Item label="5CH" value="5" />
										<Picker.Item label="6CH" value="6" />
										<Picker.Item label="7CH" value="7" />
										<Picker.Item label="8CH" value="8" />
										<Picker.Item label="9CH" value="9" />
										<Picker.Item label="10CH" value="10" />
										<Picker.Item label="Plus que 10CH" value="11" />
									</Picker>
								</View>

								<Text style={{ color: '#4898D3', marginTop: 5 }}>Boîte de vitesses</Text>

								<View style={{ borderWidth: 1, borderColor: '#8C8C8C', borderRadius: 4, marginTop: 5 }}>
									<Picker
										mode="dropdown"
										selectedValue={transtaction}
										style={{ height: 50, width: '100%' }}
										onValueChange={(itemValue, itemIndex) => setTransaction(itemValue)}
									>
										<Picker.Item label="Choisissez la transtaction" value="" />
										<Picker.Item label="Manuelle" value="Manuelle" />
										<Picker.Item label="Automatique" value="Automatique" />
									</Picker>
								</View>

								<Text style={{ color: '#4898D3', marginTop: 5 }}>Équipements</Text>
								<View style={{ borderWidth: 1, borderColor: '#8C8C8C', borderRadius: 4, marginTop: 5 }}>


									<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
										<Text style={{ marginTop: 7, width: '60%' }}>Première main</Text>
										<Checkbox
											status={premierMain ? 'checked' : 'unchecked'}
											onPress={() => {
												setPremierMain(!premierMain);
											}}
											color="#4898D3"
										/>
									</View>
									<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
										<Text style={{ marginTop: 7, width: '60%' }}>Salon en cuir</Text>
										<Checkbox
											status={salon ? 'checked' : 'unchecked'}
											onPress={() => {
												setSalon(!salon);
											}}
											color="#4898D3"
										/>
									</View>
									<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
										<Text style={{ marginTop: 7, width: '60%' }}>Jantes Aluminium</Text>
										<Checkbox
											status={jantes ? 'checked' : 'unchecked'}
											onPress={() => {
												setJanets(!jantes);
											}}
											color="#4898D3"
										/>
									</View>
									<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
										<Text style={{ marginTop: 7, width: '60%' }}>Airbags</Text>
										<Checkbox
											status={airbags ? 'checked' : 'unchecked'}
											onPress={() => {
												setAirbags(!airbags);
											}}
											color="#4898D3"
										/>
									</View>
									<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
										<Text style={{ marginTop: 7, width: '60%' }}>Climatisation</Text>
										<Checkbox
											status={clima ? 'checked' : 'unchecked'}
											onPress={() => {
												setClima(!clima);
											}}
											color="#4898D3"
										/>
									</View>
									<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
										<Text style={{ marginTop: 7, width: '60%' }}>Vitres Électriques</Text>
										<Checkbox
											status={vitre ? 'checked' : 'unchecked'}
											onPress={() => {
												setVitre(!vitre);
											}}
											color="#4898D3"
										/>
									</View>

									<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
										<Text style={{ marginTop: 7, width: '60%' }}>centralisé</Text>
										<Checkbox
											status={centraliser ? 'checked' : 'unchecked'}
											onPress={() => {
												setCentraliser(!centraliser);
											}}
											color="#4898D3"
										/>
									</View>

									<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
										<Text style={{ marginTop: 7, width: '60%' }}>Radar De Recul</Text>
										<Checkbox
											status={radar ? 'checked' : 'unchecked'}
											onPress={() => {
												setRadar(!radar);
											}}
											color="#4898D3"
										/>
									</View>

									<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
										<Text style={{ marginTop: 7, width: '60%' }}>GPS</Text>
										<Checkbox
											status={gps ? 'checked' : 'unchecked'}
											onPress={() => {
												setGps(!gps);
											}}
											color="#4898D3"
										/>
									</View>

									<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
										<Text style={{ marginTop: 7, width: '60%' }}>ABS</Text>
										<Checkbox
											status={abs ? 'checked' : 'unchecked'}
											onPress={() => {
												setAbs(!abs);
											}}
											color="#4898D3"
										/>
									</View>


								</View>
							</View>
						) : null}

						{services ? (
							<View>
								<Text style={{ color: '#4898D3', marginTop: 5 }}>Type de service</Text>
								<View style={{ borderWidth: 1, borderColor: '#8C8C8C', borderRadius: 4, marginTop: 5 }}>
									<Picker
									
										selectedValue={servicetype}
										prompt="Type de service"
										style={{ height: 50, width: '100%' }}
										onValueChange={(itemValue, itemIndex) => setServiceType(itemValue)}
									>
										<Picker.Item label="Choisissez le type de Service" value="*" />
										<Picker.Item label="Alarme & sécurité" value="Alarme & sécurité" />
										<Picker.Item label="Electricien " value="Electricien" />
										<Picker.Item label="Jardinier" value="Jardinier" />
										<Picker.Item label="Informatique " value="informatique" />
										<Picker.Item label="Maçonnerie" value="Maçonnerie" />
										<Picker.Item label="Menuisier" value="Menuisier" />
										<Picker.Item label="Peinture" value="Peinture" />
										<Picker.Item label="Tapisserie" value="Tapisserie" />
										<Picker.Item label="Plombier" value="Plombier" />
										<Picker.Item label="Soudeur" value="Soudeur" />
										<Picker.Item label="Vitre" value="Vitre" />
										<Picker.Item label="AUTRES" value="AUTRES" />
									</Picker>
								</View>
							</View>
						) : null}
						
						{terrain ? (
							<View>
								<TextInput
									label="Superficie"
									mode="outlined"
									placeholder="(m²)"
									theme={textTheme}
									keyboardType="numeric"
									style={{ marginTop: 10 }}
									onChangeText={(e)=>setSuperficie(parseFloat(e))}
								/>
							</View>
						) : null}

						{Location ? (
							<View>
								<TextInput
									label="Superficie"
									mode="outlined"
									placeholder="(m²)"
									theme={textTheme}
									keyboardType="numeric"
									style={{ marginTop: 10 }}
									onChangeText={setSuperficie}
								/>

								<Text style={{ color: '#4898D3', marginTop: 5 }}>Nombre de pièces</Text>
								<View style={{ borderWidth: 1, borderColor: '#444', borderRadius: 4, marginTop: 10 }}>
									<Picker
										mode="dropdown"
										selectedValue={piece}
										style={{ height: 50, width: '100%' }}
										onValueChange={(itemValue, itemIndex) => setPiece(itemValue)}
									>
										<Picker.Item label="Nombre de piece" value="*" />
										<Picker.Item label="1" value="1" />
										<Picker.Item label="2" value="2" />
										<Picker.Item label="3" value="3" />
										<Picker.Item label="4 et plus" value="4" />
									</Picker>
								</View>
							</View>
						) : null}

						<Text style={{ color: 'red', fontSize: 11, marginTop: 10 }}>Obligatoir *</Text>
						<TextInput
							label="Description"
							mode="outlined"
							theme={textTheme}
							numberOfLines={4}
							maxLength={266}
							placeholder="description"
							onChangeText={setDescription}
							multiline={true}
						/>


						<Text style={{ color: '#4898D3', marginTop: 5 }}>Options</Text>
						<View style={{ borderWidth: 1, borderColor: '#8C8C8C', borderRadius: 4, marginTop: 5 }}>
							
							{ user.phone ?
								<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
								<Text style={{ marginTop: 7, width: '60%' }}>Afficher le N° de Téléphone</Text>
								<Checkbox
									status={phone ? 'checked' : 'unchecked'}
									onPress={() => {
										setPhone(!phone);
									}}
									color="#4898D3"
								/>
							</View>
							: null }
							

							{chips ? (
								<View>
									<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
										<Text style={{ marginTop: 7, width: '60%' }}>Livraison Possible</Text>

										<Checkbox
											status={laivraison ? 'checked' : 'unchecked'}
											onPress={() => {
												setLaivraison(!laivraison);
											}}
											color="#4898D3"
										/>
									</View>

									<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
										<Text style={{ marginTop: 7, width: '60%' }}>Paiement à la livraison</Text>

										<Checkbox
											status={paiement ? 'checked' : 'unchecked'}
											onPress={() => {
												setPaiement(!paiement);
											}}
											color="#4898D3"
										/>
									</View>
								</View>
							) : null}

							{voitureChips ? (
								<View>
									<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
										<Text style={{ marginTop: 7, width: '60%' }}>En bonne état</Text>

										<Checkbox
											status={bonCondition ? 'checked' : 'unchecked'}
											onPress={() => {
												setBonCondition(!bonCondition);
											}}
											color="#4898D3"
										/>
									</View>

									<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
										<Text style={{ marginTop: 7, width: '60%' }}>Prix négociable</Text>

										<Checkbox
											status={negociable ? 'checked' : 'unchecked'}
											onPress={() => {
												setNegociable(!negociable);
											}}
											color="#4898D3"
										/>
									</View>
								</View>
							) : null}

						</View>
						
						<Button
							mode='contained'
							uppercase={false}
							onPress={() => upload()}
            				style={{ alignSelf: 'center', marginVertical: 20,  width: '100%', height: 40, borderRadius: 15, marginBottom: 30 }}
							disabled={(!title || !city || !price ||!description || !loading)}
							color='#4898D3'
							loading={loading}
							dark={true}>
						Valider l’annonce
						</Button>
					</View>
				</ScrollView>
			) : null}
		</SafeAreaView>
	);
}
