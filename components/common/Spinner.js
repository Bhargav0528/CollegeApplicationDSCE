import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = (props) => {
  return (
    <View style={styles.spinnerStyle} >
      <ActivityIndicator size={props.spinsize||'large'} color="#0000ff"/>
    </View>
    );
}

const styles = {
  spinnerStyle : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export { Spinner };