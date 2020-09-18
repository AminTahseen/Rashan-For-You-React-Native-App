import React, {Component} from 'react';
import { Container, Header, Content, Card, CardItem, Body ,Button,Text} from 'native-base';
import {View,Image} from 'react-native';
import  Show_packages_list  from '../../Component/Show_packages_list';
import { fetchPackagesData } from '../../Services/RationService';

class Rashan_packages extends Component {
  static navigationOptions = {
    title: 'Rashan | Rashan Packages',
    headerStyle: {
      backgroundColor: '#ecf0f1',
    },
    headerTintColor: '#2f3542'
  };
  constructor(props) {
    super(props);
    this.state = {
      Packages_list:[],
    };
    this.Navigate_to_Add_Rashan_package=this.Navigate_to_Add_Rashan_package.bind(this);
  }
  Navigate_to_Add_Rashan_package(){
    this.props.navigation.navigate('add_rashan_package');
  }

  componentDidMount()
  {
   this.setState({
     Packages_list:fetchPackagesData(),
   }) 
  }

  render() {
    return (
      <Container>
     <Content padder>
          <Button block dark onPress={this.Navigate_to_Add_Rashan_package}>
            <Text>Add Package</Text>
          </Button>

          <Show_packages_list getPackagesList={this.state.Packages_list} />

      </Content>
      </Container>
    );
  }
}

export default Rashan_packages;