// import * from 'react-native-gesture-handler';
import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import { View, Platform, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class Main extends Component{
	render(){
		return(
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Menu" screenOptions={{
					headerStyle: { backgroundColor:'#512da8'} ,
					headerTintColor: '#fff',
					headerTitleStyle: { color: '#fff' }
				}}>
					<Stack.Screen name="Menu" component={Menu} options={{title: 'MyMenu'}} />
					<Stack.Screen name="Dishdetail" component={Dishdetail} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

export default Main;