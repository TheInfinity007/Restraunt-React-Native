import React, { Component }from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Tile, Avatar } from 'react-native-elements';
import { Loading } from './LoadingComponent';

const mapStateToProps = (state) => {
	return{
		dishes: state.dishes
	}
}

class Menu extends Component{
	render(){

		const renderMenuItem = ({item, index}) => {
			return (
				<Tile bottomDivider key={index} 
					title={item.name}
					featured
					caption={item.description}
					onPress={() => navigate('Dishdetail', {dishId: item.id })}
					imageSrc={{uri: baseUrl + item.image}}
					/>
			);
		}

		const { navigate } = this.props.navigation;

		if(this.props.dishes.isLoading){
			return(
				<Loading />
			);
		}
		else if(this.props.dishes.errMess){
			return(
				<View><Text>{this.props.dishes.errMess} </Text></View>
			);
		}
		else{
			return(
				<FlatList 
					data={this.props.dishes.dishes}
					renderItem={renderMenuItem}
					keyExtractor={item => item.id.toString()}
					/>
			);
		}
	}
}

export default connect(mapStateToProps)(Menu);