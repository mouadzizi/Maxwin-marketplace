import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import {Avatar, Divider} from 'react-native-paper' 

export default function ChatIndicator(props) {
    return (
        <View
        style={{width: '90%', height: 75}}>
        <TouchableOpacity
        delayPressIn={0}
        style={{padding: 20, flexDirection: 'row'}}
        onPress={props.click}>
             <Avatar.Image size={50} source={{uri:props.sellerAvatar}} />
             <View
             style={{margin: 5}}>
             <Text
             style={{fontSize: 17, fontFamily: 'sans-serif'}}>{ props.sellerName }</Text>
             <Text style={{fontSize: 12, color: '#444'}}>{props.lastMessage}</Text>
             <Text style={{fontSize: 12 }}> {props.time} </Text>
             </View>
        </TouchableOpacity>
            </View>
    )
}
