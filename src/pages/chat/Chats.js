import * as React from 'react';
import { FlatList, View, Text, Image, Dimensions } from 'react-native';
import ChatIndicator from '../../components/ChatIndicator';
import { useFocusEffect } from '@react-navigation/native'
import { db, auth } from '../../API/firebase'

export default function Chats({ navigation }) {
    const [conversations, setConversations] = React.useState([])
    const { uid } = auth.currentUser

    const { width, height } = Dimensions.get('window');
    const height_image = height * 0.6;
    const width_image = width;



    React.useEffect(() => {
        //Retrieve the reciever
        const _unsub = db.collection('chats').onSnapshot(querySnapShot=>{
            const rooms = querySnapShot.docs.filter(doc=>doc.id.search(uid)>=0).map(d=>{
                return {
                    key:d.id,
                    ...d.data()
                }
            })
            setConversations(rooms)
        })
        return () => {
            _unsub()
            setConversations([])
        }
    }, [])



    return (
        <View
            style={{ backgroundColor: '#fff', flex: 1 }}>
            <FlatList
                data={conversations}
                renderItem={({ item }) =>
                    <ChatIndicator
                        sellerAvatar={(uid===item.senderUID)?item.contact.avatar:item.senderPhotoUrl}
                        click={() => navigation.navigate('Messages', { seller: (uid === item.senderUID) ? item.contact._id : item.senderUID })}
                        lastMessage={item.lastMessage} sellerName={(uid === item.senderUID) ? item.contact.name : item.sender} />
                }

                ListEmptyComponent={() => (
                    <View>
                        <Image
                            source={require('../../../assets/slide3.jpg')}
                            style={{ height: height_image, width: width_image, alignSelf: 'center', marginTop: 15 }}
                            resizeMode={'stretch'} />
                        <Text
                            style={{ textAlign: 'center', color: '#4898D3', fontSize: 20, fontFamily: 'serif' }}>Actuellement ,votre Chat lsit est vide.</Text>
                    </View>
                )}
            />
        </View>

    )
}