import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconC from 'react-native-vector-icons/MaterialCommunityIcons';
import ComponentsStyles from '../Constants/ComponentsStyles';
import IconB from 'react-native-vector-icons/Octicons';
import AwesomeAlert from 'react-native-awesome-alerts';

// parameter types


type CustomPropTypes = {

  disabled?: boolean;
  title?: string;
  style?: any;
  textStyle?: any;
  innerStyle?: any;
  setState?: Function;
  onPress?: Function;
  hasIcon?: boolean;
  icon?: string;
}
export const CustomeAlert = (showAlert:any,title:any,massage:any) => {

  console.log(showAlert);
  
  return (
    <AwesomeAlert
    show={showAlert}
    showProgress={false}
    title={title}
    message={massage}
    closeOnTouchOutside={true}
    closeOnHardwareBackPress={false}
    showCancelButton={false}
    showConfirmButton={true}
    cancelText="No, cancel"
    confirmText="Yes, delete it"
    confirmButtonColor="#DD6B55"
    cancelButtonColor={ComponentsStyles.COLORS.PRIMARY}
    onCancelPressed={() => {
        // hideAlert();
    }}
    onConfirmPressed={() => {
        // hideAlert();
    }}
/>
  );
};

const styles = StyleSheet.create({
  CONTAINER: {
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  appButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    elevation: 8,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  BUTTON_STYLE: {
    height: 50,
    // borderWidth:1,
    flexDirection: 'row',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ComponentsStyles.COLORS.SECONDRY,
  },
  BUTTON_TEXT: {
    textAlign: 'center',
    color: ComponentsStyles.COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

// export default CustomeAlert;
