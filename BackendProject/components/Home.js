

import React, {useState, useEffect, Component} from 'react'
import {View, Text, StyleSheet, Button, Pressable, FlatList, Platform, TextInput} from 'react-native';
import {Card, FAB} from 'react-native-paper'

function Home(props) {

    const [datavalue, setData] = useState([])
    useEffect(() => {
        fetch('http://192.168.1.119:5000/get',{
            method:'GET'
        })
        .then(resp => resp.json())
        .then(article => {
            setData(article)
        })
    }, [])

    const data = [
        {id:1, title:'First Title', body:'Enter your FirstName:'},
        {id:2, title:'Second Title', body:'Enter Your LastName:'},
        {id:3, title:'Third Title', body:'Enter Your age:'},
        {id:3, title:'Third Title', body:'Enter Your Height:'},
        {id:3, title:'Third Title', body:'Enter Your Weight:'}
    ]

    const renderData = (item) => {
        return (
            
            <Card style = {styles.cardStyle}>
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

    const registerDate = () => {
        console.log('requestreceived')
        fetch('http://localhost:5000/add', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
           body:
            JSON.stringify({FirstName:'FirstName', LastName:'LastName',  age:7, Height:654,  Weight:66})
        })
        .then(resp => resp.json())
        .then(data => {
            //console.log("receivedresponsefromGET", data)
            props.navigation.navigate('Home')
        })
        .catch(error => console.log("request failed",error))
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
          <FAB
          style = {styles.fab}
          small = {false}
          icon = "plus"
          theme = {{color:{accent:"green"}}}
          onPress = {() => console.log("Pressed")}          
          />
          <Button
          style = {{margin:16}}  
          title = "Register"
          mode = "contained"
          onPress = {() => registerDate()}
          
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
    fab:{
        position:'absolute',
        margin:16,
        right:0,
        bottom:0
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

export default Home
