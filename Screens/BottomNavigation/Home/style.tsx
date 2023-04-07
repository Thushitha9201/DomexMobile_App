import { Platform, StyleSheet } from "react-native";
import ComponentsStyles from "../../../Constants/ComponentsStyles";


export default StyleSheet.create({

    HeaderTextContainer: {
        flexDirection: "column",
        width: "100%",
        height: 80,
        backgroundColor: ComponentsStyles.COLORS.PRIMARY,
    },
    HeaderSubContainer: {
        width: "100%",
        height: 130,
        // backgroundColor: "white",
    },
    ItemContainer: {
        width: "100%",
        height: "90%",
        // paddingTop: (Platform.OS) === 'ios' ? 20 : 0
    },
    Subpanale: {
        backgroundColor: ComponentsStyles.COLORS.WHITE,
        width: "95%",
        marginLeft: 10,
        borderRadius: 6,
        marginTop: 10,
        elevation: 5,
        height: 130,
        flexDirection: "row",
    },
    ImageCONTAINER: {
        marginLeft: 10,
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center"
    }, ImageCONTAINER1: {
        marginLeft: 10,
        marginTop: 5,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    HeaderText: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: ComponentsStyles.COLORS.TEXT_HEADING_BLUE,
        marginLeft: 10,
        marginTop: 10,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    HeaderTextNew: {
        color: 'black',
        fontSize: 13,
        marginLeft: 10,
        fontWeight: '600'
    },
    Subcontainer: {
        width: "100%",
        height: 100,
        borderColor: "white",
    },
    MainContainerItem: {
        justifyContent: 'center',
        flex: 1,
        margin: 10,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0
    },

    GridViewBlockStyle: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: 50,
        borderRadius: 10,
        margin: 5,
        backgroundColor: ComponentsStyles.COLORS.COMPONENTBOX_FILL_BLUE
    },
    GridViewInsideTextItemStyle: {
        color: ComponentsStyles.COLORS.TEXT_HOME_BUTTON_BLUE,
        padding: 10,
        fontSize: 14,
        justifyContent: 'center',
        alignItems: "flex-start"
    },
    Itemlevel1: {
        flexDirection: "row",
        height: 50,
        width: "100%",
        marginTop: 15,
        marginBottom: 10,
    },
    ComponentStyle: {
        width: "50%",
    },
    ComponentStyle1: {
        width: "50%",
        paddingRight: 10,
    },
    scrollView: {
        width: '100%',
        //    backgroundColor:'red',
        height: 20,
    },
    Subcontainerdetails: {
        flex: 1,
    },
    SubcontainerChart: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flex: 0.5,

    },
    headerText: {
        color: ComponentsStyles.COLORS.PRIMARY,
        fontFamily:ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        marginTop: 2,
        marginLeft: 10,
        fontWeight: '700',
        fontSize: 16,
        flex: 1,
        fontStyle: 'normal',

    },
    headerTextcall: {
        color: ComponentsStyles.COLORS.BLACK,
        marginTop: 5,
        marginLeft: 10,
        fontWeight: '800',
        flex: 1,
    },
    Todayvisit: {
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        marginLeft: 10,

    },
    seeall: {
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        marginLeft: 10,
        color: ComponentsStyles.COLORS.BORDERCOLOR,
        marginRight: 10,

    },
    EmptyMassage: {
        color: ComponentsStyles.COLORS.BLACK,
        marginLeft: 10,
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        fontWeight: '700',
        fontSize: 16,
        fontStyle: 'normal',
    },
    progress: {
        marginRight: 10, marginBottom: 5
    },
    flatlist: {
        // height: 40,
        // width:'50%',
        // borderRadius:5,

    },
    customeText: {
        color: ComponentsStyles.COLORS.MAIN,
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontWeight: '600',
        fontStyle: 'normal',
        fontSize: 16,


    },
    button: {
        borderRadius: 5,
        marginRight: 10
    },
    buttonText: {
        fontWeight: '700',
        fontSize: 16,
    },
    bottomheadertext: {
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        fontSize:20,
        textAlign: 'center',
    },
    bottomheaderMeetervalue: {
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        fontSize:30,
        color:ComponentsStyles.COLORS.MEETERCOLOR
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
        color:ComponentsStyles.COLORS.BORDERCOLOR
    },
    bottomheaderMeeterlocationAdd: {
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        marginLeft:10,
        fontSize:16,
        color:ComponentsStyles.COLORS.BLACK
    },
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
        marginRight:20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 30,
        backgroundColor: '#ecf0f1',
        padding: 8,
      },
      spinnerTextStyle: {
        color: '#FFF',
      },
      headermainstyle:{
          marginLeft:10,
          alignItems:'flex-start'
      },
      henuStyle:{
          backgroundColor:ComponentsStyles.COLORS.PRIMARY
      },
      ButtonStyle:{
        marginRight:15,
        height:60,
        borderRadius:10
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

    RByesbtn:{
        backgroundColor:'green'
    },
    RByesbtnNo:{
        // backgroundColor:'red'
        color: ComponentsStyles.COLORS.SECONDRY
    },
    destailsText: {
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        fontWeight: '700',
        //fontSize: 22,
        color: ComponentsStyles.COLORS.SECONDRY,
        fontSize: 35,
        fontStyle: 'normal',
    },
    destailsTextbtn: {
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        fontWeight: '700',
        color: ComponentsStyles.COLORS.WHITE,
        fontSize: 16,
        fontStyle: 'normal',
    },
  
})