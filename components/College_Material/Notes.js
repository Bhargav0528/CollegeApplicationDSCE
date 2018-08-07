import React, { Component } from 'react';
import { Text, View, Image,Modal, TouchableOpacity,StyleSheet, ScrollView, Platform, ToastAndroid } from 'react-native';
import { Gradient, Card, InputForm } from '../common'
import RNFetchBlob from 'react-native-fetch-blob'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import firebase from 'firebase'
class Notes extends Component {
  state = {subjects:[], Alert_Visibility: false,Modal_Visibility: false,faculty: false,NoteSource:null,mimeType:'',
           modal:{ mod:'fs', noti:'dfs'},
          branch:'', sem:'', subject:'', module:'', chap:''}
  path = '/storage/emulated/0/DSCE/Notes'
  android = RNFetchBlob.android;

  componentDidMount(){
    firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).on('value', 
    (snapshot)=>{firebase.database().ref(`branch/${snapshot.val ().branch}/notes/sem_${snapshot.val().sem}`).on('value', 
    (snapshot1)=>{this.setState({subjects: snapshot1.val(), faculty: snapshot.val().faculty})})})
  }

  uploadDetails(){
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
const uploadImage = (uri, imageName, mime = 'application') => {
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
        //firebase.database().ref(`branch/${this.state.branch}/notes/sem_${this.state.sem}/${this.state.subject}`).push().key
        firebase.database().ref(`branch/${this.state.branch}/notes/sem_${this.state.sem}/${this.state.subject}/${this.state.module}/` + this.state.chap).set({
          url : url
        }, ()=>{
          ToastAndroid.show('Note Uploaded', ToastAndroid.SHORT);
          this.setState({ subject:'', NoteSource:'', sem:'', module:'', chap:'', branch:'' })
        });
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
  //console.log('chapName', this.state.chap+`${this.state.mimeType.split("/")[1]}`)
   g= uploadImage(this.state.NoteSource, this.state.chap+'.'+`${this.state.mimeType.split("/")[1]}`, this.state.mimeType)

  }


  openFile(link,sub, mod, chap){
    RNFetchBlob.fs.exists(this.path+'/'+sub+'/'+mod)
    .then((exist) => {
    if(exist == false){
      
    fs.mkdir(this.path+'/'+sub+'/'+mod)}
    console.log(`file ${exist ? '' : 'not'} existdds`, exist)
    })

    RNFetchBlob.fs.exists(this.path+'/'+sub+'/'+mod+'/'+chap)
    .then((exist)=>{
      if(exist == false){
        
      }
      else{
        console.log('peace1')
        this.android.actionViewIntent(this.path+'/'+sub+'/'+mod+'/'+chap)
              .then((success) => {
                console.log('success: ', success)
              })
              .catch((err) => {
                console.log('err:', err)
              })
      }
    })


  }



  async download(link,sub, mod, chap){
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
    console.log("Path to chapter" , this.path+'/'+sub+'/'+mod+'/'+chap)
    RNFetchBlob.fs.exists(this.path+'/'+sub+'/'+mod)
    .then((exist) => {
    if(exist == false){
      
    fs.mkdir(this.path+'/'+sub+'/'+mod)}
    console.log(`file ${exist ? '' : 'not'} existdds`, exist)
    })

    ModDir = this.path+'/'+sub

    let options = {
      fileCache: true,
      addAndroidDownloads : {
        useDownloadManager : true,
        notification : true,
        path:  this.path+'/'+sub+'/'+mod+'/'+chap,
        description : 'Document'
      }
    }
    
    RNFetchBlob.fs.exists(this.path+'/'+sub+'/'+mod+'/'+chap)
    .then(
    async (exist) => {
      
    if(exist == false){
      console.log('peace11111')
      
        await config(options).fetch('GET', url).then(
        (res) => {
          console.log("path111",res.path())
          this.android.actionViewIntent(res.path())
            .then((success) => {
              console.log('success: ', success)
            })
            .catch((err) => {
              console.log('err:', err)
            })
          });
        
    }
    else{
      console.log('peace1')
      this.android.actionViewIntent(this.path+'/'+sub+'/'+mod+'/'+chap)
            .then((success) => {
              console.log('success: ', success)
            })
            .catch((err) => {
              console.log('err:', err)
            })
    }
  }
  )
    
    
  }

  extention(filename){
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
  }
  


  showModuleDescription(){
    try {
      if (this.state.subjects != null && typeof this.state.subjects[this.state.modal.noti][this.state.modal.mod] !== "undefined"){
        console.log("Notes true", this.state.subjects[this.state.modal.noti][this.state.modal.mod])
        chapters = Object.keys(this.state.subjects[this.state.modal.noti][this.state.modal.mod])
        console.log(chapters)
        return(
      
          <Modal
                visible={this.state.Alert_Visibility}
                transparent={true}
                animationType={"fade"}
                swipeToClose = {false}
                swipeArea={0}
                onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } 
                >
      
          <View  style={{height:'100%', flex:1,justifyContent: 'center' ,alignItems: 'center',
          left: 0,
          top: 0,
          backgroundColor: '#00000070',width:'100%'}}>
      
          <Card style={{height:'60%', width:'100%', alignItems:'center', flexDirection:'column'}}>
          <Text>{this.state.modal.mod}</Text>
          <ScrollView  style={{flex:1, width:'60%'}}>
      
          {
            
            Object.keys(this.state.subjects[this.state.modal.noti][this.state.modal.mod]).map(chaps => {
            //console.log(chaps, this.state.subjects[this.state.modal.noti][this.state.modal.mod][chaps].url)
            return (
            
                <TouchableOpacity style={{marginBottom:20}} 
                onPress={this.download.bind(this,this.state.subjects[this.state.modal.noti][this.state.modal.mod][chaps].url,this.state.modal.noti, this.state.modal.mod, this.state.subjects[this.state.modal.noti][this.state.modal.mod][chaps].name)}>
                  <Card style={{backgroundColor:'#272727', borderRadius:15}}>
                  <Text style={{color:'#fff', padding:10}}>{chaps}</Text>
                  </Card>
                </TouchableOpacity>
            
            )
          }) 
          
          
          }
          
         </ScrollView>
         </Card>
         </View>
         </Modal>
          )
      }  
    } catch (error) {
      console.log('Notes', this.state.subjects)
    }
    
  }

  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }


  ShowNotes(noti,mod){
    this.setState({Alert_Visibility: true, modal:{mod:mod, noti:noti}});
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
              //console.log("URLS", this.state.subjects[noti][mod].url)
              var link = this.state.subjects[noti][mod].url
              //console.log("Subjects",this.state.subjects[noti])
            }  
          } catch (error) {
            console.log('dawdad')
          }
          //this.setState({ url: this.state.subjects[noti][mod]['url']})
          return(
          <TouchableOpacity
          key={mod}
              style={styles.button}
              //onPress={this.download.bind(this,link,noti)}
              onPress={this.ShowNotes.bind(this, noti, mod)}
              >
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
    //console.log(`file ${exist ? '' : 'not'} exists`, exist)
    })
    //.catch(() => { ... })
    
    RNFetchBlob.fs.ls('/storage/emulated/0/')
    // files will an array contains filenames
    .then((files) => {
        //console.log(files)
    })
    //console.log("PictureDir",fs.dirs)
  }

  uploadNotes(){
    this.setState({Modal_Visibility:true})
  }

  Show_Note(visible) {
  
    this.setState({Modal_Visibility: visible});
    
  }

  selectNote2Upload() {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    },(error,res) => {
      // Android
      this.setState({ NoteSource:res.uri, mimeType:res.type})
    });
  }

  ModalNotes(){
    return(
      <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center'}}>
    <Modal
          visible={this.state.Modal_Visibility}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => { this.Show_Note(!this.state.Modal_Visibility)} } 
          >
    <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center',
    left: 0,
    top: 0,
    backgroundColor: '#00000070',width:'100%', height:'100%'}}>
    <Card style={{ flex:1,width:'100%',flexDirection:'column', alignItems: 'center', justifyContent: 'center', borderRadius:25}}>
    <Text>Create Notification</Text>
    { this.state.NoteSource === null ? 
              <TouchableOpacity style={{marginBottom:20}} onPress={this.selectNote2Upload.bind(this)}>
              <Card style={{backgroundColor:'#272727', borderRadius:15}}>
              <Text style={{color:'#fff', padding:10}}>Select Image</Text>
              </Card>
              </TouchableOpacity> 
            :<Text style={styles.ImageContainer}>Note is Selected , Please fill the details</Text>
            }  
                        <InputForm 
                        onChangeText={mod => this.setState({ module: mod })}
                        value={this.state.module}
                        label="Module"
                        />  
                        <InputForm 
                        onChangeText={sem => this.setState({ sem: sem })}
                        value={this.state.sem}
                        label="Semester"
                        multiline ={true}
                        />
                        <InputForm 
                        onChangeText={branch => this.setState({ branch: branch })}
                        value={this.state.branch}
                        label="Branch"
                        multiline ={true}
                        />
                        <InputForm 
                        onChangeText={subject => this.setState({ subject: subject })}
                        value={this.state.subject}
                        label="Subject"
                        multiline ={true}
                        />
                        <InputForm 
                        onChangeText={chap => this.setState({ chap: chap })}
                        value={this.state.chap}
                        label="Chapter Name"
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
    )}

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
              onPress={this.uploadNotes.bind(this)}>


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
    
    
    this.createDirectories()
    return (
      <View  style={{ flex: 1,
    backgroundColor: '#ECEFF1'}}>
       <Image source={require('../../Resources/Images/notes_bg.jpg')} style={{width:'100%',height:'40%',}} />
       <ScrollView>
       {this.renderSubjects()}
       {this.showModuleDescription()}
       {this.ModalNotes()}
       </ScrollView>
       {this.facultyUpload() }
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