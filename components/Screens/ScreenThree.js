import React, { Component } from 'react';
import { Text, View, Image, ImageBackground } from 'react-native';
import { Button } from '../common';
import { Card } from '../common';
import firebase from 'firebase';
class ScreenThree extends Component {
  constructor(props){
    super(props);
  }

  state = {userProps:[]}

  componentDidMount(){
    
    firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).on('value',(snapshot)=>{this.setState({userProps: snapshot.val()})})
  }

  render() {
    //console.log(firebase.auth().currentUser);
    console.log('State',this.props.navigation.state.key)
    return (
      <View style={{width:'100%',height:'100%'}}>
        <Card style={{width:'100%',height:'35%', borderRadius:20}}>
            <ImageBackground source={require('../../Resources/Images/IDCARD.png')} style={{flex:1}}>

            <View style={{top:'30%', left:'15%'}}>
              <Text style={{color:'#000', marginBottom:10}}>Username : {this.state.userProps.username}</Text>
              <Text style={{color:'#000', marginBottom:10}}>USN : {this.state.userProps.usn}</Text>
              <Text style={{color:'#000'}}>Branch : {this.state.userProps.branch}</Text>
              </View>
            </ImageBackground>
          </Card>


          <Card style={{width:'100%'}}>
            <Text style={{color:'#000', fontSize:18, paddingLeft:20, paddingTop:10, paddingBottom:10}}> Edit Profile </Text>
          </Card>

          <Card style={{width:'100%'}}>
            <Text style={{color:'#000', fontSize:18, paddingLeft:20, paddingTop:10, paddingBottom:10}}> Starred Items </Text>
          </Card>

          <Card style={{width:'100%'}}>
            <Text style={{color:'#000', fontSize:18, paddingLeft:20, paddingTop:10, paddingBottom:10}}> Suggestions </Text>
          </Card>

        <Button btpress={()=>(firebase.auth().signOut()
  .then(function() {
    this.props.navigation.navigate('LoginForm',{screen:'LoginForm'})
  })
  .catch(function(error) {  
    // An error happened
  }))}>Log Out</Button>
      </View>
    );
  }
}

export default ScreenThree;