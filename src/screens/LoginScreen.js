import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, ScrollView, TextInput, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import firebase from 'firebase';
import initializeFirebase from '../initializeFirebase';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'My Crypto Amount',
  };

  constructor(props) {
    super(props);

    this.state = { email: '', password: '' };
  };

  goHome = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })]
    });

    this.props.navigation.dispatch(resetAction);
  };

  login = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      if (firebase.auth().currentUser.emailVerified) {
        this.goHome();
      } else {
        Alert.alert('', 'Please verify your email address, check your mailbox');
      };
    })
    .catch(error => {
      Alert.alert('', error.message);
    });
  };

  createAccount = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      firebase.auth().onAuthStateChanged(user => {
        user.sendEmailVerification();
        Alert.alert('', 'You have received an email with the activation link');
      });
    })
    .catch(error => {
      Alert.alert('', error.message);
    });
  };

  forgotPassword = () => {
    firebase.auth().sendPasswordResetEmail(this.state.email)
    .then(() => {
      Alert.alert('', 'You have received an email with the reset link');
    })
    .catch(error => {
      Alert.alert('', error.message);
    });
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scroll}
        centerContent        
      >
        <Text style={styles.text} >Email</Text>
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
        >
          <View style={styles.buttons} >
            <Text style={styles.txtButtons} >Login</Text>
          </View>
        </TouchableNativeFeedback>

        <View style={styles.space} />

        <TouchableNativeFeedback        
          background={TouchableNativeFeedback.Ripple('#00D900')}
          onPress={() => this.createAccount()}
        >
          <View style={styles.buttons} >
            <Text style={styles.txtButtons} >Create account</Text>
          </View>
        </TouchableNativeFeedback>

        <View style={styles.space} />

        <TouchableNativeFeedback        
          background={TouchableNativeFeedback.Ripple('#00D900')}
          onPress={() => this.forgotPassword()}
        >
          <View style={styles.buttons} >
            <Text style={styles.txtButtons} >Forgot password</Text>
          </View>
        </TouchableNativeFeedback>
      </ScrollView>
    );
  };

  componentDidMount() {
    //This code haven't committed to github to protect the database access, anyway, here comes the default firebase.initializeApp from the firebase docs
    initializeFirebase();
  };
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  scroll: {
    flex: 1,
  },
  txtButtons: {
    textAlign: 'center',
    fontSize: 16,
    color: '#003D00',
  },
  buttons: {
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
  space: {
    marginBottom: 8,
  },
});
