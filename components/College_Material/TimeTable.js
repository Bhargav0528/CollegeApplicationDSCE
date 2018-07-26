import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  BackHandler
} from 'react-native';
import firebase from 'firebase';
import PinchZoomView from 'react-native-pinch-zoom-view';

export default class TimeTable extends Component{
  state = {uri:'https://facebook.github.io/react-native/docs/assets/favicon.png', user:[], uid:''}
  uri= 'maga'
  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
    this.setState({uid: firebase.auth().currentUser.uid})
    firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).on('value', (snapshot)=>{firebase.database().ref(`branch/${snapshot.val().branch}/timetable/sem_${snapshot.val().sem}/${snapshot.val().section}/url`).on('value', (snapshot1)=>{this.setState({uri: snapshot1.val()})})})
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true
}

 componentDidMount(){
    console.log('Calleddd?')
    firebase.database().ref(`branch/${this.state.user.branch}`).on('value', (snapshot)=>{this.uri =  snapshot.val()})
  } 
  render()
  {
    //this.fetchData()
    console.log("User:",Object.values(this.state.user), "\nUserssss:", this.state.uri)
    return(
      <View style={{flex: 1,backgroundColor:'#272727'}}>
        <PinchZoomView  style={{flex: 1,backgroundColor:'#272727'}}>
        <Image
          style={{flex: 1,
    width: 300,
    height: 300,
    resizeMode: 'contain'}} 
          source={{uri: this.state.uri}}
        /> 
      </PinchZoomView>
      </View>
      );
  }
}