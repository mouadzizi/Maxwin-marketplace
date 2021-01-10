import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function Header() {
    return (
        <View style={styles.header}>
        <Text style={styles.max}>Max</Text>
        <Text style={styles.win}>win</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
    max: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'monospace'
    },
    win: {
        color: '#F16E44',
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'monospace'
    },
})