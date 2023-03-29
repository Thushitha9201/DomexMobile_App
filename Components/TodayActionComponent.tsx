import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import ComponentsStyles from "../Constants/ComponentsStyles";
import ActionButton from "./ActionButton";
import IconA from 'react-native-vector-icons/MaterialCommunityIcons';
import { Searchbar } from "react-native-paper";
type CustomPropTypes = {

    HeaderText?: string;
    HeaderText2?: string;
    disabled?: boolean;
    onPress?: Function;
    headerstyle?: any;
    textstyle?: any;
    iconName?: any;
}

const TodayActionComponent = ({ HeaderText, HeaderText2, onPress,iconName, disabled, headerstyle, textstyle }: CustomPropTypes) => {

    return (
        // <View style={{ height: 3,backgroundColor:'red' }}>
            <View style={styles.hederContainer}>
                <View style={styles.subcontainer1}>
                    <Text style={styles.destailsText}>{HeaderText}</Text>
                </View>
                <View style={{ flex: 1 }} >
                    <TouchableOpacity style={styles.subcontainer2} onPress={() => {
                        if (onPress) onPress();
                    }}>
                        <Text style={styles.seeall}>{HeaderText2}</Text>
                        <IconA name={iconName} size={27} color={ComponentsStyles.COLORS.SECONDRY} />
                    </TouchableOpacity>
                </View>
            </View>

        // </View>

    );
}
export default TodayActionComponent;

const styles = StyleSheet.create({
    hederContainer: {
        flexDirection: 'row',marginTop:5,marginBottom:5
    },
    subcontainer1:{
        flex: 1, alignItems: 'flex-start', justifyContent: 'center'
    },
    subcontainer2:{
        flexDirection: 'row', justifyContent: 'flex-end',marginRight:10 , fontFamily:ComponentsStyles.FONT_FAMILY.SEMI_BOLD
    },

    destailsText: {
        color: ComponentsStyles.COLORS.BLACK, marginLeft: 15, fontFamily:ComponentsStyles.FONT_FAMILY.BOLD,fontSize:16,
    },
    seeall:{
         color: ComponentsStyles.COLORS.SECONDRY, marginLeft: 15, marginTop: 3, fontFamily:ComponentsStyles.FONT_FAMILY.BOLD,fontSize:15
    }

});