import React from 'react'
import { StyleSheet, Text, View, Picker } from 'react-native';
import { TextInput, ProgressBar } from 'react-native-paper';
import { textTheme, GlobalStyle } from '../../../style/GlobalStyle';
import { db } from '../../../API/firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Phone(props) {
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
            etat: item.etat,
            description: item.description,
            phoneMarque:item.phoneMarque
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
                    <Text style={{ color: '#4898D3', marginTop: 5 }}>Etat</Text>
                    <View style={{
                        borderWidth: 1, borderColor: '#444', borderRadius: 4, marginTop: 5, marginVertical: 10,
                    }}>
                        
                        <Picker
                            selectedValue={item.etat}
                            prompt="Etat"
                            style={{ height: 50, width: '100%' }}
                            onValueChange={(itemValue, itemIndex) => setItem({ ...item, etat: itemValue })}
                        >
                            <Picker.Item label="Choissisez votre Etat" value="" />
                            <Picker.Item label="Neuf" value="neuf" />
                            <Picker.Item label="Utilisé" value="Utilisé" />
                        </Picker>
                    </View>
                    <Text style={{ color: '#4898D3', marginTop: 5 }}>Marque</Text>
                    <View
                        style={{ borderWidth: 1, borderColor: '#8C8C8C', borderRadius: 4,marginVertical:10 }}
                    >
                        <Picker
                            selectedValue={item.phoneMarque}
                            prompt="Marque"
                            style={{ height: 50, width: '100%' }}
                            onValueChange={(itemValue, itemIndex) => setItem({...item,phoneMarque:itemValue})}
                        >
                            <Picker.Item label="Choissisez votre marque" value="*" />

                            <Picker.Item label="SAMSUNG " value="SAMSUNG " />
                            <Picker.Item label="IPHONE" value="IPHONE" />
                            <Picker.Item label="Xiaomi" value="Xiaomi" />
                            <Picker.Item label="OPPO" value="OPPO" />
                            <Picker.Item label="HUAWEI" value="HUAWEI" />
                            <Picker.Item label="SONY" value="SONY" />
                            <Picker.Item label="NOKIA" value="NOKIA" />
                            <Picker.Item label="Asus" value="Asus" />
                            <Picker.Item label="Autre" value="Autre" />
                        </Picker>
                    </View>
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
