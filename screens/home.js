import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions, FlatList,Modal } from 'react-native';
import Header from '../header'
import { Entypo,Octicons,FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons';
import CardC from '../card'
import { Chip,Searchbar,Button,ActivityIndicator, Colors } from 'react-native-paper';
import Constant from 'expo-constants'
import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'



export default function Home(props) {

  const [searchQuery, setSearchQuery] = React.useState('');
  const [loading,setLoading] = React.useState(true)
  const [searchModal,setSearchModal] = React.useState(false);
  const onChangeSearch = query => setSearchQuery(query);
  const [data,setData] = useState([])
  const fetchData = () =>{
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchQuery}&regionCode=IN&relevanceLanguage=en&type=video&videoSyndicated=true&key=AIzaSyBnIcmVR-ckI4p-78tZbtwMTkYoVSvNATY`)
    .then((res) => res.json())
    .then((apidata) => {
      console.log("ok")
      setData(apidata.items)
      // console.log(apidata.items)
      setLoading(false)
     
      // setData(response.items)
    })
    .catch((err) => Alert.alert('Sorry! Limit Exhausted'))
  }
  const whenEmpty =() => {
    return(
      <View style = {{flex:1,marginTop:Dimensions.get('window').height/2,alignItems:'center'}}>
        <Text style={{fontWeight:'bold'}}> Sorry ! Limit is Exhausted</Text>
        <Text style={{fontWeight:'bold'}}> You can start using the app tomorrow</Text>
      </View>
    )
  }
  console.log(data)
  useEffect(() => {
    fetchData()
  },[])
  return (
    <View style={{flex:1}}>
      <View style ={{marginTop:Constant.statusBarHeight,flexDirection:'row',backgroundColor:'white',justifyContent:'space-between',
    elevation:4,width:Dimensions.get('screen').width,height:50}}>
      <StatusBar style="dark" backgroundColor='white'/>
     <View style ={{flexDirection:'row',padding:10,alignItems:'center'}}>
        <Entypo name="folder-video" size={32} color="red" />
        <Text style={{fontSize:20,fontWeight:'bold'}}>YouPlay</Text>
     </View>
     <View style ={{flexDirection:'row',padding:10,alignItems:'center',justifyContent:"space-between",width:130}}>
        <Octicons name="search" size={20} color="black" onPress={() => setSearchModal(true)}/>
        <FontAwesome name="video-camera" size={20} color="black" />
        <MaterialCommunityIcons name="theme-light-dark" size={24} color="black" />
     </View>     
    </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={searchModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        {/* <View style={{flexDirection:'row'}}> */}
         <Searchbar
      placeholder="Press left icon when done"
      style = {{marginTop:10,marginLeft:5,marginRight:5,height:40,}}
      onChangeText={onChangeSearch}
      onIconPress={() => {
        setSearchModal(false)
        setLoading(true)
        fetchData()
      
      }}
      value={searchQuery}
      
      />
      {/* <Button icon="camera" mode="text" style={{height:40,width:40}} onPress={() => console.log('Pressed')}>
      Press me
    </Button> */}
      {/* </View> */}
      </Modal>
      
     
     {loading?<ActivityIndicator animating={true} size='large' color={Colors.red800} />:
     
      <FlatList
      data={data}
      renderItem = {({item}) => {
        return <CardC 
        videoId = {item.id.videoId}
        title={item.snippet.title} 
        channelName = {item.snippet.channelTitle}
        Thumbnail = {item.snippet.thumbnails.high.url}
        navigation = {props.navigation}
        />
      }}
      keyExtractor = {item => item.etag}
      ListEmptyComponent = {() => whenEmpty()}
      />
    }
      {/* <ScrollView>
      <CardC/>
      <CardC/>
      <CardC/>
      <CardC/>
      <CardC/>
      <CardC/>
      <Text>.</Text>
      </ScrollView> */}
     
    </View>
  );
}

const styles = StyleSheet.create({
  
});
