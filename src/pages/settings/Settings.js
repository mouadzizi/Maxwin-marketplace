import React from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { List } from 'react-native-paper';
import {Ionicons, FontAwesome} from 'react-native-vector-icons';

export default function Settings({navigation}) {
    return (
        <SafeAreaView style={{ flex: 1}} >
        <ScrollView showsVerticalScrollIndicator={false}>

        <View
        style={{flex:1, backgroundColor: '#fff', marginTop: 10 }}>
 
        <List.Item
            onPress={()=> navigation.navigate('Profil')}
            title="Mon profil"
            style={{padding: 10}}
            left={props =><FontAwesome 
                name='user-circle-o'
                color='#4898D3'
                size={40}
            />}/>
        </View>
        
        <View
        style={{flex:1, backgroundColor: '#fff', marginTop: 10 }}>
 
        <List.Item
            onPress={()=> navigation.navigate('Items')}
            title="Mes Produits"
            style={{padding: 10}}
            left={props =><Ionicons 
                name='md-clipboard'
                color='#4898D3'
                size={40}
            />}/>
        </View>
            
        </ScrollView>
        </SafeAreaView>
    )
}
