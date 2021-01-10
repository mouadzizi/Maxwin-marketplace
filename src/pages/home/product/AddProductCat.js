import React from 'react';
import { SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from 'react-native-vector-icons';
import { DATA, ItemHeader, Item } from '../Data';

export default function AddProductCat({ navigation, route }) {
	
	const getIcon = (title) => {
		switch (title) {
			case 'VEHICULES':
				return <FontAwesome5 name="car" size={27} color="#fff" />;
			case 'INFORMATIQUE ET ELECTRONIQUE':
				return <MaterialCommunityIcons name="desktop-mac-dashboard" size={27} color="#fff" />;
			case 'IMMOBILIER':
				return <FontAwesome5 name="building" size={23} color="#fff" />;

			case 'ESPACE HOMMES':
				return <Ionicons name="md-man" size={30} color="#fff" />;
			case 'ESPACE FEMMES':
				return <Ionicons name="md-woman" size={30} color="#fff" />;
			case 'ESPACE BEBES ET ENFANTS':
				return <MaterialCommunityIcons name="baby-carriage" size={30} color="#fff" />;

			case 'MAISON & DECO':
				return <MaterialCommunityIcons name="lamp" size={27} color="#fff" />;
			case 'MATERIELS ET SERVICES':
				return <FontAwesome5 name="hammer" size={22} color="#fff" />;
		}
	};

	const action = (item, title) => {
		navigation.navigate('AddProduct', { parent: {item, title} });
	};

	return (
		<SafeAreaView>
			<SectionList
				sections={DATA}
				keyExtractor={(item, index) => item + index}
				renderItem={({ item, section: {title} }) => <Item action={() => action(item, title)} title={item} />}
				renderSectionHeader={({ section: { title } }) => <ItemHeader icon={getIcon(title)} title={title} />}
			/>
		</SafeAreaView>
	);
}
