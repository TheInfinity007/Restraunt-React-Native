import React, { Component }from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

function Menu(props){

	const renderMenuItem = ({item, index}) => {
		return (
			<ListItem bottomDivider key={index}>
				<Avatar source={{ uri: 'https://logomesta.com/wp-content/uploads/2018/05/Royal-Food-Logo.png' }} />
				<ListItem.Content>
					<ListItem.Title>{item.name}</ListItem.Title>
					<ListItem.Subtitle>{item.description}</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>

		);
	}

	return(
		<FlatList 
			data={props.dishes}
			renderItem={renderMenuItem}
			keyExtractor={item => item.id.toString()}
			/>
	);
}

export default Menu;