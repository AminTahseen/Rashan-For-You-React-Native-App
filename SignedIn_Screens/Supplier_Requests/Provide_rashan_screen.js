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
import {fetchUserData} from '../../Services/UserService';
import firebase, {auth} from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import {CreateSubmitRequest} from '../../Services/RequestService';

class Provide_rashan_screen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      data_requests: [],
      selected2: '',
      send_by_user_id: '',
      receiver_user_id: '',
      receiver_request_id: '',
    };
  }
  componentDidMount() {
    const user = firebase.auth().currentUser;
    this.setState({
      data_requests: fetchPackagesData(),
      send_by_user_id: user.uid,
      receiver_user_id: this.props.navigation.state.params.item.request_by_userID,
      receiver_request_id: this.props.navigation.state.params.item.key,
    });
    this.GoforApproval = this.GoforApproval.bind(this);
  }
  onValueChange2(value) {
    this.setState({
      selected2: value,
    });
  }
  loadUserTypes() {
    return this.state.data_requests.map(pkg => (
      <Picker.Item label={pkg.package_name} value={pkg.key} />
    ));
  }

  GoforApproval() {
    let approval_request = {
      send_by_user_id: this.state.send_by_user_id,
      receiver_user_id: this.state.receiver_user_id,
      receiver_request_id: this.state.receiver_request_id,
      package_id: this.state.selected2,
      approval_status: 'Waiting',
    };
    this.props.navigation.navigate('waiting_for_approval', {item: approval_request,});

    CreateSubmitRequest(approval_status);
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#ecf0f1'}}>
          <Body>
            <Title style={{color: '#2c3e50'}}>Rashan | Provide Rashan</Title>
          </Body>
        </Header>
        <Content>
          <View>
            <Content padder>
              <Text>Please select your package </Text>
              <Picker
                selectedValue={this.state.selected2}
                style={{height: 50}}
                onValueChange={(itemValue, itemIndex) =>
                  this.onValueChange2(itemValue)
                }>
                {this.loadUserTypes()}
              </Picker>

              <View style={{margin: 10}} />

              <Text style={{fontSize: 20, alignSelf: 'center'}}>
                Provide Rashan
              </Text>
              <View style={{margin: 10}} />

              <Item stackedLabel>
                <Label>Selected package ID</Label>
                <Input value={this.state.selected2} />
              </Item>

              <Item stackedLabel>
                <Label>Receiver user ID</Label>
                <Input
                  value={
                    this.props.navigation.state.params.item.request_by_userID
                  }
                />
              </Item>

              <Item stackedLabel>
                <Label>Receiver request ID</Label>
                <Input value={this.props.navigation.state.params.item.key} />
              </Item>

              <Item stackedLabel>
                <Label>Send by user ID</Label>
                <Input value={this.state.send_by_user_id} />
              </Item>
            </Content>

            <View style={{margin: 20}} />

            <Button
              onPress={this.GoforApproval}
              dark
              block
              style={{backgroundColor: '#1e272e', color: '#fff'}}>
              <Text> Continue </Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Provide_rashan_screen;
