/**
* @author Gagana Lakruwan
*/
import React from "react";
import { 
  View,
  Text,
  StyleSheet
} from "react-native";
import RootNavigator from "./Navigation/RootNavigator";

const App = () => {
    return (
      <RootNavigator/>
    );
}
export default App;


const styles = StyleSheet.create({
  container: {}
});