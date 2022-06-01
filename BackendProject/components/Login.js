import React, {useState, useEffect, Component} from 'react'
import {View, Text, StyleSheet, Button, FlatList, TextInput} from 'react-native';
import {Card, FAB} from 'react-native-paper'

function Login(props) {
 
  const data = [
      {id:1, title:'Enter your Email:', body:'Email:'},
      {id:2, title:'Enter your Password:', body:'Password:'},
  ]

  const renderData = (item) => {
      return (
          
          <Card style = {styles.cardStyle}>
            <Text>
              {item.title}
            </Text>
              <TextInput
                  style={{height: 35,width: "95%",borderColor: "gray",borderWidth: 2,marginBottom:5,marginTop:5,marginleft:5,marginRight:5}}
                  // Adding hint in TextInput using Placeholder option.
                   placeholder={item.body}
                  // Making the Under line Transparent.
                   underlineColorAndroid="transparent"
              />
          </Card>
          
      )
  }


    
return (
    <View style = {{flex:1}}>
        <FlatList
          data = {data}
          renderItem = {({item}) => {
              return renderData(item)
          }}
          keyExtractor = {item => `${item.id}`}
        />
       
        <Button
        style = {{margin:16}}  
        title = "Login"
        mode = "contained"
        onPress = {() => props.navigation.navigate('Dashboard')}
        
        marginBottom = {100}
        marginTop = {5}
        />
        <Button
        style = {{margin:16}}  
        title = "GoBack"
        mode = "contained"
        onPress = {() => props.navigation.navigate('FirstPage')}
        marginBottom = {100}
        marginTop = {5}
        />
       
    </View>

)
}

const styles = StyleSheet.create({
  textStyle: {
      color:'brown',
      padding:20,
      fontSize:25,
      marginleft:15
  },
  cardStyle:{
      margin:5,
      marginleft:15,
      marginRight:15,
      padding:5
  },

  button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'lightblue',
      margin:25,
      padding:16,
      marginTop:5,
      marginBottom:100,
      color:'white',
      flex:1
  }

})

export default Login