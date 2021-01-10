import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from 'react-native-vector-icons';
import Condition from '../../components/Conditions'


export default function PrivacyPage({navigation}) {
    return (
        <View>

            <View style={{ flexDirection: 'row', backgroundColor: '#4898D3' }}>
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
                <Text style={{fontWeight: 'bold', color: '#fff', marginStart: 55, fontSize: 17}}>Condition Générales</Text>
            </View>
            

            </View>

            <Condition />

        </View>
    )
}
