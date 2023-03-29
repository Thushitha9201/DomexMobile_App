/**
* @author Gagana Lakruwan
*/
import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { TextInput } from "react-native";
import IconA from 'react-native-vector-icons/Ionicons';
import ComponentsStyles from "../Constants/ComponentsStyles";

type CustomPropTypes = {
    placeholder?: string;
    editable?: boolean;
    is_name?: boolean;
    name?: string;
    is_ex?: boolean;
    ex?: string;
    style?: any;
    textstyle?: any;
    secureTextEntry?: boolean;
    placeholderColor?: string;
    setState?: Function;
    stateValue?: any;
    keyType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "name-phone-pad" | "twitter" | "web-search" | undefined;
    multiline?: boolean;
    numberOfLines?: number;
    max?: number;
    onBlur?: Function;
    onFocus?: Function;
    is_icon?: boolean;
    onpress?:any;
    icon_name?: string;
}
const InputTextWithLeftText = ({ placeholder, editable, is_name, name, is_ex, ex, style,textstyle, secureTextEntry, placeholderColor, setState, stateValue, keyType, multiline, numberOfLines, max, onBlur, onFocus, is_icon, icon_name,onpress }: CustomPropTypes) => {
    var customBackground = { backgroundColor: 'transparent' };
    if (editable != undefined && editable == false)
        customBackground = { backgroundColor: '#e0e0e0' };
    else {
        customBackground = { backgroundColor: '#fff' }
    }
    return (
        <View style={{ width: '100%', flexDirection: "row" }} >
            <View style={{ padding: 7, flex: 0.6, height: 60 }}>
                {is_ex ? <Text style={[{
                    color: '#5D5D5D', marginTop: 7, fontSize: 13, justifyContent: "center", alignItems: "center", paddingLeft: 5,
                },textstyle]}>
                    {ex}
                </Text> : null}
            </View>
            <View style={{ padding: 7, flex: 2, height: 60 }}>
                <TextInput style={[{
                    color: '#4A4958', fontSize: 15, height: 45, borderColor: '#E0E0E0', borderWidth: 1,
                    paddingLeft: 10, borderRadius: 6, fontFamily: ComponentsStyles.FONT_FAMILY.REGULAR, padding: 0,
                }, customBackground, style]}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderColor}
                    onChangeText={(text: any) => {
                        if (setState) setState(text);
                    }}
                    value={stateValue}
                    keyboardType={keyType}
                    editable={editable}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    maxLength={max}
                    onBlur={() => {
                        if (onBlur) onBlur();
                    }}
                    onFocus={() => {
                        if (onFocus) onFocus();
                    }}
                >
                </TextInput>
            </View>
           
            {is_icon ? 
             <View style={{ padding: 7,marginTop:9, height: 60 }}>
            <IconA name={icon_name} 
            size={27} 
            onPress={onpress}
            color={ComponentsStyles.COLORS.BLACK} />
            </View>
            : null}
           
              
           
        </View>
    );
}
export default InputTextWithLeftText;
const styles = StyleSheet.create({
    container: {}
});