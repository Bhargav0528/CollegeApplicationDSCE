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
//import ViewEditor from 'react-native-view-editor';


export default class Calender extends Component{

  state = {uri:'https://facebook.github.io/react-native/docs/assets/favicon.png'}
  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
componentDidMount(){
    firebase.database().ref().child('calender').child('url').on('value', (snapshot)=>{this.setState({uri:snapshot.val()})});
  }
handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
}
  render()
  {
    console.log("State:",this.state.uri)
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