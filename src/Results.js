import React from 'react'
import { FlatList } from 'react-native';
import { db } from './API/firebase';
import Product from './components/Product'
import { ProgressBar } from 'react-native-paper'
import { View } from 'react-native-animatable';



export default function Results({ route, navigation }) {
    const [aResults, setResults] = React.useState([]);
    const [ready, setReady] = React.useState(false)

    const { filterOptions } = route.params
    React.useEffect(() => {
        const { selectedCategory, superCategory } = filterOptions
        setReady(true)
        switch (superCategory) {
            case 'VEHICULES':
                veheculesFilter(selectedCategory);
                break;
            case 'MAISON & DECO':
                maison_decoFilter(selectedCategory)
                break;
            case 'INFORMATIQUE ET ELECTRONIQUE':
                techFilter(selectedCategory)
                break;
            case 'ESPACE HOMMES':
                maison_decoFilter(selectedCategory)
                break;
            case 'ESPACE FEMMES':
                maison_decoFilter(selectedCategory)
                break;
            case 'ESPACE BEBES ET ENFANTS':
                maison_decoFilter(selectedCategory)
                break;
            case 'MATERIELS ET SERVICES':
                servicesFilter(selectedCategory)
                break;
            case 'IMMOBILIER':
                immobilierFilter(selectedCategory)
                break;
        }
        return () => { }
    }, [])

    const veheculesFilter = async (category) => {
        const {
            city, etat, marqueVoiture,
            carburant, transtaction, anneeMax,
            anneeMin } = filterOptions

        const items = []
        var postsRef = db.collection('posts').where('category.item', '==', category);

        //filter by city
        if (city != 'Toutes les villes') {
            postsRef = postsRef.where('city', '==', city)
        }

        //filter by condition
        if (etat != 'Neuf/Utilisé') {
            postsRef = postsRef.where('etat', '==', etat)
        }


        //filter by brand 
        if (marqueVoiture != '') {
            postsRef = postsRef.where('marqueVoiture', '==', marqueVoiture)
        }
        postsRef.get().then(snap => {
            snap.docs.forEach(d => {
                console.log(d.data().title);
            })
        })

        //filter by fuel
        if (carburant != '*') {
            postsRef = postsRef.where('carburant', '==', filterOptions.carburant)
        }

        //filter by Transaction 
        if (transtaction != '*') {
            postsRef = postsRef.where('transtaction', '==', transtaction)

        }

        // else if (puissance == '+10ch') postsRef = postsRef.where('puissance', '==', puissance)


        //fiter by price
        const results = postsRef.where('price', '>=', filterOptions.priceMin)
            .where('price', '<=', filterOptions.priceMax).get();


        (await results).docs
            .filter(doc => doc.data().fabrication >= anneeMin)
            .filter(doc => doc.data().fabrication <= anneeMax)
            .forEach(e => {
                console.log(e.data().title);
                items.push({
                    ...e.data(),
                    key: e.id
                })
            })

        setResults(items)
        setReady(true)

    }
    const immobilierFilter = async (category) => {
        const { city, priceMax, priceMin, SuperficieMax, SuperficieMin } = filterOptions;
        const items = []
        var postsRef = db.collection('posts').where('category.item', '==', category);
        //filter by city
        if (city != 'Toutes les villes') {
            postsRef = postsRef.where('city', '==', city)
        }

        //fiter by price
        const results = postsRef.where('price', '>=', priceMin)
            .where('price', '<=', priceMax).get();
        (await results).docs
            .filter(doc => doc.data().superficie >= SuperficieMin)
            .filter(doc => doc.data().superficie <= SuperficieMax)
            .forEach(doc => {
                console.log(doc.data().title);
                items.push({
                    ...doc.data(),
                    key: doc.id,
                })
            })
        setResults(items)
    }
    const maison_decoFilter = async (category) => {
        const { city, priceMax, priceMin, etat } = filterOptions;
        const items = []
        var postsRef = db.collection('posts').where('category.item', '==', category);
        //filter by city
        if (city != 'Toutes les villes') {
            postsRef = postsRef.where('city', '==', city)
        }

        //filter by condition
        if (etat != 'Neuf/Utilisé') {
            postsRef = postsRef.where('etat', '==', etat)
        }

        //fiter by price
        const results = postsRef.where('price', '>=', priceMin)
            .where('price', '<=', priceMax).get();
        (await results).docs.forEach(doc => {
            console.log(doc.data().title);
            items.push({
                ...doc.data(),
                key: doc.id,
            })
        })
        setResults(items)
    }
    const techFilter = async (category) => {
        const { city, priceMax, priceMin, marquePhone } = filterOptions;
        const items = []
        var postsRef = db.collection('posts').where('category.item', '==', category);
        //filter by city
        if (city != 'Toutes les villes') {
            postsRef = postsRef.where('city', '==', city)
        }

        //filter by brand
        if (marquePhone != '*') {
            postsRef = postsRef.where('marquePhone', '==', marquePhone)
        }

        //fiter by price
        const results = postsRef.where('price', '>=', priceMin)
            .where('price', '<=', priceMax).get();

        console.log((await results).size);
        (await results).docs.forEach(doc => {
            console.log(doc.data().title);
            items.push({
                ...doc.data(),
                key: doc.id,
            })
        })
        setResults(items)
    }
    const servicesFilter = async (category) => {
        const { city, priceMax, priceMin, etat, typeService } = filterOptions;
        const items = []
        var postsRef = db.collection('posts').where('category.item', '==', category);
        //filter by city
        if (city != 'Toutes les villes') {
            postsRef = postsRef.where('city', '==', city)
        }

        //filter by condition
        if (etat != 'Neuf/Utilisé') {
            postsRef = postsRef.where('etat', '==', etat)
        }
        //filter by type
        if (typeService != '*') {
            postsRef = postsRef.where('typeService', '==', typeService)
        }
        //fiter by price
        const results = postsRef.where('price', '>=', priceMin)
            .where('price', '<=', priceMax).get();
        (await results).docs.forEach(doc => {
            console.log(doc.data().title);
            items.push({
                ...doc.data(),
                key: doc.id,
            })
        })
        setResults(items)
    }
    const clothFilter = async () => {

    }
    return (
        <View style={{flex:1}} >
            {
                ready ? <FlatList
                    data={aResults}
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
                /> : <ProgressBar indeterminate={true} visible={true}/>
            }
        </View>
    )
}

