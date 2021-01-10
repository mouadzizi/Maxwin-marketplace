import React from 'react'
import { TouchableOpacity, Text } from 'react-native';
import {GlobalStyle} from '../style/GlobalStyle'

export default function ButtonGlobalOutlined(props) {
    return (
        <TouchableOpacity
				style={GlobalStyle.BouttonStyleOutlined}
				onPress={props.click}
			>
				<Text style={GlobalStyle.BouttonStyleTextOutlined}>{props.title}</Text>
			</TouchableOpacity>
    )
}
