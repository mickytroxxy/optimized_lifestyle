import { createStackNavigator } from '@react-navigation/stack';
import React, {useState,useContext } from "react";
import { StyleSheet, View, Dimensions ,Image,ScrollView, Platform,TouchableOpacity,Text,TextInput, AppState} from "react-native";
import {MaterialCommunityIcons,AntDesign,Feather,Ionicons, FontAwesome } from "@expo/vector-icons";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../context/AppContext';
import AisInput from '../components/forms/AisInput';
import { createData, getUserDetailsByPhone, updateData } from '../context/Api';
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
    const {appState:{saveUser,fontFamilyObj:{fontBold,fontLight},showToast} } = useContext(AppContext);
    const [confirmationCode,setConfirmationCode] = useState('');
    const [formData,setFormData] = useState({phoneNumber:'',fname:'',gender:'MALE',password:''});
    const handleChange = (field,value) => setFormData(v =>({...v, [field] : value}));
    const [services,setServices] = useState([
        {type:'AGENT',text:'When you register an AGENT business you will be requested to perform the services that you will choose below. You get to set your own amount per duration. This process takes less than 5 minutes',selected:true},
        {type:'SAFE HOUSE',text:'Do you have a house that you want to rent out or a bachelor room or a guest house or a pub? Let us bring clients for you. This process takes less than 5 minutes',selected:false},
        {type:'RIDE',text:'Do you have a car and looking to make a side hustle that brings more money than your daily job? The good part is we don not charge for you. your car your choice. Register your ride now',selected:false}
    ]);
    const text = services.filter(item => item.type === selectedService)[0].text;
    return(
        <View style={styles.container}>
            <LinearGradient colors={["#fff","#fff","#fff","#f1f7fa"]} style={{flex:1,paddingTop:10,borderRadius:10,alignContent:'center',alignItems:'center',justifyContent:'center',padding:20}}>
                <Text style={{fontFamily:fontBold,marginBottom:15,textAlign:'center'}}>{text}</Text>
                <Text style={{fontFamily:fontBold,marginBottom:15,textAlign:'center',color:'orange'}}>NOTE: We will add 15% on top of your charges and that will be our commission</Text>
                <AisInput attr={{field:'search',icon:{name:'list',type:'Ionicons',min:5,color:'#5586cc'},keyboardType:null,placeholder:'Enter Confirmation Code',color:'#009387',handleChange}} />
                <AisInput attr={{field:'search',icon:{name:'list',type:'Ionicons',min:5,color:'#5586cc'},keyboardType:null,placeholder:'Enter Confirmation Code',color:'#009387',handleChange}} />
                <AisInput attr={{field:'search',icon:{name:'list',type:'Ionicons',min:5,color:'#5586cc'},keyboardType:null,placeholder:'Enter Confirmation Code',color:'#009387',handleChange}} />
                <View style={{alignItems:'center',marginTop:15}}>
                    <TouchableOpacity>
                        <FontAwesome name='check-circle' size={120} color="#14678B"></FontAwesome>
                    </TouchableOpacity>
                </View>
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