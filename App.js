import React,{ Component } from 'react';
import { View, Text, Platform,YellowBox } from 'react-native'; 
import { createStackNavigator } from 'react-navigation';
import LoginForm from './components/Login_SignUp/LoginForm';
import MainScreen from './components/Screens/MainScreen';
import SignUpForm from './components/Login_SignUp/SignUpForm';
import ScreenThree from './components/Screens/ScreenThree';
import { Header } from './components/common'
import firebase from 'firebase';
import  Firebase from 'react-native-firebase';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default class App extends Component {

  state = { loggedIn: false };

  componentWillMount(){
    // Initialize Firebase
    if (!firebase.apps.length) {
      const config = {
        apiKey: 'AIzaSyBZYTCnfIfMOB8NE3Kqpnc91VV4US1c-Ug',
        authDomain: 'dsceapp-5ed7f.firebaseapp.com',
        databaseURL: 'https://dsceapp-5ed7f.firebaseio.com',
        projectId: 'dsceapp-5ed7f',
        storageBucket: 'dsceapp-5ed7f.appspot.com',
        messagingSenderId: '359041235154',
      };
      firebase.initializeApp(config);
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });

  }

  componentDidMount() {

    const channel = new Firebase.notifications.Android.Channel('test-channel', 'Test Channel', Firebase.notifications.Android.Importance.Max)
    .setDescription('My apps test channel');

    // Create the channel
    Firebase.notifications().android.createChannel(channel);

    this.notificationDisplayedListener = Firebase.notifications().onNotificationDisplayed((notification: Notification) => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      // Process your notification as required
      console.log("Recieved",notification.notificationId)
      
       });


  this.notificationListener = Firebase.notifications().onNotification((notification: Notification) => {

      console.log("Bugs")
      notification.android.setChannelId('test-channel');
      

      const localNotification = new Firebase.notifications.Notification()
      .setNotificationId(notification.notificationId)
      .setTitle(notification.title)
      .setSubtitle(notification.subtitle)
      .setBody(notification.body);



    if (Platform.OS === 'android') {
      localNotification._android._channelId = notification.android.channelId;
    }

    Firebase.notifications().displayNotification(localNotification);

      });
}

componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
}



  
  renderScreens() {
    switch (this.state.loggedIn) {
      case true:
        return <UserNavigation />;
      case false:
        return <Stack />;
    }
  }
  

  render() {
    console.log("Started")
    return (
      <View style={{ flex: 1 }}>
        {this.renderScreens()}
      </View>
    );
  }
}
const Stack = createStackNavigator({
  LoginForm: { screen: LoginForm },
  SignUpForm : {screen : SignUpForm},
  MainScreen: { screen: MainScreen },
  ScreenThree: { screen: ScreenThree },
});

const UserNavigation = createStackNavigator({
  SignUpForm : {screen : SignUpForm},
  MainScreen: { screen: MainScreen }},
  {
    navigationOptions:{
      header:null
    }
})