import React from 'react'
import { View, Text } from 'react-native'

export default function Notification(props) {
    return (
        <View
        style={{width: '90%', height: 75}}>
        <TouchableOpacity
        delayPressIn={0}
        style={{padding: 20, flexDirection: 'row'}}
        onPress={props.click}>
             <Avatar.Image size={50} source={require('../../assets/logo.png')} />
             <View
             style={{margin: 5}}>
             <Text
             style={{fontSize: 17, fontFamily: 'sans-serif'}}>{ props.title }</Text>
             <Text style={{fontSize: 12, color: '#444'}}>{props.message}</Text>
             </View>
        </TouchableOpacity>
            </View>
    )
}
