import React, { memo, useContext } from 'react'
import { View, Text } from 'react-native'
import { AppContext } from '../../context/AppContext'

const BackGround = memo(({navigation}) => {
    const {appState:{accountInfo,fontFamilyObj:{fontBold}}} = useContext(AppContext);
    return (
        <View>
            <Text style={{fontFamily:fontBold}}></Text>
        </View>
    )
})

export default BackGround