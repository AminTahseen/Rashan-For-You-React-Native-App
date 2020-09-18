import React, {Component} from 'react';
import {   Container,
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
  Text,} from 'native-base';
import {View,Image,FlatList,TouchableOpacity} from 'react-native';
import {fetchRequestData,UpdateDeliveryRequest,UpdateREQUESTSFORRASHAN} from '../Services/RequestService';
import {fetchCertainPackageData} from '../Services/RationService';
import {fetchReceiverUserData} from '../Services/UserService';

class GotoDelivery extends Component {
  static navigationOptions = {
    header: null
}
  constructor(props) {
    super(props);
    this.state = {
      total_amount:0.1,
      value:'',
      package:'',
      entered_amount:'',
    };
    this.GetTotalAndMarkDelivery=this.GetTotalAndMarkDelivery.bind(this);
  }

  componentDidMount() {
    this.setState({
      value:fetchReceiverUserData(this.props.navigation.state.params.item.receiver_user_id),
      package:fetchCertainPackageData(this.props.navigation.state.params.item.package_id),
    });
  }

  GetTotalAndMarkDelivery(){
    var packagePrice=Number(this.state.package.package_rate);
    var entered_price=Number(this.state.entered_amount);

    if(packagePrice>entered_price)
    {
      var total=packagePrice-entered_price;
      this.setState({
        total_amount:Math.abs(total),
      })
    }else if(entered_price>entered_price){
      var total=entered_price-packagePrice;
      this.setState({
        total_amount:Math.abs(total),
      })
    }else{
      var total=packagePrice-entered_price;
      this.setState({
        total_amount:Math.abs(total),
      })
    }
    UpdateDeliveryRequest(this.props.navigation.state.params.item.receiver_user_id,this.props.navigation.state.params.item.receiver_request_id);
    UpdateREQUESTSFORRASHAN(this.props.navigation.state.params.item.receiver_request_id);
  }

  render() {
    var total;
    if(this.state.total_amount==0)
    {
      total =(
        <Text style={{fontSize:20,alignSelf:"center"}}>Your Calculated Price - Rs. {this.state.total_amount}/pkr</Text>
            );
    }
    else if(this.state.total_amount==0.1)
    {
      
    }
    else
    {
      total =(
        <Text style={{fontSize:20,alignSelf:"center"}}>Your Calculated Price - Rs. {this.state.total_amount}/pkr</Text>
            );
    }

    return (
      <Container>
        <Header style={{backgroundColor:"#ecf0f1"}}>
          <Body>
            <Title style={{color:"#2c3e50"}}>Rashan | Delivery Page</Title>
          </Body>
        </Header>
        
        <Content padder>
        
        <View style={{margin:30}}>
    <Text style={{fontSize:30}}>Mark Delivery For {this.state.value.fullname}</Text>
        <Text style={{fontSize:15,alignSelf:"center"}}>Wohoo ! You have reached your destination</Text>

        <View style={{margin:30}}/>

        <Text style={{fontSize:20,alignSelf:'center'}}>Package Price - Rs. {this.state.package.package_rate}</Text>
        <View style={{margin:15}}/>
        <Item stackedLabel>
                <Input placeholder="Enter Received Amount" style={{fontSize:20,alignSelf:"center"}} onChangeText={text => this.setState({entered_amount: text})}/>
              </Item>

              <View style={{margin:20}}/>

              {total}

              <View style={{margin:20}}/>

              <Button
              dark
              block
              style={{backgroundColor: '#1e272e', color: '#fff'}} onPress={this.GetTotalAndMarkDelivery}>
              <Text> Mark As Delivered </Text>
            </Button>
        </View>

        

        </Content>
      </Container>



    );
  }
}

export default GotoDelivery;