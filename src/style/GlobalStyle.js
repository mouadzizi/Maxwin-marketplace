import {StyleSheet} from 'react-native';

export const GlobalStyle = StyleSheet.create({

  //Global Container
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    //Splash page
    dot:{
      backgroundColor: 'grey',
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 5,
      marginVertical: 3,
    },

    dotActive:{
      backgroundColor: '#4898D3',
      width: 15,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 5,
      marginVertical: 3,
    },

    splashText:{
      color: 'grey',
      marginTop: 30,
      fontSize: 17,
      textAlign: 'center',
    },

    splashHeadTitle:{
      fontSize: 30,
      fontFamily: 'serif',
      color: '#4898D3',
      textAlign: 'center',
      marginTop: 50,
    },
    
    swiperContainer: {
      marginHorizontal : 30
    },

    //Button Style Global
    BouttonStyle :{
      backgroundColor: '#4898D3',
      borderRadius: 30,
      width: '90%',
      height: 50,
      marginBottom: 35,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },

    BouttonStyleOutlined :{
      borderColor: '#4898D3',
      borderRadius: 30,
      borderWidth: 2,
      width: '90%',
      height: 50,
      marginBottom: 35,
      justifyContent: 'center',
      alignItems: 'center',
    },

    BouttonStyleText:{
      fontWeight: 'bold',
      fontSize: 16,
      color: 'white',
      alignSelf: 'center'
    },

    BouttonStyleTextOutlined:{
      fontWeight: 'bold',
      fontSize: 16,
      color: '#4898D3',
      alignSelf: 'center'
    },

    signInBoutton:{
      backgroundColor: '#4898D3',
      borderRadius: 30,
      width: '90%',
      height: 50,
      marginBottom: 35,
      justifyContent: 'center',
      alignItems: 'center',
    },

    signInText:{
      fontWeight: 'bold',
      fontSize: 16,
      color: 'white',
      alignSelf: 'center'
    },

    btn:{
      backgroundColor: '#4898D3',
      borderRadius: 30,
      height: 40,
      marginTop: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },

    text:{
      fontWeight: 'bold',
      fontSize: 16,
      color: 'white',
      alignSelf: 'center'
    },

    //Profile 

    usernameProfil:{
      color: '#4898D3',
      fontSize: 17,
      marginBottom: 10,
      textAlign: 'center',
      fontWeight: 'bold',
    },

    numberPosts:{
      fontWeight: 'bold',
      fontSize: 20,
      color: '#4898D3',
    },

    posts:{
      fontSize: 20,
      fontWeight: '300',
      marginLeft: 10,
    },

    h1:{
      fontSize: 18,
      fontFamily: 'serif',
    },
    
    p:{
      fontSize: 12,
      fontFamily: 'Roboto',
    },

    card: {
      flexDirection: 'row',
      backgroundColor: '#fff'
    },

    cardImgWrapper: {
      flex: 6,
      borderColor: '#ccc',
      borderWidth: 0.5,
      borderRightWidth: 0,
      backgroundColor: '#fff',
    },

    cardImg: {
      height: '95%',
      width: '95%',
      alignSelf: 'center',
      borderTopLeftRadius: 15,
      borderBottomRightRadius: 15,
      marginTop: 3,
      
    },
    
    cardInfo: {
      flex: 8,
      padding: 10,
      borderColor: '#ccc',
      borderWidth: 0.5,
      borderLeftWidth: 0,
      backgroundColor: '#fff',
    },

    cardTitle: {
      fontSize: 17,
      fontFamily: 'Roboto',
    },

    cardPrice: {
      fontSize: 16,
      fontWeight: '700',
      color: '#F16E44'
    },

    cardDetails: {
      fontSize: 12,
      color: '#444',
    },

    cardOwner: {
      color: '#767676',
      fontSize: 12,
      alignSelf: 'center',
      marginLeft: 4
    },

    cardLocation: {
      color: '#767676',
      fontSize: 12, 
      alignSelf: 'center', 
      marginLeft: 2,
    },

    cardChip: {
      color: '#767676', 
      fontSize: 12,
      alignSelf: 'center', 
      marginLeft: 2,
      fontFamily: 'sans-serif' ,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    

    sliderContainer: {
      height: 300,
      width: '90%',
      marginTop: 10,
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: 8,
    },
  
    slide: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderRadius: 8,
    },
    sliderImage: {
      height: '100%',
      width: '100%',
      alignSelf: 'center',
      borderRadius: 8,
      
    },

    infoContainer:{
      width: '95%',
      borderRadius: 10,
      paddingLeft: 20,
      paddingBottom: 5,
      paddingTop: 5,
      alignSelf: 'center',
      backgroundColor: '#fff',
      marginTop: 10,
    },
    modalView: {
    width: '92%',
    backgroundColor: "white",
    borderRadius: 15,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
    },

    modalContainer:{
      flex: 1,
      alignItems: "center",
      padding: 15,
      marginBottom: 100,
    },
    Grid:{
      alignItems: 'center',
      margin: 10
    },
    item:{
      backgroundColor: 'grey',
      margin: 5,
      width: 90,
      color: 'white'
    },
  });

  export const textTheme ={
    colors:{
      primary:'#4898D3',
      background: '#fff',

    },
  }
    export const colors ={
        primary:'#4898D3',
        second: '#F16E44'
    }

