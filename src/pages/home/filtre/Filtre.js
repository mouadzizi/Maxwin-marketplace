import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, Modal, Text, TouchableOpacity, Picker } from 'react-native';
import { TextInput } from 'react-native-paper';
import { GlobalStyle, textTheme } from '../../../style/GlobalStyle';
import { AntDesign } from 'react-native-vector-icons';
import FilterCategory from '../filtre/FilterCat';
import { useFocusEffect } from '@react-navigation/native'

export default function Filtre({ navigation }) {

	const [titreModal, setTittreModal] = useState('Choisissez votre catégorie');
	const [etat, setEtat] = useState('Neuf/Utilisé');

	//filter variables Standard 
	const [city, setCity] = useState('Toutes les villes');
	const [priceMax, setPriceMax] = useState(Infinity);
	const [priceMin, setPriceMin] = useState(0);

	//filter variables Voiture
	const [marqueVoiture, setMarqueVoiture] = useState('');
	const [carburant, setCarburant] = useState('*');
	const [transtaction, setTransaction] = useState('*');

	const [anneeMax, setAnneeMax] = useState(Infinity);
	const [anneeMin, setAnneeMin] = useState(0);

	// filter variables Location 
	const [SuperficieMin, setSuperficieMin] = useState(0);
	const [SuperficieMax, setSuperficieMax] = useState(Infinity);

	//filter variables phone
	const [marquePhone, setMarquePhone] = useState('*');

	//filter variables phone
	const [typeService, setTypeService] = useState('*');

	//Visibility
	const [modalVisible, setModalVisible] = useState(false);
	const [voiture, setVoiture] = useState(false);
	const [location, setLocation] = useState(false);
	const [service, setService] = useState(false);
	const [phone, setPhone] = useState(false);
	const [etatViisbility, setEtatVisibility] = useState(true);

	const [selectedCategory, setSelectedCategory] = useState('');
	const [superCategory, setSuperCategory] = useState('');


	const goToFilter = () => {
		if (!selectedCategory) {
			alert('selectionner une categorie')
			return;
		}
		var filterOptions = {
			selectedCategory,
			superCategory,
			anneeMax: anneeMax ? anneeMax : Infinity,
			anneeMin: anneeMin ? anneeMin : 0,
			etat,
			city,
			priceMin: priceMin ? priceMin : 0,
			priceMax: priceMax ? priceMax : Infinity,
			marqueVoiture,
			carburant,
			transtaction,
			SuperficieMin,
			SuperficieMax,
			marquePhone,
			typeService,
		}
		navigation.navigate('results', { filterOptions })
	}

	const choiseAction = (item, title) => {
		setSelectedCategory(item)
		setSuperCategory(title)
		setTittreModal(item)
		setModalVisible(false);
		switch (true) {

			case (item === 'Voitures' || item === 'Location de Voiture'):
				setVoiture(true)
				setPhone(false)
				setLocation(false)
				setService(false)
				setEtatVisibility(true)
				break;

			case (item === 'Téléphones' || item === 'Tablettes'):
				setPhone(true)
				setVoiture(false)
				setLocation(false)
				setService(false)
				setEtatVisibility(true)
				break;

			case (item === 'Appartements' || item === 'Maisons & Villas' || item === 'Terrains' || item === 'Location courte durée (vacances)' || item === 'Location long durée' || item == 'Commerces & Bureaux'):
				setLocation(true)
				setPhone(false)
				setVoiture(false)
				setService(false)
				setEtatVisibility(false)
				break;

			case (item === 'Services et travaux professionnels' || item === 'Formations & autres'):
				setService(true)
				setLocation(false)
				setPhone(false)
				setVoiture(false)
				setEtatVisibility(false)
				break;
			case (item === 'Matériels professionnels'):
				setService(true)
				setLocation(false)
				setPhone(false)
				setVoiture(false)
				setEtatVisibility(true)
				break;

			default:
				setService(false);
				setLocation(false);
				setPhone(false);
				setVoiture(false);
				setEtatVisibility(true)
				break;
		}
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
				<TouchableOpacity
					style={{ borderWidth: 1.5, borderRadius: 5, height: 45, borderColor: '#F16E44' }}
					onPress={() => {
						setModalVisible(true);
					}}
				>
					<Text style={{ alignSelf: 'center', textAlign: 'center', marginTop: 10, color: '#F16E44', fontSize: 18 }}>
						{titreModal}
					</Text>
				</TouchableOpacity>

				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => { setModalVisible(!modalVisible); }}
				>
					<View style={GlobalStyle.modalContainer}>
						<TouchableOpacity
							style={{ alignSelf: 'flex-end', marginRight: 25 }}
							onPress={() => setModalVisible(!modalVisible)}
						>
							<AntDesign name="closesquare" color="#F16E44" size={30} />
						</TouchableOpacity>

						<View style={GlobalStyle.modalView}>
							<FilterCategory event={(item, title) => choiseAction(item, title)} />
						</View>
					</View>
				</Modal>

				<View>
					<View style={{ flex: 1, marginTop: 5 }}>
						<View style={{ borderWidth: 1, borderColor: '#444', borderRadius: 4, marginTop: 10 }}>
							<Picker
								selectedValue={city}
								style={{ height: 50, width: '100%' }}
								onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
							>
								<Picker.Item label="Toutes les villes" value="Toutes les villes" />
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

						<Text style={{ color: '#4898D3', marginTop: 5 }}>Prix</Text>

						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<TextInput
								label="Prix MIN"
								mode="outlined"
								placeholder="DHS"
								theme={textTheme}
								onChangeText={(e) => setPriceMin(parseFloat(e))}
								keyboardType="numeric"
								style={{ width: '45%' }}
							/>

							<TextInput
								label="Prix MAX"
								mode="outlined"
								placeholder="DHS"
								theme={textTheme}
								onChangeText={(e) => setPriceMax(parseFloat(e))}
								keyboardType="numeric"
								style={{ width: '45%' }}
							/>
						</View>

						{etatViisbility ? (
							<View>
								<Text style={{ color: '#4898D3', marginTop: 5 }}>Etat de produit</Text>
								<View style={{ borderWidth: 1, borderColor: '#444', borderRadius: 4, marginTop: 5 }}>
									<Picker
										selectedValue={etat}
										prompt="Etat de produit"
										style={{ height: 50, width: '100%' }}
										onValueChange={(itemValue, itemIndex) => setEtat(itemValue)}
									>
										<Picker.Item label="Neuf ou Utilisé" value="Neuf/Utilisé" />
										<Picker.Item label="Neuf" value="neuf" />
										<Picker.Item label="Utilisé" value="Utilisé" />
									</Picker>
								</View>
							</View>
						) : null}

						{voiture ? (
							<View>
								<Text style={{ color: '#4898D3', marginTop: 5 }}>Marque</Text>
								<View style={{ borderWidth: 1, borderColor: '#8C8C8C', borderRadius: 4, marginTop: 5 }}>
									<Picker
										selectedValue={marqueVoiture}
										prompt="Marque"
										style={{ height: 50, width: '100%' }}
										onValueChange={(itemValue, itemIndex) => setMarqueVoiture(itemValue)}
									>
										<Picker.Item label="toutes les marques" value="" />
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

								<Text style={{ color: '#4898D3', marginTop: 5 }}>Année de fabrication</Text>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<TextInput
										label="Année MIN"
										mode="outlined"
										placeholder="1996"
										theme={textTheme}
										onChangeText={(e) => setAnneeMin(parseInt(e))}
										keyboardType="numeric"
										style={{ width: '45%' }}
									/>

									<TextInput
										label="Année MAX"
										mode="outlined"
										placeholder="2020"
										theme={textTheme}
										onChangeText={(e) => setAnneeMax(parseInt(e))}
										keyboardType="numeric"
										style={{ width: '45%' }}
									/>
								</View>

								<Text style={{ color: '#4898D3', marginTop: 5 }}>Carburant</Text>
								<View style={{ borderWidth: 1, borderColor: '#8C8C8C', borderRadius: 4, marginTop: 5 }}>
									<Picker
										selectedValue={carburant}
										style={{ height: 50, width: '100%' }}
										prompt="Carburant"
										onValueChange={(itemValue, itemIndex) => setCarburant(itemValue)}
									>
										<Picker.Item label="toutes les carburant" value="*" />
										<Picker.Item label="Diesel " value="Diesel" />
										<Picker.Item label="Essence" value="Essence" />
										<Picker.Item label="Hybrid" value="Hybrid" />
										<Picker.Item label="Electrique" value="Electrique" />
									</Picker>
								</View>


								<Text style={{ color: '#4898D3', marginTop: 5 }}>Boite de vitesses</Text>
								<View style={{ borderWidth: 1, borderColor: '#8C8C8C', borderRadius: 4, marginTop: 5 }}>
									<Picker
										mode="dropdown"
										selectedValue={transtaction}
										style={{ height: 50, width: '100%' }}
										onValueChange={(itemValue, itemIndex) => setTransaction(itemValue)}
									>
										<Picker.Item label="toutes les transactions" value="*" />
										<Picker.Item label="Manuelle " value="Manuelle" />
										<Picker.Item label="Automatique" value="Automatique" />
									</Picker>
								</View>
							</View>
						) : null}

						{location ? (


							<View>
								<Text style={{ color: '#4898D3', marginTop: 5 }}>Superficie</Text>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<TextInput
										label="Superficie Min"
										mode="outlined"
										placeholder="(m²)"
										theme={textTheme}
										keyboardType="numeric"
										style={{ width: '45%' }}
										onChangeText={(e) => setSuperficieMin(parseInt(e))}
									/>

									<TextInput
										label="Superficie Max"
										mode="outlined"
										placeholder="(m²)"
										theme={textTheme}
										keyboardType="numeric"
										style={{ width: '45%' }}
										onChangeText={(e) => setSuperficieMax(parseInt(e))}
									/>
								</View>

							</View>
						) : null}

						{phone ? (
							<View>
								<Text style={{ color: '#4898D3', marginTop: 5 }}>Marque</Text>
								<View
									style={{ borderWidth: 1, borderColor: '#8C8C8C', borderRadius: 4, marginTop: 10 }}
								>
									<Picker
										selectedValue={marquePhone}
										prompt="Marque"
										style={{ height: 50, width: '100%' }}
										onValueChange={(itemValue, itemIndex) => setMarquePhone(itemValue)}
									>
										<Picker.Item label="Choissisez votre marque" value="*" />

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

						{service ? (
							<View>
								<Text style={{ color: '#4898D3', marginTop: 5 }}>Type de service</Text>
								<View style={{ borderWidth: 1, borderColor: '#8C8C8C', borderRadius: 4, marginTop: 5 }}>
									<Picker
										selectedValue={typeService}
										prompt="Type de service"
										style={{ height: 50, width: '100%' }}
										onValueChange={(itemValue, itemIndex) => setTypeService(itemValue)}
									>
										<Picker.Item label="Type de Service" value="*" />
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

						<TouchableOpacity delayPressIn={0} onPress={() => goToFilter()} style={[GlobalStyle.btn, { marginBottom: 30 }]}>
							<Text style={GlobalStyle.signInText}>Valider</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
