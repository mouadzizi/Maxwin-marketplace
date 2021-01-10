import React from 'react'
import { StyleSheet, Text, View, Picker } from 'react-native';
import { TextInput, ProgressBar } from 'react-native-paper';
import { textTheme, GlobalStyle } from '../../../style/GlobalStyle';
import { db } from '../../../API/firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Appartement(props) {
    const [item, setItem] = React.useState({})
    const post_id = props.id
    const [ready, setReady] = React.useState(false)

    React.useEffect(() => {
        getItem().then(post => {
            setItem(post)
            setReady(true)
        })
    }, [])

    const getItem = async () => {
        const dbPost = await db.collection('posts').doc(post_id).get()
        return dbPost.data();
    }
    const update = async () => {
        await db.collection('posts').doc(post_id).update({
            title: item.title,
            price: parseInt(item.price),
            piece: item.piece? parseInt(item.piece) : 0,
            superficie:item.superficie? parseInt(item.superficie):0,
            description: item.description,
        })
    }
    return (
        <View>
            {ready ?
                <View style={styles.form} >
                    <Text> Category : {item.category.item} </Text>
                    <TextInput
                        style={styles.input}
                        theme={textTheme}
                        value={item.title}
                        label='Titre'
                        mode='outlined'
                        onChangeText={(e => setItem({ ...item, title: e }))}
                    />
                    <TextInput
                        style={styles.input}
                        theme={textTheme}
                        value={item.price.toString()}
                        label='Prix'
                        mode='outlined'
                        onChangeText={(e => setItem({ ...item, price: e }))}
                    />
                    <View style={{ borderWidth: 1, borderColor: '#444', borderRadius: 4, marginTop: 10, marginVertical: 10 }}>
                        <Picker
                            mode="dropdown"
                            selectedValue={item.piece}
                            style={{ height: 50, width: '100%' }}
                            onValueChange={(itemValue, itemIndex) => setItem({...item,piece:itemValue})}
                        >
                            <Picker.Item label="Nombre de piece" value="*" />
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4 et plus" value="4" />
                        </Picker>
                    </View>
                    <TextInput
                        label="Superficie"
                        mode="outlined"
                        placeholder="(m²)"
                        theme={textTheme}
                        value={item.superficie.toString()}
                        keyboardType="numeric"
                        style={{ marginTop: 10 }}
                        onChangeText={(e)=>setItem({...item,superficie:e})}
                    />
                    <TextInput
                        style={styles.input}
                        theme={textTheme}
                        value={item.description}
                        label='Description'
                        mode='outlined'
                        
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(e => setItem({ ...item, description: e }))}
                    />

                    <TouchableOpacity
                    onPress={() => update()} mode='contained'
                    style={GlobalStyle.BouttonStyle}>
                    <Text style={GlobalStyle.BouttonStyleText}>Modifier</Text>
                    </TouchableOpacity>

                </View> :
                <ProgressBar indeterminate={true} visible={true} />}
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        justifyContent: 'space-around',
        flex: 1
    },
    input: {
        marginVertical: 10,
    }
})
