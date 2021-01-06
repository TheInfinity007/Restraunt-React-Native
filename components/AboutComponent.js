import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { Card, ListItem,Avatar } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';

/* import { LogBox } from 'react-native'
LogBox.ignoreWarnings([
  'VirtualizedLists should never be nested',
]);
*/

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
		<ListItem key={index} bottomDivider>
			<Avatar rounded source={require('./images/alberto.png')} />
			<ListItem.Content>
				<ListItem.Title>{item.name}</ListItem.Title>
				<ListItem.Subtitle>{item.description}</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
}

function RenderLeaders(leaders){
	return(
		<Card>
			<Card.FeaturedTitle  style={{ color: "#000", textAlign: 'center'}}>Corporate Leadership</Card.FeaturedTitle>
			<Card.Divider />
			<FlatList
				data={leaders}
				renderItem={renderLeaderItem}
				keyExtractor={(item) => item.id.toString()}
				/>
		</Card>
	);
}

class About extends Component{

	constructor(props){
		super(props);
		this.state = {
			leaders: LEADERS
		};
	}

	render(){
		return(
			<ScrollView>
				<RenderHistory />
				{RenderLeaders(this.state.leaders)}
			</ScrollView>
		);
	}

}

export default About;