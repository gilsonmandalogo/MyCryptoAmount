import { StackNavigator } from "react-navigation";
import HomeScreen from "./src/screens/HomeScreen";

export default App = StackNavigator({
  Home: { screen: HomeScreen },
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#047604',
      paddingTop: 8,
    },
    headerTitleStyle: {
      color: 'white',
    },    
  },
});
