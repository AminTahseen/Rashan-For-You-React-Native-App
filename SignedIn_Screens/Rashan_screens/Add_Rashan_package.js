import React, {Component} from 'react';
import { Container, Header, Left, Body, Right, Title,Content,Icon,Button,Text,Form,Input,Item,Label,Textarea } from 'native-base';
import {View,Image,StyleSheet} from 'react-native';
import firebase, { auth } from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { CreateRationPackage } from '../../Services/RationService';

class Add_Rashan_package extends Component {
  static navigationOptions = {
    title: 'Rashan | Add Packages',
    headerStyle: {
      backgroundColor: '#ecf0f1',
    },
    headerTintColor: '#2f3542',
  };
  constructor(props) {
    super(props);
    this.state = {
      package_name: '',
      package_rate: '',
      package_how_long: '',
      package_details: '',
      package_by_userID: '',
    };
    this.Create_RashanPackage = this.Create_RashanPackage.bind(this);
  }
  Create_RashanPackage() {
    let package_obj = {
      package_name: this.state.package_name,
      package_rate: this.state.package_rate,
      package_how_long: this.state.package_how_long,
      package_details: this.state.package_details,
      package_by_userID: this.state.package_by_userID,
    };

    CreateRationPackage(package_obj);
  }

  componentDidMount() 
  {
    const user = firebase.auth().currentUser;
    this.setState({
      package_by_userID: user.uid,
    });
  }
  render() {
    return (
      <Container>
        <Content padder>
          <Text style={{margin: 10, fontSize: 20, fontWeight: 'bold'}}>
            Add Package
          </Text>
          <View style={{margin: 10}} />
          <Form>
            <View style={styles.container}>
              <View style={styles.item}>
                <Item stackedLabel>
                  <Label>Package Name</Label>
                  <Input
                    onChangeText={text => this.setState({package_name: text})}
                  />
                </Item>
              </View>
              <View style={styles.item}>
                <Item stackedLabel>
                  <Label>Package Rate</Label>
                  <Input
                    onChangeText={text => this.setState({package_rate: text})}
                  />
                </Item>
              </View>
            </View>

            <View style={{margin: 10}} />

            <Item stackedLabel>
              <Label>How many days will it last ? (mention days, month etc)</Label>
              <Input
                onChangeText={text => this.setState({package_how_long: text})}
              />
            </Item>
            <View style={{margin: 10}} />

            <Label style={{margin: 10}}>Package Details</Label>
            <Textarea
              rowSpan={5}
              bordered
              placeholder="Describe your package details"
              onChangeText={text => this.setState({package_details: text})}
            />
          </Form>

          <View style={{margin: 20}} />

          <Button dark block style={{backgroundColor: '#1e272e'}} onPress={this.Create_RashanPackage}>
            <Text> Add Package </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
  },
  item: {
    width: '50%', // is 50% of container width
  },
});

export default Add_Rashan_package;