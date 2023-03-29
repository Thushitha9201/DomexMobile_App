import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image
} from "react-native";

// import IconA from 'react-native-vector-icons/AntDesign';

import IconA from 'react-native-vector-icons/Entypo';
import ComponentsStyles from "../Constants/ComponentsStyles";

// prpperty types
type CustomPropTypes = {
    placeholder?: string;
    editable?: boolean;
    is_name?: boolean;
    name?: string;
    is_ex?: boolean;
    ex?: string;
    style?: any;
    exstyle?: any;
    secureTextEntry?: boolean;
    placeholderColor?: any;
    setState?: Function;
    stateValue?: any;
    keyType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "name-phone-pad" | "twitter" | "web-search" | undefined;
    multiline?: boolean;
    numberOfLines?: number;
    max?: number;
    onBlur?: Function;
    onpress?:any;
    onFocus?: Function;
    is_icon?: boolean;
    icon_name?: string;
}

const InputTextWithTopText = ({ placeholder, editable,exstyle, is_name, name, is_ex, ex, style, secureTextEntry, placeholderColor, setState, stateValue, keyType, multiline, numberOfLines, max, onBlur, onFocus, is_icon, icon_name,onpress }: CustomPropTypes) => {

    var customBackground = { backgroundColor: '#fff' };
    if (editable != undefined && editable == false)
        customBackground = { backgroundColor: '#fff' };
    else {
        customBackground = { backgroundColor: '#fff' }
    }

    return (
        <View style={{ width: '100%' }} >
            <View style={{ paddingBottom: 7, margin: 0 }}>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 3 }}>
                        {is_ex ? 
                        <Text style={[{color: '#5D5D5D', fontSize: 13, paddingLeft: 5 },exstyle]}>
                            {ex}
                        </Text> : null}

                        <TextInput style={[{
                            color: '#4A4958', fontSize: 15, height: 45, borderColor: ComponentsStyles.COLORS.SECONDRY,
                            paddingLeft: 10, borderRadius: 6, fontFamily: ComponentsStyles.FONT_FAMILY.REGULAR, padding: 0,
                        }, customBackground, style]}
                            secureTextEntry={secureTextEntry}
                            placeholder={placeholder}
                            placeholderTextColor={placeholderColor}
                            onChangeText={(text: any) => {
                                if (setState) setState(text);
                            }}
                           
                            keyboardType={keyType}
                            editable={editable}
                            multiline={multiline}
                            value={stateValue}
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
                        <View style={{ flex: 0.3, alignItems: 'flex-start', justifyContent: 'center' }}>


                            <IconA name={icon_name}  onPress={onpress} size={27} color={ComponentsStyles.COLORS.BLACK} />

                        </View>
                        :
                        null
                    }
                </View>



            </View>
        </View>
    );

}

export default InputTextWithTopText;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});