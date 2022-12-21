import React, {useContext,useState,useRef} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity,TouchableHighlight, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from "../context/AppContext";
import { FontAwesome, AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome5, MaterialIcons, Feather } from "@expo/vector-icons";
import { updateData } from '../context/Api';
import moment from 'moment';

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Location from '../components/forms/Location';
import AisInput from '../components/forms/AisInput';
let PARALLAX_HEIGHT = 0;


export default function RequestScreen({navigation}) {
  const {height} = Dimensions.get("screen");
    PARALLAX_HEIGHT = parseInt((0.425 * parseFloat(height)).toFixed(0));
    const [parallaxH,setParallaxH]= useState(PARALLAX_HEIGHT);
    return (
      <View style={{flex: 1}}>
        <ParallaxScrollView
          backgroundColor="#e8e9f5"
          contentBackgroundColor="#e8e9f5"
          backgroundScrollSpeed={5}
          fadeOutForeground ={true}
          showsVerticalScrollIndicator ={false}
          parallaxHeaderHeight={parallaxH}
          renderForeground={() => <ForeGround navigation={navigation}/>}
          //renderBackground={() => <BackGround navigation={navigation}/>}
          renderContentBackground={() => <BodySection navigation={navigation} />}
        />
      </View>
  )
}

const ForeGround = () =>{
    return(
        <View></View>
    )
}
const BodySection = () =>{
    const {appState:{fontFamilyObj:{fontBold,fontLight},setModalState}} = useContext(AppContext);
    const [canShowSearchInput,setCanShowSearchInput] = useState(false)
    const [locations,setLocations] = useState([
        {type:'SAFE HOUSE',selected:false,align:'left'},
        {type:'CURRENT LOCATION',selected:true,align:'center'},
        {type:'AGENT`S LOCATION',selected:false,align:'center'},
        {type:'SEARCH',selected:false,align:'flex-end'},

    ])
    const [duration,setDuration] = useState([
        {type:'HOURLY',name:'HOURS',selected:true},
        {type:'DAILY',name:'DAYS',selected:false},
        {type:'WEEKLY',name:'WEEKS',selected:false},
        {type:'MONTHLY',name:'MONTHS',selected:false},
        {type:'YEARLY',name:'YEARS',selected:false},
    ])
    const selectedDuration = duration.filter(item => item.selected === true)[0]
    const [formData,setFormData] = useState({address:'', durationType:selectedDuration.name,quantity:1,offer:0,date:new Date(Date.now()),time:new Date(Date.now())});
    const handleChange = (field,value) => setFormData(v =>({...v, [field] : value}));

    const handleLocations = (item) =>{
        setLocations(locations.map(data => data.type === item.type ? {...data,selected:true} : {...data,selected:false}))
        if(item.type === "SEARCH"){
            setCanShowSearchInput(!canShowSearchInput)
        }
    }
    return(
        <View style={{flex:1,marginTop:-50}}>
            <View style={styles.footerStyle}>
                <View style={{alignContent:'center',alignItems:'center',marginTop:-10}}>
                    <TouchableHighlight style={{alignSelf:'center',backgroundColor:'#fff',height:30,elevation:0}} >
                        <FontAwesome backgroundColor="#fff" style={{alignSelf:'center',alignItems:'center',alignContent:'center'}} name="ellipsis-h" color="#757575" size={30}></FontAwesome>
                    </TouchableHighlight>
                </View>
                <View style={{paddingBottom:15,flexDirection:'row'}}>
                    <View style={{justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <Ionicons name='ios-location-outline' size={30} color='#5586cc'/>
                    </View>
                    <View style={{justifyContent:'center',alignContent:'center',flex:1}}>
                        <Text style={{fontFamily:fontLight,marginLeft:10,fontSize:Platform.OS === 'android' ? 12 : 14,marginTop:5}}>CURRENT LOCATION</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',backgroundColor:'#F4F7F8',padding:5,borderRadius:10}}>
                    {locations.map((item,i) => 
                        <View key={item.type + i} style={{width:'25%'}}>
                            <TouchableOpacity onPress={() => handleLocations(item)}>
                                <View style={{borderColor:'#63acfa',backgroundColor:item.selected ? "#63acfa" : "#fff",alignSelf:'center',borderWidth:1,borderRadius:100,height:55,width:55,alignContent:'center',alignItems:'center',justifyContent:'center'}}>
                                    {item.type === "SAFE HOUSE" && <MaterialIcons name='house-siding' size={30} color={item.selected ? "#fff" : '#63acfa'}/>}
                                    {item.type === "CURRENT LOCATION" && <Ionicons name='location' size={30} color={item.selected ? "#fff" : '#63acfa'}/>}
                                    {item.type === "AGENT`S LOCATION" && <FontAwesome name='user-o' size={30} color={item.selected ? "#fff" : '#63acfa'}/>}
                                    {item.type === "SEARCH" && <MaterialIcons name='search' size={30} color={item.selected ? "#fff" : '#63acfa'}/>}
                                </View>
                                <Text style={{fontFamily:fontLight,fontSize:Platform.OS === 'ios' ? 11 : 9,textAlign:'center'}}>{item.type}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                {canShowSearchInput && 
                    <View style={{padding:5}}>
                        <Location handleChange={handleChange} field="address" placeHolder="Search for address..."/>
                    </View>
                }
                <View>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        {duration.map((item,i) =>
                            <TouchableOpacity onPress={() => setDuration(duration.map(data => data.type === item.type ? {...data,selected:true} : {...data,selected:false}))} key={item.type+i} style={{borderColor:'#63acfa',backgroundColor:item.selected ? "#63acfa" : "#fff",borderWidth:0.7,borderRadius:10,padding:10,marginTop:10,marginRight:10}}>
                                <Text style={{fontFamily:fontBold,color:item.selected ? "#fff" : "#63acfa"}}>{item.type}</Text>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1,justifyContent:'center'}}><Text style={{fontFamily:fontBold,color:'#757575',fontSize:12}}>HOW MANY {selectedDuration.name}?</Text></View>
                        <View style={{flex:1}}>
                            <AisInput attr={{field:'quantity',fontSize : Platform.OS=== 'android' ? 11 : 12,icon:{name:'timer-outline',type:'Ionicons',min:2,color:'#63acfa'},keyboardType:'numeric',placeholder:`NUMBER OF ${selectedDuration.name}`,color:'#009387',handleChange}} />
                        </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1,justifyContent:'center'}}><Text style={{fontFamily:fontBold,color:'#757575',fontSize:12}}>MY OFFER IS</Text></View>
                        <View style={{flex:1}}>
                            <AisInput attr={{field:'offer',fontSize : Platform.OS=== 'android' ? 11 : 12,icon:{name:'attach-money',type:'MaterialIcons',min:5,color:'#63acfa'},keyboardType:'numeric',placeholder:`YOUR OFFER`,color:'#009387',handleChange}} />
                        </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1,justifyContent:'center'}}><Text style={{fontFamily:fontBold,color:'#757575',fontSize:12}}>DATE</Text></View>
                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={()=>setModalState({isVisible:true,attr:{headerText:'SELECT DATE',field:'date',handleChange}})} style={{borderColor:'#a8a6a5',borderWidth:1,borderRadius:10,padding:10,marginTop:5}}>
                                <Text style={{fontFamily:fontLight}}>{moment(formData.date).format("L")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1,justifyContent:'center'}}><Text style={{fontFamily:fontBold,color:'#757575',fontSize:12}}>TIME</Text></View>
                        <View style={{flex:1}}>
                        <TouchableOpacity onPress={()=>setModalState({isVisible:true,attr:{headerText:'SELECT TIME',field:'time',handleChange}})} style={{borderColor:'#a8a6a5',borderWidth:1,borderRadius:10,padding:10,marginTop:5}}>
                            <Text style={{fontFamily:fontLight}}>{moment(formData.time).format("HH:mm")}</Text>
                        </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        </View>
    )
}
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