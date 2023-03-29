import { Dimensions, StyleSheet } from "react-native";
import ComponentsStyles from "../../Constants/ComponentsStyles";
import { getStatusBarHeight } from 'react-native-status-bar-height';
let width = Dimensions.get("screen").width;

export default StyleSheet.create({
    CONTAINER: {
        backgroundColor: ComponentsStyles.COLORS.WHITE,
        // paddingTop: getStatusBarHeight(true),
        flex: 1,
        paddingBottom:0
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
    },
    inputstyle:{
        height:50,
        marginLeft:10,
        marginRight:10

    },
    headerContainer:{
        height:100,
        backgroundColor:ComponentsStyles.COLORS.WHITE,
        elevation:5,
        margin:10,
        borderRadius:5
    },
    imagecontainer:{
        height: 200, backgroundColor: ComponentsStyles.COLORS.WHITE, margin: 5, borderRadius: 5
    },
    borderStyle:{
        borderColor:ComponentsStyles.COLORS.BACKGROUND
    },
    headerText:{
        color:ComponentsStyles.COLORS.BACKGROUND,
        fontSize:20,
        fontWeight:'700'
    },
    headerText1:{
        color:ComponentsStyles.COLORS.BACKGROUND,
        fontSize:20,
        fontWeight:'700',
        marginLeft:30
    },
    ButtonStyle:{
        marginRight:15,
        height:60,
        borderRadius:10
    },
    checkbox: {
        alignSelf: 'center',
    },
    modalCont: {
        flex: 1,
        flexGrow: 1,
        width: width,
        paddingHorizontal: 10,

    },
    modalMainContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    modalSubContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 5

    },
    modalRegularTitle: {
        fontFamily: ComponentsStyles.FONT_FAMILY.REGULAR,
        color: ComponentsStyles.COLORS.HEADER_BLACK,
        fontSize: 15,
        marginRight: 5
    },

    modalTitle: {

        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        color: ComponentsStyles.COLORS.HEADER_BLACK,
        fontSize: 15

    },
    txtUpload: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderStyle: "dashed",
        width: '100%',
        marginTop: 25,

    },
    subtxt: {
        color: ComponentsStyles.COLORS.BLACK,
        fontSize: 13,
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        marginBottom: 10
    },
    ActionButton: {
        marginTop: 20,
        marginBottom: 10
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
        borderStyle: "dashed",
        textAlign: "center",
        margin: 5,
        borderRadius: 0,
    },
    bottomheaderMeeterlocation: {
        fontFamily: ComponentsStyles.FONT_FAMILY.REGULAR,
        fontSize:16,
        color:ComponentsStyles.COLORS.BLACK
    },
    bottomheaderMeeterlocationAdd: {
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        marginLeft:10,
        fontSize:16,
        color:ComponentsStyles.COLORS.BLACK
    },

   
});