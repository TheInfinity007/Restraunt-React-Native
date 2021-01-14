import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

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
	postFavorite: (dishId) => dispatch(postFavorite(dishId)),
	postComment: (dishId, rating, comment, author) => dispatch(postComment(dishId, rating, comment, author))	
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
				<View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
					<Icon raised reverse name={ props.favorite ? 'heart' : 'heart-o' } type='font-awesome' color='#f50' onPress={()=> props.favorite ? console.log('Already favorite'): props.onPress()}/> 
					<Icon raised reverse name='pencil' type='font-awesome' color='#512da8' onPress={()=> props.toggleModal()}/> 
				</View>
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
			showModal: false,
			rating: 5,
			author:'',
			comment: ''
		}
	}

	markFavorite(dishId){
		this.props.postFavorite(dishId);
	}

	toggleModal(){
		this.setState({ showModal: !this.state.showModal });
	}

	handleComment(){
		this.props.postComment(this.props.route.params.dishId, this.state.rating, this.state.comment, this.state.author);
		this.toggleModal();
	}

	render(){
		const { dishId } = this.props.route.params;

		return (
			<ScrollView>
				<RenderDish dish={this.props.dishes.dishes[+dishId]}
					favorite={this.props.favorites.some(el => el === dishId)}
					onPress={() => this.markFavorite(dishId)}
					toggleModal={() => this.toggleModal()}
					/>
				<RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId == dishId)} />
				<Modal animationType="slide"
					transparent={false}
					visible={this.state.showModal}
					onDismiss={() => { this.toggleModal() }}
					onRequestClose={() => {this.toggleModal() }}					
				>
					<View>
						<Rating type='star' showRating ratingCount={5} startingValue={this.state.rating} onFinishRating={(value) => this.setState({rating: value})} />
						<Input placeholder="Author" leftIcon={{type: 'font-awesome', name: 'user-o'}}
							onChangeText={(value) => this.setState({ author: value })}
						/>
						<Input placeholder="Comment" leftIcon={{type: 'font-awesome', name: 'comment-o'}}
							onChangeText={(value) => this.setState({ comment: value })}
						/>
						<Button title="Submit" color="#512da8" onPress={() => this.handleComment() }/>
						<View style={{marginTop: 30}}>
							<Button title="Cancel" color="gray" onPress={() => this.toggleModal() } />
						</View>
					</View>
				</Modal>
			</ScrollView>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);