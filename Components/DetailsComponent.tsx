import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import ComponentsStyles from "../Constants/ComponentsStyles";
import ActionButton from "./ActionButton";
import IconA from 'react-native-vector-icons/Entypo';
import { Searchbar } from "react-native-paper";
type CustomPropTypes = {

    HeaderText?: string;
    DetailsText?: string;
    disabled?: boolean;
    onPress?: Function;
    headerstyle?: any;
    Headertextstyle?: any;
    Detailstextstyle?: any;
    // Id?: any;
    // TrackingID?:;
    // Name?: string;
    // Address?: string;
    // Type?: string;
}

const DetailsComponent = ({ HeaderText, DetailsText, onPress, disabled, headerstyle, Headertextstyle,Detailstextstyle }: CustomPropTypes) => {

    return (
        <View style={[styles.hederContainer,headerstyle]}>
            <Text style={[styles.destailsText,Headertextstyle]}>{HeaderText} :</Text>
            <Text style={[styles.destailsText1,Detailstextstyle]}>{DetailsText}</Text>
        </View>

    );
}

// const DaySummeryReport = ({ Id,TrackingID,Name,Address,Type }: CustomPropTypes) => {

//     return (
//         <View style={[styles.hederContainer,headerstyle]}>
//             <Text style={[styles.destailsText,Headertextstyle]}>{HeaderText} :</Text>
//             <Text style={[styles.destailsText1,Detailstextstyle]}>{DetailsText}</Text>
//         </View>

//     );
// }


export default DetailsComponent;

const styles = StyleSheet.create({
    hederContainer: {
        // flexDirection: 'row',
        alignItems:'flex-start',
        height:60,
        marginTop:5,marginBottom:5 
    },

    destailsText: {
        flex: 1,marginLeft:10,fontSize:16,color:ComponentsStyles.COLORS.BLACK 
    },
    destailsText1: {
        flex: 2,fontSize:16,color:ComponentsStyles.COLORS.BLACK,marginLeft:10,fontWeight:'700'
    },

});