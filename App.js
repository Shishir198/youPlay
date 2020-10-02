// importing all the required dependencies
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from './screens/home'
import Player from './screens/player';
import Live from './screens/live';

const Tab = createBottomTabNavigator();

// starting of default function
export default function App() {
  const HomeStack = createStackNavigator();
  const LiveStack = createStackNavigator()
  function HomeStackScreen() {
    return (
      <HomeStack.Navigator screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="Player" component={Player} />
      </HomeStack.Navigator>
    );
  }
  function LiveStackScreen() {
    return (
      <LiveStack.Navigator screenOptions={{headerShown: false}}>
        <LiveStack.Screen name="Live" component={Live} />
        <LiveStack.Screen name="Player" component={Player} />
      </LiveStack.Navigator>
    );
  }
  return (
    // <View style={{flex:1}}>
      // <Home/>
      //  <StatusBar style="dark" backgroundColor='white'/>
      <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-play-circle'
                : 'ios-play-circle';
            } else if (route.name === 'Live') {
              iconName = focused ? 'ios-radio' : 'ios-radio';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Live" component={LiveStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
