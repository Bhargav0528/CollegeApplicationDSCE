import React from 'react';
import { View,Text } from 'react-native';
import { Card, CardSection } from '../common';
const NotificationList = ({data})=> {
  console.log("Hey"+data);
  const { cardViewStyle, categoryViewStyle } = styles;
  return(
    <Card style={cardViewStyle}>
      <CardSection>
        <View>
          <Text>{data.category}</Text>
        </View>
      </CardSection>
      <CardSection>
        <Text>{data.description}</Text>
      </CardSection>
      <CardSection>
        <Text>{data.text}</Text>
      </CardSection>
    </Card>
    );
}

const styles = {
  cardViewStyle:{
    backgroundColor : '#FFF3E0',
    flexDirection:'column',
  },
  categoryViewStyle:{
    alignItems: 'flex-start'
  },
  
  
}

export default  NotificationList;