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
// import { List,Chip } from 'react-native-paper';

export default function Live(props){    
  const [searchQuery, setSearchQuery] = React.useState('');
  const [loading,setLoading] = React.useState(false)
  const [searchModal,setSearchModal] = React.useState(false);
  const onChangeSearch = query => setSearchQuery(query);
  const [data,setData] = useState([])
  const [eventSelected,setEventSelected] = useState({
    live:true,upcoming : false,completed : false
  })
  // const [event,setEvent] = useState('live')
 
  const fetchData = (event) =>{
    console.log("event",event)
    setLoading(true)
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=${event}&maxResults=100&q=${searchQuery}&type=video&key=AIzaSyBnIcmVR-ckI4p-78tZbtwMTkYoVSvNATY`)
    .then((res) => res.json())
    .then((apidata) => {
      console.log("ok")
      setData(apidata.items)
      setLoading(false)
     
      // setData(response.items)
    })
    .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchData('live')
  },[])
  // useEffect(() => {
  //   fetchData()
  // },[event])
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
        fetchData()
      
      }}
      value={searchQuery}
      
      />
      {/* <Button icon="camera" mode="text" style={{height:40,width:40}} onPress={() => console.log('Pressed')}>
      Press me
    </Button> */}
      {/* </View> */}
      </Modal>
      {/* <Modal></Modal> */}
      {/* <View style={{backgroundColor:'white',elevation:3}}>
      <List.Accordion
        title="Select Event"
        // left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="Live" />
        <List.Item title="Upcoming" />
        // <List.Item title="Completed" />
      </List.Accordion> */}
{/* '#ff9900' */}
      {/* </View> */}
      <View style={{flexDirection:'row',marginTop:5,justifyContent:'space-evenly',marginLeft:5,marginBottom:3}}>
      
      <Chip icon="fire" mode='outlined' selected={eventSelected.live} selectedColor={'red'} 
       onPress={() => {
         fetchData('live')
         setEventSelected({live:true,upcoming:false,completed:false})
        
      }}>Live</Chip>
      
      <Chip icon="clock-fast" mode='outlined' selected={eventSelected.upcoming} selectedColor={'#ff9900'} 
       onPress={() => {
         fetchData('upcoming')
        setEventSelected({live:false,upcoming:true,completed:false})
        
      }}>Upcoming</Chip>
      
      <Chip icon="infinity" mode='outlined' selected={eventSelected.completed} selectedColor={'green'} 
       onPress={() => {
         fetchData('completed')
        setEventSelected({live:false,upcoming:false,completed:true})
        
      }}>Completed</Chip>
       </View>
      
     {loading?<ActivityIndicator animating={true} size='large' color={Colors.red800} />:
     

     
      <FlatList
      data={data}
      renderItem = {({item}) => {
        return(
          
          
       
        <CardC 
        videoId = {item.id.videoId}
        title={item.snippet.title} 
        channelName = {item.snippet.channelTitle}
        Thumbnail = {item.snippet.thumbnails.high.url}
        navigation = {props.navigation}
        />
       
        )
      }}
      
      keyExtractor = {item => item.etag}
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