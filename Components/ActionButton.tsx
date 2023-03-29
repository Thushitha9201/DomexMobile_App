import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconC from 'react-native-vector-icons/MaterialCommunityIcons';
import ComponentsStyles from '../Constants/ComponentsStyles';
import IconB from 'react-native-vector-icons/Octicons';

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
const ActionButton = ({
  style,
  disabled,
  textStyle,
  title,
  innerStyle,
  onPress,
  hasIcon,
  icon,
}: CustomPropTypes) => {
  return (
    <View style={styles.CONTAINER}>
      <TouchableOpacity
        onPress={() => {
          if (onPress) onPress();
        }}
        style={style}
        disabled={disabled}>
        <View style={[styles.BUTTON_STYLE, innerStyle]}>

          {hasIcon ? <IconB name={icon} size={27} color={ComponentsStyles.COLORS.WHITE} /> : null}
          <View style={{ width: 6 }} />
          <Text style={[styles.BUTTON_TEXT, textStyle]}>{title}</Text>


        </View>
      </TouchableOpacity>
    </View>
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

export default ActionButton;
