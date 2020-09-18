import React, {Component} from 'react';
import { Container, Header, Body, Title,Card, CardItem, Text, Content,Button,Right,Icon} from 'native-base';
import {View,Image,FlatList,TouchableOpacity} from 'react-native';
import {fetchRequestData} from '../Services/RequestService';

class Home extends Component {
  static navigationOptions = {
    header: null
}
  constructor(props) {
    super(props);
    this.state = {
      data_requests: [],
    };
  }
  onItemClick = value => {
    this.props.navigation.navigate('show_all_supplier_request_for_package',{item: value});
  };
  componentDidMount() {
    this.setState({
      data_requests: fetchRequestData(),
    });
  }
  render() {
    return (
      <Container>
        <Header style={{backgroundColor:"#ecf0f1"}}>
          <Body>
            <Title style={{color:"#2c3e50"}}>Rashan | All Packages</Title>
          </Body>
        </Header>
        
        <Content padder>
          <Text>Click on the package to view requests</Text>
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
                            Request ID  {item.key}
                          </Text>
                        </CardItem>
                        <CardItem bordered>
                          <Body>
                            <Text>Rashan Details : {item.request_details}</Text>
                          </Body>
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

export default Home;