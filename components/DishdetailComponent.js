import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
]);

const mapStateToProps = (state) => {
	return{
		dishes: state.dishes,
		comments: state.comments,
		favorites: state.favorites
	}
}

const mapDispatchToProps = (dispatch) => ({
	postFavorite: (dishId) => dispatch(postFavorite(dishId))
});

function RenderDish(props){
	const dish = props.dish;

	if(dish != null){
		return (
			<Card>
				<Card.Image source={{uri: baseUrl + dish.image}} style={{alignItems:"center", justifyContent:"center"}}>
					<Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>	
				</Card.Image>
				<Text style={{margin: 10}}>	{dish.description}</Text>
				<Icon raised reverse name={ props.favorite ? 'heart' : 'heart-o' } type='font-awesome' color='#f50' onPress={()=> props.favorite ? console.log('Already favorite'): props.onPress()}/> 
			</Card>
		);
	}
	else{
		return(<View></View>);
	}
}

// functional Component
function RenderComments(props){
	const comments = props.comments;
	const renderCommentItem = ({ item, index }) => {
		return(
			<View key={index} style={{margin: 10}}>
				<Text style={{fontSize: 14}}>{item.comment}</Text>
				<Text style={{fontSize: 12}}>{item.rating} Stars</Text>
				<Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
			</View>
		);
	}

	return(
		<Card>
			<Card.Title>Comments</Card.Title>
			<Card.Divider />
			<FlatList
				data={comments}
				renderItem={renderCommentItem}
				keyExtractor={item => item.id.toString()}
				/>
		</Card>
	);
}

class Dishdetail extends Component{

	markFavorite(dishId){
		this.props.postFavorite(dishId);
	}

	render(){
		const { dishId } = this.props.route.params;

		return (
			<ScrollView>
				<RenderDish dish={this.props.dishes.dishes[+dishId]}
					favorite={this.props.favorites.some(el => el === dishId)}
					onPress={() => this.markFavorite(dishId)}
					/>
				<RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId == dishId)} />
			</ScrollView>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);