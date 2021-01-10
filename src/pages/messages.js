import React from 'react'
import { View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { GiftedChat,Bubble,Send } from 'react-native-gifted-chat';
import { db, auth } from '../API/firebase';
import * as firebase from 'firebase'

export default function messages({ route }) {

    const [messages, setMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(false)
    const [contact, setContact] = React.useState({})
    const chatRef = db.collection('chats')
    const user = auth.currentUser
    const { seller } = route.params

    React.useEffect(() => {
        
        getContact().then(c=>{
            setContact(c)
            console.log(c);
        })
        var unsub = chatRef.doc(chatId()).collection('messages').orderBy('serverTime','desc').onSnapshot((querySnap) => {
            setMessages([])
            const firestoreMessages = querySnap
                .docs
                .map(( doc ) => {
                    const dbMessage = doc.data()
                    return { ...dbMessage, createdAt: dbMessage.createdAt.toDate() }
                })
            appendMessages(firestoreMessages)
            setLoading(false)
        })
        return () => {
            unsub()
        }
    }, [])

    const getContact = async ()=>{
        const dbData = await db.collection('users').doc(seller).get()
        return {
            _id:dbData.data().uid,
            name : dbData.data().name,
            avatar :dbData.data().avatar,
            expoPushNotif:dbData.data().expoPushNotif
        }
    }
    async function sendMessage(messages) {
        db.collection('chats')
            .doc(chatId()).set({
                sender: user.displayName,
                senderUID:user.uid,
                senderPhotoUrl:user.photoURL,
                contact:contact,
                lastMessage:messages[0].text,
                
            })
        const writes = messages.map((m) => {
            db.collection('chats')
                .doc(chatId())
                .collection('messages')
                .add({...m,serverTime:firebase.firestore.FieldValue.serverTimestamp()})
        })
        await Promise.all(writes)
    }

    const appendMessages = React.useCallback((messages) => {
        setMessages(prevMsg => GiftedChat.append(prevMsg, messages))
    })


    const chatId = () => {
        if (user.uid > seller) return `${user.uid}-${seller}`
        else return `${seller}-${user.uid}`;
    }

    return (
        <View style={{ flex: 1 }}>
            {           loading ? <ProgressBar color='blue' indeterminate={true} visible={true} /> : null
            }
            <GiftedChat
            placeholder="Tapper un message"
                renderBubble = { props =>
                    <Bubble
                    {...props}
                    timeTextStyle={{
                    left: {
                        color: 'white',
                    }, }}


                    textStyle={{
                      left: {
                        color: 'white',
                      },
                    }}
                    wrapperStyle={{
                      left: {
                        backgroundColor: '#F16E44',                    
                      },
                      right :{
                          backgroundColor : '#4898D3'
                      }
                    }}
                  />
                }
                renderSend={props=> 
                <Send {...props} alwaysShowSend={true} label='Envoyer' textStyle={{color:'red'}} />
                }
                messages={messages
                }
                onSend={(messages) => sendMessage(messages)}
                user={{
                    _id: user.uid,
                    name: user.displayName,
                    avatar: user.photoURL
                }} />
        </View>
    )
}
