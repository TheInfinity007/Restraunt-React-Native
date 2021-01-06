import React, { Component } from 'react';
import { Card, ListItem } from 'react-native-elements';
import { View, Text } from 'react-native';

class Contact extends Component{

	render(){
		return(
			<Card>
				<Card.FeaturedTitle style={{ color: "#000", textAlign: 'center'}}>Contact Information</Card.FeaturedTitle>
				<Card.Divider />
				<ListItem>
					<ListItem.Content>
						<ListItem.Title>121, Clear Water Bay Road</ListItem.Title>
					</ListItem.Content>
				</ListItem>				
				<ListItem>
					<ListItem.Content>
						<ListItem.Title>Clear Water Bay, Kowloon</ListItem.Title>
					</ListItem.Content>
				</ListItem>		
				<ListItem>
					<ListItem.Content>
						<ListItem.Title>HONG KONGTel: +852 1234 5678</ListItem.Title>
					</ListItem.Content>
				</ListItem>		
				<ListItem>
					<ListItem.Content>
						<ListItem.Title>Fax: +852 8765 4321</ListItem.Title>
					</ListItem.Content>
				</ListItem>			
				<ListItem>
					<ListItem.Content>
						<ListItem.Title>Email:confusion@food.net</ListItem.Title>
					</ListItem.Content>
				</ListItem>
			</Card>
		);
	}

}

export default Contact;