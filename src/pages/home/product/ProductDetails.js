import React from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, Alert, InteractionManager, Dimensions, StyleSheet, Share} from 'react-native';
import { ProgressBar, Divider } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { db,auth } from '../../../API/firebase';

import { Feather } from 'react-native-vector-icons';
import { GlobalStyle } from '../../../style/GlobalStyle';

import call from 'react-native-phone-call';
import Swiper from 'react-native-swiper';

import * as Animatble from 'react-native-animatable';

// Components
import ServicesDetails from '../../../components/ServicesDetails';
import Description from '../../../components/DescriptionDetails';
import Details from '../../../components/GeneralDetails';
import CarDetailsList from '../../../components/CarDetailsList';


export default function ProductDetails({ navigation, route }) {

	const [ canRender, setRender ] = React.useState();
	const [ post, setPost ] = React.useState('');
	const [ args, setArgs ] = React.useState({
		number:''
	});

	const _SlideHeight = Dimensions.get('window').height * 0.65;
	const _SlideWidth = Dimensions.get('window').width * 0.98;
	

	useFocusEffect(
		React.useCallback(() => {
			const { id } = route.params;
			InteractionManager.runAfterInteractions(async () => {
				await db.collection('posts').doc(id).get().then((p) => {
					setPost(p.data());
					setArgs({number:p.data().user.phoneNumber})
					setRender(true);
				});
				
			});

			return () => {}
		}, [])
	);


		const handleNavigation = (seller)=>{
			
			if (seller._id != auth.currentUser.uid) navigation.navigate('Messages',{seller:seller});
			else Alert.alert('Désolé(e)', 'vous êtes le propriétaire de ce produit, vous ne pouvez pas vous envoyer de message')
			}
	
				const onShare = async () => {
				  try {
					const result = await Share.share({
					  message:
						'MAxwin | application mobile pour vous',
					});
					if (result.action === Share.sharedAction) {
					  if (result.activityType) {
						// shared with activity type of result.activityType
					  } else {
						// shared
					  }
					} else if (result.action === Share.dismissedAction) {
					  // dismissed
					}
				  } catch (error) {
					alert(error.message);
				  }
				}

	return (
		
		<View style={{flex: 1}}>

			{canRender ? 
				
				<ScrollView 
				showsVerticalScrollIndicator={false}
				style={{flex: 1}}>
					
						<Animatble.View 
						style={[styles.swipercontainer, {width: _SlideWidth, height: _SlideHeight}]}
						animation="zoomIn">
							<Swiper autoplay activeDotColor="#FF6347">
								{post ? (
									post.urls.map((img, index) => {
										return (
										<View key={index} style={GlobalStyle.slide}>
												<Image
													key={index}
													source={{ uri: img }}
													resizeMode="cover"
													style={GlobalStyle.sliderImage}
												/>
											</View>
										);
									})
								) : null}
							</Swiper>
						</Animatble.View>

					<View style={GlobalStyle.infoContainer}>

						<Text style={{fontSize: 25, fontFamily: 'Roboto'}}>{post.title}</Text>
						<Divider />
						<Text style={{color: '#FF6347', fontSize: 23, fontFamily: 'serif', marginTop: 3}}>
						{post.price} DHS
						</Text>
					</View>
					
					{(post.negociable || post.bonCondition || post.laivraison || post.paiement)
					?
					<ServicesDetails negociable={post.negociable} bonCondition={post.bonCondition} laivraison={post.laivraison} paiement={post.paiement}/>
					: null}

					
					<Description description={post.description}/>

					<Details Cat= {post.category.item} city={post.city} etat={post.etat} marqueVoiture={post.marqueVoiture} city={post.city} carburant={post.carburant} fabrication={post.fabrication} kilometrage={post.kilometrage} transtaction={post.transtaction} puissance={post.puissance} phoneMarque={post.phoneMarque} superficie={post.superficie} servicetype={post.servicetype} piece={post.piece}/>
				
				{(post.carSpecefications.premierMain || post.carSpecefications.centraliser || post.carSpecefications.salon || post.carSpecefications.gps || post.carSpecefications.abs || post.carSpecefications.jantes || post.carSpecefications.radar || post.carSpecefications.vitre || post.carSpecefications.airbags || post.transtaction || post.carSpecefications.clima)
				?
				<CarDetailsList premierMain={post.carSpecefications.premierMain} centraliser={post.carSpecefications.centraliser} salon={post.carSpecefications.salon} gps={post.carSpecefications.gps} abs={post.carSpecefications.abs} jantes={post.carSpecefications.jantes} radar={post.carSpecefications.radar} transtaction={post.transtaction} vitre={post.carSpecefications.vitre}  airbags={post.carSpecefications.airbags} clima={post.carSpecefications.clima} />
				
				: null}

				

				<View style={styles.bouttonContainer}>

						{/* Button Call */}
						{
						(post.Telephone && post.user.phoneNumber)?
						<TouchableOpacity
							delayPressIn={0}
							onPress={() => 
							 call(args).catch((err)=>alert(err.message))
								
							}
							style={styles.buttonCall}
							>
								<View style={{flexDirection: 'row'}}>
									<Feather name="smartphone" size={25} color="#fff" />
									<Text style={styles.btnText}>Appeler l'annonceur</Text>
								</View>
							</TouchableOpacity> : null
						}
						 
						


						{/* Button Message */}
						<TouchableOpacity
							delayPressIn={0}
							onPress={() => handleNavigation(post.user._id)}
							style={styles.buttonMessage}
						>
						<View style={{flexDirection: 'row'}}>
						<Feather name="message-square" size={25} color="#fff" />
						<Text style={styles.btnText}>Envoyer un message</Text>
						</View>
						</TouchableOpacity>

						{/* Button Share */}
						<TouchableOpacity
							delayPressIn={0}
							onPress={onShare}
							style={styles.buttonShare}
						>
						<View style={{flexDirection: 'row'}}>
						<Feather name="share-2" size={25} color="#4898D3" />
						<Text style={styles.btnText2}>Partager L'annonce</Text>
						</View>
						</TouchableOpacity>


					</View>

				</ScrollView>
			
			:

					<ProgressBar color="#4898D3" indeterminate={true} visible={true} style={{ height: 10 }} />
			}
			</View>

	);
}

const styles = StyleSheet.create({
    buttonShare:{
		backgroundColor: '#fff',
		borderColor: '#4898D3',
		height: 40,
		borderRadius: 15,
		marginBottom: 5,
		marginTop: 5,
		justifyContent: 'center',
		alignItems: 'center',
    },
    buttonCall:{
		backgroundColor: '#4898D3',
		height: 40,
		borderRadius: 15,
		marginBottom: 5,
		marginTop: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	swipercontainer:{
		marginTop: 10, 
		justifyContent: 'center', 
		alignSelf: 'center', 
		borderRadius: 8, 
	},
    buttonMessage: {
		backgroundColor: '#FF6347',
		borderRadius: 15,
		height: 40,
		marginBottom: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	bouttonContainer:{
		padding: 20,
		margin: 5
	},
	btnText:{ 
		color: '#fff',
		fontSize: 18,
		fontFamily: 'serif',
		marginStart: 5
	},
	btnText2:{ 
		color: '#4898D3',
		fontSize: 18,
		fontFamily: 'serif',
		marginStart: 5
	}
})
