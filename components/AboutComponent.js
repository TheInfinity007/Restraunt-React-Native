import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
]);


const mapStateToProps = (state) => {
	return{
		leaders: state.leaders
	}
}


function RenderHistory(){
	return(
		<Card>
			<Card.FeaturedTitle  style={{ color: "#000", textAlign: 'center'}}>Our History</Card.FeaturedTitle>
			<Card.Divider />
				<Text style={{ marginBottom: 20 }}>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</Text>
				<Text>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
		</Card>
	);
}

const renderLeaderItem = ({ item, index }) => {
	return(
		<ListItem key={index} bottomDivider subtitleProps={{numberOfLines: 5}} >
			<Avatar rounded source={{uri: baseUrl + item.image }} />
			<ListItem.Content>
				<ListItem.Title>{item.name}</ListItem.Title>
				<ListItem.Subtitle  >{item.description}</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
}


class About extends Component{

	render(){

		if(this.props.leaders.isLoading){
			return(
				<ScrollView>
					<RenderHistory />
					<Card>
						<Card.FeaturedTitle  style={{ color: "#000", textAlign: 'center'}}>Corporate Leadership</Card.FeaturedTitle>
						<Card.Divider />
						<Loading />
					</Card>
				</ScrollView>
			);	
		}
		else if(this.props.leaders.errMess){
			return(
				<ScrollView>
					<RenderHistory />
					<Card>
						<Card.FeaturedTitle  style={{ color: "#000", textAlign: 'center'}}>Corporate Leadership</Card.FeaturedTitle>
						<Card.Divider />
						<Text>{this.props.leaders.errMess}</Text>
					</Card>
				</ScrollView>
			);	
		}
		else{
			return(
				<ScrollView>
					<RenderHistory />
					<Card>
						<Card.FeaturedTitle  style={{ color: "#000", textAlign: 'center'}}>Corporate Leadership</Card.FeaturedTitle>
						<Card.Divider />
						<FlatList
							data={this.props.leaders.leaders}
							renderItem={renderLeaderItem}
							keyExtractor={(item) => item.id.toString()}
							/>
					</Card>
				</ScrollView>
			);
		}
	}
}

export default connect(mapStateToProps)(About);