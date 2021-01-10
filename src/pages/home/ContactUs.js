import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import ContactForm from '../../components/ContactForm'

import { Ionicons } from 'react-native-vector-icons';

export default function ContactUs({navigation}) {
    return (
       
        <View>
        <StatusBar/>
        <View style={{ flexDirection: 'row', backgroundColor: '#4898D3'}}>
        <View style={{flex: 1}}>
        <Ionicons
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={40}
            color="#fff"
            style={{ alignSelf: 'flex-start', margin: 5, marginLeft: 10 }}
        />
        </View>

        <View  style={{flex: 4, alignSelf: 'center'}}>
            <Text style={{fontWeight: 'bold', color: '#fff', marginStart: 55, fontSize: 17}}>Contactez nous</Text>
        </View>
        

        </View>

        <ContactForm /> 

        </View>
    )
}
