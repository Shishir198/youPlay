import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Constant from 'expo-constants'

import { StyleSheet, Text, View,Dimensions } from 'react-native';
import { Entypo,Octicons,FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons';
export default function Header({navigation}) {
  // const {search} = props
  // console.log(search)
  
  return (
    
    <View style ={{marginTop:Constant.statusBarHeight,flexDirection:'row',backgroundColor:'white',justifyContent:'space-between',
    elevation:4,width:Dimensions.get('screen').width,height:50}}>
      <StatusBar style="dark" backgroundColor='white'/>
     <View style ={{flexDirection:'row',padding:10,alignItems:'center'}}>
        <Entypo name="folder-video" size={32} color="red" />
        <Text style={{fontSize:20,fontWeight:'bold'}}>YouPlay</Text>
     </View>
     <View style ={{flexDirection:'row',padding:10,alignItems:'center',justifyContent:"space-between",width:130}}>
        <Octicons name="search" size={20} color="black" onPress={() => console.log('pressed')}/>
        <FontAwesome name="video-camera" size={20} color="black" />
        <MaterialCommunityIcons name="theme-light-dark" size={24} color="black" />
     </View>     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
