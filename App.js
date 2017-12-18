import { StackNavigator } from "react-navigation";
import HomeScreen from "./src/screens/HomeScreen";
import AddCoinScreen from "./src/screens/AddCoinScreen";

export default App = StackNavigator({
  Home: { screen: HomeScreen },
  AddCoinScreen: { screen: AddCoinScreen },
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
