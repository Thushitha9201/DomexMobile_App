/**
* @author Gagana Lakruwan
*/
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import ComponentsStyles from "../Constants/ComponentsStyles";
import ActionButton from "./ActionButton";

type ParamTypes = {
    ticketNo: string;
    name?: string;
    address?: string;
    nameAddress: boolean,
    isIcon: boolean,
    onPressIcon: Function,
    headerType: string,

    
}

const ListBox = ({ ticketNo, nameAddress,  name, address, isIcon,  onPressIcon,  headerType }: ParamTypes) => {
    return (
        <View style={[styles.container]}>
            <View style={{ backgroundColor: 'white', flex: 4, justifyContent: "center" }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{headerType}</Text>
                    <Text style={styles.headerText}>{ticketNo}</Text>
                </View>

                
               
               
                {nameAddress ?

                    <View style={{ marginTop: 5, }}>
                        <Text style={styles.customerText}>{name}</Text>
                        <Text style={styles.customerText}>{address}</Text>
                    </View>
                    : <></>

                }

            </View>
            {
                isIcon ?
                    <TouchableOpacity style={styles.iconView} onPress={onPressIcon}>
                        <IconMC name='login' size={35} color={ComponentsStyles.COLORS.SECONDRY} iconStyle={styles.iconStyle} />
                    </TouchableOpacity>
                    : <></>
            }
    
           
        </View >
    );
}
export default ListBox;


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        shadowColor: "#000",
        padding: 7,
        flexDirection: 'row',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        borderRadius:8,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    header: {
        flexDirection: 'row'
    },
    headerText: {
        color: ComponentsStyles.COLORS.SERVISE_HEADER_ASH,
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 14
    },
    subHeaderText: {
        color: ComponentsStyles.COLORS.SERVISE_HEADER_ASH,
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 11
    },
    iconStyle: {
        width: 50,
        height: 70,
    },
    statusH: {
        width: 40,
        bottom: 0,
        backgroundColor: ComponentsStyles.COLORS.HIGH_BUTTON_RED,
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
    },
    statusM: {
        width: 70,
        bottom: 1,
        backgroundColor: ComponentsStyles.COLORS.MEDIUM_BUTTON_YELLOW,
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
    },
    statusL: {
        width: 40,
        bottom: 1,
        backgroundColor: ComponentsStyles.COLORS.LOW_BUTTON_GREEN,
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
    },
    customerText: {
        fontFamily: ComponentsStyles.FONT_FAMILY.REGULAR,
        color: ComponentsStyles.COLORS.SERVICE_DETAILS_BLACK,
        fontSize: 14,
    },
    statusText: {
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 10,
        color: 'white',
        alignSelf: 'center'
    },
    iconView: {
        backgroundColor: 'white',
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnView: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ticketName: {
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 10,
        color: ComponentsStyles.COLORS.HEADER_BLACK
    },
    dateText: {
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 12,
        color: ComponentsStyles.COLORS.HEADER_BLACK
    },
    txtValue: {
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 12,
        color: ComponentsStyles.COLORS.TICKET_HEADER_ASH
    }
});