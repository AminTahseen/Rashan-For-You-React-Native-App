import React, {Component} from 'react';
import { Container, Header, Body, Title,Card, CardItem, Text, Content,Button,Right,Icon} from 'native-base';
import {View,Image,FlatList,TouchableOpacity,Alert, _Text} from 'react-native';
import {fetchSupplierRequestDataForPackage, fetchSupplierRequestData,UpdateSupplierRequest,CreateDeliveryForRashan,fetchDeliveryStatus} from '../Services/RequestService';
import {fetchCertainPackageData} from '../Services/RationService';

import {Logout,fetchUserData} from '../Services/UserService';
import firebase, { auth } from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { TextInput } from 'react-native-gesture-handler';

class Proceed_to_delivery_screen extends Component {
  static navigationOptions = {
    header: null
}
  constructor(props) {
    super(props);
    this.state = {
      delivery_status:'',
      devlivery_obj:'',
        };
      this.Refresh_Data=this.Refresh_Data.bind(this);
      this.Contact_Sender=this.Contact_Sender.bind(this);

  }
  componentDidMount() {
    const user=firebase.auth().currentUser;
    this.setState({
      delivery_status:this.props.navigation.state.params.item.delivery_status,
      devlivery_obj:this.props.navigation.state.params.item,
    });
  }
  Refresh_Data()
  {
    this.setState({
      delivery_status:fetchDeliveryStatus(this.props.navigation.state.params.item.delivered_to_receiver_request_id).delivery_status,
    })
  }
  Contact_Sender()
  {
   Alert.alert("Show sender details")
  }
  render() {
    var deliv_stat;
    if(this.state.delivery_status==='Not Delivered')
    {
      deliv_stat =(
        <Text style={{fontSize:20,color:'red'}}>Not Delivered</Text>
            ); 
    }
    else if(this.state.delivery_status==='Delivered')
    {
      deliv_stat =(
        <Text style={{fontSize:20,color:'green'}}>Delivered</Text>
            ); 
    } 
    return (

      <Container>
        <Header style={{backgroundColor:"#ecf0f1"}}>
          <Body>
            <Title style={{color:"#2c3e50"}}>Rashan | Proceed to delivery</Title>
          </Body>
        </Header>
        
        <Content padder>

<View style={{alignItems:"center",marginTop:90}}>
<Text style={{fontSize:30}}>Waiting for delivery</Text>
          <View style={{margin:10}}/>

{deliv_stat}

          <View style={{margin:20}}/>

          <Button onPress={this.Contact_Sender}
        dark
        block
        style={{backgroundColor: '#1e272e', color: '#fff'}}>
        <Text> Contact Sender </Text>
      </Button>
      <View style={{margin:5}}/>
          <Button onPress={this.Refresh_Data}
        dark
        block
        style={{backgroundColor: '#1e272e', color: '#fff'}}>
        <Text> Verify Status </Text>
      </Button>
</View>
          

        </Content>
      </Container>



    );
  }
}

export default Proceed_to_delivery_screen;