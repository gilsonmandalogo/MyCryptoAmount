import React from 'react';
import { StyleSheet, ScrollView, Text, TextInput, TouchableNativeFeedback, View } from 'react-native';

export default class ChangeAmountScreen extends React.Component {
  static navigationOptions = {
    title: 'Change amount',
  };

  constructor(props) {
    super(props);

    this.state = { amount: props.amount };    
  };

  add = () => {
    const {goBack} = this.props.navigation;

    goBack();
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scroll}
      >
        <Text style={styles.text} >Amount</Text>
        <TextInput
          placeholder="0"
          onChangeText={amount => this.setState( {amount} )}
          keyboardType="numeric"
          underlineColorAndroid="transparent"
          onSubmitEditing={() => this.add()}
        />

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#00D900')}
          onPress={() => this.add()}
        >
          <View style={styles.button} >
            <Text style={styles.txtButton} >Change amount</Text>
          </View>
        </TouchableNativeFeedback>
      </ScrollView>
    );
  };  
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  scroll: {
    flex: 1,
  },
  button: {
    borderColor: '#00D900',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  txtButton: {
    textAlign: 'center',
    fontSize: 16,
    color: '#003D00',
  },
  text: {
    color: '#003D00',    
  },
});
