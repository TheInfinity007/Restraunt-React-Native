import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
	return{
		dishes: state.dishes,
		favorites: state.favorites
	}
}

class Favorites extends Component{

	render(){

		const { navigate } = this.props.navigation;
		const renderMenuItem = ({ item, index }) =>{
			return(
				<ListItem key={index} onPress={() =>  navigate('Dishdetail', { dishId: item.id })}>
					<Avatar rounded source={{uri: baseUrl + item.image }} />
					<ListItem.Content>
						<ListItem.Title>{item.name}</ListItem.Title>
						<ListItem.Subtitle>{item.description}</ListItem.Subtitle>
					</ListItem.Content>
				</ListItem>
			);
		}

		if(this.props.dishes.isLoading){
			return(<Loading />);
		}
		else if(this.props.dishes.errMess){
			return(
				<View><Text>{this.props.dishes.errMess}</Text></View>
			);
		}
		else{
			return(
				<FlatList
					data={this.props.dishes.dishes.filter((dish) => this.props.favorites.some(el => el === dish.id))}
					renderItem={renderMenuItem}
					keyExtractor={item => item.id.toString()}
					/>
			);
		}
	}
}

export default connect(mapStateToProps)(Favorites);