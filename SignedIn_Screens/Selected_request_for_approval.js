import React, {Component} from 'react';
import { Container, Header, Body, Title,Card, CardItem, Text, Content,Button,Right,Icon} from 'native-base';
import {View,Image,FlatList,TouchableOpacity,Alert} from 'react-native';
import {fetchSupplierRequestDataForPackage, fetchSupplierRequestData,UpdateSupplierRequest,CreateDeliveryForRashan} from '../Services/RequestService';
import {fetchCertainPackageData} from '../Services/RationService';

import {Logout,fetchUserData} from '../Services/UserService';
import firebase, { auth } from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

class Selected_request_for_approval extends Component {
  static navigationOptions = {
    header: null
}
  constructor(props) {
    super(props);
    this.state = {
      sender_details:'',
      sender_package_details:'',
      receiver_request_id:'',
        };
      this.Approve_Request=this.Approve_Request.bind(this);
      this.ViewStatus=this.ViewStatus.bind(this);
  }
  componentDidMount() {
    const user=firebase.auth().currentUser;
    this.setState({
      sender_details: fetchUserData(this.props.navigation.state.params.item.send_by_user_id),
      sender_package_details: fetchCertainPackageData(this.props.navigation.state.params.item.package_id),
    });
  }
  Approve_Request()
  {
    UpdateSupplierRequest(this.props.navigation.state.params.item.key);
    let delivery_obj = {
      deliver_to_receiver_id:this.props.navigation.state.params.item.receiver_user_id,
      delivered_by_sender_id:this.props.navigation.state.params.item.send_by_user_id,
      delivered_package_id:this.props.navigation.state.params.item.package_id,
      delivered_to_receiver_request_id:this.props.navigation.state.params.item.receiver_request_id,
      delivery_status:'Not Delivered',
      delivery_total_amount:this.state.sender_package_details.package_rate,
    };
    CreateDeliveryForRashan(delivery_obj);
    this.props.navigation.navigate('proceed_to_delivery',{item: delivery_obj});
  }

  ViewStatus()
  {
    let delivery_obj = {
      deliver_to_receiver_id:this.props.navigation.state.params.item.receiver_user_id,
      delivered_by_sender_id:this.props.navigation.state.params.item.send_by_user_id,
      delivered_package_id:this.props.navigation.state.params.item.package_id,
      delivered_to_receiver_request_id:this.props.navigation.state.params.item.receiver_request_id,
      delivery_status:'Not Delivered',
      delivery_total_amount:this.state.sender_package_details.package_rate,
    };
    this.props.navigation.navigate('proceed_to_delivery',{item: delivery_obj});
  }
  render() {
    return (

      <Container>
        <Header style={{backgroundColor:"#ecf0f1"}}>
          <Body>
            <Title style={{color:"#2c3e50"}}>Rashan | Approval Request</Title>
          </Body>
        </Header>
        
        <Content padder>

        <Card>
            <CardItem header bordered>
              <Text>Supplier Details</Text>
            </CardItem>
            <CardItem bordered>
              <Body style={{alignItems:"center"}}>
              <Text>Provider Name : {this.state.sender_details.fullname}</Text>
          <Text>Provider City : {this.state.sender_details.city}</Text>
          <Text>Provider Phone No :  {this.state.sender_details.phoneNo}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body style={{alignItems:"center"}}>
              <Text>Details : {this.state.sender_package_details.package_details}</Text>
    <Text>Price : Rs.{this.state.sender_package_details.package_rate}</Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
            <Button onPress={this.Approve_Request}
        dark
        block
        style={{backgroundColor: '#1e272e', color: '#fff'}}>
        <Text> Approve </Text>
      </Button>
      <View style={{margin:5}}/>
      <Button onPress={this.RefreshToApproval}
        dark
        block
        style={{backgroundColor: '#1e272e', color: '#fff'}}>
        <Text> Reject </Text>
      </Button> 
      <View style={{margin:5}}/>
      <Button onPress={this.ViewStatus}
        dark
        block
        style={{backgroundColor: '#1e272e', color: '#fff'}}>
        <Text> Status </Text>
      </Button> 
            </CardItem>
          </Card>




       
    
        </Content>
      </Container>



    );
  }
}

export default Selected_request_for_approval;