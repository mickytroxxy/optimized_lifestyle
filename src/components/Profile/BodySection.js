import React, { memo, useContext, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Platform} from 'react-native'
import { AppContext } from '../../context/AppContext'
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Stats from './components/Stats';
import Photos from './components/Photos';
import About from './components/About';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import Businesses from './components/Businesses';
import { RequestBtns } from './components/RequestBtns';
const BodySection = memo(({attr}) => {
    const {appState:{accountInfo,fontFamilyObj:{fontBold,fontLight}}} = useContext(AppContext);
    const {navigation,profileOwner,activeProfile,page} = attr;
    return (
        <View style={styles.footerStyle}>
            <View style={styles.ProfileFooterHeader}>
                <View style={{alignContent:'center',alignItems:'center',marginTop:-10}}>
                    <FontAwesome name="ellipsis-h" color="#63acfa" size={36}></FontAwesome>
                </View>
                <Stats data={{activeProfile,fontBold,fontLight,profileOwner}} />
            </View>
            {(activeProfile.type === 'AGENTS' || activeProfile.type === 'SAFE HOUSES') && <RequestBtns data={{activeProfile,fontBold,fontLight,profileOwner,page}} />}
            <Photos data={{activeProfile,fontBold,fontLight,profileOwner,page}} />
            <About data={{activeProfile,fontBold,fontLight,profileOwner,page}} />
            {profileOwner && page === "Profile" && <Businesses data={{accountInfo,activeProfile,fontBold,fontLight,profileOwner,navigation,page}} />}
        </View>
    )
})
export const styles = StyleSheet.create({
    footerStyle: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        elevation: 10,
        paddingBottom:30,
        marginTop:-70
    },
    ProfileFooterHeader:{
        backgroundColor:'#fff',borderTopLeftRadius: 30, borderTopRightRadius: 30,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 1,
        borderBottomWidth:1,
        borderBottomColor:'#63acfa'
    },
});
export default BodySection