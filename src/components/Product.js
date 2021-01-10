import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { GlobalStyle } from '../style/GlobalStyle';
import { Entypo, MaterialCommunityIcons, Feather } from 'react-native-vector-icons';
import PriceTag from '../icons/priceTag';
import PaymenLivraison from '../icons/paymentLaivraison';

export default function Product(props) {
	const [ chip1, setChip1 ] = useState(props.p1);
	const [ chip2, setChip2 ] = useState(props.p2);
	
	const [ chip3, setChip3 ] = useState(props.p3);
	const [ chip4, setChip4 ] = useState(props.p4);

	const [ state, setState ] = useState(props.particulier);
	return (
		<View>
			<TouchableOpacity delayPressIn={0} onPress={props.click}>
				<View
					style={
						(chip1 && chip2) || (chip3 && chip4) ? (
							{ flexDirection: 'row', backgroundColor: '#fff', height: 150 }
						) : ( (!chip1 && chip2) || (!chip2 && chip1) ) || (!chip3 && chip4) || (!chip4 && chip3)? (
							{ flexDirection: 'row', backgroundColor: '#fff', height: 125 }
						) : (
							{ flexDirection: 'row', backgroundColor: '#fff', height: 125 }
						)
					}
				>
					<View style={GlobalStyle.cardImgWrapper}>
						<Image source={{ uri: props.img }} resizeMode="cover" style={GlobalStyle.cardImg} />
					</View>

					{/* Info of the card */}
					<View style={GlobalStyle.cardInfo}>
						{/* name */}
						<Text style={GlobalStyle.cardTitle}>{props.name}</Text>

						{/* price */}
						<Text style={GlobalStyle.cardPrice}>{props.price} DHS</Text>

						{/* Product owner */}
						{state ? (
							<View style={{ flexDirection: 'row', marginTop: 3 }}>
								<Entypo name="user" size={15} color="#767676" />
								<Text style={GlobalStyle.cardOwner}>{props.owner}</Text>
							</View>
						) : (
							<View style={{ flexDirection: 'row', marginTop: 3  }}>
								<Entypo name="shop" size={15} color="#767676" />
								<Text style={GlobalStyle.cardOwner}>{props.owner}</Text>
							</View>
						)}

						{/* Location */}
						<View style={{ flexDirection: 'row', marginTop: 4, marginBottom :2 }}>
							<Entypo name="location" size={15} color="#767676" />
							<Text style={GlobalStyle.cardLocation}>{props.location}</Text>
						</View>


						{chip1 ? (
							<View style={{ flexDirection: 'row', marginTop: 2 }}>
								<MaterialCommunityIcons name="truck-fast" size={15} color="#4898D3" />
								<Text style={GlobalStyle.cardChip}> Livraison possible</Text>
							</View>
						) : null}

						{chip2 ? (
							<View style={{ flexDirection: 'row', marginTop: 2 }}>
								<PaymenLivraison />
								<Text style={GlobalStyle.cardChip}> Paiement à la livraison</Text>
							</View>
						) : null}

						{chip3 ? (
							<View style={{ flexDirection: 'row', marginTop: 2 }}>
								<PriceTag height='15' width='15'/>
								<Text style={GlobalStyle.cardChip}> Prix négociable </Text>
							</View>
						) : null}

						{chip4 ? (
							<View style={{ flexDirection: 'row', marginTop: 2 }}>
								<Feather name="thumbs-up" size={15} color="#4898D3" />
								<Text style={GlobalStyle.cardChip}> En bonne état </Text>
							</View>
						) : null}

					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
}
