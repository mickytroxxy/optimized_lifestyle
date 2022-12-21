import React, { memo, useContext, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { AppContext } from '../../context/AppContext';
import { AntDesign, Ionicons, MaterialIcons} from "@expo/vector-icons";
import AisInput from './AisInput'
import axios from 'axios';
const Location = memo((props) => {
    const {appState:{getLocation,pickCurrentLocation,setConfirmDialog,fontFamilyObj:{fontBold,fontLight}} } = useContext(AppContext);
    const [predictions,setPredictions] = useState({predictionsArray:null,showPredictions:false});
    const {showPredictions,predictionsArray} = predictions;
    const [isFocused,setIsFocused] = useState(false);
    const [value,setValue] = useState("")
    const handleChange = (field,key_word) => {
        if(key_word.length > 2){
            getLocation(({latitude,longitude})=>{
                axios.request({method: 'post',url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyB_Yfjca_o4Te7-4Lcgi7s7eTjrmer5g5Y&input=${key_word}&location=${latitude},${longitude}&radius=1000000`}).then((response) => {
                    setPredictions({...predictions, predictionsArray:response.data.predictions,showPredictions:true});
                }).catch((e) => {
                    alert(e.response);
                });
            })
        }else{
            setPredictions({...predictions, predictionsArray:null,showPredictions:false});
        }
    };
    const getPlaceGeo = (place_id,text) =>{
        setPredictions({...predictions, predictionsArray:null,showPredictions:false});
        axios.request({method: 'post',url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=AIzaSyB_Yfjca_o4Te7-4Lcgi7s7eTjrmer5g5Y`,}).then((response) => {
            const {lat,lng} = response.data.result.geometry.location;
            props.handleChange(props.field,{lat,lng,text})
            setValue(text)
        }).catch((e) => {
            alert(e);
        });
    }
    const getCurrentLocation = () => {
        pickCurrentLocation(currentLocation => {
            setConfirmDialog({isVisible:true,text:`Confirm if ${currentLocation.text} is the address you would like to meet!`,okayBtn:'CONFIRM',cancelBtn:'Retry',response:(res) => { 
                if(res){
                    props.handleChange(props.field,{lat:currentLocation.latitude,lng:currentLocation.longitude,text:currentLocation.text})
                    setValue(currentLocation.text)
                }else{
                    getCurrentLocation();
                }
                setIsFocused(false)
            }})
        })
    }
    const onFocus = () => {
        setIsFocused(true)
        setValue("")
    }
    const onFocusOut = () => setIsFocused(false)
    return (
        <View>
            <AisInput attr={{field:'address',value,onFocus,onFocusOut,icon:{name:'location-outline',type:'Ionicons',min:5,color:'#5586cc'},keyboardType:null,placeholder:props.placeHolder,color:'#009387',handleChange}} />
            {/* {isFocused && 
                <View>
                    <TouchableOpacity onPress={getCurrentLocation} style={{marginTop:5,flexDirection:'row',borderBottomWidth:0.6,borderBottomColor:'#D9D9DF',paddingBottom:7}}>
                        <Ionicons name='ios-location-outline' size={24} color='green'></Ionicons>
                        <Text numberOfLines={1} style={{fontFamily:fontBold,marginLeft:10,fontSize:Platform.OS === 'android' ? 12 : 14,marginTop:5}}>CURRENT LOCATION</Text>
                    </TouchableOpacity>
                </View>
            } */}
            <View style={{marginTop:15}}>
                {showPredictions && predictionsArray?.map((item,i) => 
                    <TouchableOpacity key={i} onPress={() => getPlaceGeo(item.place_id,item.description.slice(0,70))} style={{marginTop:5,flexDirection:'row',borderBottomWidth:0.6,borderBottomColor:'#D9D9DF',paddingBottom:7}}>
                        <Ionicons name='ios-location-outline' size={24} color='green'></Ionicons>
                        <Text numberOfLines={1} style={{fontFamily:fontLight,marginLeft:10,fontSize:Platform.OS === 'android' ? 12 : 14,marginTop:5}}>{item.description.slice(0,60)}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
})

export default Location