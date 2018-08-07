import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image,Modal, Alert, StyleSheet,Platform } from 'react-native';
import { Card, CardSection, InputForm  } from '../common';
import firebase from 'firebase'; 

import  Firebase from 'react-native-firebase';
import _ from 'lodash';

import NotificationList from './NotificationList';
class Notifications extends Component {
  state = { notifications:[], faculty: false,Alert_Visibility: false, category:'', description:'', text:'' };
  
  
  renderNotifications(){
    return Object.values(this.state.notifications).map(noti => <NotificationList data={noti} key={noti.text} />)
  }

  sendNotification(){
    const postKey = firebase.database().ref().child('news').push().key
    console.log('Push Key', postKey)
    firebase.database().ref('news/' + postKey).set({
      category: this.state.category,
      text: this.state.text,
      description : this.state.description
    });
  }

  showEventDescription(){
    return(
      <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center'}}>
    <Modal
          visible={this.state.Alert_Visibility}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } 
          >
    <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center',
    left: 0,
    top: 0,
    backgroundColor: '#00000070',width:'100%', height:'100%'}}>
    <Card style={{ width:'100%', height:'50%',flexDirection:'column', alignItems: 'center', justifyContent: 'center', borderRadius:25}}>
    <Text>Create Notification</Text>
    <InputForm 
    onChangeText={category => this.setState({ category: category })}
    value={this.state.category}
    label="Category"
    />  
    <InputForm 
    onChangeText={text => this.setState({ text: text })}
    value={this.state.text}
    label="Text"
    />  
    <InputForm 
    onChangeText={description => this.setState({ description: description })}
    value={this.state.description}
    label="Description"
    multiline ={true}
    />  
    
          
          <TouchableOpacity style={{marginBottom:20}} onPress={this.sendNotification.bind(this)}>

            <Card style={{backgroundColor:'#272727', borderRadius:15}}>
            <Text style={{color:'#fff', padding:10}}>Send Notification</Text>
            </Card>
          </TouchableOpacity>
   </Card>
   </View>
   </Modal>
   </View>
    )
  }

  Show_Custom_Alert(visible) {
  
    this.setState({Alert_Visibility: visible});
    
  }



  showModal(){

    this.setState({Alert_Visibility: true})

  }
  
  facultyUpload(){
    if(this.state.faculty)
    {
    return(
      <TouchableOpacity
      activeOpacity={0.5}

              style={{position: 'absolute',
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              right: 30,
              bottom: 30,
              elevation:20}}
              onPress={this.showModal.bind(this)}>


              <Image source={require('../../Resources/Images/upload.png')} 
          
          style={{resizeMode: 'contain',
          width: 50,
          height: 50,
          tintColor:'#272727'}} />
            </TouchableOpacity>

    );
  }
  }




  render() {
    console.log("My notifications ",this.state.Alert_Visibility)
    console.log("Loaded Notification");


    return (
      <View style={{flex:1}}>
      <ScrollView style={{flex:1}}>
        { this.renderNotifications() }
        { this.showEventDescription() }
      </ScrollView>
      {this.facultyUpload() }
      </View>
    );
  }

  componentWillMount(){
    firebase.database().ref().child('news').on('child_added', (snapshot)=>{

      console.log('child added');
      // Create the channel

      const channel = new Firebase.notifications.Android.Channel('test-channel', 'Test Channel', Firebase.notifications.Android.Importance.Max)
      .setDescription('My apps test channel');

      Firebase.notifications().android.createChannel(channel);



        const localNotification = new Firebase.notifications.Notification()
        .setNotificationId('notification.notificationId')
        .setTitle('Important Notification')
        .setSubtitle(this.state.category)
        .setBody(this.state.text);


        localNotification.android.setChannelId('test-channel')
      
        

      Firebase.notifications().displayNotification(localNotification);
  
       
    })
  }


  listenForEvents() {
    firebase.database().ref().child('news').on('value', (snapshot)=>{
      firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).on('value', (snap)=>{
      
      var notifications = [];
      snapshot.forEach((child) => {
        notifications.push({
          category: child.val().category,
          description: child.val().description,
          text: child.val().text
        });
      });


  
      this.setState({
        
       notifications:notifications, faculty:snap.val().faculty});
      });
    });
    }

    componentDidMount() {
      this.listenForEvents()
      
  }
  
  componentWillUnmount() {
      this.notificationDisplayedListener();
      this.notificationListener();
  }
  


}

const styles = StyleSheet.create({
 
  MainContainer :{
      
   flex:1,
   justifyContent: 'center',
   alignItems: 'center',
   marginTop: (Platform.OS == 'ios') ? 20 : 0
   
  },
   
  Alert_Main_View:{
   
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : "#009688", 
    height: 200 ,
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius:7,
   
  },
   
  Alert_Title:{
   
    fontSize: 25, 
    color: "#fff",
    textAlign: 'center',
    padding: 10,
    height: '28%'
   
  },
  
  Alert_Message:{
   
      fontSize: 22, 
      color: "#fff",
      textAlign: 'center',
      padding: 10,
      height: '42%'
     
    },
  
  buttonStyle: {
      
      width: '50%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
  
  },
     
  TextStyle:{
      color:'#fff',
      textAlign:'center',
      fontSize: 22,
      marginTop: -5
  },
  cardViewStyle:{
    flex:1,
    backgroundColor : '#FFF3E0',
    flexDirection:'column',
  },
   
  });

export default Notifications;