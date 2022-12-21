import 'react-native-gesture-handler';
import { Text, View, StyleSheet, Dimensions, ScrollView,TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker,PROVIDER_GOOGLE } from "react-native-maps";
import * as Animatable from 'react-native-animatable';
import { Ionicons, MaterialIcons,Feather,FontAwesome } from "@expo/vector-icons";
import Constants from 'expo-constants';
import React, { useState,useRef,useContext } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../../context/AppContext';


const Filter = ({navigation}) =>{
    const {appState:{fontFamilyObj,preferenceTypes,setPreferenceTypes,mainCategory,getUserProfile,accountInfo}} = useContext(AppContext)
    return(
        <View style={{position:'absolute',width:'100%',zIndex:1000,padding:10}}>
            <View style={Platform.OS === 'ios' ? styles.interestViewIos : styles.interestView}>
                <LinearGradient colors={["#f9f1ed","#f3f9fe","#faf8fa","#f7f3d0"]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={{backgroundColor:'#f9f1ed',justifyContent:'center',padding:5}}>
                    <View style={{width:'100%',flexDirection:'row'}}>
                        {preferenceTypes.map((item,i) =>
                            <TouchableOpacity key={i} style={{justifyContent:'center',width:item.width}} onPress={() => setPreferenceTypes(preferenceTypes.map(data => data.mainCategory === item.mainCategory ? {...data,selected:true} : {...data,selected:false}))}>
                                <Text style={{fontFamily:item.selected ? fontFamilyObj.fontBold : fontFamilyObj.fontLight, fontSize:item.selected ? 14 : 13,alignSelf:'flex-start',color:item.selected ? '#63acfa' : '#757575',padding:10}}>{item.mainCategory}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </LinearGradient>
                <View style={{flexDirection:'row'}}>
                    <View style={{width:50,backgroundColor:'#fff',justifyContent:'center',alignContent:'center',alignItems:'center',borderRadius:10}}>
                        <TouchableOpacity onPress={() => getUserProfile(navigation,'Profile',accountInfo.clientId)}>
                            <FontAwesome name="user-o" size={30} color="#63acfa" alignSelf="center"/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,padding:10}}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {
                               preferenceTypes.filter(item => item.selected === true)[0].subCategory.map((item,i)=>(
                                    <View key={i} style={{height:35,width:180,borderRadius:10,overflow:'hidden',marginRight:10}}>
                                        <LinearGradient colors={["#e44528","#63acfa","#f3bf4f"]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={{width:180,height:35,alignItems:'center',justifyContent:'center'}}>  
                                            <TouchableOpacity onPress={() => {
                                                setPreferenceTypes(preferenceTypes.map(data => data.mainCategory === mainCategory ? {...data,subCategory:data.subCategory.map(x => x.category === item.category ? {...x,selected:true} : {...x,selected:false})} : data))
                                            }} style={{alignContent:'center',alignItems:'center',justifyContent:'center',backgroundColor:item.selected ? '#63acfa' : '#fff',height:33,width:178,borderRadius:10,display:'flex',flexDirection:'row'}}>
                                                {mainCategory === 'AGENTS' && <FontAwesome name="heart" size={18} color={item.selected ? "#fff" : "#f9896d"} />}
                                                {mainCategory === 'RIDES' && <Ionicons name="car-sport" size={24} color={item.selected ? "#fff" : "#63acfa"} />}
                                                {mainCategory === 'SAFE HOUSES' && <MaterialIcons name="house-siding" size={24} color={item.selected ? "#fff" : "#63acfa"} />}
                                                <Text style={{fontFamily:fontFamilyObj.fontBold,color:item.selected ? "#fff" : "#757575"}}> {item.category}</Text>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                    </View>
                                ))
                            }
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
    interestView:{
        backgroundColor: '#fff',
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: Platform.OS === 'ios' ? 0 : 30,
    },
    interestViewIos:{
        backgroundColor: '#fff',
        borderRadius:10
        
    },
    interestListItem:{
        justifyContent:'center',alignContent:'center',
        alignItems:'center',marginLeft:10,marginRight:10,
        padding:7,backgroundColor:'pink',
        borderRadius:30,display:'flex',flexDirection:'row'
    },
    lowerInterestList:{
        height:10,
        width:'100%',borderTopRightRadius:30,
        borderTopLeftRadius:30,

        borderTopWidth:0.5,
        borderRightWidth:0.7,
        borderLeftWidth:0.7,
        borderTopColor:'#dcdbd8',
        borderLeftColor:'#dcdbd8',
        borderRightColor:'#dcdbd8',
    }
});
export default React.memo(Filter);
