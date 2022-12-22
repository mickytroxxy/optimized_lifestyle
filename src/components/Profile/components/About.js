import React, { memo, useContext } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { Ionicons, MaterialIcons,AntDesign,FontAwesome } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';
import { Col, Grid } from 'react-native-easy-grid';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../../styles';
import { AppContext } from '../../../context/AppContext';
import { updateData } from '../../../context/Api';
import {TouchableRipple,Switch} from 'react-native-paper';
import moment from 'moment';
const About = memo((props) => {
    const {page,profileOwner,activeProfile,fontBold,fontLight} = props?.data;
    const {appState:{handleUploadPhotos,setModalState,setActiveProfile,setBusinessProfile}} = useContext(AppContext)
    const handleChange = (field,value) => {
        if(field == 'birthDay'){
            value = moment(value).format("L");
        }
        page === "Profile" ? setActiveProfile(prevState => ({...prevState,[field]:value})) : setBusinessProfile(prevState => ({...prevState,[field]:value}))
        updateData("clients",activeProfile.clientId,{field,value});
    };
    const editProfile = (field) => {
        if(field === 'selfiePhoto' || field === 'idPhoto'){
            handleUploadPhotos(field,page,activeProfile.clientId)
        }else if(field === 'birthDay'){
            setModalState({isVisible:true,attr:{headerText:'SELECT DATE',field,handleChange}})
        }else if(field === 'facebookLink'){
            setModalState({isVisible:true,attr:{headerText:'FACEBOOK LINK',field,placeholder:'Paste Your Facebook Link...',handleChange}})
        }else if(field === 'about'){
            setModalState({isVisible:true,attr:{headerText:'YOUR ABOUT',field,placeholder:'Tell Us About Yourself...',handleChange}})
        }else if(field === 'gender'){
            setModalState({isVisible:true,attr:{headerText:'SELECT GENDER',field,items:[{value:'FEMALE'},{value:'MALE'}],handleChange}})
        }
    }
    const handlePrivacy = data => {
        const privacy = activeProfile.privacy.map(item => item.type === data.type ? {...item,selected:!data.selected} : item)
        handleChange('privacy',privacy);
    }
    return (
        <Animatable.View animation="bounceIn" duration={1000} useNativeDriver={true} style={{padding:5 }}>
            <View style={{ padding:5 }}>
                <LinearGradient colors={["#e2f2f5", "#f9d0c7"]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={{borderRadius:10,}}>
                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}>
                            <FontAwesome name="user-circle" color="#f9d0c7" size={24}></FontAwesome>
                        </View>
                        <View style={{ flex:3,backgroundColor:'#fff',borderRadius:10, }}>
                            <View style={{padding:10,backgroundColor:'#f9f4f7',flex:1,flexDirection:'row',borderTopLeftRadius:10,borderTopRightRadius:10}}>
                                <Text style={[styles.text, { color: "#41444B",flex:3,fontSize:14,fontFamily:fontBold,color:'#757575' }]}>ABOUT</Text>
                                {profileOwner?(
                                    <TouchableOpacity onPress={() => editProfile("about")}>
                                        <FontAwesome name="edit" color="#c5c3c8" size={24}></FontAwesome>
                                    </TouchableOpacity>
                                ):null}
                            </View>
                            <View style={{padding:10}}>
                                <Text style={[styles.text, { color: "#41444B", fontWeight: "300",fontFamily:fontLight }]}>{activeProfile?.about}</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
            <View style={{flexDirection:'row',borderColor:'#f2eae9',borderBottomWidth:0.8,paddingBottom:10,marginBottom:10}}>
                <View style={{width:30}}>
                    <FontAwesome name="child" size={30} color="#f9d0c7"/>
                </View>
                <View style={{justifyContent:'center',alignContent:'center',flex:1}}>
                    <Text style={{color:'#2a2828',fontFamily:fontBold,paddingLeft:15}}>AGE</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#2a2828',fontFamily:fontLight,marginRight:10}}>{ageCalculator(activeProfile?.birthDay).toFixed(0)}</Text>
                    {profileOwner &&(
                        <TouchableOpacity onPress={() => editProfile("birthDay")}>
                            <FontAwesome name="edit" color="#c5c3c8" size={24}></FontAwesome>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View style={{flexDirection:'row',borderColor:'#f2eae9',borderBottomWidth:0.8,paddingBottom:10,marginBottom:10}}>
                <View style={{width:30}}><FontAwesome name="mars" size={30} color="#f9d0c7"/></View>
                <View style={{justifyContent:'center',alignContent:'center',flex:1}}><Text style={{color:'#2a2828',fontFamily:fontBold,paddingLeft:15}}>GENDER</Text></View>
                <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#2a2828',fontFamily:fontLight,marginRight:10}}>{activeProfile?.gender}</Text>
                    {profileOwner &&(
                        <TouchableOpacity onPress={() => editProfile("gender")}>
                            <FontAwesome name="edit" color="#c5c3c8" size={24}></FontAwesome>
                        </TouchableOpacity>
                    )}
                </View>
            </View> 

            
            {profileOwner &&
                <Grid style={{marginTop:25 }}>
                    <Col style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                        <View style={{height:75,width:75,borderRadius:100,overflow:'hidden'}}>
                            <LinearGradient colors={["#e44528","#d6a8e7","#f3bf4f"]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={{width:75,height:75,alignItems:'center',justifyContent:'center'}}>  
                                <TouchableOpacity style={{alignContent:'center',alignItems:'center',justifyContent:'center',backgroundColor:'#fff',height:72,width:72,borderRadius:100}}>
                                    {activeProfile.idPhoto !== "" && <Image source={{uri: activeProfile.idPhoto}} style={{width:70,height:70,borderRadius:100}} blurRadius={10} resizeMode="cover"/>}
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        <Text style={{ color: "#000",fontSize:10,fontFamily:fontLight,alignContent:'center',alignItems:'center',textAlign:'center' }}>ID PHOTO</Text>
                        {profileOwner && <TouchableOpacity onPress={()=> editProfile("idPhoto")}><FontAwesome name="edit" color="#c5c3c8" size={24}/></TouchableOpacity>}
                    </Col>
                    <Col style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                        <TouchableOpacity>
                            <FontAwesome name="facebook" color="#0e75b4" size={75}></FontAwesome>
                        </TouchableOpacity>
                        <Text style={{ color: "#000",fontSize:10,fontFamily:fontLight,alignContent:'center',alignItems:'center', textAlign:"center" }}>FACEBOOK LINK</Text>
                        {profileOwner && <TouchableOpacity onPress={()=>editProfile("facebookLink")}><FontAwesome name="edit" color="#c5c3c8" size={24}/></TouchableOpacity>}
                    </Col>    
                    <Col style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                        <View style={{height:75,width:75,borderRadius:100,overflow:'hidden'}}>
                            <LinearGradient colors={["#e44528","#d6a8e7","#f3bf4f"]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={{width:75,height:75,alignItems:'center',justifyContent:'center'}}>  
                                <TouchableOpacity style={{alignContent:'center',alignItems:'center',justifyContent:'center',backgroundColor:'#fff',height:72,width:72,borderRadius:100,}}>
                                    {activeProfile.selfiePhoto !== "" &&  <Image source={{uri: activeProfile.selfiePhoto}} style={{width:70,height:70,borderRadius:100,}} resizeMode="cover"/>}
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        <Text style={{ color: "#000",fontSize:10,fontFamily:fontLight,alignContent:'center',alignItems:'center', textAlign:'center' }}>SELFIE PHOTO</Text>
                        {profileOwner && <TouchableOpacity onPress={()=>editProfile("selfiePhoto")}><FontAwesome name="edit" color="#c5c3c8" size={24}/></TouchableOpacity>}
                    </Col>           
                </Grid>
            }
            {activeProfile?.type && <View style={{backgroundColor:'#eae6e8',borderRadius:5,marginTop:20,marginBottom:20,padding:20}}><Text style={{fontFamily:fontBold,color:'#0e75b4'}}>{activeProfile?.type === "AGENTS" ? "PRIVACY" : "OTHER INFORMATION"}</Text></View>}
            {activeProfile?.type === 'AGENTS' && activeProfile?.privacy.map((item,i) => (
                <View key={item.type + i} style={{flexDirection:'row',borderColor:'#f2eae9',borderBottomWidth:0.8,paddingBottom:10,marginBottom:10}}>
                    <View style={{width:30}}>
                        <AntDesign name="Safety" size={30} color="#0e75b4"/>
                    </View>
                    <View style={{justifyContent:'center',alignContent:'center',flex:1}}>
                        <Text style={{color:'#2a2828',fontFamily:fontBold,paddingLeft:15}}>{item.type}</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        {profileOwner ? (
                            <TouchableRipple onPress={() => handlePrivacy(item)}>
                                <View>
                                    <View pointerEvents="none">
                                        <Switch value={item.selected} />
                                    </View>
                                </View>
                            </TouchableRipple>
                        ):(
                            <View>{item.selected ? <FontAwesome name="check-circle" size={30} color="green" alignSelf="center"/> : <FontAwesome name="times-circle" size={30} color="tomato" alignSelf="center"/>}</View>
                        )}
                    </View>
                </View>
            ))}
        </Animatable.View>
    )
})
const ageCalculator = (birthDay) =>{
    var birth = new Date(birthDay);
    var check = new Date();
    var milliDay = 1000 * 60 * 60 * 24;
    var ageInDays = (check - birth) / milliDay;
    var ageInYears =  Math.floor(ageInDays / 365 );
    var age =  ageInDays / 365 ;
    return age;
}
export default About