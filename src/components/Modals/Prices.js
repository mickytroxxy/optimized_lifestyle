import React, { memo, useContext, useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { AppContext } from '../../context/AppContext';
import AisInput from '../forms/AisInput';
import { FontAwesome} from "@expo/vector-icons";
const Prices = memo((props) => {
    const {updatePrices,service} = props.attr;
    const {appState:{setModalState,showToast,fontFamilyObj:{fontBold}}} = useContext(AppContext);
    const [formData,setFormData] = useState([
        {type:'HOURLY',fee:0,name:'HOURS'},
        {type:'DAILY',fee:0,name:'DAYS'},
        {type:'WEEKLY',fee:0,name:'WEEKS'},
        {type:'MONTHLY',fee:0,name:'MONTHS'},
        {type:'YEARLY',fee:0,name:'YEARS'},
    ]);
    const handleChange = (field,value) => {
        setFormData(formData.map(item => item.type === field ? {...item,fee:value} : item))
    };
    return (
        <View>
            <View>
                <Text style={{fontFamily:fontBold,color:'#757575',marginLeft:25,marginTop:15}}>SETUP YOUR {service} RATE</Text>
                <View style={{padding:20}}>
                    <AisInput attr={{field:'HOURLY',icon:{name:'money',type:'MaterialIcons',min:5,color:'#5586cc'},keyboardType:null,placeholder:'YOUR HOURLY RATE',color:'#009387',handleChange}} />
                    <AisInput attr={{field:'DAILY',icon:{name:'money',type:'MaterialIcons',min:5,color:'#5586cc'},keyboardType:null,placeholder:'YOUR DAILY RATE',color:'#009387',handleChange}} />
                    <AisInput attr={{field:'WEEKLY',icon:{name:'money',type:'MaterialIcons',min:5,color:'#5586cc'},keyboardType:null,placeholder:'YOUR WEEKLY RATE (optional)',color:'#009387',handleChange}} />
                    <AisInput attr={{field:'MONTHLY',icon:{name:'money',type:'MaterialIcons',min:5,color:'#5586cc'},keyboardType:null,placeholder:'YOUR MONTHLY RATE (optional)',color:'#009387',handleChange}} />
                    <AisInput attr={{field:'YEARLY',icon:{name:'money',type:'MaterialIcons',min:5,color:'#5586cc'},keyboardType:null,placeholder:'YOUR YEARLY RATE (optional)',color:'#009387',handleChange}} />
                    
                    <View style={{alignItems:'center',marginTop:30}}>
                        <TouchableOpacity onPress={()=>{
                            if(formData[0].fee && formData[1].fee){
                                setModalState({isVisible:false});
                                updatePrices(service,formData);
                            }else{
                                showToast("Hourly and Daily rates are required")
                            }
                        }}>
                            <FontAwesome name='check-circle' size={120} color="green"></FontAwesome>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
})

export default Prices