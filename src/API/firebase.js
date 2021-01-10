import firebase from 'firebase';
import 'firebase/firestore';


const firebaseConfig = {
	apiKey: "AIzaSyD3sm4m7T6vruMxTnzMEr_OdW1Ewugk8KI",
	authDomain: "maxwinapp-2020.firebaseapp.com",
	projectId: "maxwinapp-2020",
	storageBucket: "maxwinapp-2020.appspot.com",
	messagingSenderId: "1091885761805",
	appId: "1:1091885761805:web:2354f29da8566da19adc44",
	measurementId: "G-SQXS0CCERR"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();
export const st = app.storage();
