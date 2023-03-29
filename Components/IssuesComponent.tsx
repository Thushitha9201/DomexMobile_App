import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import ComponentsStyles from "../Constants/ComponentsStyles";
import ActionButton from "./ActionButton";
import IconA from 'react-native-vector-icons/Entypo';
import { Searchbar } from "react-native-paper";
type CustomPropTypes = {

    HeaderText?: string;
    disabled?: boolean;
    onPress?: Function;
    headerstyle?: any;
    textstyle?: any;
    isSelected?:boolean;
    selectItemID?: string;
    pickReasonID?: string;
}

const IssuesComponent = ({ HeaderText, onPress, disabled, headerstyle, textstyle,selectItemID,pickReasonID }: CustomPropTypes) => {

    return (
        <TouchableOpacity onPress={() => {
            if (onPress) onPress();
        }}
            style={[styles.hederContainer, headerstyle]}>
             <Text style={[styles.destailsText,textstyle]}>{HeaderText}</Text>
        </TouchableOpacity>
       
    );
}
export default IssuesComponent;

const styles = StyleSheet.create({
    hederContainer: {
        height: 60, 
        backgroundColor: ComponentsStyles.COLORS.PRIMARY, 
        margin: 5, 
        alignItems: 'center', 
        justifyContent: 'center',
         borderRadius: 10
    },

    hederSubContainer: {
        height: 60, 
        backgroundColor: ComponentsStyles.COLORS.DARK_GRAY, 
        margin: 5, 
        alignItems: 'center', 
        justifyContent: 'center',
         borderRadius: 10
    },
    //

    destailsText: {
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        fontWeight: '700',
        color: ComponentsStyles.COLORS.BLACK,
        fontSize: 15,
        fontStyle: 'normal',
    },

});