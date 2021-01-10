import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, Dimensions, Keyboard, SafeAreaView, ScrollView } from 'react-native';
import { TextInput, Button, ActivityIndicator, Divider } from 'react-native-paper';
import { GlobalStyle, textTheme } from '../../style/GlobalStyle';
import { db, auth } from '../../API/firebase';
import firebase from 'firebase';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Facebook from 'expo-facebook';
import AsyncStorage from '@react-native-community/async-storage';
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'
import * as Animatable from 'react-native-animatable';

export default function SignIn({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [loading, setLoading] = useState(false)
  const [gLoading, setGLoading] = useState(false)
  const [fbLoading, setFBLoading] = useState(false)
  const [showPass,setShowPass]=useState(true)
  const [token,setToken]=useState('');

  const { width, height } = Dimensions.get('window');
  const height_image = height * 0.3;
  const width_image = width * 0.6;

  useEffect(() => {
    registerForPushNotificationsAsync().then(token=>setToken(token))
    return () => {

    }
  }, [])

  //firebase SignIn
  const SignIn = () => {
    setLoading(true)
    var isErr = false
    Keyboard.dismiss()
    auth.signInWithEmailAndPassword(email.trim(), password)
      .catch(err => {
        switch (err.code) {
          case 'auth/invalid-email':
            setErrorMessage('email invalide')
            break;
          case 'auth/user-not-found':
            setErrorMessage("Aucun compte n'a cette email")
            break;
          case 'auth/wrong-password':
            setErrorMessage('mode de passe invalide')
            break;
            default:
              setErrorMessage(err.code)
        }
        setLoading(false)
        isErr = true;
      })
      .then(() => {
        if (auth.currentUser && !isErr) {
          setLoading(false)
          db.collection('users').doc(auth.currentUser.uid).update({
            expoPushNotif:token
          })
          navigation.replace('HomeTabs')
        }
      })
  }

  async function signInWithGoogleAsync() {
    setGLoading(true)
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        onSignIn(user)
      } else {
        setGLoading(false)
      }
    } catch (e) {
      setGLoading(false)
      Alert.alert('Google Error', JSON.stringify(e))

    }
  }

  const onSignIn = (googleUser) => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = auth.onAuthStateChanged(function (firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.auth.idToken, googleUser.auth.accessToken);
        // Sign in with credential from the Google user.
        auth.signInAndRetrieveDataWithCredential(credential)
          .then(() => {
            saveUserInfo(auth.currentUser).then(async() =>{
              await db.collection('users').doc(auth.currentUser.uid).update({
                expoPushNotif:token
              })
              navigation.replace('HomeTabs')
          })
            setGLoading(false)
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            console.log(errorCode);
            var errorMessage = error.message;
            console.log(errorMessage);
            Alert.alert('Firebase Error', JSON.stringify(error))
            // The email of the user's account used.
            var email = error.email;
            console.log(email);
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(credential)
            setGLoading(false)
          });
      } else {
        setErrorMessage('user already singed in')
      }
    });
  }

  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  async function signInWithFacebook() {
    setFBLoading(true)
    try {
      await Facebook.initializeAsync('424654075104803');
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email']
      });
      if (type === 'success') {
        await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        await auth.signInWithCredential(credential)
          .then((userCredential) => {
            const fbID = userCredential.user.providerData[0].uid
            setFBLoading(false)
            storeData(token)
            fetch(`https://graph.facebook.com/${fbID}/picture?type=normal`).then(response => {
              userCredential.user.updateProfile({
                photoURL: response.url
              })
            })
            saveUserInfo(auth.currentUser).then(async() => {
              await db.collection('users').doc(auth.currentUser.uid).update({
                expoPushNotif:token
              })
              navigation.replace('HomeTabs')
          })
          });

      }
      if (type === 'cancel') {
        setFBLoading(false)
      }
    } catch (e) {
      Alert.alert('Facebook Login Error:', e.message);
      setFBLoading(false)
    }
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('userToken', value)
    } catch (e) {

    }
  }

  const saveUserInfo = async (user) => {
    await db.collection('users').doc(user.uid).set({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      phone: '',
      location: '',
      aboutMe: '',
      accountType:'Particulier',
      expoPushNotif:token,
      avatar:''
    })
  };

  
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
    <View
    style={{flex: 1, backgroundColor: '#fff', padding: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Animatable.View 
        animation="fadeInUpBig"
        duration={2000}
        style={{flex: 1, backgroundColor: '#fff'}}>

          <Image source={require('../../../assets/logo.jpg')}
            style={{ height: height_image, width: width_image, alignSelf: 'center', marginTop: 15 }}
            resizeMode={"stretch"}
          />
        </Animatable.View>

        <TouchableOpacity
          disabled={gLoading}
          style={{ flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: '#4898D3', borderRadius: 5 }}
          onPress={() => signInWithGoogleAsync()}>
          <ActivityIndicator style={{ position: 'absolute', right: "10%", top: '20%' }} animating={gLoading} size='small' color='#fff' />
          <Image source={require('../../../assets/google-icon.png')}
            style={{ height: 25, width: 25, backgroundColor: '#fff', margin: 10 }}
          />
          <Text style={GlobalStyle.signInText}>  Se Connecter avec Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => signInWithFacebook()}
          style={{ flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: '#4267B2', borderRadius: 5, marginTop: 10 }} >
          <ActivityIndicator style={{ position: 'absolute', right: "10%", top: '20%' }} animating={fbLoading} size='small' color='#fff' />
          <Image source={require('../../../assets/facebook-icon.png')}
            style={{ height: 25, width: 25, backgroundColor: '#fff', margin: 10 }}
          />
          <Text style={GlobalStyle.signInText}>  Se Connecter avec Facebook</Text>
        </TouchableOpacity>



        <Text style={{ textAlign: 'center', color: '#C2C2C2', marginTop: 15, marginBottom: 5 }}> Ou connectez-vous avec E-mail </Text>

        <Divider />
        <Text
        style={{color:'red', alignSelf: 'center'}}
        >{errorMessage}</Text>
        <View style={{ flex: 4, marginTop: 5 }}>
        
          <TextInput
            label='E-mail'
            autoCapitalize="none"
            mode='outlined'
            placeholder='votre-mail@mail.com'
            theme={textTheme}
						right={ <TextInput.Icon name="email-check-outline" color='#4898D3'/> }
            onChangeText={email => setEmail(email)} />

          <TextInput
            label='mot de passe'
            mode='outlined'
            placeholder="Enter votre mot de passe"
            autoCapitalize="none"
            returnKeyType='go'
            onSubmitEditing={() => SignIn()}
            theme={textTheme}
            secureTextEntry={showPass}
            style={{ marginTop: 20 }}
            onChangeText={pass => setPassword(pass)}
            right={<TextInput.Icon name={showPass? 'eye-off':'eye'} color='#4898D3'  onPress={()=>setShowPass(!showPass)} size={30} />} />

          <TouchableOpacity
            onPress={() => alert('comming up on the next virsion')}>
            <Text style={{
              marginTop: 15,
              fontWeight: 'bold',
              color: '#4898D3',
            }}>Oublie mon mot de passe ?</Text>
          </TouchableOpacity>

          <Button
            mode='contained'
            uppercase={false}
            style={{ alignSelf: 'center', marginVertical: 10, marginHorizontal: 20, width: '100%', height: 40 }}
            loading={loading}
            onPress={() => SignIn()}
            color='#4898D3'
            disabled={(!email || !password) || loading}
            dark={true}>
            Se Connecter
        </Button>

          <View style={{ flexDirection: 'row', marginVertical: 20, justifyContent: 'center' }} >
            <Text>vous n'avez pas de compte? </Text>
            <TouchableOpacity
              onPress={() => navigation.replace('register')}>
              <Text style={{ color: '#4898D3', fontWeight: 'bold' }}>   S'inscrire</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>

  );
}