import 'react-native-gesture-handler';
import React, { useState, useContext } from "react";
import { StyleSheet, Platform, Text, View, Modal, Alert, Dimensions , TouchableOpacity,TextInput} from "react-native";
import {FontAwesome,MaterialIcons,Ionicons,Feather} from "react-native-vector-icons";
import { AppContext } from '../context/AppContext';
import DateTimeSelector from './Modals/DateTimeSelector';
import ModalSelector from './Modals/ModalSelector';
import CountryList from './Modals/CountryList';
import Input from './Modals/Input';
import Prices from './Modals/Prices';
const ModalCoontroller = props =>{
    const {appState:{fontFamilyObj}} = React.useContext(AppContext)
    const attr = props.modalState.attr;
    return(
        <Modal animationType="slide" transparent={true} visible={props.modalState.isVisible} onRequestClose={() => {props.modalState.setModalState({isVisible:false})}}>
            <View style={{flex:1,backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                <View style={styles.centeredView}>
                    <View style={styles.ProfileFooterHeader}>
                        <View style={{alignContent:'center',alignItems:'center',marginTop:-10}}>
                            <FontAwesome name="ellipsis-h" color="#5586cc" size={36}></FontAwesome>
                        </View>
                        <TouchableOpacity onPress={()=>props.modalState.setModalState({isVisible:false})} style={styles.statsContainer}>
                            <Feather name="arrow-left-circle" color="#757575" size={24}></Feather>
                            <Text style={{textTransform:'uppercase',fontSize:18,fontFamily:fontFamilyObj.fontBold,color:'#5586cc',marginLeft:10}}>{props.modalState.attr.headerText}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:5}}>
                        {(props.modalState.attr.headerText === "FACEBOOK LINK" || props.modalState.attr.headerText === "YOUR ABOUT") && <Input attr={attr}/>}
                        {(props.modalState.attr.headerText === "SELECT COUNTRY | REGION") && <CountryList attr={attr}/>}
                        {(props.modalState.attr.headerText === "SELECT GENDER") && <ModalSelector attr={attr}/>}
                        {(props.modalState.attr.headerText === "SETUP YOUR RATES") && <Prices attr={attr}/>}
                        {(props.modalState.attr.headerText === "SELECT DATE" || props.modalState.attr.headerText === "SELECT TIME") && <DateTimeSelector attr={attr}/>}
                    </View>
                </View>
            </View>
        </Modal>
    )
}
export default ModalCoontroller;
const styles = StyleSheet.create({
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: -5,
        justifyContent:'center',
        padding:5,
    },
    ProfileFooterHeader:{
        borderTopLeftRadius: 30, borderTopRightRadius: 30,
        borderBottomWidth:1,
        borderColor:'#D2D6D8',
        height:70
    },
    centeredView:{
        minHeight:'60%',
        maxHeight:'90%',
        marginTop: 'auto',
        backgroundColor:'#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginLeft:5,marginRight:5
    },
});