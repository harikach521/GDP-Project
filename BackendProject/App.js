import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Registration from './components/Registration';
import Login from './components/Login';
import FirstPage from './components/FirstPage';
import Dashboard from './components/Dashboard';
import Contants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

function App() {

  return (
    <View style={styles.container}>
      <Stack.Navigator>
      <Stack.Screen name = "FirstPage" component = {FirstPage}/>
        <Stack.Screen name = "Registration" component = {Registration}/>
        <Stack.Screen name = "Login" component = {Login}/>
        <Stack.Screen name = "Dashboard" component = {Dashboard}/>
      </Stack.Navigator>
      

      <StatusBar style="auto" />
    </View>
  );
}

export default() => {
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lavender',
    marginTop:Contants.statusBarHeight
  },

});
