import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, InteractionManager, FlatList, Dimensions, StatusBar,ActivityIndicator } from 'react-native';
import { Searchbar, ProgressBar } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';
import { colors } from '../../style/GlobalStyle';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../../API/firebase';
import Product from '../../components/Product';
import NavigationSections from '../../components/NavigationSections';
import {fitler} from './fiterData'

export default function DashBoard({ navigation }) {
	const [ready, setReady] = useState(false);
	const [posts, setPosts] = useState([]);
	const [qte,setQte]=useState(10)
	const [loading,setLoading]=useState(false)
	const [current, setcurrent] = useState('all')

	useFocusEffect(
		React.useCallback(() => {
			setQte(10)
			InteractionManager.runAfterInteractions(async () => {
				await fetchItems(qte).then((p) => {
					setPosts(p);
					setReady(true);
				});
			});
		}, [])
	);

	useEffect(() => {
		return () => {

		}
	}, [])



	//Dimensions
	const { width, height } = Dimensions.get('window');

	const height_screen = height * 0.782;

	//SearchBar Const

	const [searchQuery, setSearchQuery] = useState('');
	const onChangeSearch = (query) => setSearchQuery(query);
	const action = () => {
		navigation.navigate('ProductDetails');
	}; 
	const fetchItems = async (qte) => {
		let postsA = [];
		var ref = db.collection('posts');
		const allPosts = await ref.orderBy('addDate', 'desc').limit(qte).get();
		allPosts.forEach((p) => {
			postsA.push({
				...p.data(),
				key: p.id
			});
		});
		return postsA;
	};
	const loadMore= ()=>{
		setLoading(true);
		setQte(qte+10)
		switch (current) {
			case 'all':
				fetchItems(qte).then(p=>{
					setPosts(p)
					setLoading(false)
					})
				break;
		
			default:
				fitler(current,qte).then(data=>{
					setPosts(data)
					setLoading(false)
				})
		}
	}
	return (
		<View>

			<StatusBar />
			<View style={{ flexDirection: 'row', backgroundColor: '#4898D3' }}>
				<Ionicons
					onPress={() => navigation.openDrawer()}
					name="md-menu"
					size={40}
					color="#fff"
					style={{ alignSelf: 'center', margin: 5, marginLeft: 10 }}
				/>

				<Searchbar
					placeholder="Rechercher"
					onChangeText={onChangeSearch}
					value={searchQuery}
					style={{ width: '83%', margin: 8 }}
				/>
			</View>

			{/* Filtre product & Add product */}
			<View style={{ flexDirection: 'row', elevation: 25, height: 50, marginBottom: 2 }}>
				<TouchableOpacity
					delayPressIn={0}
					onPress={() => {
						navigation.navigate('AddProductCat');
					}}
					style={{
						flexDirection: 'row',
						width: '50%',
						backgroundColor: colors.second,
						justifyContent: 'center'
					}}
				>
					<Ionicons name="md-add-circle" size={35} color="#fff" style={{ alignSelf: 'center' }} />

					<Text style={{ textAlignVertical: 'center', marginLeft: 15, fontWeight: 'bold', color: '#fff' }}>
						
					Publier une annonce
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					delayPressIn={0}
					onPress={() => {
						navigation.navigate('Filtre');
					}}
					style={{
						flexDirection: 'row',
						width: '50%',
						backgroundColor: colors.primary,
						justifyContent: 'center',
						borderWidth: 1.5,
						borderColor: '#F16E44',
						elevation: 3
					}}
				>
					<Ionicons name="ios-options" size={35} color="#fff" style={{ alignSelf: 'center' }} />
					<Text style={{ textAlignVertical: 'center', marginLeft: 15, fontWeight: 'bold', color: '#fff' }}>
						Filtre
					</Text>
				</TouchableOpacity>
			</View>
			<View>

				{/* Products Lists */}
				{ready ? (
					<View style={{ height: height_screen }}>


						<FlatList style={{flexGrow:0}}

							ListHeaderComponent={
								<View style={{ backgroundColor: '#fff', paddingBottom: 10 }}>

									<View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 5, flex: 1 }}>

										<View style={{ flex: 1 }}>
											<Text style={{ color: '#4898D3', fontWeight: 'bold', alignSelf: 'flex-start' }}>Top catégories</Text>
										</View>


										<View style={{ flex: 1 }}>

											<MaterialCommunityIcons
											name="arrow-right" size={20} color="#4898D3" style={{ alignSelf: 'flex-end' }} />
										</View>

									</View>

									<NavigationSections onPress={(category)=>{
										setReady(false)
										setcurrent(category)
										fitler(category,qte).then(data=>{
											setPosts(data)
											setReady(true)
										})
									}} />
								</View> 

							}
							data={posts}
							renderItem={({ item }) => (
								<Product
									name={item.title}
									owner={item.user.name}
									price={item.price}
									location={item.city}
									img={item.urls[0]}
									particulier={!item.user.accountType}
									p1={item.laivraison}
									p2={item.paiement}
									p3={item.negociable}
									p4={item.bonCondition}
									click={() => navigation.navigate('ProductDetails', { id: item.key })}
								/>
							)}
						onEndReached={()=>loadMore()}
						onEndReachedThreshold={0.01}
						ListFooterComponent={
							<ActivityIndicator color="#4898D3" size='large' animating={loading}  />
						}
					/>
				</View>
				) : (
						<ProgressBar color="#4898D3" style={{ height: 8 }} indeterminate={true} visible={true} />
					)}

			</View>
		</View>
	);
}
