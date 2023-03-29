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
}

const CheckButton = ({ HeaderText, onPress, disabled, headerstyle, textstyle }: CustomPropTypes) => {

    return (
        <TouchableOpacity onPress={() => {
            if (onPress) onPress();
        }}
            style={[styles.hederContainer, headerstyle]}>

            <View>
                <Text style={[styles.destailsText, textstyle]}>{HeaderText}</Text>
            </View>
        </TouchableOpacity>

    );
}
export default CheckButton;

const styles = StyleSheet.create({
    hederContainer: {
        height: 50,
        flex: 1,
        backgroundColor: ComponentsStyles.COLORS.SECONDRY,
        borderRadius: 10,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    destailsText: {
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        fontWeight: '700',
        color: ComponentsStyles.COLORS.WHITE,
        fontSize: 16,
        fontStyle: 'normal',
    },

});