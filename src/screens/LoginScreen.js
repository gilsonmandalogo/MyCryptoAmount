import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, ScrollView, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'My Crypto Amount',
  };

  constructor(props) {
    super(props);

    this.state = { email: '', password: '' };
  };

  login = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })]
    });

    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scroll}
        centerContent        
      >
        <Text style={styles.text} >E-mail</Text>
        <TextInput
          placeholder="Example@domain.com"
          onChangeText={email => this.setState( {email} )}
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onSubmitEditing={() => this.inputPassword.focus()}
          returnKeyType="next"
          style={styles.text}
          autoCapitalize="none"
        />

        <Text style={styles.text} >Password</Text>
        <TextInput
          onChangeText={password => this.setState( {password} )}
          underlineColorAndroid="transparent"
          onSubmitEditing={() => this.login()}
          secureTextEntry
          ref={inputPassword => this.inputPassword = inputPassword}
          style={[styles.text, {marginBottom: 8} ]}
        />

        <TouchableNativeFeedback        
          background={TouchableNativeFeedback.Ripple('#00D900')}
          onPress={() => this.login()}
          secureTextEntry
        >
          <View style={styles.login} >
            <Text style={styles.txtLogin} >Login</Text>
          </View>
        </TouchableNativeFeedback>
      </ScrollView>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  scroll: {
    flex: 1,
  },
  txtLogin: {
    textAlign: 'center',
    fontSize: 16,
    color: '#003D00',
  },
  login: {
    flex: 1,
    borderColor: '#00D900',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  text: {
    color: '#003D00',
    fontSize: 18,
  },
});
