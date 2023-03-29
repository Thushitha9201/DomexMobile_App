import { Dimensions, StyleSheet } from "react-native";
import ComponentsStyles from "../../../Constants/ComponentsStyles";

let width = Dimensions.get("screen").width;

export default StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
        marginTop:10,
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
        fontSize: 14,
    },

    selectedBUTTON_TEXT: {
        color: ComponentsStyles.COLORS.WHITE,
        fontSize: 14,
    },
    ServiceTicketDetailsScreenIcon:{
        width: 50,
        height: 70,
    },
    customStyletableHeader:{
        marginTop:5,
        marginLeft:5,
        marginRight:5,
    },
    AttendButton:{
        marginRight:15,
        marginBottom:10
    },
    Reachedbtn:{
        marginRight:15,
    },
    btnStyleComponent:{
        height:40,
        backgroundColor:ComponentsStyles.COLORS.ICON_BLUE,
        marginRight:2,
    },
    // bottomheadertext: {
    //     fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
    //     fontSize:20,
    //     textAlign: 'center',
    // },
    // bottomheaderMeetervalue: {
    //     fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
    //     fontSize:30,
    //     color:ComponentsStyles.COLORS.ICON_BLUE
    // },
    // bottomheaderMeeterlocation: {
    //     fontFamily: ComponentsStyles.FONT_FAMILY.REGULAR,
    //     fontSize:16,
    //     color:ComponentsStyles.COLORS.BLACK
    // },
    // bottomheaderMeeterimage: {
    //     fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
    //     fontSize:20,
    //     marginLeft:10,
    //     color:ComponentsStyles.COLORS.ICON_BLUE
    // },
    // bottomheaderMeeterlocationAdd: {
    //     fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
    //     marginLeft:10,
    //     fontSize:16,
    //     color:ComponentsStyles.COLORS.BLACK
    // },
    textinput: {
        height: 50,
        textAlign: 'center',
        backgroundColor: ComponentsStyles.COLORS.WHITE,
        // elevation: 5,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 22,
    },
    actionbuttonBottom:{
        marginBottom:70,
        marginRight:20,
    },
    ButtonStyle:{
        marginRight:15,
        height:60,
        borderRadius:10
    },

    EmptyMassage: {
        color: ComponentsStyles.COLORS.BLACK,
        marginLeft: 10,
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 16,
        fontStyle: 'normal',
    },
    //New styles
    bottomheadertext: {
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        fontSize:20,
        textAlign: 'center',
    },
    bottomheaderMeetervalue: {
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        fontSize:18,
        color:ComponentsStyles.COLORS.ICON_BLUE
    },
    bottomheaderMeeterlocation: {
        fontFamily: ComponentsStyles.FONT_FAMILY.REGULAR,
        fontSize:16,
        color:ComponentsStyles.COLORS.BLACK
    },
    bottomheaderMeeterimage: {
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize:20,
        marginLeft:10,
        color:ComponentsStyles.COLORS.ICON_BLUE
    },
    bottomheaderMeeterlocationAdd: {
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        marginLeft:10,
        fontSize:16,
        color:ComponentsStyles.COLORS.BLACK
    },
    inputTextStyle: {
        borderWidth: 0,
        paddingLeft: 0,
        marginLeft: 0,
        width: '100%',
        fontSize: 20,
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        color: ComponentsStyles.COLORS.HEADER_BLACK,
        borderBottomWidth: 0.5,
        borderColor: ComponentsStyles.COLORS.HEADER_BLACK,
        borderStyle: 'dashed',
        textAlign: 'center',
        margin: 5,
        borderRadius: 0,
    },
    
});