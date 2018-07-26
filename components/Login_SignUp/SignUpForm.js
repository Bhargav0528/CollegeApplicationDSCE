import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Button, Card, Input, InputForm, Spinner } from '../common';
import MainScreen from '../Screens/MainScreen';
import firebase from 'firebase';

export default class SignUpForm extends Component {
  state = { setup: null, username: '', sem:'', section:'', branch:'' };
  componentWillMount() {
    firebase
      .database()
      .ref()
      .child('users')
      .child(firebase.auth().currentUser.uid)
      .child('infoSetup')
      .on('value', snapshot => {
        this.setState({ setup: snapshot.val() });
      });
  }

  validateInfo(){
      firebase
      .database()
      .ref()
      .child('users')
      .child(firebase.auth().currentUser.uid)
      .set({
        username:this.state.username,
        branch:this.state.branch,
        sem:this.state.sem,
        section:this.state.section,
        infoSetup:true
      })
  }


  renderScreens() {
    switch (this.state.setup) {
      case null:
        return <Spinner />;
      case true:
        return <MainScreen />;
      case false:
        return (
          <View style={{ flex: 1 , backgroundColor:'#ECEFF1', alignItems: 'center'}}>
            <Text>Hey {`${firebase.auth().currentUser.email}`.split('@')[0]}, Please fill up the following details </Text>
            <InputForm
              onChangeText={password => this.setState({ username: password })}
              value={this.state.password}
              label="Username"
            />
            <InputForm
              onChangeText={branch => this.setState({ branch: branch })}
              value={this.state.password}
              label="Branch"
            />
            <InputForm
              onChangeText={sem => this.setState({ sem: sem })}
              value={this.state.password}
              label="Semester"
            />
            <InputForm
              onChangeText={section => this.setState({ section: section })}
              value={this.state.password}
              label="Section"
            />
            <Button
              btpress={this.validateInfo.bind(this)}
              >
              Submit
            </Button>
          </View>
        );
    }
  }

  render() {
    console.log(this.props);
    return <View style={{ flex: 1 }}>{this.renderScreens()}</View>;
  }
}