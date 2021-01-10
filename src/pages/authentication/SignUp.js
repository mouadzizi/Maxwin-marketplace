import React, { useState } from 'react';
import { View, Text, Alert, Dimensions, TouchableOpacity, Image, SafeAreaView, ScrollView, Picker } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import { textTheme } from '../../style/GlobalStyle';
import { auth, db } from '../../API/firebase';
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'
import * as Animatable from 'react-native-animatable';

export default function SignUp({ navigation }) {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { width, height } = Dimensions.get('window');
    const height_image = height * 0.35;
    const width_image = width * 0.55;
    const [showPass, setShowPass] = useState(true)
    const [token, setToken] = useState('')
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [owner, setOwner] = useState(true)


    React.useEffect(()=>{
        registerForPushNotificationsAsync().then(expoToken=>setToken(expoToken))
    },[])

    //firebase stuff
    const createUser = () => {
        setLoading(true)
        if (password === confPassword && password.match('')) {
            var errs = false
            auth.createUserWithEmailAndPassword(email, password)
                .catch(err => {
                    switch (err.code) {
                        case "auth/email-already-in-use":
                            setErrorMessage("Cet e-mail est déjà utilisée")
                            break;

                        case 'auth/invalid-email':
                            setErrorMessage("voulez-vous entrer un email valide exemple@mail.com")
                            break;

                        case 'auth/weak-password':
                            setErrorMessage("votre mot de passe est faible")
                            break;

                        default:
                            Alert.alert('Error', err.message)
                    }
                    setLoading(false)
                    errs = true
                })
                .then(() => {

                    if (auth.currentUser && !errs) {
                        auth.currentUser.updateProfile({
                            displayName: userName
                        })
                        setLoading(false)
                        saveUserInfo(auth.currentUser).then(() => navigation.replace('HomeTabs'))

                    }
                })
        }
        else {
            setErrorMessage("Le mot de passe ne correspond pas")
            setLoading(false)
        }

    }

    const saveUserInfo = async (user) => {
        await db.collection('users').doc(user.uid).set({
            uid: user.uid,
            name: userName,
            email: email,
            phone: '',
            location: '',
            aboutMe: '',
            accountType: owner,
            expoPushNotif: token,
            avatar:''
        })

    }


    async function registerForPushNotificationsAsync() {
        let token;
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        return token;
    }
    return (

        <SafeAreaView style={{ backgroundColor: '#fff', padding: 20 }} >
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>

                <Animatable.View
                    animation="fadeInUpBig"
                    duration={2000}
                    style={{ height: height * 0.20, backgroundColor: '#fff' }}>

                    <Image source={require('../../../assets/logo.png')}
                        style={{ height: height_image, width: width_image, alignSelf: 'center', marginTop: 15 }}
                        resizeMode={"stretch"}
                    />
                </Animatable.View>

                <Animatable.View
                    animation="fadeInUpBig"
                    duration={2000}
                    style={{ height: height * 0.75, marginTop: 20 }}>

                    <Text
                        style={{ color: 'red', alignSelf: 'center', marginBottom: 8 }}>{errorMessage}</Text>

                    <TextInput
                        label="Nom d'utilisateur"
                        mode='outlined'
                        placeholder='Votre surnom'
                        theme={textTheme}
                        onChangeText={name => setUserName(name)}
                        right={<TextInput.Icon name="face" color='#4898D3' />}
                    />

                    <TextInput
                        keyboardType='email-address'
                        label='E-mail'
                        mode='outlined'
                        placeholder='Votre-mail@mail.ma'
                        theme={textTheme}
                        style={{ marginTop: 10 }}
                        onChangeText={email => setEmail(email)}

                        right={<TextInput.Icon name="email" color='#4898D3' />}
                    />

                    <View style={{ borderWidth: 1, borderColor: '#8C8C8C', borderRadius: 4, marginTop: 10 }}>
                        <Picker
                            selectedValue={owner}
                            style={{ height: 50, width: '100%' }}
                            onValueChange={(itemValue, itemIndex) => setOwner(itemValue)}>

                            <Picker.Item label="Particulier" value={false} />
                            <Picker.Item label="Professionel" value={true} />
                        </Picker>
                    </View>

                    <TextInput
                        label='mot de passe'
                        mode='outlined'
                        theme={textTheme}
                        style={{ marginTop: 10 }}
                        secureTextEntry={showPass}
                        onChangeText={password => setPassword(password)}
                        right={<TextInput.Icon name={showPass ? 'eye-off' : 'eye'} color='#4898D3' onPress={() => setShowPass(!showPass)} size={30} />}
                    />

                    <TextInput
                        label='Confirmez le mot de passe'
                        mode='outlined'
                        returnKeyType='go'
                        onSubmitEditing={() => createUser()}
                        secureTextEntry={true}
                        theme={textTheme}
                        style={{ marginTop: 10 }}
                        onChangeText={text => setConfPassword(text)}
                        right={<TextInput.Icon name="lock" color='#4898D3' />}
                    />

                    <Button
                        mode='contained'
                        uppercase={false}
                        style={{ alignSelf: 'center', marginTop: 50, width: '100%' }}
                        loading={loading}
                        onPress={() => createUser()}
                        color='#4898D3'
                        disabled={(!email || !password || !confPassword) || loading}
                        dark={true}>
                        Creé votre compte
                    </Button>

                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }} >
                        <Text>Vous avez déjà un compte?</Text>
                        <TouchableOpacity
                            onPress={() => navigation.replace('SignIn')}>
                            <Text style={{ color: '#4898D3', fontWeight: 'bold' }}>   Se Connecter</Text>
                        </TouchableOpacity>
                    </View>

                    <Text
                        style={{ fontSize: 12, marginTop: 15, color: '#c2c2c2', textAlign: 'center' }}>
                        en créant ce compte, vous acceptez les
                    </Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }} >

                        <TouchableOpacity
                            onPress={() => navigation.push('Privacy')}>
                            <Text style={{ color: '#8C8C8C', fontWeight: 'bold', fontSize: 12, }}> politiques de confidentialité </Text>
                        </TouchableOpacity>
                        <Text
                            style={{ fontSize: 12, color: '#c2c2c2', textAlign: 'center' }}>
                            de MaxWin
                        </Text>
                    </View>


                </Animatable.View>



            </ScrollView>
        </SafeAreaView>
    );
}

