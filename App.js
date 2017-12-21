import { StackNavigator } from "react-navigation";
import HomeScreen from "./src/screens/HomeScreen";
import AddCoinScreen from "./src/screens/AddCoinScreen";
import ChangeAmountScreen from "./src/screens/ChangeAmountScreen";
import LoginScreen from "./src/screens/LoginScreen";

export default App = StackNavigator({
  LoginScreen: { screen: LoginScreen },
  HomeScreen: { screen: HomeScreen },
  AddCoinScreen: { screen: AddCoinScreen },
  ChangeAmountScreen: { screen: ChangeAmountScreen },
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#047604',
      paddingTop: 8,
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerTintColor: 'white',
    headerPressColorAndroid: '#00D900',
  },  
});
