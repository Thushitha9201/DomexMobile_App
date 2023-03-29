import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import ComponentsStyles from "../Constants/ComponentsStyles";
import ActionButton from "./ActionButton";
import IconA from 'react-native-vector-icons/Entypo';
import { Searchbar } from "react-native-paper";
import IconB from 'react-native-vector-icons/AntDesign';
type CustomPropTypes = {

    Title?: string;
    disabled?: boolean;
    onPress?: Function;
    headerstyle?: any;
    textstyle?: any;
    IconName:any;
}

const ProfileComponent = ({ Title,IconName,onPress, disabled, headerstyle, textstyle }: CustomPropTypes) => {

    return (
        <TouchableOpacity onPress={() => {
            if (onPress) onPress();
        }}>

            <View style={{ height: 50, marginTop: 10, backgroundColor: ComponentsStyles.COLORS.WHITE,elevation:10, marginLeft: 5, marginRight: 5, borderRadius: 10, flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <IconB name={IconName} size={37} color={ComponentsStyles.COLORS.BLACK} />
                </View>
                <View style={{ flex: 2, alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, color: ComponentsStyles.COLORS.BLACK, fontWeight: '500' }}>{Title}</Text>
                </View>

            </View>
        </TouchableOpacity>

    );
}
export default ProfileComponent;

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