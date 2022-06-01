import React from 'react'
import {View, Text, StyleSheet, Button, FlatList, TextInput} from 'react-native';
import {Card, FAB} from 'react-native-paper'

function Dashboard() {

    const data = [
        {id:1, title:'The image of EYE Detection', body:'Email:'},
        {id:2, title:'The image of LANE Detection', body:'Password:'},
        {id:2, title:'The Graph of PULSE Detection', body:'Password:'}
    ]
  
    const renderData = (item) => {
        return (
            
            <Card style = {styles.cardStyle}>
              <Text style = {{height: 35,width: "95%", alignContent:'center', alignItems:'center', fontSize:20}}>
                {item.title}
              </Text>
                
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
        title = "Start"
        mode = "contained"
        //onPress = {() => props.navigation.navigate('Dashboard')}
        width = '150'
        height = '150'
        borderRadius = '150/2'
        backgroundColor = 'green'

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
        margin:10,
        marginleft:35,
        marginRight:35,
        padding:5,
        height:130
    },
    circle:{
        width:150,
        height:150,
        borderRadius:150/2,
        backgroundColor:'green'
    }
  })
  

export default Dashboard