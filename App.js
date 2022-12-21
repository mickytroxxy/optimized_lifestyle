import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Home from './src/screens/Home';
import { AppProvider } from './src/context/AppContext';
import Navigation from './src/screens/Navigation';
import { LogBox } from 'react-native';
import Constants from 'expo-constants'
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
export default function App() {
  return (
    <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight === 20 ? Constants.statusBarHeight : Constants.statusBarHeight - 5 : StatusBar.currentHeight,backgroundColor:"#e8e9f5" }}>
      <StatusBar backgroundColor="#e8e9f5" translucent={false} barStyle="dark-content"/>
      <AppProvider>
        <Navigation/>
      </AppProvider>
    </View>
  );
}
