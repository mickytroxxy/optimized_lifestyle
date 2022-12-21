import React,{useState,useMemo, useEffect} from 'react';
export const AppContext = React.createContext();
import AsyncStorage from "@react-native-async-storage/async-storage";
import geohash from "ngeohash";
import {Alert,ToastAndroid,Platform, Linking } from 'react-native';
import * as Font from "expo-font";
import ModalCoontroller from '../components/ModalController';
import ConfirmDialog from '../components/ConfirmDialog';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { getProductList, getRequestData, updateData, uploadFile } from './Api';
import axios from 'axios';
import { users } from './users';
export const AppProvider = (props) =>{
    const [fontFamilyObj,setFontFamilyObj] = useState(null);
    const [accountInfo,setAccountInfo] = useState(users[0]);
    const [activeProfile,setActiveProfile] = useState(null);
    const [businessProfile,setBusinessProfile] = useState(null);
    const [modalState,setModalState] = useState({isVisible:false,attr:{headerText:'HEADER TEXT'}})
    const [confirmDialog,setConfirmDialog] = useState({isVisible:false,text:'Would you like to come today for a fist?',okayBtn:'VERIFY',cancelBtn:'CANCEL',isSuccess:false})
    const [currentLocation,setCurrentLocation] = useState(null);
    const [countryData,setCountryData] = useState({dialCode:'+27',name:'South Africa',flag:'https://cdn.kcak11.com/CountryFlags/countries/za.svg'})
    
    const [preferenceTypes,setPreferenceTypes] = useState([
        {mainCategory:'AGENTS',selected:true,subCategory:[
          {category:'ANY',selected:true},
          {category:'MASSAGE',selected:false},
          {category:'DINNER MATE',selected:false},
          {category:'DRINK MATE',selected:false},
          {category:'FAKE PARTNER',selected:false},
          {category:'DANCER',selected:false},
          {category:'DRIVER',selected:false},
          {category:'PVT SECURITY',selected:false}
        ],width:'30%'},
        {mainCategory:'RIDES',selected:false,subCategory:[
          {category:'ANY',selected:true},
          {category:'ECONOMY',selected:false},
          {category:'MIDDLE CLASS',selected:false},
          {category:'FIRST CLASS',selected:false}
        ],width:'30%'},
        {mainCategory:'SAFE HOUSES',selected:false,subCategory:[
          {category:'ANY',selected:true},
          {category:'STRIP CLUB',selected:false},
          {category:'PUB',selected:false},
          {category:'GUEST HOUSE',selected:false},
          {category:'FULL HOUSE',selected:false},
          {category:'BACHELOR ROOM',selected:false},
          {category:'APARTMENT',selected:false},
          {category:'LOFT',selected:false}
        ],width:'40%'}
    ])
    const mainCategory = preferenceTypes.filter(item => item.selected === true)[0].mainCategory;
    const subCategory = preferenceTypes.filter(item => item.selected === true)[0].subCategory.filter(item => item.selected === true)[0].category;
    const [clients,setClients] = useState(users);
    const [businesses,setBusinesses] = useState(null);
    let customFonts = {
        'fontLight': require('..//../fonts/MontserratAlternates-Light.otf'),
        'fontBold': require('..//../fonts/MontserratAlternates-Bold.otf'),
    };
    React.useEffect(() => {
        loadFontsAsync();
        getLocation(location => setCurrentLocation(location))
    },[]);
    useEffect(() => {
        //getRequestData(mainCategory,(response) => setClients(response))
    },[mainCategory])
    const loadFontsAsync = async ()=> {
        await Font.loadAsync(customFonts);
        setFontFamilyObj({fontLight:'fontLight',fontBold:'fontBold'})
    }
    const getLocation = (cb)=>{
        if(currentLocation){
            cb(currentLocation);
        }else{
            getCurrentLocation((latitude,longitude,heading,hash)=>{
                setCurrentLocation({latitude,longitude,heading,hash});
                cb({latitude,longitude,heading,hash});
            })
        }
        getCurrentLocation((latitude,longitude,heading,hash) => setCurrentLocation({latitude,longitude,heading,hash}));
    }
    useEffect(()=>{
        const getUser = async() => {
            try {
                const user = await AsyncStorage.getItem("user");
                user && setAccountInfo(JSON.parse(user));
            } catch (e) {
                showToast(e);
            }
        }
    },[])
    const saveUser = async user =>{
        try {
          await AsyncStorage.setItem("user", JSON.stringify(user));
          setAccountInfo(user);
        } catch (e) {
          showToast(e);
        }
    }
    const logout = async () =>{
        try {
            await AsyncStorage.removeItem("user");
            setAccountInfo(null);
        } catch (e) {
            showToast(e);
        }
    }
    const getUserProfile = (navigation,page,clientId) => {
        const userProfile = clients?.filter(client => client.clientId === clientId);
        const isOwner = accountInfo.clientId === clientId;
        if(isOwner){
            setActiveProfile(accountInfo);
            navigation.navigate(page)
        }else{
            if(userProfile.length > 0){
                page === "Profile" ? setActiveProfile(userProfile[0]) : setBusinessProfile(userProfile[0])
                navigation.navigate(page)
            }
        }
    }
    const handleUploadPhotos = (field,page,clientId) => {
        let location = `${field}/${accountInfo.clientId}`;
        if(field === "photos"){
            location = `${field}/${accountInfo.clientId}/${(Date.now() +  Math.floor(Math.random()*89999+10000)).toString()}`;
        }
        if(field !== "selfiePhoto"){
            setConfirmDialog({isVisible:true,text:`Would Like To Select From The Gallery Or You Would Like To Snap Using Your Camera?`,severity:false,okayBtn:'GALLERY',cancelBtn:'CAMERA',response:(res) => { 
                if(res){
                    pickImage(field,(response) => {
                        uploadFile(response,location,(url) => {
                            const photoId = (Date.now() + Math.floor(Math.random() * 899 + 1000)).toString()
                            const value = page === 'Profile' ? [...activeProfile.photos,{photoId,url}] : [...businessProfile.photos,{photoId,url}]
                            updateData("clients",clientId,{field,value:field === 'photos' ? value : url})
                            page === 'Profile' ? setActiveProfile(prevState => ({...prevState,[field] : field === 'photos' ? value : url})) : setBusinessProfile(prevState => ({...prevState,[field] : field === 'photos' ? value : url}))
                            showToast("You "+field+" Has Been Successfully Changed!")
                        })
                    })
                }else{
                    snapAPhoto(field,location,clientId,page)
                }
            }})
        }else{
            snapAPhoto(field,location,clientId,page)
        }
    }
    const snapAPhoto = (field,location,clientId,page) =>{
        takePicture(field,(response) => {
            uploadFile(response,location,(url) => {
                const photoId = (Date.now() + Math.floor(Math.random() * 899 + 1000)).toString()
                const value = page === 'Profile' ? [...activeProfile.photos,{photoId,url}] : [...businessProfile.photos,{photoId,url}]
                updateData("clients",clientId,{field,value:field === 'photos' ? value : url})
                page === 'Profile' ? setActiveProfile(prevState => ({...prevState,[field] : field === 'photos' ? value : url})) : setBusinessProfile(prevState => ({...prevState,[field] : field === 'photos' ? value : url}))
                showToast("You "+field+" Has Been Successfully Changed!")
            })
        })
    }
    const getMybusinesses = () => {
        setBusinesses(clients.filter(item => item.accountOwner === accountInfo?.clientId && item.clientId !== accountInfo.clientId))
    }
    const appState = {
        accountInfo,preferenceTypes,setActiveProfile,businessProfile,setBusinessProfile,getMybusinesses,businesses,setBusinesses,handleUploadPhotos,setPreferenceTypes,mainCategory,subCategory,clients,currentLocation,getDistance,getUserProfile,activeProfile,pickCurrentLocation,nativeLink,setAccountInfo,saveUser,logout,fontFamilyObj,setModalState,setConfirmDialog,getLocation,sendPushNotification,showToast,takePicture,pickImage,sendSms,phoneNoValidation,countryData,setCountryData
    }
    return(
        <AppContext.Provider value={{appState}}>
            {fontFamilyObj && props.children} 
            {(modalState.isVisible && fontFamilyObj ) && (<ModalCoontroller modalState={{...modalState,setModalState}}/>)}
            {(confirmDialog.isVisible  && fontFamilyObj )&& (<ConfirmDialog modalState={{...confirmDialog,setConfirmDialog}}/>)}
        </AppContext.Provider>
    )
}
const getCurrentLocation = (cb) =>{
    const latitude= -26.2163;
    const longitude=28.0369;
    if(askPermissionsAsync()){
        Location.installWebGeolocationPolyfill()
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const heading = position?.coords?.heading;
            const hash = geohash.encode(latitude, longitude);
            cb(latitude,longitude,heading,hash);
        },error => {
            showToast(error.message)
            const hash = geohash.encode(latitude, longitude);
            cb(latitude,longitude,0,hash);
        },{ 
            enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
        );
    }else{
        showToast("You did not grant us permission to get your current location");
        const hash = geohash.encode(latitude, longitude);
        cb(latitude,longitude,0,hash);
    }
}
const askPermissionsAsync = async() => {
    const { status: location } = await Permissions.askAsync(Permissions.LOCATION);
    if (location !== "granted") {
        return false;
    }else{
        return true;
    }
}
const pickCurrentLocation = (cb) => {
    getCurrentLocation((latitude,longitude)=>{
        axios.request({method: 'post',url : "https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+ longitude+"&sensor=true&key=AIzaSyB_Yfjca_o4Te7-4Lcgi7s7eTjrmer5g5Y"}).then((response) => { 
            if(response){
                const short_name = response.data.results[0].address_components.filter(item => item.types.filter(x => x === 'country')[0])[0].short_name
                const long_name = response.data.results[0].address_components.filter(item => item.types.filter(x => x === 'country')[0])[0].long_name 
                cb({latitude,longitude,text:response.data.results[0].formatted_address,short_name,long_name})
            }
        }).catch((e) => {
            //alert(e.response);
        });
    })
}
const showToast = (message)=>{
    if (Platform.OS == 'android') {
        ToastAndroid.show(message, ToastAndroid.LONG); 
    }else{
        alert(message);
    }
}
const takePicture = async (type,cb) => {
    try {
        const permissionRes = await ImagePicker.requestCameraPermissionsAsync();
        const { granted } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
        if(granted || permissionRes.granted){
            let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: type=="avatar"?[1, 1]:null,
                quality: 0.5,
            });
            if (!result.cancelled) {
                cb(result.uri)
            }
        }
    } catch (error) {
        showToast(error)
    }
}
const pickImage = async (type,cb) => {
    try {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(permissionResult.granted){
            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: type=="avatar"?[1, 1]:null,
                quality: 0.5,
            });
            if (!result.cancelled) {
                cb(result.uri);
            }
        }
    } catch (error) {
        showToast(error)
    }
};
const sendSms = (phoneNo,msg) =>{
    var request = new XMLHttpRequest();
    request.open('POST', 'https://rest.clicksend.com/v3/sms/send');
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Basic aW5mb0BlbXBpcmVkaWdpdGFscy5vcmc6ZW1waXJlRGlnaXRhbHMxIUA=');
    request.onreadystatechange = function (response) {
        showToast("message sent to "+phoneNo)
    };
    var body = {
        'messages': [
        {
            'source': 'javascript',
            'from': "uberFlirt",
            'body': msg,
            'to': phoneNo,
            'schedule': '',
            'custom_string': ''
        }
        ]
    };
    request.send(JSON.stringify(body));
}
const phoneNoValidation = (phone,countryCode) =>{
    countryCode = countryCode.slice(1,countryCode.length);
    let phoneNumber = phone.replace(/ /g, '');
    if ((phoneNumber.length < 16) && (phoneNumber.length > 7)) {
      if(phoneNumber[0] === "0" && phoneNumber[1] !== "0"){
        phoneNumber = phoneNumber.slice(1,phoneNumber.length)
      }else if(phoneNumber[0]!== '0'){
        phoneNumber = phoneNumber;
      }
      if(countryCode !== ""){
        if(countryCode[0] === "+"){
          countryCode = countryCode.slice(1,countryCode.length)
        }else{
          if(countryCode[0] === "0" && countryCode[1] === "0"){
            countryCode=countryCode.slice(2,countryCode.length)
          }
        }
        return countryCode+phoneNumber;
      }else{
        return false;
      }
    }else{
      return false;
    }
}
const nativeLink = (type,obj) => {
    if(type === 'map'){
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${obj.lat},${obj.lng}`;
        const label = obj.label;
        const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });
        Linking.openURL(url);
    }else if(type === 'call'){
        let phoneNumber = obj.phoneNumber;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${obj.phoneNumber}`;
        }else{
            phoneNumber = `tel:${obj.phoneNumber}`;
        }
        Linking.canOpenURL(phoneNumber).then(supported => {
            if (!supported) {
                Alert.alert('Phone number is not available');
            } else {
                return Linking.openURL(phoneNumber);
            }
        }).catch(err => console.log(err));
    }else if(type === 'email'){
        Linking.openURL(`mailto:${obj.email}`)
    }
}
const sendPushNotification = async (to,title,body,data)=> {
    if(to!=null || to!=undefined || to!=""){
        const message = {
            to: to,
            sound: 'default',
            title: title,
            body: body,
            data,
            priority: 'high',
        };
        try {
            await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });
        } catch (error) {}
    }
}
const getDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6371; 
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);
  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
}
const toRad = (Value) => {
    return Value * Math.PI / 180;
}