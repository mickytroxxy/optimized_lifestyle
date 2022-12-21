import React, { memo, useContext } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Image} from 'react-native'
import { AppContext } from '../../context/AppContext'
import { Ionicons, MaterialIcons,FontAwesome5,FontAwesome } from "@expo/vector-icons";
import { useState } from 'react';
import Location from '../forms/Location';
import { ScrollView } from 'react-native-gesture-handler';
const BodySection = memo(({navigation}) => {
    const {appState:{accountInfo,getUserProfile,clients,getDistance,currentLocation,mainCategory,fontFamilyObj:{fontBold,fontLight}}} = useContext(AppContext);
    const [formData,setFormData] = useState({meetUpLocation:'', dropOffLocation:''});
    const handleChange = (field,value) => setFormData(v =>({...v, [field] : value}));

    let lightText = "We Have Classy Professionals For You."
    let boldText = "Drink Mates | Drivers | Fake Partners"
    let placeHolder = "Give Us A Location"
    if(mainCategory === "RIDES"){
        lightText = "Get lifeStyle Rides Around You!"
        boldText = "Let's Drive You Around"
        placeHolder = "Pick Up Location"
    }else if(mainCategory === "SAFE HOUSES"){
        lightText = "We Have Hotspots For You!"
        boldText = "Hotels | Night Clubs | Lodges"
        placeHolder = "Where Would You Like To Book?"
    }
    return (
        <View style={{flex:1,marginTop:-50}}>
            <View style={styles.footerStyle}>
                <View style={{alignContent:'center',alignItems:'center',marginTop:-10}}>
                    <TouchableHighlight style={{alignSelf:'center',backgroundColor:'#fff',height:30,elevation:0}} >
                        <FontAwesome backgroundColor="#fff" style={{alignSelf:'center',alignItems:'center',alignContent:'center'}} name="ellipsis-h" color="#757575" size={30}></FontAwesome>
                    </TouchableHighlight>
                </View>
                <View>
                    <Text style={{fontFamily:fontLight,fontSize:13,color:'#353434'}}>{lightText}</Text>
                    <Text style={{fontFamily:fontBold,fontSize:16,color:'#05375a',marginTop:10,}}>{boldText}</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:10}}>
                    <TouchableOpacity onPress={() => navigation.navigate("RequestScreen")} style={{backgroundColor : "#fff",width:'100%',borderRadius:10,padding:15,borderColor:'#63acfa',borderWidth:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontFamily:fontBold,color:"#63acfa",fontSize:13,flex:1}}>ARE YOU RUSHING? REQUEST NOW</Text>
                        <FontAwesome5 name='running' style={{alignSelf:'flex-end'}} size={24} color="orange"/>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:5}}>
                    <Location handleChange={handleChange} field="meetUpLocation" placeHolder={placeHolder}/>
                </View>
                <View style={{marginTop:10}}>
                    {clients?.map((client, i) => {
                        //console.log(client.clientId)
                        return(
                            <View key={client.fname+i} style={{flexDirection:'row',paddingBottom:10,marginBottom:10,borderBottomColor:'#D6D8D8',borderBottomWidth:0.7}}>
                                <TouchableOpacity onPress={() => getUserProfile(navigation,'BusinessProfile',client.clientId)} style={{backgroundColor:'#63acfa',borderRadius:10,padding:2}}>
                                    <Image source={{uri: client.avatar !== "" ? client.avatar:'https://picsum.photos/400/400'}} style={{width:120,height:120,borderRadius:10}}/>
                                </TouchableOpacity>
                                <View style={{marginLeft:10,flex:1,justifyContent:'center',marginTop:3}}>
                                    <TouchableOpacity>
                                        <Text style={{fontFamily:fontBold}}>{client.fname}</Text>
                                        <Text style={{color:'#2a2828',fontFamily:fontLight,marginTop:5}}>{getDistance(currentLocation?.latitude, currentLocation?.longitude, client.address.lat, client.address.lon).toFixed(2)}km</Text>
                                        <Text style={{fontFamily:fontBold,marginTop:5}}>SERVICES</Text>
                                    </TouchableOpacity>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop:10}}>
                                        {client?.services?.map((item,i) => 
                                            <View key={item.type+i} style={{borderColor:'#63acfa',borderWidth:1,borderRadius:10,padding:10,marginRight:5,paddingRight:10,height:40}}>
                                                <Text style={{fontFamily:fontBold}}>{item.type} {item.fees[0].fee}</Text>
                                            </View>
                                        )}
                                    </ScrollView>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
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
        paddingBottom:30
    },
});
export default BodySection