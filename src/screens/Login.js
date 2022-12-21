import { createStackNavigator } from '@react-navigation/stack';
import React, {useState,useContext } from "react";
import { StyleSheet, View, Dimensions ,Image,ScrollView, Platform,TouchableOpacity,Text,TextInput, AppState} from "react-native";
import {FontAwesome,Feather } from "@expo/vector-icons";
import AisInput from '../components/forms/AisInput';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../context/AppContext';
import CountrySelector from '../components/forms/CountrySelector';
import { loginApi } from '../context/Api';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
let PARALLAX_HEIGHT = 0;
const RootStack = createStackNavigator();
const inputs = [
    {field:'phoneNumber',icon:{name:'phone',type:'FontAwesome',min:5,color:'#5586cc'},keyboardType:'phone-pad',placeholder:'ENTER YOUR PHONENUMBER',color:'#009387'},
    {field:'password',icon:{name:'lock',type:'Feather',color:'#5586cc',min:6},keyboardType:null,placeholder:'ENTER YOUR PASSWORD',color:'#009387'}
  ]
const Login = ({navigation}) =>{
    const {appState:{fontFamilyObj}} = useContext(AppContext);
    return(
        <RootStack.Navigator screenOptions={{headerStyle: {elevation: 1,shadowOpacity: 0,backgroundColor: "#fff",borderBottomWidth: 0},headerTintColor: "#fff",headerTitleStyle: { fontWeight: "bold" }}}>
        <RootStack.Screen name="AddItemScreen" component={PageContent} options={{
            headerLeft: () => (
                <Feather.Button backgroundColor="#e8e9f5" name="arrow-left-circle" size={28} color="#757575" onPress={()=>{navigation.goBack()}}></Feather.Button>
            ), 
            title: "LOGIN TO PROCEED",
            headerTintColor: '#757575',
            headerTitleStyle: {
                fontWeight: '900',
                fontSize:16,
                fontFamily:fontFamilyObj.fontBold
            },
            headerStyle: {
                backgroundColor: '#e8e9f5'
            },
        }}/>
        </RootStack.Navigator>
    )
};
const PageContent = ({navigation}) =>{
    const {height} = Dimensions.get("screen");
    PARALLAX_HEIGHT = parseInt((0.375 * parseFloat(height)).toFixed(0));
    const [parallaxH,setParallaxH]= useState(PARALLAX_HEIGHT);
    return (
        <View style={styles.container}>
            <ParallaxScrollView
                backgroundColor="#e8e9f5"
                contentBackgroundColor="#e8e9f5"
                backgroundScrollSpeed={5}
                fadeOutForeground ={true}
                showsVerticalScrollIndicator ={false}
                parallaxHeaderHeight={parallaxH}
                //renderForeground={() => <Foreground navigation={navigation}/>}
                renderBackground={() => <HeaderSection navigation={navigation}/>}
                renderContentBackground={() => <BodySection navigation={navigation} />}
            />
        </View>
    )
};
const BodySection = ({navigation}) =>{
    const [formData,setFormData] = useState({phoneNumber:'',password:''});
    const {appState:{fontFamilyObj:{fontBold},showToast,countryData,saveUser,phoneNoValidation}} = useContext(AppContext);
    const handleChange = (field,value) => setFormData(v =>({...v, [field] : value}));
    const login = () =>{
    if(formData.phoneNumber.length > 9 && formData.password.length > 5){
      const phoneNumber = phoneNoValidation(formData.phoneNumber,countryData.dialCode);
      phoneNumber && loginApi(phoneNumber,formData.password,(response)=>{
        if(response[0]){
          if(response.length > 0){
            saveUser(response[0]);
          }else{
            showToast("Invalid login details")
          }
        }
      })
    }else{
        navigation.navigate("Home")
        //showToast("Please properly fill in before proceeding!");
    }
  }
    return(
      <View style={[styles.container,{padding:10}]}>
        <LinearGradient colors={["#fff","#e8e9f5","#fff","#F6BDA7"]} style={{flex:1,paddingTop:10,borderRadius:10}}>
            <ScrollView style={{padding:10}}> 
                <CountrySelector />
                {inputs.map((item,i) =>(
                    <AisInput attr={{...item,handleChange}} key={i} />
                ))}
                <View style={{marginTop:15,alignItems:'center'}}>
                    <TouchableOpacity onPress={() => login()}>
                        <FontAwesome name='check-circle' size={120} color="#5586cc"></FontAwesome>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop:15}} onPress={()=>navigation.navigate("Register")}><Text style={{fontFamily:fontBold,textAlign:'center',color:'#757575'}}>Don't have an account? Register Now</Text></TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
      </View>
    )
};
const HeaderSection = () =>{
    return(
        <View style={{alignItems:'center',marginTop:30}}>
            <Image source={require('../../assets/heartios.png')} style={{width:260,height:260,borderRadius:300}}/>
        </View>
    )
}
export default Login;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:5,
        borderRadius:10
    }
});