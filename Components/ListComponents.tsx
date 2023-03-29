import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import ComponentsStyles from "../Constants/ComponentsStyles";
import ActionButton from "./ActionButton";
import IconB from 'react-native-vector-icons/MaterialCommunityIcons';
import IconC from 'react-native-vector-icons/Feather';

import { Searchbar } from "react-native-paper";
type CustomPropTypes = {

    HeaderText1?: string;
    HeaderText2?: string;
    HeaderText3?: string;
    description?: string;
    qty?: string;
    BtnText?: string;
    iconName?: string;
    disabled?: boolean;
    isdescription: boolean;
    iscorrecticons: boolean;
    isqtyicons: boolean;
    isActionbutton: boolean;
    onPress?: Function;
    onPressbox?: Function;
    headerstyle?: any;
    textstyle?: any;
    btnstyle?: any;
}

  
    const ListComponents = ({ HeaderText1, HeaderText2,qty, BtnText,iscorrecticons,isActionbutton,isqtyicons, HeaderText3, isdescription, description, iconName, onPress,onPressbox, disabled, headerstyle, btnstyle, textstyle }: CustomPropTypes) => {

    return (
       
            <TouchableOpacity style={styles.hederContainer}  onPress={() => {
                if (onPressbox) onPressbox();
            }}>
            <View style={{ flex: 3 }}>
                <Text style={styles.headertext1Style}>{HeaderText1}</Text>
                {isdescription ? <Text style={styles.headertextDesStyle}>{description}</Text> : null}

                <Text style={styles.headertext2Style}>{HeaderText2}</Text>
                <Text style={styles.headertext2Style}>{HeaderText3}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {iscorrecticons ?  <View>
                    <IconB name="checkbox-marked-circle-outline" size={27} color={ComponentsStyles.COLORS.GREEN} />
                </View>
                : null}
               {isqtyicons ?  <View style={{flexDirection:'row',alignItems:'center',justifyContent: 'center'}}>
                    <Text style={styles.headertextqtyStyle}>{qty}</Text>
                    <IconC name="box" size={27} color={ComponentsStyles.COLORS.GREEN} />
                </View>:null}
               {isActionbutton ? <ActionButton
                    onPress={() => {
                        if (onPress) onPress();
                    }}
                    innerStyle={btnstyle}
                    style={{fontFamily:ComponentsStyles.FONT_FAMILY.SEMI_BOLD,}}
                    title={BtnText}
                /> : <IconB name="checkbox-marked-circle-outline" size={27} color={ComponentsStyles.COLORS.GREEN} />}
                
            </View>
            </TouchableOpacity>
           
       

    );
}
export default ListComponents;

const styles = StyleSheet.create({
    hederContainer: {
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: ComponentsStyles.COLORS.WHITE,
        borderRadius: 10,
        elevation: 5,
        margin: 10,
        flexDirection: 'row'
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
        fontWeight: '700',
        marginLeft: 5,
        marginTop: 5,
    },
    headertextDesStyle: {
        fontSize: 15,
        color: ComponentsStyles.COLORS.ICON_BLUE,
        marginLeft: 5,
        marginTop: 10,
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD
    },
    headertextqtyStyle: {
        fontSize: 18,
        color: ComponentsStyles.COLORS.SECONDRY,
        marginLeft: 5,
        marginRight:10,
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD
    },
    headertext2Style: {
        fontSize: 15,
        color: ComponentsStyles.COLORS.BLACK,
        marginLeft: 5,
        marginTop: 5,
        fontFamily: ComponentsStyles.FONT_FAMILY.REGULAR
      
    },
    btn: {
        height: 20
    },

});