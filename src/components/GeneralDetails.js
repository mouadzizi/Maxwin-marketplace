import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { Divider } from 'react-native-paper';
import {GlobalStyle} from '../style/GlobalStyle';

export default function GeneralDetails(props) {
    return (
        <View style={GlobalStyle.infoContainer}>
        
			<Text style={styles.title}>Détails</Text>
            <Divider/>

    {/*line Catégorie*/}
            {props.Cat ?
            <View>
				<Divider/>
                <View style={styles.line}>
					<Text style={styles.type}>Catégorie</Text>
					<Text style={styles.description}>{props.Cat}</Text>
				</View>
            </View>
            : null }

    {/*line Ville*/}
            {props.city ?
            <View>
				<Divider/>
                <View style={styles.line}>
					<Text style={styles.type}>Ville</Text>
					<Text style={styles.description}>{props.city}</Text>
				</View>
            </View>
            : null }

    {/*line etat*/}
            {props.etat ?
            <View>
				<Divider/>
                <View style={styles.line}>
					<Text style={styles.type}>Etat de Produit</Text>
					<Text style={styles.description}>{props.etat}</Text>
				</View>
            </View>
            : null }

    {/*line Ville*/}
            {props.marqueVoiture ?
            <View>
				<Divider/>
                <View style={styles.line}>
					<Text style={styles.type}>Marque de Voiture</Text>
					<Text style={styles.description}>{props.marqueVoiture}</Text>
				</View>
            </View>
            : null }

    {/*line carburant*/}
            {props.carburant ?
            <View>
				<Divider/>
                <View style={styles.line}>
					<Text style={styles.type}>Carburant</Text>
					<Text style={styles.description}>{props.carburant}</Text>
				</View>
            </View>
            : null }


    {/*line fabrication*/}
            {props.fabrication ?
            <View>
				<Divider/>
                <View style={styles.line}>
					<Text style={styles.type}>Année de Fabrication</Text>
					<Text style={styles.description}>{props.fabrication}</Text>
				</View>
            </View>
            : null }

        
{/*line kilometrage*/}
            {props.kilometrage ?
            <View>
				<Divider/>
                <View style={styles.line}>
					<Text style={styles.type}>Kilométrage</Text>
					<Text style={styles.description}>{props.kilometrage} Km</Text>
				</View>
            </View>
            : null }

{/*line transtaction*/}
            {props.transtaction ?
            <View>
				<Divider/>
                <View style={styles.line}>
					<Text style={styles.type}>Boîte de vitesse</Text>
					<Text style={styles.description}>{props.transtaction}</Text>
				</View>
            </View>
            : null }

{/*line puissance*/}
            {props.puissance ?
            <View>
				<Divider/>
                <View style={styles.line}>
					<Text style={styles.type}>Puissance Fiscale</Text>
					<Text style={styles.description}>{props.puissance} CH</Text>
				</View>
            </View>
            : null }

{/*line phoneMarque*/}
            {props.phoneMarque ?
            <View>
				<Divider/>
                <View style={styles.line}>
					<Text style={styles.type}>Marque de Télephone</Text>
					<Text style={styles.description}>{props.phoneMarque}</Text>
				</View>
            </View>
            : null }

{/*line superficie*/}
            {props.superficie ?
            <View>
				<Divider/>
                <View style={styles.line}>
					<Text style={styles.type}>Superficie</Text>
					<Text style={styles.description}>{props.superficie}</Text>
				</View>
            </View>
            : null }

{/*line servicetype*/}
            {props.servicetype ?
            <View>
				<Divider/>
                <View style={styles.line}>
					<Text style={styles.type}>Type de service</Text>
					<Text style={styles.description}>{props.servicetype}</Text>
				</View>
            </View>
            : null }

{/*line piece*/}
        {props.piece ?
            <View>
				<Divider/>
                <View style={styles.line}>
					<Text style={styles.type}>Nombre de piece</Text>
					<Text style={styles.description}>{props.piece}</Text>
				</View>
            </View>
            : null }


        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        color: '#4898D3',
        fontSize: 20
    },
    type:{
        fontSize: 17,
        color: '#000',
        width: '60%',
    },
    description:{
        fontSize: 17, 
        color: '#767676', 
        width: '40%'
    },
    line: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom : 5,
    },
})
