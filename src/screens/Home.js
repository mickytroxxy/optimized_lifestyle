import React, {useState} from 'react';
import { View, Dimensions } from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ForeGround from '../components/Home/ForeGround';
import BackGround from '../components/Home/BackGround';
import BodySection from '../components/Home/BodySection';
let PARALLAX_HEIGHT = 0;


export default function Home({navigation}) {
  const {height} = Dimensions.get("screen");
    PARALLAX_HEIGHT = parseInt((0.625 * parseFloat(height)).toFixed(0));
    const [parallaxH,setParallaxH]= useState(PARALLAX_HEIGHT);
    return (
      <View style={{flex: 1}}>
        <ParallaxScrollView
          backgroundColor="transparent"
          contentBackgroundColor="transparent"
          backgroundScrollSpeed={5}
          fadeOutForeground ={true}
          showsVerticalScrollIndicator ={false}
          parallaxHeaderHeight={parallaxH}
          renderForeground={() => <ForeGround navigation={navigation}/>}
          renderBackground={() => <BackGround navigation={navigation}/>}
          renderContentBackground={() => <BodySection navigation={navigation} />}
        />
      </View>
  )
}