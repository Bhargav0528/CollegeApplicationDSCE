import React from 'react';
import { View,Text } from 'react-native';
import { Card, CardSection } from '../common';
const NotificationList = ({data})=> {
  console.log("Hey"+data);
  const { cardViewStyle, categoryViewStyle } = styles;
  return(
    <Card style={cardViewStyle}>
      <CardSection style={{backgroundColor : '#0277BD', elevation:4, 
    borderTopLeftRadius: 10,
		borderTopRightRadius: 10,}}>
        <View>
          <Text >{data.category}</Text>
        </View>
      </CardSection>
      <CardSection style={{backgroundColor : '#81D4FA', flexDirection:'column', borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,}}>
        <Text style={{fontSize:14, color:'#272727'}}>{data.description}</Text>
        <Text>{data.text}</Text>
      </CardSection>
    </Card>
    );
}

const styles = {
  cardViewStyle:{
    borderRadius: 10,
    flexDirection:'column',
  },
  categoryViewStyle:{
    alignItems: 'flex-start'
  },
  
  
}

export default  NotificationList;