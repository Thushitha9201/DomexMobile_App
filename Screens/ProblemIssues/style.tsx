import { Dimensions, StyleSheet } from "react-native";
import ComponentsStyles from "../../Constants/ComponentsStyles";
import { getStatusBarHeight } from 'react-native-status-bar-height';
let width = Dimensions.get("screen").width;

export default StyleSheet.create({
    inputtext:{
        borderColor:'black',
        borderWidth:1,
        height:90,margin:5,

    },
    actionbtn:{
        marginRight:15,marginBottom:90,
    }
   
});