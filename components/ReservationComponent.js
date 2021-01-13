import React, { Component }from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button} from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';




class Reservation extends Component{
	constructor(props){
		super(props);

		this.state = {
			guests: 1,
			smoking: false,
			date: new Date(),
			mode:'date',
			show: false
		};
	}

	setDate(event, date){
		date = date || this.state.date;
		this.setState({
			show: this.state.mode == 'date'? true: false,
			date: date,
			mode: this.state.mode == 'date' ? 'time':''
		});
	}

	handleReservation(){
		console.log(JSON.stringify(this.state));
		// console.log(this.state.date.toLocaleString());
		this.setState({
			guests: 1,
			smoking: false,
			date: new Date()
		})
	}

	render(){
		return(
			<ScrollView>
				<View style={styles.formRow}>
					<Text style={styles.formLabel}>Number of Guests</Text>
					<Picker style={styles.formItem}
						selectedValue={this.state.guests}
						onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })} >
						<Picker.Item label='1' value='1' />
						<Picker.Item label='2' value='2' />
						<Picker.Item label='3' value='3' />
						<Picker.Item label='4' value='4' />
						<Picker.Item label='5' value='5' />
						<Picker.Item label='6' value='6' />
					</Picker>
				</View>
				<View style={styles.formRow}>
					<Text style={styles.formLabel}>Smoking/Non-Smoking</Text>
					<Switch style={styles.formItem}
						value={this.state.smoking}
						trackColor={{ true: '#825ae1', false: '#825ae1'}}
						thumbColor={this.state.smoking?'#512da8':'#eee'}
						onValueChange={(value) => this.setState({ smoking: value })} >
					</Switch>
				</View>
				<View style={styles.formRow}>
					<Text style={styles.formLabel}>Date and Time</Text>
					<View style={styles.formRow}>
						<Button title={new Date(this.state.date).toDateString() + "\n" +new Date(this.state.date).toLocaleTimeString()} 
							style={styles.formItem}
							onPress={() => {this.setState({mode: 'date', show: true})}}
							/>
						{this.state.show && (
							<DateTimePicker
								value={this.state.date}
								mode={this.state.mode}
								onChange={(event, date) => this.setDate(event, date)}
								/>
						)}
					</View>
				</View>
				<View style={styles.formRow}>
					<Button title='Reserve'
						color='#512da8'
						onPress={() => this.handleReservation()}
						accessibilityLabel='Learn more about this purple button' />
				</View>
			</ScrollView>
		);
	}

}

const styles = StyleSheet.create({
	formRow: {
	alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
		margin: 20
	},
	formLabel: {
		fontSize: 18,
		flex: 2
	},
	formItem: {
		flex: 1
	}
});

export default Reservation;