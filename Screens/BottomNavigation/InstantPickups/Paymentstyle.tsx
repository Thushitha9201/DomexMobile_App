import { Dimensions, StyleSheet } from "react-native";
import ComponentsStyles from "../../../Constants/ComponentsStyles";
import { getStatusBarHeight } from 'react-native-status-bar-height';
let width = Dimensions.get("screen").width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      boldText: {
        fontSize: 25,
        color: 'red',
        marginVertical: 16,
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
        borderColor:ComponentsStyles.COLORS.SECONDRY
    },
    headerText:{
        color:ComponentsStyles.COLORS.SECONDRY,
        fontSize:35,
        fontWeight:'700'
    },
    headerText1:{
        color:ComponentsStyles.COLORS.SECONDRY,
        fontSize:35,
        fontWeight:'700',
        marginLeft:30
    },
    ButtonStyle:{
        marginRight:15,
        height:60,
        borderRadius:10
    },
    exstyle:{
        fontSize:16,
        color:ComponentsStyles.COLORS.BLACK 
    },
    detailsInputText: {
        height:40,
        borderColor:ComponentsStyles.COLORS.BLACK,
        color:ComponentsStyles.COLORS.BLACK,
        fontFamily:ComponentsStyles.FONT_FAMILY.BOLD,
        borderWidth:1,
        margin:5
},
EmptyMassage: {
    color: ComponentsStyles.COLORS.BLACK,
    marginLeft: 10,
    fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
    fontSize: 16,
    fontStyle: 'normal',
},
   
});