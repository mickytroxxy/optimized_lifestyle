import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import Register from './Register';
import Payment from './Payment';
import WebBrowser from './WebBrowser';
import ConfirmScreen from './ConfirmScreen';
import Login from './Login';
import Entry from './Entry';
import RequestScreen from './RequestScreen';
import Profile from './Profile';
import BusinessProfile from './BusinessProfile';
import CreateBusiness from './CreateBusiness';

const RootStack = createStackNavigator();
const Navigation = props => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Entry"
        screenOptions={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: "#009387",
            borderBottomWidth: 0,
          },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerShown: false
        }}
      >
        <RootStack.Screen
          name="Home"
          component={Home}
        />
        <RootStack.Screen
          name="Register"
          component={Register}
        />
        <RootStack.Screen
          name="Payment"
          component={Payment}
        />
        <RootStack.Screen
          name="WebBrowser"
          component={WebBrowser}
        />
        <RootStack.Screen
          name="ConfirmScreen"
          component={ConfirmScreen}
        />
         <RootStack.Screen
          name="Entry"
          component={Entry}
        />
        <RootStack.Screen
          name="Login"
          component={Login}
        />
        <RootStack.Screen
          name="RequestScreen"
          component={RequestScreen}
        />
        <RootStack.Screen
          name="Profile"
          component={Profile}
        />
        <RootStack.Screen
          name="BusinessProfile"
          component={BusinessProfile}
        />
        <RootStack.Screen
          name="CreateBusiness"
          component={CreateBusiness}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default React.memo(Navigation);