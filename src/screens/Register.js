import { createStackNavigator } from '@react-navigation/stack';
import React, {useState,useContext } from "react";
import { StyleSheet, View, Dimensions ,Image,ScrollView, Platform,TouchableOpacity,Text,TextInput, AppState} from "react-native";
import {FontAwesome,AntDesign,Feather,Ionicons } from "@expo/vector-icons";
import AisInput from '../components/forms/AisInput';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../context/AppContext';
import { RadioButton } from 'react-native-paper';
import CountrySelector from '../components/forms/CountrySelector';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
let PARALLAX_HEIGHT = 0;

const RootStack = createStackNavigator();
const Register = ({navigation}) =>{
    const {appState:{fontFamilyObj}} = useContext(AppContext);
    return(
        <RootStack.Navigator screenOptions={{headerStyle: {elevation: 1,shadowOpacity: 0,backgroundColor: "#fff",borderBottomWidth: 0},headerTintColor: "#fff",headerTitleStyle: { fontWeight: "bold" }}}>
        <RootStack.Screen name="AddItemScreen" component={PageContent} options={{
            headerLeft: () => (
                <Feather.Button backgroundColor="#e8e9f5" name="arrow-left-circle" size={28} color="#757575" onPress={()=>{navigation.goBack()}}></Feather.Button>
            ), 
            title: "CREATE AN ACCOUNT",
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
    const {appState:{
      setConfirmDialog,
      showToast,
      cart,
      sendSms,
      phoneNoValidation,
      countryData,
      fontFamilyObj:{fontBold}},
    } = useContext(AppContext);
    const [formData,setFormData] = useState({phoneNumber:'',fname:'',gender:'MALE',password:''});
    const handleChange = (field,value) => setFormData(v =>({...v, [field] : value}));
    const register = () => {
      if(formData.fname !== '' && formData.password.length > 5 && formData.phoneNumber.length > 7){
        setConfirmDialog({isVisible:true,text:`Hi ${formData.fname}, please confirm if you have entered the correct details`,okayBtn:'CONFIRM',cancelBtn:'Cancel',response:(res) => { 
          const phoneNumber = phoneNoValidation(formData.phoneNumber,countryData.dialCode);
          if(phoneNumber){
            if(res){
              const code = Math.floor(Math.random()*89999+10000);
              const obj = {...formData,date:Date.now(),phoneNumber,code}
              navigation.navigate("ConfirmScreen",obj);
              sendSms(phoneNumber,`Hi ${formData.fname}, your VALID confirmation code is ${code}`)
            }else{
              showToast("Invalid phonenumber")
            }
          }
        }})
      }else{
        showToast('Please carefully fill in to proceed!')
      }
    }

    return(
      <View style={[styles.container,{padding:10}]}>
        <LinearGradient colors={["#fff","#e8e9f5","#fff","#F6BDA7"]} style={{flex:1,paddingTop:10,borderRadius:10}}>
            <ScrollView style={{padding:10}}>
              <CountrySelector />
              <AisInput attr={{field:'phoneNumber',icon:{name:'phone',type:'Feather',min:5,color:'#5586cc'},keyboardType:'phone-pad',placeholder:'Phone number',color:'#009387',handleChange}} />
              <AisInput attr={{field:'fname',icon:{name:'user',type:'Feather',min:5,color:'#5586cc'},keyboardType:null,placeholder:'Full Name',color:'#009387',handleChange}} />
              <AisInput attr={{field:'password',icon:{name:'lock',type:'Feather',color:'#5586cc',min:6},keyboardType:'numeric',placeholder:'Password',color:'#009387',handleChange}} />
              <View style={{padding:12,marginTop:5}}>
              <RadioButton.Group onValueChange={newValue => handleChange('gender',newValue)} value={formData.gender}>
                <Text style={{fontFamily:fontBold}}>MY GENDER IS</Text>
                <View style={{flexDirection:'row',borderBottomColor: "#f2f2f2",borderBottomWidth: 1,}}>
                  <FontAwesome name="transgender-alt" color="#5586cc" size={20} style={{marginTop:8}}></FontAwesome>
                  <View style={{flex:1,flexDirection:'row',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={()=>handleChange("gender","FEMALE")}><Text style={{fontFamily:fontBold}}>FEMALE</Text></TouchableOpacity>
                    <RadioButton value="FEMALE" />
                  </View>
                  <View style={{flex:1,flexDirection:'row',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={()=>handleChange("gender","MALE")}><Text style={{fontFamily:fontBold}}>MALE</Text></TouchableOpacity>
                    <RadioButton value="MALE" />
                  </View>
                </View>
              </RadioButton.Group>
              </View>

              <View style={{alignItems:'center',marginTop:15}}>
                <TouchableOpacity onPress={register}>
                  <FontAwesome name='check-circle' size={120} color="#5586cc"></FontAwesome>
                </TouchableOpacity>
            </View>
            {cart.length === 0 && <TouchableOpacity style={{marginTop:15}} onPress={()=>navigation.goBack()}><Text style={{fontFamily:fontBold,textAlign:'center',color:'#757575'}}>Have an account? Login Now</Text></TouchableOpacity>}
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
export default Register;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:5,
        borderRadius:10
    }
});