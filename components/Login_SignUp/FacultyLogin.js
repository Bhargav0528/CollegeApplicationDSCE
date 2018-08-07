import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Picker
} from 'react-native';
import { Button, Card, Input, InputForm, Spinner, InputPicker } from '../common';
import MainScreen from '../Screens/MainScreen';
import firebase from 'firebase';

export default class FacultyLogin extends Component {
  state = { setup: false, email:'',password:'',username: '', sem:'1', section:'', branch:'computer_science', error:'' };

  static navigationOptions = {
    header: null,
  };


  LoginFaculty(){
    const { navigate } = this.props.navigation;
    firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        navigate('MainScreen', { screen: 'MainScreen' });
      })
      .catch(() => {
        //Function Binding is very necessary in JS as onLoginFail is not bound to the class
        this.setState({ error: 'Fail' });
      });
  }

  SignUpFaculty(){
    const { navigate } = this.props.navigation;
    firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        
            const uid = firebase.auth().currentUser.uid
            firebase.database().ref().child('users').child(uid).set({
             email: this.state.email,
             infoSetup: true,
             username: this.state.username,
             branch: this.state.branch,
             sem: this.state.sem,
             section:this.state.section,
             faculty: true
            })
            
          
      })
      .then(()=>{navigate('SignUpForm', { screen: 'SignUpForm' })})
      .catch(() => {
        //Function Binding is very necessary in JS as onLoginFail is not bound to the class
        this.setState({ error: 'Fail' });
      });
  }
  createaccount(){
    this.setState({setup:true})
  }


  renderScreens() {
    switch (this.state.setup) {
      case true:
        return (
          <View style={{flex:1, backgroundColor:'#fff', alignItems: 'center', justifyContent:'space-around'}}>
          <View style={{height:'30%',width:'100%', alignItems:'center', justifyContent:'center'}}>
          <ImageBackground source={require('../../Resources/Images/gradien2.jpg')} style={{height:'100%',width:'100%', alignItems:'center', justifyContent:'center'}} >
              <Text style={{fontSize:36, color:'#fff'}}>Dsce App</Text>
              <Text style={{fontSize:22, color:'#fff'}}>Faculty Login</Text>
          </ImageBackground>
          </View>

          <ScrollView style={{flex:1}}>

          <InputForm
              onChangeText={email => this.setState({ email: email })}
              value={this.state.email}
              label="Email"
            />

            <InputForm
              onChangeText={password => this.setState({ password: password })}
              value={this.state.password}
              label="Password"
            />
            
            <InputForm
              onChangeText={username => this.setState({ username: username })}
              value={this.state.username}
              label="FullName"
            />
            <InputPicker
              pick = {this.state.branch}
              onValueChange= {(itemValue, itemIndex) => this.setState({branch: itemValue})}
              label="Branch">
              <Picker.Item label="Computer Science" value="computer_science" />
              <Picker.Item label="Information Science" value="information_science" />
              <Picker.Item label="Civi Engineering" value="civil_engg" />
              <Picker.Item label="Mechanincal Engineering" value="mech_engg" />
              <Picker.Item label="Electronics and Communication" value="ec_engg" />
            </InputPicker>

            <Text> If You are a Class Teacher then please fill the following details</Text>

            <InputPicker
              pick = {this.state.sem}
              onValueChange= {(itemValue, itemIndex) => this.setState({sem: itemValue})}
              label="Semester">
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
            </InputPicker>



            <InputForm
              onChangeText={section => this.setState({ section: section })}
              value={this.state.section}
              label="Section"
            />

            


            <Button
        btpress={this.SignUpFaculty.bind(this)}
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#000',
          paddingLeft: 30,
          paddingRight: 30,
          backgroundColor: '#000000',
          color: '#ffffff',
          elevation: 12,
          marginTop:40
        }}>
        {<Text style={{ color: '#fff' }}>SignUp</Text>}
      </Button>
      
            </ScrollView>
            
          </View>
        );
      case false:
        return (
          
          <View style={{ flex: 1 , backgroundColor:'#fff', alignItems: 'center', justifyContent:'space-around'}}>
          <ImageBackground source={require('../../Resources/Images/gradien2.jpg')} style={{flex :2,width:'100%', alignItems:'center', justifyContent:'center'}} >
              <Text style={{fontSize:36, color:'#fff'}}>Dsce App</Text>
              <Text style={{fontSize:22, color:'#fff'}}>Faculty Login</Text>
          </ImageBackground>

          <View  style={{ flex: 3 , backgroundColor:'#fff', alignItems: 'center', marginTop:30}}>
            
            <InputForm
              onChangeText={email => this.setState({ email: email })}
              value={this.state.email}
              label="Email"
            />

            <InputForm
              onChangeText={password => this.setState({ password: password })}
              value={this.state.password}
              label="Password"
            />

            <Button
        btpress={this.LoginFaculty.bind(this)}
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#000',
          paddingLeft: 30,
          paddingRight: 30,
          backgroundColor: '#000000',
          color: '#ffffff',
          elevation: 12,
          marginTop:40
        }}>
        {<Text style={{ color: '#fff' }}>Login</Text>}
      </Button>
      <Button
        btpress={this.createaccount.bind(this)}
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#000',
          paddingLeft: 30,
          paddingRight: 30,
          backgroundColor: '#000000',
          color: '#ffffff',
          elevation: 12,
          marginTop:20
        }}>
        {<Text style={{ color: '#fff' }}> Don't have an account? </Text>}
      </Button>
            </View>
            
          </View>
        )
    }
  }

  render() {
    console.log(this.state);
    return <View style={{ flex: 1 }}>{this.renderScreens()}</View>;
  }
}