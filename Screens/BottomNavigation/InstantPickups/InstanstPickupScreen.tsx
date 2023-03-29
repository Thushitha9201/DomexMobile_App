
import React, { useState, useEffect, useRef } from "react";
import { Alert, Button, FlatList, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import ListBox from "../../../Components/ListBox";
import TopHeader from "../../../Components/TopHeader";
import ComponentsStyles from "../../../Constants/ComponentsStyles";
import { Notification } from "../../../Constants/DummyData";
import Icon from 'react-native-vector-icons/FontAwesome';
import IconA from 'react-native-vector-icons/MaterialIcons';
import IconB from 'react-native-vector-icons/Ionicons';
import IconC from 'react-native-vector-icons/MaterialCommunityIcons';

import style from "./style";
import InputText from "../../../Components/InputText";
import Geolocation from '@react-native-community/geolocation';
import GetLocation from 'react-native-get-location'
import ActionButton from "../../../Components/ActionButton";
import InputTextWithTopText from "../../../Components/InputTextWithTopText";
import AwesomeAlert from 'react-native-awesome-alerts';
import { CustomeAlert } from "../../../Components/CustomeAlert";
import CheckBox from "@react-native-community/checkbox";
import { RadioButton } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";
import DropdownAlert from "react-native-dropdownalert";
import { getAllSENDERINFO, SAVE_SENDER } from "../../../SQLiteDatabase/DBControllers/SENDER_Controller";
import { getInquryIDAsyncStorage } from "../../../Constants/AsynStorageFuntion";
import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorageConstants from "../../../Constants/AsyncStorageConstants";
import { useFocusEffect } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay/lib";

var watchID: any;

const InstanstPickupScreen = (props: any) => {
    //const [TrackingID, setTrackingID] = useState('');
    const [showAlert, setTshowAlert] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [CustomerTypevalue, setCustomerTypevalue] = React.useState('1');
    const [isFocus, setIsFocus] = useState(false);
    const [InquiryID, setInquiryID] = useState('');

    const {
        navigation, route
    } = props;
    const [name, setname] = useState('');
    const [mobile, setmobile] = useState('');
    const [email, setemail] = useState('');
    const [address, setaddress] = useState('');
    let dropDownAlertRef = useRef();
    const [selectBranch, setSelectBranch] = useState(null);
    const [selectPaytype, setSelecPayType] = useState(null);

    const [SenderList, setSenderList] = useState([]);
    const [SelectSenderInfo, setSelectSenderInfo] = useState(null);

    const [SenderID, setSenderID] = useState('');
    const [SaveSenderID, setSaveSenderID] = useState('');
    const [isLoading, setIsLoading] = useState(false);



    const BranchList = [
        { label: 'Galle', value: '1' },
        { label: 'Matara', value: '2' },
        { label: 'Hambantota', value: '3' },
        { label: 'Four', value: '4' },
        { label: 'Five', value: '5' },
    ];

    const PaymentTypeList = [
        { label: 'Cash', value: '1' },
        { label: 'Cash On delivery', value: '2' },
        { label: 'Credit', value: '3' },

    ];
    var SaveSenderID_: any;

    const viewAlert = () => {
        setTshowAlert(true)
    };

    const hideAlert = () => {
        setTshowAlert(false)
    };


    const getCurrentLocation = () => {

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                // console.log(location);
                var latitude = location.latitude;
                var lontude = location.longitude;
                console.log(latitude, "--", lontude);
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })


    }
    const save = () => {

        try {
            // setState({ spinner: false });

            setIsLoading(true);

        } catch (error) {
            console.log(error);
        }
    }

    const backfuntion = () => {
        navigation.goBack();
    }

    useFocusEffect(
        React.useCallback(() => {

            getInquryIDAsyncStorage().then(res => {
                console.log(res, '---------res--------');
                 if(res==null || res ==""){
                    console.log('Nulllllllllllllllllll');
                //     console.log('-------+++++----------', '1',);
                    var timestamp2 = Date.now();
                    setInquiryID("IN" + timestamp2);
                    console.log('-------+++++-3---------', InquiryID,);
                    AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_InquryID, InquiryID);
                } else {

                    console.log('-------+++++----------', '2',);
                    setInquiryID(res);

                }
            })
                    // var timestamp2 = Date.now();
                    // setInquiryID("IN" + timestamp2);
                    // console.log('-------+++++-3---------', InquiryID,);
                    // AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_InquryID, InquiryID);
        
            // console.log("+++++>>", InquiryID);


            try {
                getAllSender();
                checkBoxAction();
            } catch (error) {
                console.log("useFocusEffect -->INSTANCE PICKUP  SCREEEN", error);
            }
        }, [])
    );




    const getAllSender = () => {
        try {
            getAllSENDERINFO((result: any) => {
                //console.log("<><><><><><><><><cus info2222"+ result);
                setSenderList(result);
            });
        } catch (error) {
            console.log("getAllSender -->INSTANCE PICKUP  SCREEEN", error);
        }
    }



    const checkBoxAction = () => {
        if (isSelected) {
            setSaveSenderID(InquiryID);
        } else {
            setSaveSenderID(SenderID);
        }

    }

    const saveDetails = () => {


        try {
            if (isSelected) {
                setSaveSenderID(InquiryID);
                SaveSenderID_=InquiryID;

            } else {
                console.log('-YYYYY--+++++++>', isSelected);
                //  console.log('-YYYYY--+++++44++>', name);
                setSaveSenderID(SenderID);
                SaveSenderID_=SenderID;
            }

            // sender details save 

            const jsonData = [
                {

                    id: SaveSenderID_,//in instant pickup unique id need to generate (mix of appuser id and timestamp suggested)
                    sender_type: CustomerTypevalue,  //1=individual,2=e-commerce, 3=cooperate
                    sender_name: name,
                    sender_mobile: mobile,
                    sender_mobile_alter: mobile,
                    sender_address_1: address,
                    sender_address_2: address,
                    sender_address_3: address,
                    is_new: 1,
                    is_synced: 0,  //need to sync
                    audit_user: 1,
                    audit_date: moment().utcOffset('+05:30').format('YYYY-MM-DD'),
                    audit_time: moment().utcOffset('+05:30').format('kk:mm:ss'),
                }
            ]
            console.log('-WWWWWWWW--+++++++>', SaveSenderID);
            if (SaveSenderID_ != "") {
                if (CustomerTypevalue != null || CustomerTypevalue != "") {
                    console.log('can save 1');

                    console.log('=====', name);
                    if (name != "") {
                        if (mobile != "") {
                            if (address != "") {

                                //  console.log(jsonData, "-----------SENDER INSERT JSON ");
                               // console.log('-ZZZZZZ--+++++++>', SaveSenderID);
                               // console.log('-ZZWWWWZZZZ--+++++++>', SaveSenderID_);
                                SAVE_SENDER(jsonData, (result: any) => {

                                    console.log(result, "-----------SENDER INSERT --sucess-------");

                                    navigation.navigate('InstantPackageDetailsScreen', {
                                        InquiryID: InquiryID,
                                        SenderID: SaveSenderID_,
                                    })
                                });

                                console.log('can save');

                            } else {
                                dropDownAlertRef.alertWithType('warn', 'Warning', "Please Add Address");
                                //console.log('1');

                            }


                        } else {
                            dropDownAlertRef.alertWithType('warn', 'Warning', "Please Add Mobile Number");

                        }
                    } else {
                        dropDownAlertRef.alertWithType('warn', 'Warning', "Please Add Sender Name");

                    }

                } else {
                    dropDownAlertRef.alertWithType('warn', 'Warning', "Please Select Customer Type");
                    //console.log('4');
                }
            } else {
                dropDownAlertRef.alertWithType('warn', 'Warning', "Sender data is empty. re check again");
                // console.log('5');
            }
        } catch (error) {
            console.log("SAVE DETAILS -->INSTANCE PICKUP  SCREEEN", error);
        }

    }



    return (
        <SafeAreaView style={ComponentsStyles.CONTAINER}>


            <TopHeader
                HeaderText="Instant Pick Up"
                Is_subtext={false}
                is_menu={false}
                onPress={backfuntion}
                Is_Search={false}
            />
            <DropdownAlert
                ref={(ref) => {
                    if (ref) {
                        dropDownAlertRef = ref;
                    }
                }}
            />

            <ScrollView style={{ marginBottom: 70 }}>




                <View style={{ height: 70, flexDirection: 'row', alignItems: 'center', margin: 5, backgroundColor: ComponentsStyles.COLORS.WHITE, borderRadius: 5, elevation: 10 }}>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: ComponentsStyles.COLORS.BLACK }}>Inquiry ID</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: ComponentsStyles.COLORS.BLACK }}>{InquiryID}</Text>
                    </View>


                </View>

                <View style={{ height: 60, margin: 5 }}>

                    <View style={styles.container}>
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={isSelected}
                                onValueChange={setSelection}
                                onChange={() => checkBoxAction()}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>Save as a new customer</Text>
                        </View>
                        {/* <Text>Is CheckBox selected: {isSelected ? '👍' : '👎'}</Text> */}
                    </View>
                </View>

                <View style={{ height: 20, margin: 2 }}>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={{ fontSize: 15, color: ComponentsStyles.COLORS.BLACK }}>Customer Type *</Text>
                    </View>
                </View>

                <View style={{ height: 150, margin: 2 }}>

                    <RadioButton.Group onValueChange={value => setCustomerTypevalue(value)} value={CustomerTypevalue}>
                        <RadioButton.Item
                            label="Individual"
                            value="1"
                            color={ComponentsStyles.COLORS.ICON_BLUE}
                            style={{ flexDirection: 'row-reverse', alignSelf: 'flex-start' }}
                        />
                        <RadioButton.Item
                            label="E-Commerce"
                            value="2"
                            color={ComponentsStyles.COLORS.ICON_BLUE}
                            style={{ flexDirection: 'row-reverse', alignSelf: 'flex-start' }}
                        />
                        <RadioButton.Item
                            label="Corporate"
                            value="3"
                            color={ComponentsStyles.COLORS.ICON_BLUE}
                            style={{ flexDirection: 'row-reverse', alignSelf: 'flex-start' }}
                        />

                    </RadioButton.Group>

                </View>

                {isSelected ?

                    <View style={{ height: 70, margin: 5 }}>
                        <InputTextWithTopText
                            exstyle={style.exstyle}
                            is_ex={true}
                            editable={true}
                            ex="Sender Name *"
                            stateValue={name}
                            max={75}
                            setState={(val) => setname(val)}
                            style={style.detailsInputText}
                        />
                    </View>


                    :


                    <View style={{ height: 70, margin: 5 }}>
                        <Text style={{ fontSize: 15, margin: 5, color: ComponentsStyles.COLORS.BLACK }}>Sender Name * </Text>

                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: ComponentsStyles.COLORS.BORDER_COLOR }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={SenderList}
                            search
                            maxHeight={300}
                            labelField="sender_name"
                            valueField="id"
                            placeholder={!isFocus ? 'Select Sender Name' : '...'}
                            searchPlaceholder="Search Sender Name"
                            value={SelectSenderInfo}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                //console.log(item.sender_name);


                                // console.log('%%%%-----', item);
                                //    %%----- {"_ID": 38, "_index": 1, "audit_date": "2023-03-06", 
                                //    "audit_time": "12:20:10", "audit_user": "1",
                                //     "id": "1", "is_new": 1, 
                                //     "is_synced": 1, 
                                //     "sender_address_1": "Location No, Street 1, Street 2, City.", 
                                //     "sender_address_2": "Location No, Street 1, Street 2, City.", 
                                //     "sender_address_3": "Location No, Street 1, Street 2, City.", 
                                //     "sender_mobile": "0776504791", "sender_mobile_alter": "0776504791",
                                //      "sender_name": "Jone", "sender_type": 1}

                                setSenderID(item.id);
                                console.log('--->>>SENDER ID', item.id);
                                setSaveSenderID(item.id);


                                setname(item.sender_name);
                                setmobile(item.sender_mobile);
                                setemail("-");
                                setaddress(item.sender_address_1);


                                setIsFocus(false);
                            }}


                            renderLeftIcon={() => (
                                <AntDesign
                                    style={styles.icon}
                                    color={isFocus ? 'blue' : 'black'}
                                    name="Safety"
                                    size={22}
                                />
                            )}
                        />
                    </View>
                }





                <View style={{ height: 70, margin: 5 }}>
                    <InputTextWithTopText
                        keyType="number-pad"
                        exstyle={style.exstyle}
                        is_ex={true}
                        editable={true}
                        ex="Enter Contact Number *"
                        stateValue={mobile}
                        max={10}
                        setState={(val) => setmobile(val)}
                        style={style.detailsInputText}
                    />
                </View>
                <View style={{ height: 70, margin: 5 }}>
                    <InputTextWithTopText
                        exstyle={style.exstyle}
                        keyType="number-pad"
                        is_ex={true}
                        editable={true}
                        ex="Sender E-mail"
                        stateValue={email}
                        max={20}
                        setState={(val) => setemail(val)}
                        style={style.detailsInputText}
                    />
                </View>


                <View style={{ height: 75, margin: 5, flexDirection: 'row' }}>
                    <View style={{ flex: 4.5 }}>
                        <InputTextWithTopText
                            exstyle={style.exstyle}
                            is_ex={true}
                            editable={true}
                            ex="Add Location *"
                            stateValue={address}
                            max={100}
                            setState={(val) => setaddress(val)}
                            style={style.detailsInputText}
                        />
                    </View>
                    <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={getCurrentLocation}>
                            <IconB
                                name='add-circle'
                                size={34}
                                color={ComponentsStyles.COLORS.GREEN}
                            />
                        </TouchableOpacity>

                    </View>

                </View>

                {/* <View style={{ height: 70, margin: 5 }}>
                    <Text style={{ fontSize: 15, margin: 5, color: ComponentsStyles.COLORS.BLACK }}>Pickup Branch </Text>

                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: ComponentsStyles.COLORS.BORDER_COLOR }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={BranchList}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Pickup Branch' : '...'}
                        searchPlaceholder="Search Pickup Branch"
                        value={selectBranch}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            console.log(item.label);



                            setSelectBranch(item.value);
                            setIsFocus(false);
                        }}


                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color={isFocus ? 'blue' : 'black'}
                                name="Safety"
                                size={20}
                            />
                        )}
                    />
                </View>


                <View style={{ height: 75, margin: 5 }}>
                    <Text style={{ fontSize: 15, margin: 5, color: ComponentsStyles.COLORS.BLACK }}>Payment Type </Text>

                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: ComponentsStyles.COLORS.BORDER_COLOR }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={PaymentTypeList}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Payment Type' : '...'}
                        searchPlaceholder="Search Payment Type"
                        value={selectPaytype}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            console.log(item.label);



                            setSelecPayType(item.value);
                            setIsFocus(false);
                        }}


                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color={isFocus ? 'blue' : 'black'}
                                name="Safety"
                                size={20}
                            />
                        )}
                    />
                </View> */}


                <View style={{ height: 70, margin: 5 }}>
                    <ActionButton
                        //onPress={() => save()}
                        onPress={() => saveDetails()}
                        style={style.ButtonStyle}
                        title="Save & Next" />
                </View>

                <Spinner
                    visible={isLoading}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />

                {/* {<View>
                    <DropdownAlert ref={
                        ref => dropDownAlertRef = ref}
                        closeInterval={4000}
                    // tapToCloseEnabled={true}

                    />
                </View>} */}





            </ScrollView>
            {/* <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="AwesomeAlert"
                message="I have a message for you!"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                cancelText="No, cancel"
                confirmText="Yes, delete it"
                confirmButtonColor="#DD6B55"
                cancelButtonColor={ComponentsStyles.COLORS.PRIMARY}
                onCancelPressed={() => {
                    hideAlert();
                }}
                onConfirmPressed={() => {
                    hideAlert();
                }}
            /> */}



        </SafeAreaView>
    );

}
export default InstanstPickupScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: 'center',
    },
    label: {
        margin: 8,
        fontSize: 15,
        fontWeight: '500',
        color: ComponentsStyles.COLORS.BLACK
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 12,
        color: ComponentsStyles.COLORS.BLACK
    },
    selectedTextStyle: {
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 12,
        color: ComponentsStyles.COLORS.ICON_BLUE
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 14,
    },
    icon: {
        marginRight: 5,
        color: ComponentsStyles.COLORS.HEADER_BLACK,
    },
});