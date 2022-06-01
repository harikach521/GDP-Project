import React, {useState, useEffect, Component} from 'react'
import {View, Text, StyleSheet, Button, Pressable, FlatList, Platform, TextInput} from 'react-native';
import {Card, FAB} from 'react-native-paper'

function FirstPage(props) {
  return (
    <View>
      <Button
          style = {{margin:16}}  
          title = "Register"
          mode = "contained"
          onPress = {() => props.navigation.navigate('Registration')}
          
          marginBottom = {100}
          marginTop = {5}
       />
           <Button
          style = {{margin:16}}  
          title = "Login"
          mode = "contained"
          onPress = {() => props.navigation.navigate('Login')}
          marginBottom = {100}
          marginTop = {5}
          />      
    </View>
  )
}

export default FirstPage