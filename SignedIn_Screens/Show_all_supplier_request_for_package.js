import React, {Component} from 'react';
import { Container, Header, Body, Title,Card, CardItem, Text, Content,Button,Right,Icon} from 'native-base';
import {View,Image,FlatList,TouchableOpacity} from 'react-native';
import {fetchSupplierRequestDataForPackage, fetchSupplierRequestData} from '../Services/RequestService';

class Show_all_supplier_request_for_package extends Component {
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
    this.props.navigation.navigate('selected_request_for_approval',{item: value});
  };
  componentDidMount() {
    this.setState({
      data_requests: fetchSupplierRequestDataForPackage(this.props.navigation.state.params.item.key),
    });
  }
  render() {
    return (

      <Container>
        <Header style={{backgroundColor:"#ecf0f1"}}>
          <Body>
            <Title style={{color:"#2c3e50"}}>Rashan | All Supplier Request</Title>
          </Body>
        </Header>
        
        <Content padder>
          <Text>Suppliers request to provide rashan</Text>
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
                            <Text>User ID {item.send_by_user_id} Want to supply you rashan</Text>
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

export default Show_all_supplier_request_for_package;