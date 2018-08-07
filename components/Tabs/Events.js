import React, { Component } from 'react';
import { Text, View, ScrollView,PixelRatio, Modal,ToastAndroid, Alert, StyleSheet,Platform, Button, TouchableOpacity, Image  } from 'react-native';
import { Card, CardSection, InputForm } from '../common';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import  Firebase from 'react-native-firebase';
import EventList from './EventList';

import ImagePicker from 'react-native-image-picker';
class Events extends Component {

  state = {events:[],faculty: false, Alert_Visibility: false, 
           modal:{url:'',Description:''}, 
           Modal_Visibility: false, description:'', event:'',venue:'', ImageSource: null }

  uploadDetails(){
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
const uploadImage = (uri, imageName, mime = 'image/jpg') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null
    const imageRef = firebase.storage().ref('posts').child(imageName)
      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        const postKey = firebase.database().ref().child('events').push().key
        firebase.database().ref('events/' + postKey).set({
          Event: this.state.event,
          Venue: this.state.venue,
          Description : this.state.description,
          url : url
        }, ()=>{
          ToastAndroid.show('Event Uploaded', ToastAndroid.SHORT);
          this.setState({ event:'', ImageSource:'', venue:'', description:'' })
        });
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

   g= uploadImage(this.state.ImageSource.uri, this.state.event+".jpeg")

  }



  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({

          ImageSource: source

        });
      }
    });
  }


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
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } 
          >
    <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center',
    left: 0,
    top: 0,
    backgroundColor: '#00000070',width:'100%', height:'100%'}}>
    <Card style={{ width:'100%', height:'50%',flexDirection:'column', alignItems: 'center', justifyContent: 'center', borderRadius:25}}>
          <Image source={{uri: this.state.modal.url}}
            style={{flex: 2, height: '100%', width: '100%', resizeMode: 'contain' }}/>
          <Text style={{paddingLeft:20,paddingRight:20, paddingTop:5}}>{this.state.modal.Description}</Text>
          <TouchableOpacity style={{marginBottom:20}}>
            <Card style={{backgroundColor:'#272727', borderRadius:15}}>
            <Text style={{color:'#fff', padding:10}}>Register Now</Text>
            </Card>
          </TouchableOpacity>
   </Card>
   </View>
   </Modal>
   </View>
    )
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



  uploadEvent(){
    return(
      <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center'}}>
    <Modal
          visible={this.state.Modal_Visibility}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => { this.Show_Event(!this.state.Modal_Visibility)} } 
          >
    <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center',
    left: 0,
    top: 0,
    backgroundColor: '#00000070',width:'100%', height:'100%'}}>
    <Card style={{ flex:1,width:'100%',flexDirection:'column', alignItems: 'center', justifyContent: 'center', borderRadius:25}}>
    <Text>Create Notification</Text>
    { this.state.ImageSource === null ? 
              <TouchableOpacity style={{marginBottom:20}} onPress={this.selectPhotoTapped.bind(this)}>
              <Card style={{backgroundColor:'#272727', borderRadius:15}}>
              <Text style={{color:'#fff', padding:10}}>Select Image</Text>
              </Card>
              </TouchableOpacity> 
            :<Image style={styles.ImageContainer} source={this.state.ImageSource} />
            }  
                        <InputForm 
                        onChangeText={event => this.setState({ event: event })}
                        value={this.state.event}
                        label="Event"
                        />  
                        <InputForm 
                        onChangeText={description => this.setState({ description: description })}
                        value={this.state.description}
                        label="Description"
                        multiline ={true}
                        />
                        <InputForm 
                        onChangeText={venue => this.setState({ venue: venue })}
                        value={this.state.venue}
                        label="Venue"
                        multiline ={true}
                        />    
    
          
          <TouchableOpacity style={{marginBottom:20}} onPress={this.uploadDetails.bind(this)}>
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

  Show_Event(visible) {
  
    this.setState({Modal_Visibility: visible});
    
  }

  showModal(visible){

    this.setState({Modal_Visibility: true})

  }





  render() {
    try{
    console.log('Events:',this.state.ImageSource.uri  );
    }
    catch(error)
    {
      console.log(error);
    }
    return (
      <View style={{flex:1}}>
      <ScrollView style={{flex:1}} contentContainerStyle={{justifyContent: 'center',alignItems: 'center'}}>
        { this.renderEvent() }
        { this.showEventDescription() }
        { this.uploadEvent() }
      </ScrollView>
      {this.facultyUpload() }
      </View>

    );
  }

    listenForEvents() {
      firebase.database().ref().child('events').on('value', (snapshot)=>{
        firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).on('value', (snap)=>{
        
        var events = [];
        snapshot.forEach((child) => {
          events.push({
            Event: child.val().Event,
            url: child.val().url,
            Description: child.val().Description,
            Venue: child.val().Venue
          });
        });
  
  
    
        this.setState({
          
          events:events, faculty:snap.val().faculty});
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
  ImageContainer: {
    borderRadius: 10,
    width: 250,
    height: 250,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDDC39',
    
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