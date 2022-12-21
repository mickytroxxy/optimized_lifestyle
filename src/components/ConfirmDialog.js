import 'react-native-gesture-handler';
import React, { useState, useContext } from "react";
import { StyleSheet, Platform, Text, View, Modal, Alert, Dimensions , TouchableOpacity,TextInput} from "react-native";
import { AppContext } from '../context/AppContext';
const ConfirmDialog = props =>{
    const {appState:{fontFamilyObj}} = React.useContext(AppContext)
    return(
        <Modal animationType="slide" transparent={true} visible={props.modalState.isVisible} onRequestClose={() => {props.modalState.setConfirmDialog({isVisible:false})}}>
            <View style={{flex:1,alignContent:'center',alignItems:'center',justifyContent:'center',backgroundColor: 'rgba(52, 52, 52, 0.5)'}}>
                <View style={styles.centeredView}>
                    <Text style={{fontFamily:fontFamilyObj.fontLight,fontSize:15}}>{props.modalState.text}</Text>
                    <View style={{flexDirection:'row',borderTopWidth:0.7,marginTop:15,paddingTop:10,borderTopColor:'#AFB1B1'}}>
                        <View style={{width:'50%',alignContent:'center',alignItems:'center'}}>
                            <TouchableOpacity onPress={() => {
                                props.modalState.setConfirmDialog({isVisible:false})
                                props.modalState.response(false)
                            }} style={{padding:15,borderRadius:10,borderWidth:1,borderColor:props.modalState.severity ? 'orange' : '#0e75b3'}}><Text style={{fontFamily:fontFamilyObj.fontBold,color:props.modalState.severity ? 'orange' : '#0e75b3'}}>{props.modalState.cancelBtn}</Text></TouchableOpacity></View>
                        <View style={{width:'50%',alignContent:'center',alignItems:'center'}}>
                            <TouchableOpacity onPress={() => {
                                props.modalState.setConfirmDialog({isVisible:false})
                                props.modalState.response(true)
                        }} style={{padding:15,borderRadius:10,borderWidth:1,borderColor:'#0e75b3'}}><Text style={{fontFamily:fontFamilyObj.fontBold,color:'#0e75b3'}}>{props.modalState.okayBtn}</Text></TouchableOpacity></View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
export default ConfirmDialog;
const styles = StyleSheet.create({
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: -5,

        padding:5,
    },
    ProfileFooterHeader:{
        borderTopLeftRadius: 30, borderTopRightRadius: 30,
        borderBottomWidth:1,
        borderColor:'#D2D6D8',
        height:70
    },
    centeredView:{
        width:'80%',
        backgroundColor:'#fff',
        borderRadius:10,
        padding:15,
        justifyContent:'center',
        elevation:10,shadowOffset: { width: 0,height: 2},shadowColor: "#000",shadowOpacity: 0.1,marginBottom:15,
    },
});