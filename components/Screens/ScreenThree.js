import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from '../common';
import firebase from 'firebase';
class ScreenThree extends Component {
  constructor(props){
    super(props);
  }
  render() {
    //console.log(firebase.auth().currentUser);
    return (
      <View>
        <Button btpress={()=>(firebase.auth().signOut()
  .then(function() {
    this.props.navigation.navigate('LoginForm',{screen:'LoginForm'})
  })
  .catch(function(error) {
    // An error happened
  }))}>Log Out</Button>
  
    <Text>{firebase.auth().currentUser.email}</Text>
      </View>
    );
  }
}

export default ScreenThree;