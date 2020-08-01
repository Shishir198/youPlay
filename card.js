import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,  View,Dimensions,Image,TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph,TouchableRipple,Text, } from 'react-native-paper';
import image from './screens/image'
export default function CardC(props){
    // console.log(image)
    // console.log(props)
    return(
       
        <Card style={{padding:5,elevation:1,marginTop:5}}>
            <TouchableNativeFeedback onPress={() => props.navigation.navigate('Player',{'id':props.videoId})}>
            <Card.Cover source={{ uri: props.Thumbnail }} />
            </TouchableNativeFeedback>
            <View style={{flex:1,flexDirection:'row',alignItems:'center',marginTop:10}} onPress={() => console.log("hasshhh")}>
            
            <Image source={{ uri: image }} style={{marginLeft:5,width:40,height:40,borderRadius:20}}/>
            
            <Card.Content>
            
            <TouchableNativeFeedback onPress={() => props.navigation.navigate('Player',{'id':props.videoId})}>
            <Text ellipsizeMode='tail' numberOfLines={2}
            style={{fontWeight:'700',fontSize:18,width:Dimensions.get('screen').width-90}}>{props.title}</Text>
            </TouchableNativeFeedback>
            

            <Text style={{marginTop:5,fontSize:16,fontWeight:'bold',color:'red'}}>{props.channelName}</Text>
            
            </Card.Content>
            </View>
            
        </Card>
        
    )
}