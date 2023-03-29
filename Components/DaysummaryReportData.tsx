import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import ComponentsStyles from "../Constants/ComponentsStyles";
import ActionButton from "./ActionButton";
import IconA from 'react-native-vector-icons/MaterialCommunityIcons';
import { Searchbar } from "react-native-paper";
type CustomPropTypes = {
    HeaderText3?:string;
    HeaderText4?:string;

}



const DaysummaryReportData = ({ HeaderText3,HeaderText4 }: CustomPropTypes) => {

    return (
        <View style={{ flexDirection: 'row', height: 30 }}>
            <View style={{ marginTop: 2,marginLeft:5 }}>
                <Text style={styles.fontstyle3}>{HeaderText3}</Text>
            </View>
            <View style={{ marginTop: 2 }}>
                <Text style={styles.fontstyle4}>{HeaderText4}</Text>
            </View>
        </View>

    );
}
export default DaysummaryReportData;

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

   
    fontstyle3: {
        color: ComponentsStyles.COLORS.BLACK, fontSize: 12,marginLeft: 5,marginRight:5,alignItems: 'center', justifyContent: 'center',
        fontWeight: '600',
    },
    fontstyle4: {
        color: ComponentsStyles.COLORS.BLACK, fontSize: 12, marginLeft: 5,alignItems: 'center', justifyContent: 'center',
        fontWeight: '600',
    }


});