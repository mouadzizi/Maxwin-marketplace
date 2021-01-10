import React,{useState,useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth,db } from '../API/firebase';
import * as Google from 'expo-google-sign-in';
import AsyncStorage from '@react-native-community/async-storage';

import { 
    Title,
    Drawer,
} from "react-native-paper";


export default function DrawerContent(props){
    const [provider, setProvider] = useState('')
    const [userToken, setUserToken] = useState('')
    const [uid, setUID] = useState('')
    const [user,setUser]=useState({
        name:'',
        accountType:'',
      
    })

    useEffect(() => {
        var unsub = auth.onAuthStateChanged(user => {
            if (user) {
                user.providerData.forEach(e => {
                    setProvider(e.providerId)
                })
            }
            if (!user) props.navigation.replace('Splash')
        })
        getData();
        db.collection('users').doc(auth.currentUser.uid).get().then(snap=>{
           setUser({
               name:snap.data().name,
                accountType:snap.data().accountType
            })
        })
        return () => {
            unsub();
        }
    }, [])

    const logOut = () => {
        auth.signOut()
            .then(() => {
                provider === 'google.com' ? Google.signOutAsync() : faceBookLogOut();
            })
            .catch(err => { Alert.alert('Error', err.message) })
    }

    const faceBookLogOut = async () => {
        try {
            await fetch(`https://graph.facebook.com/me/permissions?method=delete&access_token=${userToken}`)
                
                .catch(err => alert(err.message))
        }
        catch (e) {
            alert(e.message)
        }

    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('userToken')
            if (value !== null) {
                setUserToken(value)
            }
        } catch (e) {
            alert('err' + e.message)
        }
    }
    
    return(
        <View style={{flex:1}}>
        <DrawerContentScrollView {...props}>

        {/* this section for header Drawer */}
        <View style={styles.DrawerContent}>
            <View style={styles.userInfoSection}>


                <View style={{marginLeft:15,marginTop: 15,flexDirection: 'column'}}>
                    <Title style={styles.title}> {user.name} </Title>
                </View>
            </View>

            {/* this section for pages */}
            <Drawer.Section style={styles.drawerSection}>
            
            <DrawerItem
            icon={({size}) =>(
                <Icon
                    name="home-outline"
                    color='black'
                    size={size}
                />
            )}
            label="Accueil"
            onPress={()=>{props.navigation.navigate('DashStack')}}
            />

        <DrawerItem
            icon={({size}) =>(
                <Icon
                    name="lock-outline"
                    color='black'
                    size={size}
                />
            )}
            
            onPress={()=>{props.navigation.navigate('Privacy')}}
            label="Conditions générales"
        />

        <DrawerItem
            icon={({size}) =>(
                <Icon
                    name="mail"
                    color='black'
                    size={size}
                />
            )}
            
            onPress={()=>{props.navigation.navigate('Contact')}}
            label="Contactez-nous"
        />

        </Drawer.Section>
        </View>

        </DrawerContentScrollView>


        <Drawer.Section style={styles.bottomDrawerSection}>
    

        <DrawerItem
            icon={({color, size}) =>(
                <Icon
                    name="exit-to-app"
                    color='white'
                    size={size}
                />
            )}
            label="Déconnecter"
            inactiveTintColor='white'
            onPress={()=> logOut()}
        />

        </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    DrawerContent: {
        flex: 1,
    },
    userInfoSection:{
        flexDirection: 'row',
        paddingLeft: 20,
    },
    title:{
        fontSize:16,
        marginTop:3,
        fontWeight: 'bold',
    },
    caption:{
        fontSize:14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        marginRight: 15, 
    },
    section:{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph:{
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection:{
        marginTop:15,
    },
    bottomDrawerSection:{
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        backgroundColor: '#F16E44'
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },

})