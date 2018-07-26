import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import firebase from 'firebase'; 
import NotificationList from './NotificationList';
class Notifications extends Component {
  state = { notifications:[] };
  
  
  renderNotifications(){
    return Object.values(this.state.notifications).map(noti => <NotificationList data={noti} key={noti.text} />)
  }
  
  render() {
    console.log("My notifications ",this.state.notifications)
    console.log("Loaded Notification");
    return (
      <ScrollView style={{flex:1}}>
        { this.renderNotifications() }
      </ScrollView>
    );
  }
  
  componentDidMount(){
    firebase.database().ref().child('news').on('value', (snapshot)=>{this.setState({notifications:snapshot.val()})});
  }
}

export default Notifications;