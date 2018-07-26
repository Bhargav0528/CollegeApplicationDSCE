import React, { Component } from 'react';
import { Text, View, ScrollView, Modal, Alert, StyleSheet,Platform, Button, TouchableOpacity, Image  } from 'react-native';
import { Card, CardSection } from '../common';
import firebase from 'firebase';
import EventList from './EventList';
class Events extends Component {

  state = {events:[], Alert_Visibility: false, modal:{url:'',Description:''} }




  renderEvent(){
    const { cardViewStyle } = styles;
    return Object.values(this.state.events).map(event =>
    <Card key={event.Event} style={cardViewStyle}>
      <CardSection style={{flex:1}}>
        <TouchableOpacity style={{flex:1}} onPress={()=>{ this.setState({modal: {url:event.url, Description:event.Description}, Alert_Visibility: true})  }} >
          <Image source={{uri: event.url}}
            style={{flex: 1, height: 200, width: '100%', resizeMode: 'contain' }}/>
        </TouchableOpacity>
      </CardSection>
      <CardSection>
        <Text>{event.Event}</Text>
      </CardSection>
      <CardSection>
        <Text>{event.Venue}</Text>
      </CardSection>
    </Card>)
  }



  Show_Custom_Alert(visible) {
  
    this.setState({Alert_Visibility: visible});
    
  }



  ok_Button=()=>{

    Alert.alert("OK Button Clicked.");

  }

  showEventDescription(){
    return(
      <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center'}}>
    <Modal
          visible={this.state.Alert_Visibility}
          transparent={false}
          animationType={"slide"}
          onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } 
          >
    <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center', marginRight:20, marginLeft:20, elevation :20,opacity:20}}>
    <Card style={{ width:'100%', height:'50%',flexDirection:'column', alignItems: 'center', justifyContent: 'center', borderRadius:25}}>
          <Image source={{uri: this.state.modal.url}}
            style={{flex: 2, height: '100%', width: '100%', resizeMode: 'contain' }}/>
          <Text style={{paddingLeft:20,paddingRight:20, paddingTop:5}}>{this.state.modal.Description}</Text>
          <TouchableOpacity style={{marginBottom:20}}>
            <Card style={{backgroundColor:'#272727', borderRadius:15}}>
            <Text style={{color:'#fff', padding:10}}>REGISTER NOW</Text>
            </Card>
          </TouchableOpacity>
   </Card>
   </View>
   </Modal>
   </View>
    )
  }

  render() {
    console.log('Events:',this.state);
    return (
      <ScrollView style={{flex:1}} contentContainerStyle={{justifyContent: 'center',alignItems: 'center'}}>
        { this.renderEvent() }
        <Button onPress={() => { this.Show_Custom_Alert(true) }} title="Click Here To Show Custom Alert Dialog" />
        { this.showEventDescription() }
      </ScrollView>
    );
  }

  listenForEvents() {
    firebase.database().ref().child('events').on('value', (dataSnapshot) => {
      var events = [];
      dataSnapshot.forEach((child) => {
        events.push({
          Event: child.val().Event,
          url: child.val().url,
          Description: child.val().Description,
          Venue: child.val().Venue
        });
      });
  
      this.setState({
        events:events
      });
    });
    }
  

  componentDidMount(){
    //firebase.database().ref().child('events').on('child_added', (snapshot)=>{this.setState({events:snapshot.val()})});
    this.listenForEvents()
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


export default Events;