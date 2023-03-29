import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import ComponentsStyles from "../Constants/ComponentsStyles";
import ActionButton from "./ActionButton";
import IconA from 'react-native-vector-icons/Entypo';
import { Searchbar } from "react-native-paper";
import CheckButton from "./CheckButton";
type CustomPropTypes = {

    HeaderText?: string;
    disabled?: boolean;
    YesPress?: Function;
    NoPress?: Function;
    headerstyle?: any;
    textstyle?: any;
}

const RBSheetConfirmComponent = ({ YesPress,NoPress,HeaderText,textstyle }: CustomPropTypes) => {

    return (
        <View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[styles.destailsText,textstyle]}>{HeaderText}</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 20, margin: 10, }}>
                <CheckButton
                    HeaderText="No"
                    onPress={() => {
                        if (NoPress) NoPress();
                    }}
                />
                <CheckButton
                    HeaderText="Yes"
                    onPress={() => {
                        if (YesPress) YesPress();
                    }}
                    headerstyle={styles.RByesbtn}
                />
            </View>
        </View> 

    );
}
export default RBSheetConfirmComponent;

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
        color: ComponentsStyles.COLORS.SECONDRY,
        fontSize: 35,
        fontStyle: 'normal',
    },
    RByesbtn:{
        backgroundColor:'green'
    }

});