import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import ComponentsStyles from "../Constants/ComponentsStyles";
import ActionButton from "./ActionButton";
import IconA from 'react-native-vector-icons/MaterialCommunityIcons';
import { Searchbar } from "react-native-paper";
type CustomPropTypes = {

    HeaderText?: string;
    HeaderText2?: string;
  

}

const DashboradsummaryData = ({ HeaderText,HeaderText2 }: CustomPropTypes) => {

    return (
        <View style={{ flexDirection: 'row', height: 30 }}>
            <View style={{ flex: 1, alignItems: 'flex-start', marginTop: 5 }}>
                <Text style={styles.fontstyle}>{HeaderText}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', marginTop: 5 }}>
                <Text style={styles.fontstyle2}>{HeaderText2}</Text>
            </View>
        </View>

    );
}
export default DashboradsummaryData;

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
        fontFamily:ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        alignItems: 'flex-start', justifyContent: 'flex-start',marginLeft:10,
    } ,
    fontstyle2: {
        color: ComponentsStyles.COLORS.BLACK, fontSize: 15,
        fontFamily:ComponentsStyles.FONT_FAMILY.REGULAR,
        alignItems: 'flex-start', justifyContent: 'flex-start',marginRight:10
    },


});