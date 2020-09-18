import React, {Component} from 'react';
import {
  Container,
  Header,
  Body,
  Title,
  Card,
  CardItem,
  Content,
  Button,
  Right,
  Icon,
  Text,
} from 'native-base';
import {View, Image, FlatList, TouchableOpacity, Alert} from 'react-native';
import {fetchRequestData} from '../../Services/RequestService';

class Show_all_requests extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      data_requests: [],
    };
  }
  onItemClick = value => {
    this.props.navigation.navigate('provide_rashan',{item: value,});
  };
  componentDidMount() {
    this.setState({
      data_requests: fetchRequestData(), 
    });
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#ecf0f1'}}>
          <Body>
            <Title style={{color: '#2c3e50'}}>Rashan | All Requests</Title>
          </Body>
        </Header>
        <Content>
          <FlatList
            data={this.state.data_requests}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View>
                <TouchableOpacity onPress={() => this.onItemClick(item)}>
                  <Container>
                    <Content padder>
                      <Card>
                        <CardItem header bordered>
                          <Text style={{fontWeight: 'bold'}}>
                            Request for Rashan  |  {item.rashan_provided}
                          </Text>
                        </CardItem>
                        <CardItem bordered>
                          <Body>
                            <Text>Rashan Details : {item.request_details}</Text>
                          </Body>
                        </CardItem>
                        <CardItem bordered>
                          <Body>
                            <Text>
                              Budget : Rs. {item.request_approx_amount}
                            </Text>
                          </Body>
                        </CardItem>
                        <CardItem bordered>
                          <Body>
                            <Text>
                              Number of Peoples : {item.number_of_peoples}
                            </Text>
                          </Body>
                        </CardItem>
                        <CardItem footer bordered>
                          <Text style={{fontWeight: 'bold'}}>
                            Click to provide
                          </Text>
                        </CardItem>
                      </Card>
                    </Content>
                  </Container>
                </TouchableOpacity>
              </View>
            )}
          />
        </Content>
      </Container>
    );
  }
}

export default Show_all_requests;
