import { Dimensions, StyleSheet } from "react-native";
import ComponentsStyles from "../../../Constants/ComponentsStyles";

let width = Dimensions.get("screen").width;

export default StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
        marginTop: 10,
    },
    selectedbutton: {
        height: 40,
        flex: 1,
        backgroundColor: ComponentsStyles.COLORS.SECONDRY,
        borderRadius: 10,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    defaultbutton: {
        backgroundColor: ComponentsStyles.COLORS.WHITE,
        // borderWidth: 1,
        borderColor: ComponentsStyles.COLORS.SECONDRY,
        borderRadius: 10,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },

    defaultBUTTON_TEXT: {
        color: ComponentsStyles.COLORS.SECONDRY,
        fontFamily:ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 14,
    },

    selectedBUTTON_TEXT: {
        color: ComponentsStyles.COLORS.WHITE,
        fontFamily:ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 14,
    },
    ServiceTicketDetailsScreenIcon: {
        width: 50,
        height: 70,
    },
    customStyletableHeader: {
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
    },
    AttendButton1: {
     fontFamily:ComponentsStyles.FONT_FAMILY.SEMI_BOLD    },
    AttendButton: {
        marginRight: 15,
        marginBottom: 10
    }, Reachedbtn: {
        marginRight: 15,
    },
    issuebtn: {
        marginRight: 15,
        backgroundColor: ComponentsStyles.COLORS.BACKGROUND
    },
    btnStyleComponent: {
        height: 40,
        backgroundColor: ComponentsStyles.COLORS.ICON_BLUE,
        marginRight: 2,
    },

    detailsInputText: {
            borderColor:ComponentsStyles.COLORS.BLACK,
            color:ComponentsStyles.COLORS.BLACK,
            fontFamily:ComponentsStyles.FONT_FAMILY.BOLD,
            borderWidth:1,
    },
    DetilsComponent:{
        alignItems:'center'
    },
    exstyle:{
        fontSize:16,
        color:ComponentsStyles.COLORS.BLACK 
    },
    EmptyMassage: {
        color: ComponentsStyles.COLORS.BLACK,
        marginLeft: 10,
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 16,
        fontStyle: 'normal',
    },

});