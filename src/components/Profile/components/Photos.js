import React, { memo, useContext } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { Ionicons, MaterialIcons,Feather,FontAwesome } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../../../context/AppContext';
import { styles } from '../../styles';
const Photos = memo((props) => {
    const {profileOwner,activeProfile,page} = props?.data;
    const photosArray = activeProfile.photos;
    const {appState:{handleUploadPhotos}} = useContext(AppContext)
    return (
        <Animatable.View animation="bounceIn" duration={1000} useNativeDriver={true} style={{padding:5 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {photosArray.length > 0 && photosArray.map((item, i) => (
                    <TouchableOpacity key={i} onPress={()=>{
                        photosArray.unshift(photosArray.splice(i, 1)[0]);
                            //setPhotoBrowserVisible(true)
                            alert(item.url)
                        }}>
                        <View style={styles.mediaImageContainer}>
                            <Animatable.Image animation="zoomInDown" duration={2000} useNativeDriver={true} source={{uri: item.url}} style={styles.image} resizeMode="cover"></Animatable.Image>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {(profileOwner && photosArray.length > 0) &&
                <LinearGradient colors={["#e44528","#d6a8e7","#f3bf4f"]}start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={[styles.mediaCount]}>
                    <TouchableOpacity onPress={()=>{handleUploadPhotos('photos',page,activeProfile.clientId)}}>
                        <MaterialIcons name="add-circle" size={30} color="#fff" alignSelf="center"></MaterialIcons>
                    </TouchableOpacity>
                </LinearGradient>
            }
        </Animatable.View>
    )
})
export default Photos