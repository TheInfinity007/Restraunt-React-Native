import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { View, Platform, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItems, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
	return{
		dishes: state.dishes,
		comments: state.comments,
		promotions: state.promotions,
		leaders: state.leaders
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchDishes: () => dispatch(fetchDishes()),
	fetchComments: () => dispatch(fetchComments()),
	fetchPromos: () => dispatch(fetchPromos()),
	fetchLeaders: () => dispatch(fetchLeaders()),
});

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen({ navigation }){
	return(
		<MenuNavigator.Navigator initialRouteName="Menu" screenOptions={{
			headerStyle: { backgroundColor:'#512da8'} ,
			headerTintColor: '#fff',
			headerTitleStyle: { color: '#fff' }
		}}>
			<MenuNavigator.Screen name="Menu" component={Menu} options={({navigation})=>({
				title: 'Menu',
				headerLeft: () => (<Icon name="menu" size={24} color="white" onPress={()=>navigation.toggleDrawer()} /> )
			})} />
			<MenuNavigator.Screen name="Dishdetail" component={Dishdetail} options={{headerTitle: 'Dish Details'}} />
		</MenuNavigator.Navigator>
	);
}


const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen({ navigation }){
	return(
		<HomeNavigator.Navigator screenOptions={({ navigation })=>({
			headerStyle: { backgroundColor:'#512da8'} ,
			headerTintColor: '#fff',
			headerTitleStyle: { color: '#fff' },
			headerLeft: (props) => (<Icon name="home" size={24} color="white" onPress={()=>navigation.toggleDrawer()} /> )
		})}>
			<HomeNavigator.Screen name="Home" component={Home} />
		</HomeNavigator.Navigator>
	);
}

const ContactNavigator = createStackNavigator();

function ContactNavigatorScreen({ navigation }){
	return(
		<ContactNavigator.Navigator screenOptions={({navigation})=>({
			headerStyle: { backgroundColor: '#512da8'},
			headerTintColor: '#fff',
			headerTitleStyle: { color: '#fff' },
			headerLeft: () => (<Icon name="contacts" size={24} color="white" onPress={()=>navigation.toggleDrawer()} /> )
		})}>
			<ContactNavigator.Screen name="Contact" component={Contact} options={{title: ''}} />
		</ContactNavigator.Navigator>
	);
}

const AboutNavigator = createStackNavigator();

function AboutNavigatorScreen({ navigation }){
	return(
		<AboutNavigator.Navigator  screenOptions={({navigation}) => ({
			headerStyle: { backgroundColor: '#512da8'},
			headerTintColor: '#fff',
			headerTitleStyle: { color: '#fff' },
			headerLeft: () => (<Icon name="info" size={24} color="white" onPress={()=>navigation.toggleDrawer()} /> )
		})}>
			<AboutNavigator.Screen name="About" component={About} options={{title: 'About Us'}} />
		</AboutNavigator.Navigator>
	);
}

const CustomDrawerContentComponent = (props) => {
	return(
	<DrawerContentScrollView {...props}>
		<SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
			<View style={styles.drawerHeader}>
				<View style={{flex: 1}}>
					<Image source={require('./images/logo.png')} style={styles.drawerImage} />
				</View>
				<View style={{flex: 2}}>
					<Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
				</View>
			</View>
			<DrawerItemList {...props} />
		</SafeAreaView>
	</DrawerContentScrollView>
	);
}

const MainNavigator = createDrawerNavigator();

function MainNavigatorScreen({navigation}){
	return(
		<MainNavigator.Navigator initialRouteName="Home" drawerStyle={{ backgroundColor: '#d1c4e9' }} drawerContent={(props) => <CustomDrawerContentComponent {...props} />}>
			<MainNavigator.Screen name="Home" component={HomeNavigatorScreen} options={{drawerLabel: 'Home', drawerIcon: ({ tintColor }) => (
					<Icon name="home" type='font-awesome' size={24} color={tintColor} />
				)}}/>
			<MainNavigator.Screen name="Menu" component={MenuNavigatorScreen } options={{ drawerLabel: 'Menu', drawerIcon: ({ tintColor }) => (
					<Icon name="list" type='font-awesome' size={24} color={tintColor} />
				) }} />
			<MainNavigator.Screen name="Contact" component={ContactNavigatorScreen} options={{ drawerLabel: 'Contact', drawerIcon: ({ tintColor }) => (
					<Icon name="address-card" type='font-awesome' size={22} color={tintColor} />
				) }}  />
			<MainNavigator.Screen name="About" component={AboutNavigatorScreen} options={{ drawerLabel: 'About', drawerIcon: ({ tintColor }) => (
					<Icon name="info-circle" type='font-awesome' size={24} color={tintColor} />
				) }}  />
		</MainNavigator.Navigator>
	);
}

class Main extends Component{

	componentDidMount(){
		this.props.fetchDishes();
		this.props.fetchComments();
		this.props.fetchPromos();
		this.props.fetchLeaders();
	}

	render(){
		return(
			<NavigationContainer>
				<MainNavigatorScreen />
			</NavigationContainer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	drawerHeader: {
		backgroundColor: '#512da8',
		height: 140,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row'
	},
	drawerHeaderText: {
		color: 'white',
		fontSize: 24,
		fontWeight: 'bold'
	},
	drawerImage: {
		margin: 10,
		width: 80,
		height: 60
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);