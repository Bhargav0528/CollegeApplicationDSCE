import React from 'react';
import { View, Text, TextInput } from 'react-native';
const InputForm = props => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      <View style={[styles.containerStyle2, props.style]}>
        <Text style={styles.labelStyle}>{props.label}</Text>
      </View>
      <TextInput
        secureTextEntry={props.secureTextEntry}
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        autoCorrect={false}
        style={styles.inputStyle}
        value={props.value}
        onChangeText={props.onChangeText}
      /> 
    </View>
  );
};
const styles = {
  inputStyle: {
    width: 250,
    height: 30,
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 40,
  },
  labelStyle: {
    fontSize: 18,
    padding: 5,
  },
  containerStyle2: {
    backgroundColor: '#fff',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: '#757575',
  },
  containerStyle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#757575',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
  },
  containerStyle3: {
    backgroundColor: '#fff',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignSelf: 'stretch',
    borderColor: '#757575',
  },
  textInputStyle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
  },
};

export { InputForm };
