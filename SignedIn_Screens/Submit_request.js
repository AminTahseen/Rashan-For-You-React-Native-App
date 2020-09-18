import React, {Component} from 'react';
import { Container, Header, Left, Body, Right, Title,Content,Icon,Button,Text,Form,Input,Item,Label,Textarea } from 'native-base';
import {CreateSubmitRequestForRashan, CreateSubmitRequest} from '../Services/RequestService'
import {View,Image,StyleSheet} from 'react-native';
import firebase, { auth } from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
class Submit_request extends Component {
  static navigationOptions = {
    headerTitle: 'Rashan | Submit Requests',
  };
  constructor(props) {
    super(props);
    this.state = {
      request_details: '',
      request_approx_amount: '',
      number_of_peoples: '',
      request_by_userID: '',
    };
    this.Submit_a_Request=this.Submit_a_Request.bind(this);
  }

  Submit_a_Request(){
    let request_obj = {
      request_details: this.state.request_details,
      request_approx_amount: this.state.request_approx_amount,
      number_of_peoples: this.state.number_of_peoples,
      request_by_userID: this.state.request_by_userID,
      rashan_provided: 'Not Provided',
    };

    CreateSubmitRequestForRashan(request_obj);
    
  }
  componentDidMount() 
  {
    const user = firebase.auth().currentUser;
    this.setState({
      request_by_userID: user.uid,
    });
  }
  render() {
    return (
      <Container>
      <Header style={{backgroundColor: '#ecf0f1'}}>
        <Body>
          <Title style={{color: '#2c3e50'}}>Rashan | Submit Requests</Title>
        </Body>
      </Header>

      <Content padder>
          <Text style={{margin: 10, fontSize: 20, fontWeight: 'bold'}}>
            Submit a request
          </Text>
          <View style={{margin: 10}} />
          <Form>
            <View>

            <Label style={{margin: 10}}>Request Details</Label>
            <Textarea
              rowSpan={5}
              bordered
              placeholder="Describe your request details"
              onChangeText={text => this.setState({request_details: text})}
            />

              <View>
                <Item stackedLabel>
                  <Label>Approximate amount</Label>
                  <Input               
                     placeholder="How much amount you have"
                    onChangeText={text => this.setState({request_approx_amount: text})}
                  />
                </Item>
              </View>
              <View>
                <Item stackedLabel>
                  <Label>Number of peoples</Label>
                  <Input
                    placeholder="How many peoples"
                    onChangeText={text => this.setState({number_of_peoples: text})}
                  />
                </Item>
              </View>
            </View>
          </Form>

          <View style={{margin: 20}} />

          <Button dark block style={{backgroundColor: '#1e272e'}} onPress={this.Submit_a_Request}>
            <Text> Submit Request </Text>
          </Button>
          <View style={{margin: 5}} />
        </Content>


      </Container>
    );
  }
}
export default Submit_request;