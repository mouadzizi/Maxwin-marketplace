import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { Divider } from 'react-native-paper';
import {GlobalStyle} from '../style/GlobalStyle';


import Wheels from '../icons/jantes';
import NavigationSystem from '../icons/navigationSystem';
import RadarRedcule from '../icons/radarRedcule';
import VitreElectrique from '../icons/vitreElectrique';
import AirbagsIcon from '../icons/Airbags';
import Clima from '../icons/clima';
import Seat from '../icons/seat';
import Driver from '../icons/driver';
import KeyCar from '../icons/KeyCar';
import { MaterialCommunityIcons} from 'react-native-vector-icons';

export default function CarDetailsList(props) {

    return (
    <View style={GlobalStyle.infoContainer}>
        
			<Text style={styles.title}>Équipements</Text>
            <Divider/>

        {/*line Première main*/}
            {props.premierMain ?
            <View>
                <View style={styles.line}>
                <Driver />
				<Text style={styles.type}>Première main</Text>
				</View>
				<Divider/>
            </View>
            : null }

        {/*line salon*/}
            {props.salon ?
            <View>
                <View style={styles.line}>
                    <Seat />
					<Text style={styles.type}>Salon en cuir</Text>
				</View>
				<Divider/>
            </View>
            : null }
            
        {/*line jantes*/}
            {props.jantes ?
            <View>
                <View style={styles.line}>
                    <Wheels />
					<Text style={styles.type}>Jantes aluminium</Text>
				</View>
				<Divider/>
            </View>
            : null }

        {/*line clima*/}
            {props.clima ?
            <View>
                <View style={styles.line}>
                    <Clima />
                    <Text style={styles.type}>Climatisation</Text>
				</View>
				<Divider/>
            </View>
            : null }

        {/*line gps*/}
            {props.gps ?
            <View>
                <View style={styles.line}>
                    <NavigationSystem />
					<Text style={styles.type}>GPS</Text>
				</View>
				<Divider/>
            </View>
            : null }

        {/*line abs*/}
            {props.abs ?
            <View>
                <View style={styles.line}>
                    
				<MaterialCommunityIcons name="car-brake-abs" size={25} color='#4898D3'/>
					<Text style={styles.type}>ABS</Text>
				</View>
				<Divider/>
            </View>
            : null }

        {/*line radar*/}
            {props.radar ?
            <View>
                <View style={styles.line}>
                    <RadarRedcule />
					<Text style={styles.type}>Radar de recul</Text>
				</View>
				<Divider/>
            </View>
            : null }

        {/*line centraliser*/}
            { props.centraliser ?
            <View>
                <View style={styles.line}>
                    <KeyCar/>
                    <Text style={styles.type}>Centralisé</Text>
				<Divider/>
                </View>
            </View>
            : null}

        {/*line vitre*/}
            {props.vitre ?
            <View>
                <View style={styles.line}>
                    <VitreElectrique />
					<Text style={styles.type}>Vitres électriques</Text>
				</View>
                <Divider/>
            </View>
            : null }

        {/*line airbags*/}
            {props.airbags ?
            <View>
                <View style={styles.line}>
				    <AirbagsIcon/>
					<Text style={styles.type}>Airbags</Text>
				</View>
                <Divider/>
            </View>
            : null }


        {/*line transtaction*/}
            {props.transtaction ?
            <View>
                <View style={styles.line}> 
				    <MaterialCommunityIcons name="car-shift-pattern" size={25} color='#4898D3'/>
					<Text style={styles.type}>Vitesse {props.transtaction}</Text>
				</View>
                <Divider/>
            </View>
            : null }
	
    </View>
)}

const styles = StyleSheet.create({
    title:{
        color: '#4898D3',
        fontSize: 20,
    },
    type:{
        fontSize: 17, 
        color: '#767676', 
        marginStart: 80, 
        alignSelf: 'flex-start',
        alignSelf: 'flex-start'
    },
    line: {
        flexDirection: 'row',
        alignContent:'flex-start',
        alignItems: 'flex-start',
        marginTop: 5,
        marginBottom : 5,
    }
})
