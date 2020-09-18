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
  Item,
  Label,
  Input,
  Text,
} from 'native-base';
import {View, Image, Picker} from 'react-native';
import {fetchPackagesData} from '../../Services/RationService';
import Show_requests_list from '../../Component/Show_requests_list';
import {fetchUserData,fetchReceiverUserData} from '../../Services/UserService';
import firebase, {auth} from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import {fetchSupplierRequestData} from '../../Services/RequestService';

class Waiting_for_approval_screen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      receiver:'',
    };
    this.ProceedToMap = this.ProceedToMap.bind(this);
    this.RefreshToApproval=this.RefreshToApproval.bind(this);
  }
  
  componentDidMount() {
    const user = firebase.auth().currentUser;
    this.setState({
      status: fetchSupplierRequestData(
        this.props.navigation.state.params.item.receiver_request_id,
        this.props.navigation.state.params.item.send_by_user_id,
      ).approval_status,
    });
 
  }

  RefreshToApproval()
  {
    this.setState({
      status: fetchSupplierRequestData(
        this.props.navigation.state.params.item.receiver_request_id,
        this.props.navigation.state.params.item.send_by_user_id,
      ).approval_status,
    });
  }
  ProceedToMap() {
    this.setState({
      receiver:fetchReceiverUserData(this.props.navigation.state.params.item.receiver_user_id),
    })
    this.props.navigation.navigate('show_map',{item: fetchReceiverUserData(this.props.navigation.state.params.item.receiver_user_id),item2:this.props.navigation.state.params.item});
  }

  render() {
    var approval_btn;
    if (this.state.status==='Approved') {
      approval_btn =(
        <Button onPress={this.ProceedToMap}
        dark
        block
        style={{backgroundColor: '#1e272e', color: '#fff', margin: 20}}>
        <Text> Proceed </Text>
      </Button>
            ); 
    } else if(this.state.status==='Waiting'){
      approval_btn = (
        <Button onPress={this.RefreshToApproval}
        dark
        block
        style={{backgroundColor: '#1e272e', color: '#fff', margin: 20}}>
        <Text> Refresh </Text>
      </Button>     
       );
    }
    return (
      <Container>
        <Header style={{backgroundColor: '#ecf0f1'}}>
          <Body>
            <Title style={{color: '#2c3e50'}}>
              Rashan | Waiting for approval
            </Title>
          </Body>
        </Header>
        <Content>
          <View>
            <View style={{margin: 30}} />
            <Text style={{fontSize: 25, alignSelf: 'center'}}>
              Waiting for receiver Approval
            </Text>
            <View style={{margin: 30}} />
            <Text style={{fontSize: 20, alignSelf: 'center'}}>
              {this.state.status}
            </Text>

            <View style={{margin: 30}} />

            {approval_btn}
           
          </View>
        </Content>
      </Container>
    );
  }
}

export default Waiting_for_approval_screen;
