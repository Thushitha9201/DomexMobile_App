import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import ComponentsStyles from "../Constants/ComponentsStyles";
import ActionButton from "./ActionButton";
import IconA from 'react-native-vector-icons/MaterialCommunityIcons';
import { Searchbar } from "react-native-paper";
type CustomPropTypes = {

    HeaderText?: string;
    IconName?: string;
    plaseorderText?: string;
    onChangeSearch?: string;
    searchQuery?: string;
    Is_Search?: boolean;
    Is_subtext?: boolean;
    onPress?: Function;
    onChangeText?: Function;
    is_Button?: boolean;
    is_menu?: boolean;
    hedaerstyle?: any;
    backstyle?: any;
}

const Dashboradicon = ({ HeaderText, onPress, Is_Search, onChangeSearch, onChangeText, searchQuery, backstyle, is_menu, plaseorderText, Is_subtext, IconName, hedaerstyle }: CustomPropTypes) => {
    const changeonchangesearch = onChangeText?.bind(this);
    return (
        <View>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
            if (onPress) onPress();
        }}>
                <View style={styles.hederContainer}>
                    <View style={{ height: 70, width: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: ComponentsStyles.COLORS.BACKGROUND }}>
                        <IconA name={IconName} size={45} color={ComponentsStyles.COLORS.WHITE} />
                    </View>
                </View>
                <View style={{ height: 40, width: 100, alignItems: 'center', justifyContent: 'center',marginTop:5 }}>
                    <Text style={styles.fontstyle}>{HeaderText}</Text>
                </View>
            </TouchableOpacity>

        </View>

    );
}
export default Dashboradicon;

const styles = StyleSheet.create({
    hederContainer: {
        height: 90,
        width: 90,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 8,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        backgroundColor: ComponentsStyles.COLORS.WHITE


    },

    fontstyle: {
        color: ComponentsStyles.COLORS.BLACK, fontSize: 15,
        alignItems: 'flex-start', justifyContent: 'flex-start',fontFamily:ComponentsStyles.FONT_FAMILY.SEMI_BOLD
    }

});