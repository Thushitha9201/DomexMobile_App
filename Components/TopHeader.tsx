import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import ComponentsStyles from "../Constants/ComponentsStyles";
import ActionButton from "./ActionButton";
import IconA from 'react-native-vector-icons/Entypo';
import IconB from 'react-native-vector-icons/Ionicons';
import { Searchbar } from "react-native-paper";
type CustomPropTypes = {

    HeaderText?: string;
    SubText?: string;
    HeaderText2?: string;
    plaseorderText?: string;
    onChangeSearch?: string;
    searchQuery?: string;
    Is_Search?: boolean;
    Is_subtext?: boolean;
    Is_Header2?: boolean;
    onPress?: Function;
    onPress1?: Function;
    onPress2?: Function;
    onChangeText?: Function;
    is_Button?: boolean;
    is_menu?: boolean;
    hedaerstyle?: any;
    backstyle?: any;
}

const TopHeader = ({ HeaderText, onPress, onPress1,onPress2, Is_Search, onChangeSearch, onChangeText, searchQuery, backstyle, is_menu, plaseorderText, Is_subtext, SubText, hedaerstyle, HeaderText2, Is_Header2 }: CustomPropTypes) => {
    const changeonchangesearch = onChangeText?.bind(this);
    return (
        <View style={styles.hederContainer}>
            <View style={styles.headerSubpanal}>
                {is_menu ?
                    <TouchableOpacity onPress={() => {
                        if (onPress2) onPress2();
                    }}>
                        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' ,marginLeft:10}}>
                            <IconB name="sync-outline" size={33} color={ComponentsStyles.COLORS.WHITE} />
                        </View>
                    </TouchableOpacity>

                    :
                    <View style={styles.headericonpanal}>
                        <TouchableOpacity onPress={() => {
                            if (onPress) onPress();
                        }}>
                            <View style={[styles.backcontainer, backstyle]}>
                                <IconA name="chevron-left" size={27} color={ComponentsStyles.COLORS.WHITE} />

                            </View>
                        </TouchableOpacity>
                    </View>}

                <View style={[styles.heaaderTextContainer, hedaerstyle]}>
                    <Text style={styles.headerText}>{HeaderText}</Text>

                    {Is_Header2 ?
                        <Text style={styles.headerText}>{HeaderText2}</Text> : null}

                    {Is_subtext ?
                        <Text style={styles.subtext}>{SubText}</Text> : null}


                </View>
                <View style={{ flex: 0.4, height: 50, }}>
                    <TouchableOpacity onPress={() => {
                        if (onPress1) onPress1();
                    }}>
                        <Image
                            style={styles.ImageCONTAINER}
                            source={require('../assets/images/userr.png')} />
                    </TouchableOpacity>

                </View>
            </View>

            {Is_Search ?
                <View style={styles.searchcontainer1}>
                    <Searchbar style={{ borderRadius: 5, marginLeft: 5, marginRight: 5 }}
                        placeholder={plaseorderText}
                        onChangeText={(value) => changeonchangesearch(value)}
                    // value={onChangeSearch}
                    />
                </View> : null}



        </View>
    );
}
export default TopHeader;

const styles = StyleSheet.create({
    hederContainer: {
        paddingBottom: 10,
        flexDirection: 'column',
        backgroundColor: ComponentsStyles.COLORS.BACKGROUND,

    },
    headerSubpanal: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headericonpanal: {
        flex: 0.4,
        height: 50,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    destailsText: {
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        fontWeight: '700',
        fontSize: 16,
        fontStyle: 'normal',
        marginLeft: 10,
        marginTop: 10,
    },
    backcontainer: {
        backgroundColor: ComponentsStyles.COLORS.SECONDRY,
        borderRadius: 10,
        height: 39.8,
        marginTop: 5,
        marginLeft: 8,
        alignItems: 'center',
        width: 38.8,
        justifyContent: 'center'
    },
    heaaderTextContainer: {
        flex: 2,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ImageCONTAINER: {
        alignItems: "center",
        justifyContent: "center"
    },
    headerText: {
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        fontWeight: '700',
        fontSize: 22.67,
        color: ComponentsStyles.COLORS.WHITE,
    },
    searchcontainer1: {
        marginTop: 5,
        height: 47,
        paddingBottom: 10,
    },
    subtext: {
        color: ComponentsStyles.COLORS.WHITE, fontSize: 13,fontFamily:ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        alignItems: 'flex-start', justifyContent: 'flex-start'
    }

});