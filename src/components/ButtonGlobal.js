import React from 'react'
import { TouchableOpacity, Text } from 'react-native';
import {GlobalStyle} from '../style/GlobalStyle'

export default function ButtonGlobal(props) {
    return (
        <TouchableOpacity
				style={GlobalStyle.BouttonStyle}
				onPress={props.click}
			>
				<Text style={GlobalStyle.BouttonStyleText}>{props.title}</Text>
			</TouchableOpacity>
    )
}
