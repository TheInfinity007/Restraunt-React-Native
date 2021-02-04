import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { deleteFavorite } from '../redux/ActionCreators';
import Swipeout from 'react-native-swipeout';

const mapStateToProps = state => {
	return{
		dishes: state.dishes,
		favorites: state.favorites
	}
}

const mapDispatchToProps = dispatch => ({
	deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
});

class Favorites extends Component{

	render(){

		const { navigate } = this.props.navigation;

		const renderMenuItem = ({ item, index }) =>{
			const rightButton = [
				{
					text: 'Delete',
					type: 'delete',
					onPress: () => {
						Alert.alert(
							'Delete Favorite?',
							'Are you sure you wish to delete the favorite dish ' + item.name + ' ?',
							[
								{
									text: 'Cancel', 
									onPress: () => console.log(item.name + ' Not Deleted'),
									style: ' cancel'
								},
								{
									text: 'OK',
									onPress: () => this.props.deleteFavorite(item.id),
									style: 'Ok'
								}
							],
							{ cancelable: false }
						)
					}

					
				}
			];
			return(
				<Swipeout right={rightButton} autoClose={true}>
					<ListItem key={index} onPress={() =>  navigate('Dishdetail', { dishId: item.id })}>
						<Avatar rounded source={{uri: baseUrl + item.image }} />
						<ListItem.Content>
							<ListItem.Title>{item.name}</ListItem.Title>
							<ListItem.Subtitle>{item.description}</ListItem.Subtitle>
						</ListItem.Content>
					</ListItem>
				</Swipeout>				
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


const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);