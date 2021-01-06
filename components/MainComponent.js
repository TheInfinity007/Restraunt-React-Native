import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { View, Platform, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen({ navigation }){
	return(
		<MenuNavigator.Navigator initialRouteName="Menu" screenOptions={{
			headerStyle: { backgroundColor:'#512da8'} ,
			headerTintColor: '#fff',
			headerTitleStyle: { color: '#fff' }
		}}>
			<MenuNavigator.Screen name="Menu" component={Menu} options={{title: 'Menu'}} />
			<MenuNavigator.Screen name="Dishdetail" component={Dishdetail} options={{headerTitle: 'Dish Details'}} />
		</MenuNavigator.Navigator>
	);
}


const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen({ navigation }){
	return(
		<HomeNavigator.Navigator screenOptions={{
			headerStyle: { backgroundColor:'#512da8'} ,
			headerTintColor: '#fff',
			headerTitleStyle: { color: '#fff' }
		}}>
			<HomeNavigator.Screen name="Home" component={Home} />
		</HomeNavigator.Navigator>
	);
}

const ContactNavigator = createStackNavigator();

function ContactNavigatorScreen({ Navigation }){
	return(
		<ContactNavigator.Navigator screenOptions={{
			headerStyle: { backgroundColor: '#512da8'},
			headerTintColor: '#fff',
			headerTitleStyle: { color: '#fff' }
		}}>
			<ContactNavigator.Screen name="Contact" component={Contact} options={{title: ''}} />
		</ContactNavigator.Navigator>
	);
}

const AboutNavigator = createStackNavigator();

function AboutNavigatorScreen({ Navigation }){
	return(
		<AboutNavigator.Navigator  screenOptions={{
			headerStyle: { backgroundColor: '#512da8'},
			headerTintColor: '#fff',
			headerTitleStyle: { color: '#fff' }
		}}>
			<AboutNavigator.Screen name="About" component={About} options={{title: 'About Us'}} />
		</AboutNavigator.Navigator>
	);
}


const MainNavigator = createDrawerNavigator();

function MainNavigatorScreen({navigation}){
	return(
		<MainNavigator.Navigator initialRouteName="Home" drawerStyle={{ backgroundColor: '#d1c4e9' }}>
			<MainNavigator.Screen name="Home" component={HomeNavigatorScreen} options={{ drawerLabel: 'Home' }} />
			<MainNavigator.Screen name="Menu" component={MenuNavigatorScreen } options={{ drawerLabel: 'Menu' }} />
			<MainNavigator.Screen name="Contact" component={ContactNavigatorScreen} />
			<MainNavigator.Screen name="About" component={AboutNavigatorScreen} />
		</MainNavigator.Navigator>
	);
}

class Main extends Component{
	render(){
		return(
			<NavigationContainer>
				<MainNavigatorScreen />
			</NavigationContainer>
		);
	}
}

export default Main;