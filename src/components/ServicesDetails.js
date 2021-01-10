import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { Divider } from 'react-native-paper';
import PriceTag from '../icons/priceTag';
import { MaterialCommunityIcons, FontAwesome, Feather } from 'react-native-vector-icons';
import {GlobalStyle} from '../style/GlobalStyle';

export default function ServicesDetails(props) {
    return (
        <View style={GlobalStyle.infoContainer}>
        
			<Text style={styles.title}>Services Disponibles</Text>
            <Divider/>

            {/*Prix négociable*/}
            {props.negociable ? 
                <View style={styles.line}>
                    <PriceTag height='25' width='25'/>
                    <Text style={styles.text}> Prix négociable </Text>
                </View>
            : null }

            {/*En bonne état*/}
            {props.bonCondition ? 
                <View style={styles.line}>
                    <Feather name="thumbs-up" size={25} color="#4898D3" />
                    <Text style={styles.text}> En bonne état </Text>
                </View>
            : null }

            {/*Laivraison*/}
            {props.laivraison ? 
                <View style={styles.line}>
                <MaterialCommunityIcons name="truck-fast" color="#4898D3" size={20} style={{ marginRight: 5 }} />
                    <Text style={styles.text}> Livraison possible </Text>
                </View>
            : null }

            {/*Paiement*/}
            {props.paiement ? 
                <View style={styles.line}>
                <FontAwesome name="money" color="#4898D3" size={20} style={{ marginRight: 5 }} />
                    <Text style={styles.text}> Paiement à la livraison </Text>
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
    text:{
        color: '#767676', 
        fontSize: 17, 
        fontFamily: 'serif',
    },
    line: {
        flexDirection: 'row', marginTop: 5,
    },
})
