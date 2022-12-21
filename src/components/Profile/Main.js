import React, { useContext, useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { AppContext } from '../../context/AppContext';
import BackGround from './BackGround';
import BodySection from './BodySection';
import ForeGround from './ForeGround';


export default function Main({navigation,page}) {
    const {height} = Dimensions.get("screen");
    const {appState:{accountInfo,activeProfile:userProfile,businessProfile}} = useContext(AppContext);
    const [activeProfile,setNewActiveProfile] = useState(userProfile)
    const profileOwner = accountInfo?.clientId === activeProfile?.accountOwner;
    const isFocused = useIsFocused();
    useEffect(() => {
        if(isFocused){
            setNewActiveProfile(page === "BusinessProfile" ? businessProfile : userProfile)
        }
    },[isFocused,userProfile,businessProfile])
    if(activeProfile){
        return (
            <View style={{flex: 1}}>
                <ParallaxScrollView
                    backgroundColor="transparent"
                    contentBackgroundColor="transparent"
                    backgroundScrollSpeed={5}
                    fadeOutForeground ={true}
                    showsVerticalScrollIndicator ={false}
                    parallaxHeaderHeight={parseInt((0.5 * parseFloat(height)).toFixed(0))}
                    renderForeground={() => <ForeGround attr={{navigation,profileOwner,activeProfile,page}}/>}
                    renderBackground={() => <BackGround attr={{navigation,profileOwner,activeProfile,page}}/>}
                    renderContentBackground={() => <BodySection attr={{navigation,profileOwner,activeProfile,page}}/>}
                />
            </View>
        )
    }else{
        return(
            <View></View>
        )
    }
}