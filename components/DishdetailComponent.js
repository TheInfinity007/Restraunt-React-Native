import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';

function RenderDish(props){
	const dish = props.dish;

	if(dish != null){
		return (
			<Card>
				<Card.Image source={require('./images/uthappizza.png')} style={{alignItems:"center", justifyContent:"center"}}>
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

	constructor(props){
		super(props);
		this.state = {
			dishes: DISHES,
			comments: COMMENTS,
			favorites: []
		};
	}

	markFavorite(dishId){
		this.setState({ favorites: this.state.favorites.concat(dishId)});
	}

	render(){
		const { dishId } = this.props.route.params;

		return (
			<ScrollView>
				<RenderDish dish={this.state.dishes[+dishId]}
					favorite={this.state.favorites.some((el => el === dishId))}
					onPress={() => this.markFavorite(dishId)}
					/>
				<RenderComments comments={this.state.comments.filter((comment) => comment.dishId == dishId)} />
			</ScrollView>
		);
	}
}

export default Dishdetail;