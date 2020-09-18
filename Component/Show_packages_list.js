import React, {Component} from 'react';
import { Container, Header, Content, Card, CardItem, Body ,Button,Text} from 'native-base';
import {View,Image,FlatList,TouchableOpacity,Alert} from 'react-native';

class Show_packages_list extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onItemClick = value => {
    Alert.alert(value.package_name);
  }

  componentDidMount(){
    console.log(this.props.getPackagesList)
  }

  render() {
    return (
        <View>
<Container>
        <Content padder>

        <FlatList
              data={this.props.getPackagesList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => this.onItemClick(item)}>
                     <Container>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>{item.package_name}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                {item.package_details}
                </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  Will Last {item.package_how_long}
                </Text>
                <Text>
                  Rate - Rs.{item.package_rate}/pkr
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
                </TouchableOpacity>
              )}
            />



        </Content>
      </Container>

        </View>
    );
  }
}

export default Show_packages_list;