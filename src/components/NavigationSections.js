import React from 'react'
import { Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'

import CarCategorie from '../icons/carCategorie'; 
import SmartPhone from '../icons/SmartPhone';
import Appartement from '../icons/AppartementIcon';
import ClothMen from '../icons/ManClothes';
import ClothWomen from '../icons/WomenClothes';

export default function NavigationSections(props) {
 
    return (
        <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.container}>

            <TouchableOpacity
            delayPressIn={0}
            style={styles.categorieItem}
            onPress={()=>props.onPress('Voitures')}>
            <CarCategorie/>
            </TouchableOpacity>

            <TouchableOpacity
            delayPressIn={0}
            style={styles.categorieItem}
            onPress={()=> props.onPress('Appartements')}>
            <Appartement/>
            </TouchableOpacity>

            <TouchableOpacity
            delayPressIn={0}
            style={styles.categorieItem}
            onPress={()=> props.onPress('Téléphones')}>
            <SmartPhone/>
            </TouchableOpacity>

            <TouchableOpacity
            delayPressIn={0}
            style={styles.categorieItem}
            onPress={()=> props.onPress('Vêtements Homme')}>
            <ClothMen/>
            </TouchableOpacity>

            <TouchableOpacity
            delayPressIn={0}
            style={styles.categorieItem}
            onPress={()=> props.onPress('Vêtements Femmes')}>
            <ClothWomen/>
            </TouchableOpacity>

        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    Main: {
        alignContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#fff'

    },

    container: {
        alignContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#fff',
    },
    categorieItem : {
        borderRadius:  30,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#F16E44',
        height: 50,
        padding: 3,
        alignItems: 'center',
        marginHorizontal: 10,
        width: 90,
    },
    textStyle: {
        color: '#4898D3',
        fontWeight: '600',
        textAlign: 'center',
    }
})