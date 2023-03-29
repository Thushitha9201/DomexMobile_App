import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import ComponentsStyles from "../Constants/ComponentsStyles";
import ActionButton from "./ActionButton";
import IconB from 'react-native-vector-icons/Ionicons';

import { Searchbar } from "react-native-paper";
type CustomPropTypes = {

    HeaderText1?: string;
    HeaderText2?: string;
    HeaderText3?: string;
    iconName?: string;
    disabled?: boolean;
    onPressmore?: Function;
    headerstyle?: any;
    textstyle?: any;
}

const DashboardListComponents = ({ HeaderText1, HeaderText2, HeaderText3, iconName,onPressmore, disabled, headerstyle, textstyle }: CustomPropTypes) => {

    return (
        <View style={styles.hederContainer}>
           <View style={{marginLeft:10,marginRight:10,marginTop:5,}}>
               <Text style={{color:ComponentsStyles.COLORS.BLACK,fontSize:16,fontWeight:'700'}}>{HeaderText1}</Text>
           </View>
           <View style={{marginLeft:10,marginRight:10,marginTop:10}}>
               <Text style={{color:ComponentsStyles.COLORS.BLACK,fontSize:16,fontWeight:'700'}}>{HeaderText2}</Text>
           </View>
           <View style={{marginLeft:10,marginRight:10,marginTop:5}}>
               <Text style={{color:ComponentsStyles.COLORS.BLACK,fontSize:16,width:150}}>{HeaderText3}</Text>
           </View>
           <View style={{marginLeft:10,marginRight:10,marginTop:5,alignItems:'flex-end',justifyContent:'flex-end'}}>
               <TouchableOpacity onPress={() => {
                            if (onPressmore) onPressmore();
                        }}>
               <Text style={{color:ComponentsStyles.COLORS.ICON_BLUE,fontSize:16,marginTop:10}}>"More</Text>
               </TouchableOpacity>
               
           </View>
        </View>

    );
}
export default DashboardListComponents;

const styles = StyleSheet.create({
    hederContainer: {
        paddingTop:5,
        paddingBottom:15,
        backgroundColor: ComponentsStyles.COLORS.WHITE,
        borderRadius: 5,
        elevation: 10,
        margin: 10,
    },

    destailsText: {
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        fontWeight: '700',
        color: ComponentsStyles.COLORS.WHITE,
        fontSize: 16,
        fontStyle: 'normal',
    },
    headertext1Style: {
        fontSize: 15,
        color: ComponentsStyles.COLORS.BLACK,
        marginLeft: 5,
        marginTop: 5,
    },
    headertext2Style: {
        fontSize: 15,
        color: ComponentsStyles.COLORS.BLACK,
        marginLeft: 5,
        marginTop: 5,
        fontWeight:'700'
    },
    headertext3Style: {},

});