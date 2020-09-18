import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Button,
  Text,
} from 'native-base';
import {View, Image, FlatList, TouchableOpacity, Alert, TextInput} from 'react-native';

class Show_requests_list extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onItemClick = value => {
    this.props.navigation.navigate('provide_rashan');
  };

  componentDidMount() {}

  render() {
    return (
      <View>
                    
        <Container>
          <Content>
            
          </Content>
        </Container>
      </View>
    );
  }
}

export default Show_requests_list;
