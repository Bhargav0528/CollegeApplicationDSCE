import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity,StyleSheet, ScrollView } from 'react-native';
import { Gradient, Card } from '../common'
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'firebase'
class Notes extends Component {
  state = {subjects:[]}
  path = '/storage/emulated/0/DSCE/Notes'
  android = RNFetchBlob.android;

  componentDidMount(){
    firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).on('value', (snapshot)=>{firebase.database().ref(`branch/${snapshot.val ().branch}/notes/sem_${snapshot.val().sem}`).on('value', (snapshot1)=>{this.setState({subjects: snapshot1.val()})})})
  }


  async download(link,mod){
    var date      = new Date();
    var url       = link;
    const { config, fs } = RNFetchBlob
    let NotesDir = this.path
    //console.log("PictureDir",PictureDir)
    //var str = url.toString()
    //var re = new RegExp('/(\w+)\.');
   // console.log("Regex",str.match(re))
    //var xArray;
    //while(xArray = re.exec(url.toString())) console.log("REGEX",xArray);
    //var myArray = re.exec(url.toString());
    //console.log("Regular Expression", myArray)
    RNFetchBlob.fs.exists(this.path+'/'+mod)
    .then((exist) => {
    if(exist == false){
    fs.mkdir(this.path+'/'+mod)}
    console.log(`file ${exist ? '' : 'not'} exists`, exist)
    })

    ModDir = this.path+'/'+mod

    let options = {
      fileCache: true,
      addAndroidDownloads : {
        useDownloadManager : true,
        notification : true,
        path:  ModDir + '/'+mod,
        description : 'Document'
      }
    }
    await config(options).fetch('GET', url).then(
      (res) => {
        console.log("path",res.path())
        this.android.actionViewIntent(res.path())
          .then((success) => {
            console.log('success: ', success)
          })
          .catch((err) => {
            console.log('err:', err)
          })
        });
    
  }

extention(filename){
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
  }
  
  renderSubjects(){
    var subjects = Object.keys(this.state.subjects)
    return subjects.map(noti =>
      <View key={noti}>
        <Gradient subject={noti} />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} > 
        {Object.keys(this.state.subjects[noti]).map(mod => {
          try {
            if (this.state.subjects != null && typeof this.state.subjects[noti][mod] !== "undefined"){
              console.log("URLS", this.state.subjects[noti][mod].url)
              var link = this.state.subjects[noti][mod].url
              console.log("URLS")
            }  
          } catch (error) {
            console.log('dawdad')
          }
          //this.setState({ url: this.state.subjects[noti][mod]['url']})
          return(
          <TouchableOpacity
          key={mod}
              style={styles.button}
              onPress={this.download.bind(this,link,noti)}>
              <Card
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 20,
                  padding: 15,
                }}>
                <Text style={{ alignItems: 'center' }}>{mod}</Text>
              </Card>
            </TouchableOpacity>
          )
        })}
        </ScrollView>
      </View>
    )
       
  }
  
  createDirectories(){
    const { config, fs } = RNFetchBlob
    RNFetchBlob.fs.exists(this.path)
    .then((exist) => {
    if(exist == false){
    fs.mkdir(this.path)}
    console.log(`file ${exist ? '' : 'not'} exists`, exist)
    })
    //.catch(() => { ... })
    
    RNFetchBlob.fs.ls('/storage/emulated/0/')
    // files will an array contains filenames
    .then((files) => {
        console.log(files)
    })
    //console.log("PictureDir",fs.dirs)
  }


 

  render() {
    
    
    this.createDirectories()
    return (
      <View  style={{ flex: 1,
    backgroundColor: '#ECEFF1'}}>
       <Image source={require('../../Resources/Images/notes_bg.jpg')} style={{width:'100%',height:'40%',}} />
       <ScrollView>
       {this.renderSubjects()}
       </ScrollView>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#ECEFF1',
    padding: 10,
  },
});
export default Notes; 