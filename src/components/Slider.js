import React from 'react'
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'
import Swiper from 'react-native-swiper';
import {GlobalStyle} from '../style/GlobalStyle'

export default function Slider() {

	const { width, height } = Dimensions.get('window');
	const height_image = height * 0.3;
    const width_image = width * 0.6;
    
    const image1 = '../../assets/logo.jpg';
    const image2 = '../../assets/slide1.jpg';
    const image3 = '../../assets/slide3.jpg';
    const image4 = '../../assets/slide2.jpg';

    const styles = StyleSheet.create({
        imagesSlide: {
            height: height_image, 
            width:  width_image, 
            alignSelf: 'center', 
            marginTop: 15 
        }
    })

    return (
        <Swiper
        loop={false}
        style={{ backgroundColor: 'white' }}
        dot={<View style={GlobalStyle.dot} />}
        activeDot={<View style={GlobalStyle.dotActive} />}
        >

        {/* Swiper number 1 */}
        <View style={GlobalStyle.swiperContainer}>

            <Image
                source={require(image1)}
                style={styles.imagesSlide}
                resizeMode={'stretch'}
            />

            <Text style={GlobalStyle.splashText}> Vendez ou achetez gratuitement et facilement sur Maxwin </Text>
        </View>

        {/* Swiper number 2 */}

        <View style={GlobalStyle.swiperContainer}>

            <Image
                source={require(image2)}
                style={styles.imagesSlide}
                resizeMode={'stretch'}
            />

            <Text style={GlobalStyle.splashText}>
                Maxwin est une application qui vous facilite la vente de vos produits , publiez vos articles et
                augmenter vos revenus.{' '}
            </Text>
        </View>

        {/* Swiper number 3 */}

        <View style={GlobalStyle.swiperContainer}>

            <Image
                source={require(image3)}
                style={styles.imagesSlide}
                resizeMode={'contain'}
            />

            <Text style={GlobalStyle.splashText}>
                L'application Maxwin permet un contact instantané entre vendeur et acheteur.
            </Text>
        </View>

        {/* Swiper number 4 */}

        <View style={GlobalStyle.swiperContainer}>

            <Image
                source={require(image4)}
                style={styles.imagesSlide}
                resizeMode={'stretch'}
            />

            <Text style={GlobalStyle.splashText}>
                {' '}
                Sur la platforme Maxwin vous trouverez tout ce que vous cherchez.
            </Text>
        </View>
    </Swiper>
    )
    
}
