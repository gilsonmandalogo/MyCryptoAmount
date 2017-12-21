import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableNativeFeedback } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'My Crypto Amount',
  };

  constructor(props) {
    super(props);

    this.cryptocurrencies = [];
  }

  getCryptocurrencies = () => {
    return this.cryptocurrencies;
  };

  render() {
    return (
      <FlatList
        data={ [
          {key: 1, currency: 'BRL', amount: 1270.88},
          {key: 2, currency: 'BTC', amount: 0.02015900},
          {key: 3, currency: 'USD', amount: 385.77},
          {key: 4, currency: 'IOTA', amount: 50, isCryptocurrency: true},
          {key: 5, addButton: true},
        ] }
        renderItem={item => <CryptoItem data={item} navigation={this.props.navigation} getCryptocurrencies={this.getCryptocurrencies} />}
        ListHeaderComponent={<View style={styles.header} />}
        ListFooterComponent={<View style={styles.footer} />}
        ItemSeparatorComponent={() => <View style={styles.separetor} />}
        contentContainerStyle={styles.list}
      />
    );
  };

  componentDidMount() {
    fetch({ url: 'https://min-api.cryptocompare.com/data/all/coinlist' })
    .then(response => {
      if (response.status === 200) {
        response.json()
        .then(value => {          
          this.cryptocurrencies = Object.values(value.Data);
        });
      };
    });
  };
};

class CryptoItem extends React.PureComponent {
  render() {
    const { navigate } = this.props.navigation;
    const { item } = this.props.data;

    if (item.addButton === true) {
      return (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#00D900')}
          onPress={() => navigate('AddCoinScreen', { getCryptocurrencies: this.props.getCryptocurrencies })}
        >
          <View style={styles.container} >
            <Text style={styles.txtTitle} >Add coin</Text>
            <Image
              source={require('../../imgs/plus.png')}
              style={styles.image}
              resizeMode="stretch"              
            />
          </View>
        </TouchableNativeFeedback>
      );
    } if (item.isCryptocurrency === true) {
      return (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#00D900')}
          onPress={() => navigate('ChangeAmountScreen', { amount: item.amount })}
        >
          <View style={styles.container} >
            <Text style={styles.txtTitle} >{item.currency}</Text>
            <Text style={styles.txtAmount} >{item.amount}</Text>
          </View>
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <View style={styles.container} >
          <Text style={styles.txtTitle} >Total {item.currency}</Text>
          <Text style={styles.txtAmount} >{item.amount}</Text>
        </View>
      );
    };
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: '#00D900',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  header: {
    marginTop: 8,
  },
  footer: {
    marginBottom: 8,
  },
  list: {
    marginHorizontal: 8,
  },
  separetor: {
    marginVertical: 4,
  },
  txtTitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#003D00',
  },
  txtAmount: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003D00',
  },
  image: {
    alignSelf: 'center',
    height: 50,
    width: 50,
    marginTop: 8,
  },
});