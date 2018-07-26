import React, { Component } from 'react';
import { Text, View,Image,ScrollView } from 'react-native'; 
import StuffIndex from '../College_Material/StuffIndex.js';
import Calender from '../College_Material/Calender.js';
import TimeTable from '../College_Material/TimeTable.js';
import Notes from '../College_Material/Notes.js';
import { createStackNavigator } from 'react-navigation';
class ScreenTwo extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={{flex:1, backgroundColor:'#f3f3f3'}}>
        <Stack />
      </View>
    );
  }
}

const Stack = createStackNavigator({
  StuffIndex: {screen: StuffIndex},
  Calender: {screen: Calender},
  TimeTable: {screen: TimeTable},
  Notes: {screen: Notes}
  }
)

export default ScreenTwo;