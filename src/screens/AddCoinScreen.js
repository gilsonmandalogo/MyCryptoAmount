import React from 'react';
import { StyleSheet, ScrollView, Text, TextInput, TouchableNativeFeedback, View, Picker } from 'react-native';

export default class AddCoinScreen extends React.Component {
  static navigationOptions = {
    title: 'Add coin',
  };

  constructor(props) {
    super(props);

    this.state = { cryptocurrency: 'BTC', amount: '' };    
  };

  add = () => {
    const {goBack} = this.props.navigation;

    goBack();
  };

  renderCryptocurrencies = () => {
    let cryptocurrencies = this.props.navigation.state.params.getCryptocurrencies();
    let render = [];

    cryptocurrencies.map((value, index) => {
      render.push(<Picker.Item key={index} value={value.CoinName} label={value.FullName} />)
    });

    return render;
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scroll}
      >
        <Text>Cryptocurrency</Text>
        <Picker
          selectedValue={this.state.cryptocurrency}
          onValueChange={value => this.setState( {cryptocurrency: value} )}
          mode="dropdown"
        >
          {this.renderCryptocurrencies()}
        </Picker>

        <Text>Amount</Text>
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
            <Text style={styles.txtButton} >Add</Text>
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
});
