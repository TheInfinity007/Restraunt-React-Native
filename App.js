import React from 'react';
import Main from './components/MainComponent';
import { View, Platform } from 'react-native';
import Constants from 'expo-constants';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

export default class App extends React.Component{
  render(){
    return(
    	<Provider store={store}>
	      	<View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0: Constants.statusBarHeight }}>
	        	<Main />
	      	</View>
	    </Provider>
    );
  }
}

// export default class App extends React.Component{
//   render(){
//     return(
//     	<Provider store={store}>
// 	      	<View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0: Constants.statusBarHeight }}>
// 	        	<Main />
// 	      	</View>
// 	    </Provider>
//     );
//   }
// }