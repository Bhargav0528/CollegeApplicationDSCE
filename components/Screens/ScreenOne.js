import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View,Image,ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Notifications from '../Tabs/Notifications';
import Events from '../Tabs/Events';

const TopTab = createMaterialTopTabNavigator({
  Notifications: {screen:Notifications},
  Events: {screen:Events}
},
{
    navigationOptions: {
      tabBarPosition: 'top',
      tabBarOptions: {
        activeTintColor: 'orange',
        style: {
          backgroundColor: '#272727',
        },
      },
    },
  }
)
class ScreenOne extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={{flex:1, backgroundColor:'#fff'}}>
        <TopTab />
      </View>
    );
  }
}

export default ScreenOne;