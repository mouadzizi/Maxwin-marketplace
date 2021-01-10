import React from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

export default function ProductEdit({ item, callback, goEdit }) {

	return (

			


		<View style={styles.container}>

		<View style={styles.infoSection}>

		<View style={styles.ImageContainer}>
		<Image source={{ uri: item.pics[0] }} resizeMode="cover" style={styles.imageStyle} />
		</View>

			<View style={styles.infoContainer}>

			<Text style={styles.TitleText}> {item.title} </Text>
			<Text style={styles.PriceText}> {item.price} MAD </Text>
			<Text style={styles.StyleText}> Ville : {item.city} </Text>

			</View>

		</View>

		<View style={styles.buttonSection}>

		<TouchableOpacity 
		style={styles.buttonSection1}
		onPress={() => {
			Alert.alert('Modifier', 'Êtes-vous sûr de bien vouloir Éditer cet élément ?', [
				{
					text: 'Non'
				},
				{
					text: 'Oui',
					onPress: goEdit
				}
			]);
		}}>
		<MaterialCommunityIcons name="briefcase-edit-outline" size={35} color="#fff" style={{ alignSelf: 'center' }} />
		<Text style={styles.btnText}>Modifier</Text>
		</TouchableOpacity>

		<TouchableOpacity 
		style={styles.buttonSection2}
		onPress={() => {
			Alert.alert('Supprimer', 'Êtes-vous sûr de bien vouloir supprimer cet élément ?', [
				{
					text: 'Annuler'
				},
				{
					text: 'Oui',
					onPress: callback
				}
			]);
		}}>
		<MaterialCommunityIcons name="delete" size={35} color="#fff" style={{ alignSelf: 'center' }} />
		<Text style={styles.btnText}>Supprimer</Text>
		</TouchableOpacity>


		</View>

		</View>
			

	);
}

const styles = StyleSheet.create({
    container: {
		borderWidth: 0.5,
		borderColor: '#ccc',
		borderRadius: 20,
		marginBottom: 10,

		flex: 1,
		height: 200,
	},

	infoSection: {
		flex: 3,
		flexDirection: 'row',
	},

	ImageContainer: {
		flex : 1,
		borderRadius: 20,
	},
	
	imageStyle : {
		width: '100%',
		height: '100%',
		borderTopLeftRadius: 20,
	},

	infoContainer: {
		flex : 1,
		borderTopRightRadius: 20,
		paddingTop: 5,
		backgroundColor: '#EAEAEA',
	},

	buttonSection: {
		flex: 1,
		width: '100%',
		flexDirection: 'row',
	},

	buttonSection1: {
		backgroundColor: '#4898D3',
		borderBottomLeftRadius: 20,
		flexDirection: 'row',
		width: '50%',
		justifyContent: 'center',
		elevation: 3
	},

	buttonSection2: {
		width: '50%',
		flexDirection: 'row',
		backgroundColor: '#F16E44',
		borderBottomRightRadius: 20,
		justifyContent: 'center',
		elevation: 3,
	},

	btnText: {
		fontWeight: 'bold',
		fontSize: 18,
		color: 'white',
		marginTop: 12,
		marginHorizontal: 15,
	},

	TitleText: {
		fontWeight: 'bold',
		fontSize: 16,
		color: '#4898D3',
		marginStart: 5,
	},

	PriceText: {
		fontWeight: 'bold',
		fontSize: 16,
		color: '#F16E44',
		marginStart: 5,
	},

	StyleText: {
		fontWeight: 'bold',
		fontSize: 16,
		marginStart: 5,
	},

})