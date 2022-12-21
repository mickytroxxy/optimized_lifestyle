import React, { memo, useContext,useRef } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { AppContext } from '../../context/AppContext'
import MapView, { Marker,PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect } from 'react';
import { useState } from 'react';
import Filter from './Filter';
const ForeGround = memo(({navigation}) => {
    const {appState:{accountInfo,getLocation,fontFamilyObj:{fontBold}}} = useContext(AppContext);
    const [location,setLocation] = useState({latitude:0,longitude:0})
    const mapView = useRef(null);
    useEffect(()=>{
        getLocation(res => setLocation(res))
    },[])
    return (
        <View style={{flex:1}}>
            <Filter navigation={navigation} />
            <MapView 
                style={styles.mapStyle}
                ref={mapView}
                provider={PROVIDER_GOOGLE}
                type region={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03
                }} 
                showsCompass={true} rotateEnabled={false} showsUserLocation={true} moveOnMarkerPress={false}
            >
                <Marker backgroundColor="pink" coordinate={{ latitude: location.latitude, longitude: location.longitude }}/>
            </MapView>
        </View>
    )
})
export const styles = StyleSheet.create({
    footerStyle: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        elevation: 10,
        paddingBottom:30,
    },
    mapStyle: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
});
export default ForeGround