import React from 'react';
import { Text, SafeAreaView, View, InteractionManager, FlatList, Dimensions, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { auth, db } from '../../API/firebase';
import ProduitEdit from '../../components/ProductEdit';

export default function Items({ navigation }) {
	const [ items, setItems ] = React.useState([]);
	const [ refresh, setRefresh ] = React.useState(false);
	const [ ready, setReady ] = React.useState(false);

	useFocusEffect(
		React.useCallback(() => {
			InteractionManager.runAfterInteractions(async () => {
				await fetchItems().then(() => setReady(true));
			});
		}, [])
	);

	const fetchItems = async () => {
		var posts = [];
		setRefresh(true);
		await db
			.collection('posts')
			.where('user._id', '==', auth.currentUser.uid)
			.get()
			.then((snap) => {
				snap.forEach((s) => {
					posts.push({
						title: s.data().title,
						price: s.data().price,
						owner: s.data().user.owner,
						city: s.data().city,
						key: s.id,
						pics: s.data().urls,
						cat:s.data().category.item
					});
				});
				setRefresh(false);
			})
			.catch((e) => {
				console.log(e.message);
			});
		setItems(posts);
		return items;
	};
	const removeItem = async (id) => {
		await db.collection('posts').doc(id).delete().then(() => {
			console.log(id);
		});
	};
	
	const { width, height } = Dimensions.get('window');
	const height_image = height * 0.6;
	const width_image = width;

	return (
		<SafeAreaView 
		style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>

			{ready ? (
				<FlatList
					data={items}
					renderItem={({ item }) => {
						return (
							<ProduitEdit
								callback={() =>
									removeItem(item.key).then(() => {
										fetchItems();
									})}
								goEdit={() =>
									navigation.navigate('EditProduct',{item_id:item.key,cat:item.cat})
								}
								item={item}
							/>
						);
					}}
					ListEmptyComponent={() => (
						<View>
							<Image
							source={require('../../../assets/no-item.jpg')}
							style={{ height: height_image, width: width_image, alignSelf: 'center', marginTop: 15 }}
							resizeMode={'stretch'}/>
						<Text
						style={{textAlign: 'center', color: '#4898D3', fontSize: 30, fontFamily: 'serif'}}>Actuellement ,votre Boutique est vide.</Text>
						</View>
					)}
					onRefresh={fetchItems}
					refreshing={refresh}
				/>
			) : null}

		</SafeAreaView>
	);
}
