import React, { useState } from 'react';
import {View} from 'react-native';
import {textTheme} from '../style/GlobalStyle';
import {TextInput,Button} from 'react-native-paper';
import { db } from '../API/firebase';



export default function EditProductForm(props,route) {
    const [item, setItem] = React.useState({})
    const [title, setTitle] = useState('')
    const [loading, setLoading] = React.useState(false)
    React.useEffect(()=>{
        getItem().then(d=>{
            
            setItem(d)
        })
    },[])
const getItem = async()=>{
    const item = await db.collection('posts').doc(props.id).get()
    return item.data()
}
const updateItem =async()=>{
    console.log(item.title);
    // const item = await db.collection('posts').doc(props.id).update({ })
}
    return (
        <View>
        
            <TextInput
            label='Titre de votre annonce'
            mode='outlined'
            value={item.title}
            theme={textTheme}
            style={{marginBottom: 15}}
            onChangeText={(e)=>setItem({...item,title:e})}
            />
      

        
            <TextInput
            label='Prix de votre annonce'
            mode='outlined'
            value={item.price.toString()}
            keyboardType="numeric"
            theme={textTheme}
            style={{marginBottom: 15}}
            onChangeText={(e)=>setItem({...item,price:e})}
            />
        

        {item.Kilometrage ?
            <TextInput
            label='Kilometrage de votre VIHICULE'
            mode='outlined'
            value={item.kilometrage.toString()}
            keyboardType="numeric"
            theme={textTheme}
            style={{marginBottom: 15}}
            />
            : null
        }

        {item.fabrication ?
            <TextInput
            label='Année de Fabrication'
            mode='outlined'
            value={item.fabrication.toString()}
            keyboardType="numeric"
            theme={textTheme}
            style={{marginBottom: 15}}
            />
            : null
        }

        {item.superficie ?
            <TextInput
            label='Supperrficielle'
            mode='outlined'
            value={item.superficie.toString()}
            keyboardType="numeric"
            theme={textTheme}
            style={{marginBottom: 15}}
            />
            : null
        }

        {item.description ?
            <TextInput
            label='Description de votre annonce'
            mode='outlined'
            value={item.description}
            numberOfLines={4}
			maxLength={266}
            theme={textTheme}
            multiline={true}
            style={{marginBottom: 15}}
            onChangeText={(e)=>setItem({...item,description:e})}
            />
            : null
        }
            <Button
				mode='contained'
				uppercase={false}
				onPress={() => Alert.alert('update')}
            	color='#4898D3'
				dark={true}
                onPress={()=>updateItem()}
                >
			Valider le changement
			</Button>
        </View>
    )
}

