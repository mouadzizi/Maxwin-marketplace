import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { Divider } from 'react-native-paper';
import {GlobalStyle} from '../style/GlobalStyle';

export default function DescriptionDetails(props) {
    return (
        <View style={GlobalStyle.infoContainer}>
			<Text style={styles.title}>Description</Text>
				<Divider/>
			<Text style={styles.text}>{props.description}</Text>
		</View>
    )
}

const styles = StyleSheet.create({
    title:{
        color: '#4898D3',
        fontSize: 20
    },
    text:{
        fontFamily: 'sans-serif',
        textAlign: 'justify',
        marginRight: 10,
        fontSize: 17,
    }
})