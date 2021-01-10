import React from 'react'
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Button, TextInput, ProgressBar } from 'react-native-paper';
import { textTheme } from '../../../style/GlobalStyle';
import { db } from '../../../API/firebase';

export default function Services(props) {
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
            servicetype:item.servicetype
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
                    <Text style={{ color: '#4898D3', marginTop: 5 }}>Type de service</Text>
                    <View style={{ borderWidth: 1, borderColor: '#8C8C8C', borderRadius: 4, marginTop: 5 }}>
                        <Picker

                            selectedValue={item.servicetype}
                            prompt="Type de service"
                            style={{ height: 50, width: '100%' }}
                            onValueChange={(itemValue, itemIndex) => setItem({...item,servicetype:itemValue})}
                        >
                            <Picker.Item label="Choisissez le type de Service" value="*" />
                            <Picker.Item label="Alarme & sécurité" value="Alarme & sécurité" />
                            <Picker.Item label="Electricien " value="Electricien" />
                            <Picker.Item label="Jardinier" value="Jardinier" />
                            <Picker.Item label="Informatique " value="informatique" />
                            <Picker.Item label="Maçonnerie" value="Maçonnerie" />
                            <Picker.Item label="Menuisier" value="Menuisier" />
                            <Picker.Item label="Peinture" value="Peinture" />
                            <Picker.Item label="Tapisserie" value="Tapisserie" />
                            <Picker.Item label="Plombier" value="Plombier" />
                            <Picker.Item label="Soudeur" value="Soudeur" />
                            <Picker.Item label="Vitre" value="Vitre" />
                            <Picker.Item label="AUTRES" value="AUTRES" />
                        </Picker>
                    </View>
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
                    <TextInput
                        style={styles.input}
                        theme={textTheme}
                        value={item.description}
                        label='Description'
                        mode='outlined'
                        onChangeText={(e => setItem({ ...item, description: e }))}
                    />

                    <Button onPress={() => update()} mode='contained' >
                        Modifier
                    </Button>
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
