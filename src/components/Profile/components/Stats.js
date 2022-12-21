import React, { memo } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Ionicons,Feather } from "@expo/vector-icons";
const Stats = memo((props) => {
    const {profileOwner,activeProfile,fontBold,fontLight,page} = props?.data;
    let iRated = true;
    if(profileOwner){
        return (
            <View style={styles.statsContainer}>
                <View style={styles.statsBox}>
                    <TouchableOpacity style={{justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#0e75b3" alignSelf="center"></Ionicons>
                        <Text style={{fontFamily:fontLight,color:'#0e75b3'}}>Broadcast</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.statsBox, { borderColor: "#e1ece7", borderLeftWidth: 0.5, borderRightWidth: 0.5 }]}>
                    <TouchableOpacity style={{alignItems:'center',alignContent:'center'}} onPress={() => {navigation.navigate("CreditScreen",{userObj})}}>
                        <Text style={[styles.text, { fontSize: 18,fontFamily:fontBold }]}>R 3608.00</Text>
                        <Text style={{fontFamily:fontLight,color:'#0e75b3'}}>Balance</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.statsBox}>
                    {activeProfile?.photos?.length > 0 ? (
                        <TouchableOpacity style={{justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                            <Feather name="user-check" size={24} color="#0e75b3" alignSelf="center"></Feather>
                            <Text style={{fontFamily:fontLight,color:'#0e75b3'}}>Followers (38)</Text>
                        </TouchableOpacity>
                    ):(
                        <TouchableOpacity style={{justifyContent:'center',alignContent:'center',alignItems:'center'}} onPress={()=>{state_controller.openMediaFiles({type:'photo',cameraType:'any',fileType:'image',isSelfie:false,userToken:activeUser.phoneNumber})}}>
                            <Ionicons name="camera-outline" size={24} color="#5586cc" alignSelf="center"></Ionicons>
                            <Text style={{fontFamily:fontLight,color:'#0e75b3'}}>Add Photos</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        )
    }else{
        return(
            <View style={styles.statsContainer}>
                <View style={styles.statsBox}>
                    <Text style={{fontFamily:fontBold,color:'#757575'}}>{54}</Text>
                    <Text style={{fontFamily:fontLight,color:'#0e75b3'}}>Followers</Text>
                </View>
                <View style={[styles.statsBox, { borderColor: "#e1ece7", borderLeftWidth: 0.5, borderRightWidth: 0.5 }]}>
                    <TouchableOpacity>
                        <Ionicons name="chatbubble-ellipses-outline" size={36} color="#0e75b3" alignSelf="center"></Ionicons>
                    </TouchableOpacity>
                </View>
                <View style={styles.statsBox}>
                    <TouchableOpacity>
                        {iRated?(
                            <Feather name="user-check" size={32} color="#0e75b3" alignSelf="center"></Feather>
                        ):(
                            <Ionicons name="person-add-outline" size={30} color="gray" alignSelf="center"></Ionicons>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
})
const styles = StyleSheet.create({
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: -5,
        padding:5,
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
});
export default Stats