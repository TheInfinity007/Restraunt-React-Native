import React from 'react';
import Main from './components/MainComponent';
import { View, Platform } from 'react-native';
import Constants from 'expo-constants';

export default class App extends React.Component{
  render(){
    return(
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0: Constants.statusBarHeight }}>
        <Main />
      </View>
    );
  }
}