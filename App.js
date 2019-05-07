import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import ContactScreen from './components/ContactScreen';
import ContactDetailsScreen from './components/ContactDetailsScreen';
import ContactAddScreen from './components/ContactAddScreen';
import ContactEditScreen from './components/ContactEditScreen';

const RootStack = createStackNavigator(
  {
    Contact: ContactScreen,
    ContactDetails: ContactDetailsScreen,
    AddContact: ContactAddScreen,
    EditContact: ContactEditScreen,
  },
  {
    initialRouteName: 'Contact',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#777777',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const RootContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <RootContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});