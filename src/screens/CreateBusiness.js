import { createStackNavigator } from '@react-navigation/stack';
import React, {useState,useContext, useEffect } from "react";
import { StyleSheet, View, Dimensions ,Image,ScrollView, Platform,TouchableOpacity,Text,TextInput, AppState} from "react-native";
import {MaterialCommunityIcons,AntDesign,Feather,Ionicons, FontAwesome } from "@expo/vector-icons";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../context/AppContext';
import AisInput from '../components/forms/AisInput';
import {TouchableRipple,Switch} from 'react-native-paper';
import CountrySelector from '../components/forms/CountrySelector';
let selectedService;
const RootStack = createStackNavigator();
const CreateBusiness = ({navigation,route}) =>{
    const {appState:{fontFamilyObj}} = useContext(AppContext);
    selectedService = route.params;
    return(
        <RootStack.Navigator screenOptions={{headerStyle: {elevation: 1,shadowOpacity: 0,backgroundColor: "#fff",borderBottomWidth: 0},headerTintColor: "#fff",headerTitleStyle: { fontWeight: "bold" }}}>
        <RootStack.Screen name="AddItemScreen" component={PageContent} options={{
            headerLeft: () => (
                <Feather.Button backgroundColor="#fff" name="arrow-left-circle" size={28} color="#757575" onPress={()=>{navigation.goBack()}}></Feather.Button>
            ), 
            title: "CREATE YOUR BUSINESS PROFILE",
            headerTintColor: '#757575',
            headerTitleStyle: {
                fontWeight: '900',
                fontSize:16,
                fontFamily:fontFamilyObj.fontBold
            },
        }}/>
        </RootStack.Navigator>
    )
};
const PageContent = () =>{
    const {appState:{phoneNoValidation,setModalState,countryData,preferenceTypes,fontFamilyObj:{fontBold,fontLight},showToast} } = useContext(AppContext);
    const [isSelf,setIsSelf] = useState(true);
    const [formData,setFormData] = useState({phoneNumber:'',fname:'',gender:'MALE',password:''});
    const handleChange = (field,value) => setFormData(v =>({...v, [field] : value}));
    const [services,setServices] = useState([
        {type:'AGENT',text:'When you register an AGENT business you will be requested to perform the services that you will choose below. You get to set your own amount per duration. This process takes less than 5 minutes',selected:true},
        {type:'SAFE HOUSE',text:'Do you have a house that you want to rent out or a bachelor room or a guest house or a pub? Let us bring clients for you. This process takes less than 5 minutes',selected:false},
        {type:'RIDE',text:'Do you have a car and looking to make a side hustle that brings more money than your daily job? The good part is we don not charge for you. your car your choice. Register your ride now',selected:false}
    ]);
    const [businessServices,setBusinessServices] = useState();
    const text = services.filter(item => item.type === selectedService)[0].text;
    //const phoneNumber = phoneNoValidation(formData.phoneNumber,countryData.dialCode);
    useEffect(() => {
        setBusinessServices(preferenceTypes.filter(item => item.mainCategory === selectedService+'S')[0].subCategory)
    },[])
    const updatePrices = (service,fees) => {
        setBusinessServices(businessServices.map(item => item.category === service ? {...item,fees} : item))
    }
    return(
        <View style={styles.container}>
            <LinearGradient colors={["#fff","#fff","#fff","#f1f7fa"]} style={{flex:1,paddingTop:10,borderRadius:10,padding:10}}>
                <ScrollView>
                <View style={{backgroundColor:'#eae6e8',borderRadius:5,marginTop:20,marginBottom:20,padding:20}}><Text style={{fontFamily:fontBold,color:'#0e75b4'}}>CREATE YOUR {selectedService} BUSINESS</Text></View>
                    <Text style={{fontFamily:fontBold,marginBottom:15}}>{text}</Text>
                    <Text style={{fontFamily:fontBold,marginBottom:15,color:'orange'}}>NOTE: We will add 15% on top of your charges and that will be our commission</Text>
                    
                    <View style={{flexDirection:'row',borderColor:'#f2eae9',borderBottomWidth:0.8,paddingBottom:10,marginBottom:10}}>
                        <View style={{width:30}}>
                            <AntDesign name="Safety" size={30} color="#0e75b4"/>
                        </View>
                        <View style={{justifyContent:'center',alignContent:'center',flex:1}}>
                            <Text style={{color:'#2a2828',fontFamily:fontBold,paddingLeft:15}}>THIS AGENT IS ME</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                            <TouchableRipple onPress={() => setIsSelf(!isSelf)}>
                                <View>
                                    <View pointerEvents="none">
                                        <Switch value={isSelf} />
                                    </View>
                                </View>
                            </TouchableRipple>
                        </View>
                    </View>

                    {!isSelf && 
                        <View>
                            <CountrySelector/>
                            <AisInput attr={{field:'phoneNumber',icon:{name:'phone',type:'Feather',min:5,color:'#5586cc'},keyboardType:null,placeholder:'Agent Contact Number',color:'#009387',handleChange}} />
                            <AisInput attr={{field:'fname',icon:{name:'user',type:'Feather',min:5,color:'#5586cc'},keyboardType:null,placeholder:'Agent Name',color:'#009387',handleChange}} />
                        </View>
                    }
                    <View style={{marginTop:15}}>
                        <Text style={{fontFamily:fontBold,color:'#757575'}}>What Would You Like To Offer?</Text>
                        <View style={{marginTop:15,flexDirection:'row',display: 'flex',flexWrap: 'wrap'}}>
                            {businessServices?.map((item,i) => {
                                if(item.category !== "ANY"){
                                    return(
                                        <TouchableOpacity onPress={() => setModalState({isVisible:true,attr:{headerText:'SETUP YOUR RATES',service:item.category,updatePrices}})} key={item.category + i} style={{flexDirection:'row',padding:6,borderRadius:10,borderWidth:1,borderColor:item.fees ? "green" : "#757575",justifyContent:'center',alignItems:'center',margin:10}}>
                                            <Text style={{fontFamily:fontLight,fontSize:11,marginRight:5}}>{item.category}</Text>
                                            {item.fees ? <AntDesign name='checkcircleo' color="green" size={20} /> : <AntDesign name='closecircleo' color="tomato" size={20} />}
                                        </TouchableOpacity>
                                    )
                                }
                            })}
                        </View>
                    </View>
                    <View style={{alignItems:'center',marginTop:15}}>
                        <TouchableOpacity>
                            <FontAwesome name='check-circle' size={120} color="#14678B"></FontAwesome>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    )
};
export default CreateBusiness;
const styles = StyleSheet.create({
    searchInputHolder:{
        height:40,
        borderRadius:10,
        flexDirection:'row',
        borderWidth:0.5,
        borderColor:'#a8a6a5'
    },
    container: {
        flex: 1,
        backgroundColor: "blue",
        marginTop:5,
        borderRadius:10,
        elevation:5
    },
    myBubble:{
        backgroundColor:'#7ab6e6',
        padding:5,
        minWidth:100,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});