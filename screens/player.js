import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions, FlatList,Modal} from 'react-native';
import Header from '../header'
import { Entypo,Octicons,FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons';
import CardC from '../card'
import { Chip,Searchbar,Button,ActivityIndicator, Colors } from 'react-native-paper';
import Constant from 'expo-constants'
import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import {WebView} from 'react-native-webview'

export default function Player({route}){
  console.log(route)
  const link ='https://www.youtube.com/embed/'+route.params.id+'/'
  console.log(link)
  return(
//     <View style={{flex:0.5}}>
//       <VideoPlayer
//   videoProps={{
//     shouldPlay: true,
//     resizeMode: Video.RESIZE_MODE_CONTAIN,
//     source: {
//       uri:'http://techslides.com/demos/sample-videos/small.webm'
//     },
//   }}
//   inFullscreen={true}
// />
//     </View>
<View style={{ height: 300,marginTop:150 }}>

<WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{uri: link }}
/>

</View>

  )
    
}