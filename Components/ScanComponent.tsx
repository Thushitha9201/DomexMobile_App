import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import ComponentsStyles from "../Constants/ComponentsStyles";
import ActionButton from "./ActionButton";
import { Searchbar } from "react-native-paper";

import IconB from 'react-native-vector-icons/Octicons';
import IconA from 'react-native-vector-icons/MaterialIcons';
type CustomPropTypes = {

    FirstIcon?: string;
    Textview?: string;
    disabled?: boolean;
    onPress?: Function;
    headerstyle?: any;
    textstyle?: any;
}

const ScanComponent = ({ FirstIcon,Textview, onPress, disabled, headerstyle, textstyle }: CustomPropTypes) => {

    return (
        <View style={{ height: 50, flexDirection: 'row', backgroundColor: ComponentsStyles.COLORS.WHITE, elevation: 10, margin: 10, borderRadius: 5 }}>
            <View style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center' }}>
                <IconB name={FirstIcon} size={25} color={ComponentsStyles.COLORS.SECONDRY} />
            </View>
            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-start' }}>
                <Text style={{ color: ComponentsStyles.COLORS.SECONDRY, fontSize: 18, fontFamily: ComponentsStyles.FONT_FAMILY.BOLD, marginLeft: 10 }}>{Textview}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/* <IconA name="delete" size={25} color={ComponentsStyles.COLORS.ICON_BLUE} /> */}
            </View>
        </View>

    );
}
export default ScanComponent;

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