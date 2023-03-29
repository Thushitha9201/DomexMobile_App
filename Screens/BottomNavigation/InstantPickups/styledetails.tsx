import { Dimensions, StyleSheet } from "react-native";
import ComponentsStyles from "../../../Constants/ComponentsStyles";
import { getStatusBarHeight } from 'react-native-status-bar-height';
let width = Dimensions.get("screen").width;

export default StyleSheet.create({
    inputstyle:{
        height:40,
       alignItems:'flex-start',
       justifyContent:'flex-start'

    },
    ButtonStyle:{
        marginRight:15,
        
        marginLeft:15,
        height:60,
        borderRadius:10
    },
    innerStyle:{
        backgroundColor:ComponentsStyles.COLORS.ICON_BLUE,
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
dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
    color:ComponentsStyles.COLORS.ICON_BLUE,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color:'black'
  },
  placeholderStyle: {
    fontSize: 16,
    color:'black'
  },
  selectedTextStyle: {
    fontSize: 16,
    color:'black'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
   
});