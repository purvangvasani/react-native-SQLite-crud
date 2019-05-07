import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, ActivityIndicator, View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Database from '../Database';

const db = new Database();

export default class ContactDetailsScreen extends Component {
  
  static navigationOptions = {
    title: 'Contact Details',
  };
  
  constructor() {
    super();
    this.state = {
      isLoading: true,
      contact: {},
      id: '',
    };
  }

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      const { navigation } = this.props;
      db.contactById(navigation.getParam('contId')).then((data) => {
        console.log(data);
        contact = data;
        this.setState({
          contact,
          isLoading: false,
          id: contact.contId
        });
      }).catch((err) => {
        console.log(err);
        this.setState = {
          isLoading: false
        }
      })
    });
  }

  deleteContact(id) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });
    db.deleteContact(id).then((result) => {
      console.log(result);
      this.props.navigation.goBack();
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <ScrollView>
        <Card style={styles.container}>
          <View style={styles.subContainer}>
            <View>
              <Image
                style={{width: 150, height: 150}}
                source={{uri: this.state.contact.contImage}} />
            </View>
            <View>
              <Text style={{fontSize: 16}}>Contact ID: {this.state.contact.contId}</Text>
            </View>
            <View>
              <Text style={{fontSize: 16}}>Contact Name: {this.state.contact.contName}</Text>
            </View>
            <View>
              <Text style={{fontSize: 16}}>Contact Number: {this.state.contact.contNumber}</Text>
            </View>
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#CCCCCC'}
              leftIcon={{name: 'edit'}}
              title='Edit'
              onPress={() => {
                this.props.navigation.navigate('EditContact', {
                  contId: `${this.state.id}`,
                });
              }} />
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#999999'}
              color={'#FFFFFF'}
              leftIcon={{name: 'delete'}}
              title='Delete'
              onPress={() => this.deleteContact(this.state.id)} />
          </View>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20
    },
    subContainer: {
      flex: 1,
      paddingBottom: 20,
      borderBottomWidth: 2,
      borderBottomColor: '#CCCCCC',
    },
    activity: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    detailButton: {
      marginTop: 10
    }
  })