import React, { memo, useContext } from 'react'
import { View, Image, Dimensions } from 'react-native'
import * as Animatable from 'react-native-animatable';
const BackGround = memo(({attr}) => {
    const {width} = Dimensions.get("screen");
    const {activeProfile} = attr;
    const avatar = activeProfile.avatar
    return (
        <View style={{flex:1}}>
            <Animatable.Image animation="slideInDown" duration={1500} useNativeDriver={true} source={{uri : avatar !== "" ? avatar : 'https://picsum.photos/400/400'}} style={{width: width,minHeight: width}} resizeMode="stretch"></Animatable.Image>
        </View>
    )
})

export default BackGround;