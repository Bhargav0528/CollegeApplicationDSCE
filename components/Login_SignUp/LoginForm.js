import React, { Component } from 'react';
import { View, Image, Text, ImageBackground,TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { CardSection, Button, Card, Input } from '../common';
import MainScreen from '../Screens/MainScreen';
import firebase from 'firebase';
export default class LoginForm extends Component {
  state = { loginPress: true, email: '', password: '' };

  static navigationOptions = {
    title: 'Welcome',
    header: null,
  };

  loginbtnPress() {
    this.setState({ loginPress: true, email: '', password: '' });
  }

  signupbtnPress() {
    this.setState({ loginPress: false, email: '', password: '' });
  }

  //Firebase methods
  firebaseSignUp() {
    const { navigate } = this.props.navigation;
    firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        
            const uid = firebase.auth().currentUser.uid
            firebase.database().ref().child('users').child(uid).set({
             email: this.state.email,
             infoSetup: false
            })
            
          
      })
      .then(()=>{navigate('SignUpForm', { screen: 'SignUpForm' })})
      .catch(() => {
        //Function Binding is very necessary in JS as onLoginFail is not bound to the class
        this.setState({ error: 'Fail' });
      });
  }
  firebaseSignIn() {
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

  //Buttons for Signin  and SignUp

  renderButtonSignUp() {
    return (
      <Button
        btpress={this.firebaseSignUp.bind(this)}
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#000',
          paddingLeft: 30,
          paddingRight: 30,
          backgroundColor: '#000000',
          color: '#ffffff',
          elevation: 12,
        }}>
        {<Text style={{ color: '#fff' }}>SignUp</Text>}
      </Button>
    );
  }
  renderButtonSignIn() {
    return (
      <Button
        btpress={this.firebaseSignIn.bind(this)}
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#000',
          paddingLeft: 30,
          paddingRight: 30,
          backgroundColor: '#000000',
          color: '#ffffff',
          elevation: 12,
        }}>
        {<Text style={{ color: '#fff' }}>Login</Text>}
      </Button>
    );
  }

  // Login and Signup Tabs
  renderTabs() {
    if (this.state.loginPress) {
      return (
        <View>
        <View style={{ alignItems:'center' }}>
          <Card
            style={{
              borderRadius: 20,
              elevation: 8,
              justifyContent:'space-between',
              borderWidth: 1,
              borderColor: '#fff',
            }}>
            <Image
            source={require('../../Resources/Images/email.png')}
            style={{ height: 50, width: 50, backgroundColor: '#fff' }}
              />

              <Input
              placeholder="Email"
              onChangeText={email => this.setState({ email: email })}
              value={this.state.email}
              
            />
            
            
          </Card>
          <Card
            style={{
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#fff',
              elevation: 8,
              justifyContent:'space-between'
            }}>
            <Image
            source={require('../../Resources/Images/password.png')}
            style={{ height: 50, width: 50, backgroundColor: '#fff' }}
          />
            
            <Input
              placeholder="Password"
              onChangeText={password => this.setState({ password: password })}
              value={this.state.password}
              secureTextEntry={true}
            />
          </Card>
          
       

        </View>
        <View style={{justifyContent:'space-around',flexDirection:'row',marginTop:15,marginRight:50,marginLeft:50, alignItems:'stretch'}}>
           <TouchableOpacity>
            <Image
            source={require('../../Resources/Images/facebook1.png')}
            style={{ height: 50, width: 50, backgroundColor: '#fff' }}
          />
          </TouchableOpacity>
          
          <TouchableOpacity>
          <Image
            source={require('../../Resources/Images/google.png')}
            style={{ height: 50, width: 50, backgroundColor: '#fff' }}
          />
          </TouchableOpacity>
          </View>
          
          <CardSection style={{ justifyContent: 'center' }}>
            {this.renderButtonSignIn()}
          </CardSection>
        </View>
      );
    }
    return (
      <View style={{ alignItems:'center' }}> 
      <Card
          style={{
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#fff',
            elevation: 8,
            justifyContent:'space-between'
          }}>
          <Image
            source={require('../../Resources/Images/usn.png')}
            style={{ height: 50, width: 50, backgroundColor: '#fff' }}
          />
          <Input
            placeholder="USN"
            onChangeText={password => this.setState({ password: password })}
            value={this.state.password}
          />
        </Card>
        <Card
          style={{
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#fff',
            elevation: 8,
          }}>
          <Image
            source={require('../../Resources/Images/email.png')}
            style={{ height: 50, width: 50, backgroundColor: '#fff' }}
          />
          <Input
            placeholder="Email"
            onChangeText={email => this.setState({ email: email })}
            value={this.state.email}
          />
        </Card>
        <Card
          style={{
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#fff',
            elevation: 8,
            justifyContent:'space-between'
          }}>
          <Image
            source={require('../../Resources/Images/password.png')}
            style={{ height: 50, width: 50, backgroundColor: '#fff' }}
          />
          <Input
            placeholder="Password"
            onChangeText={password => this.setState({ password: password })}
            value={this.state.password}
          />
        </Card>
        <CardSection style={{ alignItems: 'center' }}>
          {this.renderButtonSignUp()}
        </CardSection>
      </View>
    );
  }

  //Under Line for Tabs

  renderUnderlineLogin() {
    if (this.state.loginPress) {
      return (
        <View style={{ backgroundColor: '#393939', width: 100, height: 5 }} />
      );
    }

    return <View />;
  }
  renderUnderlineSignUp() {
    if (!this.state.loginPress) {
      return (
        <View style={{ backgroundColor: '#393939', width: 100, height: 5 }} />
      );
    }
    return <View />;
  }

  /*Main Render Method*/

  render() {
    return ( 
      
      <ImageBackground
        source={require('../../Resources/Images/bg_login.jpg')}
        style={{width: '100%',
        height: '100%',
        alignItems: 'center'}}>
        <ScrollView contentContainerStyle={{
      alignItems: 'center'
      }}>
        <Image
          source={require('../../Resources/Images/blackhat.png')}
          style={{
            height: 140,
            width: 200,
            marginTop: 100,
            marginBottom: 40,
          }}
        />
        
        <Card
          style={{
            flexDirection: 'column',
            backgroundColor: '#fff',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#fff',
          }}>
          <Card
            style={{
              shadowRadius: 2,    
              shadowOffset: { width: 12, height: 12 },
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#fff',
              elevation: 12,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 2,
                flexDirection: 'column',
              }}>
              <Button btpress={this.loginbtnPress.bind(this)}>
                Login
              </Button>
              {this.renderUnderlineLogin()}
              
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 2,
              }}>
              <Button btpress={this.signupbtnPress.bind(this)}>
                SignUp
              </Button>
              {this.renderUnderlineSignUp()}
            </View>
          </Card>
          <CardSection>
            {this.renderTabs()}
          </CardSection>
          
        </Card>
        </ScrollView>
      </ImageBackground>
      
      
    );
  }
}