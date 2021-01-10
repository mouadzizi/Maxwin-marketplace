import React from 'react'
import { View, Image, Text, Alert, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';
import {GlobalStyle, textTheme} from '../style/GlobalStyle';


const { width, height } = Dimensions.get('window');
const height_image = height*0.27;
const width_image = width;

export default function ContactForm() {
    return (
        <ScrollView style={{backgroundColor: '#fff'}}>

        <View style={{height: height_image, width: width_image}}>
        <Image
                    source={require('../../assets/logo.jpg')}
                    style={{height: height_image, width: width_image, alignSelf: 'center', marginTop: 15 }}
                    resizeMode={'cover'}
                />

        </View>

        <View style={{padding: 20}}>

        <TextInput
        label='Nom complet'
        mode='outlined'
        placeholder='votre nom'
        theme={textTheme}
        style={{marginBottom: 10}}
        />

        <TextInput
        label='Numero de Telephone'
        mode='outlined'
        placeholder='votre Numéro de Telephone'
        keyboardType='numeric'
        theme={textTheme}
        style={{marginBottom: 10}}
        />

        <TextInput
        label='E-mail'
        autoCapitalize="none"
        mode='outlined'
        placeholder='votre-mail@mail.com'
        theme={textTheme}
        style={{marginBottom: 10}}
        />
        <TextInput
        label='Message'
        autoCapitalize="none"
        mode='outlined'
        placeholder='votre message'
        theme={textTheme}
        style={{marginBottom: 10}}
        multiline={true}
        numberOfLines={5}
        />
        </View>
        
        <TouchableOpacity 
        style={GlobalStyle.BouttonStyle}
        onPress={()=>{Alert.alert('Message Envoyer', 'votre message est envoyer')}}>
        <Text style={GlobalStyle.BouttonStyleText}>Envoyer</Text>
        </TouchableOpacity>
    </ScrollView>
    )
}
