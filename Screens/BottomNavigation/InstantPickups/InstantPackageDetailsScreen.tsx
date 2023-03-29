import React, { useState, useEffect, useRef } from "react";
import { Alert, Button, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TopHeader from "../../../Components/TopHeader";
import ComponentsStyles from "../../../Constants/ComponentsStyles";
import CheckBox from "@react-native-community/checkbox";
import Icon from 'react-native-vector-icons/FontAwesome';
import InputText from "../../../Components/InputText";
import style from "./styledetails";
import InputTextWithLeftText from "../../../Components/InputTextWithLeftText";
import ActionButton from "../../../Components/ActionButton";
import InputTextWithTopText from "../../../Components/InputTextWithTopText";
import IconB from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getData, insertpackagesDetails, insertsender, deletesenderData } from '../../../SQLiteDatabase/DBControllers/InstantPickupsController';
import { RadioButton } from "react-native-paper";
import moment from "moment";
import { DeleteReceiver, getLastReciverId, getNumberOFReciver, getReciverByTrackingID, SAVE_RECEIVER } from "../../../SQLiteDatabase/DBControllers/RECEIVER_Controller";
import { DeletePakagebyReciver, getLastPackgeId, getNumberOFPackage, SAVE_PACKAGE } from "../../../SQLiteDatabase/DBControllers/PACKAGE_Contraller";
import DropdownAlert from "react-native-dropdownalert";
import { PICKUP_AND_DELIVERY_JOB_ONGOING, PICKUP_MODULE } from "../../../Constants/ApiConstants";
import { SAVE_PICKUP_COLLECTION } from "../../../SQLiteDatabase/DBControllers/PICKUP_COLLECTION_Controller";
import { useFocusEffect } from "@react-navigation/native";
import { getPackageType } from "../../../SQLiteDatabase/DBControllers/PACAKGE_TYPE_Controller";
import { getAreaTypes } from "../../../SQLiteDatabase/DBControllers/AREA_TYPE_Controller";
import Spinner from "react-native-loading-spinner-overlay/lib";
const InstantPackageDetailsScreen = (props: any) => {

    const {
        navigation, route
    } = props;

    const [city, setcity] = useState('');
    const [ReciverName, setReciverName] = useState('');
    const [mobile, setmobile] = useState('');
    const [district, setdistrict] = useState('');
    const [mainCity, setmainCity] = useState('');
    const [street, setstreet] = useState('');
    const [width, setwidth] = useState('');
    const [height, setheight] = useState('');
    const [lenght, setlenght] = useState('');
    const [weight, setweight] = useState('');
    const [NoofPackages, setNoofPackages] = useState('');
    const [NoofPieces, setNoofPieces] = useState('');
    const [Description, setDescription] = useState('');
    const [Special, setSpecial] = useState('');
    const [Ptype, setPtype] = useState('');
    const [TrackingID, setTrackingID] = useState('');
    const [InsertReciverDataList, setInsertReciverDataList] = useState([]);
    const [SaveSenderID, setSaveSenderID] = useState('');

    const [countOfPackagesRelatedInquryID, setcountOfPackagesRelatedInquryID] = useState('');

    const [countOfReciversRelatedInquryID, setcountOfReciversRelatedInquryID] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const data = [
        { label: 'Cash', value: '1' },
        { label: 'Credit', value: '2' },
        { label: 'COD', value: '3' },
        { label: 'E-COM', value: '4' },

    ];
    const [value, setValue] = useState(null);
    const [PayModeType, setPayModeType] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [packageTypeList, setpackageTypeList] = useState([]);
    const [areatypeList, setareatypeList] = useState([]);

    // const areatype = [
    //     { label: 'City Limits', value: '1' },
    //     { label: 'Suberbs', value: '2' },
    //     { label: 'Out Station', value: '3' },
    //     { label: 'Far away', value: '4' },
    //     { label: 'Remote', value: '5' },
    // ];
    const [valuearea, setvaluearea] = useState(null);
    const [isFocusarea, setisFocusarea] = useState(false);

    // const packageType = [
    //     { label: 'Parcels', value: '1' },
    //     { label: 'Document', value: '2' },
    // ];
    const [packageTypes, setpackageTypes] = useState(null);
    const [isFocuspackage, setisFocuspackage] = useState(false);

    const [DeliveryTypevalue, setDeliveryType] = React.useState('1');
    const [isSelected, setSelection] = useState(false);

    const [lastReciverID, setlastReciverID]: any[] = useState([]);
    const [lastReciverNewID, setlastReciverNewID] = useState('');


    const [lastPakageID, setlastPakageID]: any[] = useState([]);
    const [lastPakageIDNewID, setlastPakageIDNewID] = useState('');
    const [Is_multiple, setIs_multiple] = useState('');
    const [InquiryID_, setInquiryID] = useState('');

    let dropDownAlertRef = useRef();

    const backfuntion = () => {
        navigation.goBack();
    }


    useFocusEffect(
        React.useCallback(() => {

            console.log(',,,,,INQUERYID ,,,,,,,,,,,', route.params.InquiryID);
            console.log(',,,,,,,,,,SenderID,,,,,,', route.params.SenderID);

            setInsertReciverDataList([]);
            setInquiryID(route.params.InquiryID)
            setSaveSenderID(route.params.SenderID)
            generateUNIQUEID_RECIVER();
            GENARATE_UNIQUEID_PACKAGE();

            getAllReciverByTrackingID();
            //Load data fro drop down-
            getAllActivePackgeTypes();
            getAllAreaTypes();
            //--------------------------------------------------------
            getPackageCount();
            getReciverCount();

        }, [])
    );

    // useEffect(() => {

    // }, []);

    const ActionNext = () => {
        try {
            console.log("-%%%-", 'action');
            console.log("-%%%-", countOfPackagesRelatedInquryID);
            console.log("-^^^^-", countOfReciversRelatedInquryID);

            if (countOfPackagesRelatedInquryID != "0") {

                if (countOfReciversRelatedInquryID != "0") {

                    //  console.log("-^^^^-","YESSSSSSSSSSSSSSSs");
                    movetoNext();

                } else {
                    dropDownAlertRef.alertWithType('warn', 'Warning', "Please add Reciver Info ");
                }

            } else {
                dropDownAlertRef.alertWithType('warn', 'Warning', "Please add Pacakges Info ");
            }
        } catch (error) {
            console.log("ActionNext -->INSTANCE PICKUP DETAILS SCREEEN", error);
        }

    }


    const movetoNext = () => {
        try {

            // finaly save pickup collection data 

            if (isSelected) {
                setIs_multiple('1');
            } else {
                setIs_multiple('0');
            }

            const jsonPickupCollectionData = [
                {
                    id: 2,
                    delivery_type: DeliveryTypevalue,
                    is_multiple: Is_multiple,
                    pref_pick_date: '',
                    pref_pick_time: '',
                    tracking_id: InquiryID_,
                    sender_id: SaveSenderID,
                    created_date: moment().utcOffset('+05:30').format('YYYY-MM-DD'),
                    created_time: moment().utcOffset('+05:30').format('kk:mm:ss'),
                    total_cost: "5500.00",//need to add calculation 
                    paid_amount: "7500.00",
                    is_fully_paid: 0,
                    paid_date: '',
                    paid_time: '',
                    job_stage: PICKUP_MODULE,
                    audit_user: '',
                    audit_date: '',
                    audit_time: '',
                    received_method: '',
                    status: "1",

                }
            ]

            if (InquiryID_ != "") {
                if (DeliveryTypevalue != null || DeliveryTypevalue != "") {

                    if (SaveSenderID != "") {

                        SAVE_PICKUP_COLLECTION(jsonPickupCollectionData, (result: any) => {

                            console.log(result, "-----------INSTANCE P DETAILS--> PICKUP COLLECTION SAVE --sucess-------");

                            dropDownAlertRef.alertWithType('sucess', 'Success', "PICKUP COllection Data save sucessfully. ");

                            navigation.navigate('InstanstPickupPaymentScreen', {
                                InquiryID: InquiryID_,
                            });
                        });


                    } else {
                        dropDownAlertRef.alertWithType('warn', 'Warning', "Sender data is empty. re check again");
                    }

                } else {
                    dropDownAlertRef.alertWithType('warn', 'Warning', "Please Select Delivery Type");
                }



            }
            else {
                dropDownAlertRef.alertWithType('warn', 'Warning', "Inquiry ID is Empty ");
            }

        } catch (error) {
            console.log("movetoNext -->INSTANCE PICKUP DETAILS SCREEEN", error);
        }

    }

    const Calculation = () => {
        var TotDomexCharge: any;
        var AreaTypeR_upto_1kg: any;
        var SpecialCharge: any;
        var Discount: any;
        var CourierCharge_Return: any;
        var CourierCharge_Delivery: any;
        var AreaTypeR_upto_500g: any;
        var AreaTypeR_addtional_500g: any;

        var AreaTypeR_uptoParcel_1kg: any;
        var AreaTypeR_AddtionalParcel_1kg: any;
        var AreaTypeR_uptoParcel_500g: any;
        var AreaTypeR_AddtionalParcel_500g: any;

        AreaTypeR_upto_1kg = 50;
        SpecialCharge = 50;
        Discount = 10;
        AreaTypeR_upto_500g = 100;
        AreaTypeR_addtional_500g = 150;

        let volumeWeight = (parseFloat(lenght) * parseFloat(width) * parseFloat(height)) / 5000;
        console.log(volumeWeight, '-------', "---", packageTypes);
        //----CASH / COD Customers

        //-----------------------For Documents 
        if (packageTypes === "2" && valuearea === "1" && (weight <= "1000" && volumeWeight <= 1000)) {
            console.log("111111 Condition true");

            CourierCharge_Delivery = AreaTypeR_upto_1kg + SpecialCharge;
            TotDomexCharge = CourierCharge_Delivery;

            //  CourierCharge_Return = AreaTypeR_upto_1kg + SpecialCharge - Discount ;

            //  if (PayModeType === "Cash") {
            //         TotDomex = CourierCharge_Return;
            //     } else if (PayModeType === "COD") {
            //         TotDomex = CourierCharge_Delivery + CourierCharge_Return;
            //     }

            //-----------------------For Documents 
        } else if (packageTypes === "2" && valuearea === "1" && (weight <= "500" && volumeWeight <= 500)) {
            console.log("22222 Condition true");

            CourierCharge_Delivery = AreaTypeR_upto_500g + SpecialCharge;
            TotDomexCharge = CourierCharge_Delivery;


        } else if (packageTypes === "2" && valuearea === "1" && (weight > "500" && weight <= "1000") || (volumeWeight > 500 && volumeWeight <= 1000)) {
            console.log("33333 Condition true");

            CourierCharge_Delivery = AreaTypeR_upto_500g + AreaTypeR_addtional_500g + SpecialCharge;
            TotDomexCharge = CourierCharge_Delivery;

            //-----------------------For Parcels 
        } else if (packageTypes === "1" && valuearea === "1" && (weight <= "1000" && volumeWeight <= 1000)) {
            console.log("44 Condition true");

            CourierCharge_Delivery = AreaTypeR_uptoParcel_1kg + SpecialCharge;
            TotDomexCharge = CourierCharge_Delivery;

        } else if (packageTypes === "1" && valuearea === "1" && (weight > "1000" && volumeWeight > 1000)) {
            console.log("55 Condition true");

            let Actualweight = parseFloat(weight);
            if (volumeWeight <= Actualweight) {

                console.log("5.1 Condition true");
                //                     𝐶𝑜𝑢𝑟𝑖𝑒𝑟 𝐶ℎ𝑎𝑟𝑔𝑒 𝑓𝑜𝑟 𝐷𝑒𝑙𝑖𝑣𝑒𝑟𝑦
                // = (𝐴𝑟𝑒𝑎 𝑇𝑦𝑝𝑒 𝑟𝑎𝑡𝑒 𝑓𝑜𝑟 𝑝𝑎𝑟𝑐𝑒𝑙𝑠 𝑢𝑝𝑡𝑜 1 𝑘𝑔
                // + 𝐴𝑟𝑒𝑎 𝑇𝑦𝑝𝑒 𝑟𝑎𝑡𝑒 𝑓𝑜𝑟 𝑝𝑎𝑟𝑐𝑒𝑙𝑠 𝑎𝑑𝑑𝑖𝑡𝑖𝑜𝑛𝑎𝑙 1 𝑘𝑔
                // ∗ 𝑅𝑜𝑢𝑛𝑑 𝑈𝑝(𝐴𝑐𝑡𝑢𝑎𝑙 𝑊𝑒𝑖𝑔ℎ𝑡 − 1)) + 𝑆𝑝𝑒𝑐𝑖𝑎𝑙 𝐶ℎ𝑎𝑟𝑔𝑒𝑟�

                let ActualweightNew = Actualweight - 1
                CourierCharge_Delivery = ((AreaTypeR_uptoParcel_1kg + AreaTypeR_AddtionalParcel_1kg) * ActualweightNew) + SpecialCharge;
                TotDomexCharge = CourierCharge_Delivery;

            } else if (volumeWeight > Actualweight) {
                //                 𝐶𝑜𝑢𝑟𝑖𝑒𝑟 𝐶ℎ𝑎𝑟𝑔𝑒 𝑓𝑜𝑟 𝐷𝑒𝑙𝑖𝑣𝑒𝑟𝑦 = (𝐴𝑟𝑒𝑎 𝑇𝑦𝑝𝑒 𝑟𝑎𝑡𝑒 𝑓𝑜𝑟 𝑝𝑎𝑟𝑐𝑒𝑙𝑠 𝑢𝑝𝑡𝑜 1 𝑘𝑔
                // + 𝐴𝑟𝑒𝑎 𝑇𝑦𝑝𝑒 𝑟𝑎𝑡𝑒 𝑓𝑜𝑟 𝑝𝑎𝑟𝑐𝑒𝑙𝑠 𝑎𝑑𝑑𝑖𝑡𝑖𝑜𝑛𝑎𝑙 1 𝑘𝑔
                // ∗ 𝑅𝑜𝑢𝑛𝑑 𝑈𝑝(𝑉𝑜𝑙𝑢𝑚𝑒 𝑊𝑒𝑖𝑔ℎ𝑡 − 1)) + 𝑆𝑝𝑒𝑐𝑖𝑎𝑙 𝐶ℎ𝑎𝑟𝑔𝑒𝑟�
                console.log("5.2 Condition true");

                let volumeWeightNew = volumeWeight - 1
                CourierCharge_Delivery = ((AreaTypeR_uptoParcel_1kg + AreaTypeR_AddtionalParcel_1kg) * volumeWeightNew) + SpecialCharge;
                TotDomexCharge = CourierCharge_Delivery;

            }
        } else if (packageTypes === "1" && valuearea === "1" && ((weight <= "500" && volumeWeight <= 500))) {
            console.log("6 Condition true");

            CourierCharge_Delivery = AreaTypeR_uptoParcel_500g + SpecialCharge;
            TotDomexCharge = CourierCharge_Delivery;

        }
        else if (packageTypes === "1" && valuearea === "1" && ((weight > "500" && volumeWeight > 500))) {
            console.log("7 Condition true");
            let Actualweight = parseFloat(weight);
            if (volumeWeight <= Actualweight) {
                console.log("7.1 Condition true");

                //             𝐶𝑜𝑢𝑟𝑖𝑒𝑟 𝐶ℎ𝑎𝑟𝑔𝑒 𝑓𝑜𝑟 𝐷𝑒𝑙𝑖𝑣𝑒𝑟𝑦
                // = (𝐴𝑟𝑒𝑎 𝑇𝑦𝑝𝑒 𝑟𝑎𝑡𝑒 𝑓𝑜𝑟 𝑝𝑎𝑟𝑐𝑒𝑙𝑠 𝑢𝑝𝑡𝑜 500𝑔
                // + 𝐴𝑟𝑒𝑎 𝑇𝑦𝑝𝑒 𝑟𝑎𝑡𝑒 𝑓𝑜𝑟 𝑝𝑎𝑟𝑐𝑒𝑙𝑠 𝑎𝑑𝑑𝑖𝑡𝑖𝑜𝑛𝑎𝑙 500𝑔
                // ∗ ((𝑅𝑜𝑢𝑛𝑑𝑈𝑝((𝐴𝑐𝑡𝑢𝑎𝑙 𝑊𝑒𝑖𝑔ℎ𝑡 − 0.5)/0.5)) + 𝑆𝑝𝑒𝑐𝑖𝑎𝑙 𝐶ℎ𝑎𝑟𝑔𝑒𝑟𝑠
                //𝑇𝑜𝑡𝑎𝑙 𝐷𝑜𝑚𝑒𝑥 𝐶ℎ𝑎𝑟𝑔𝑒 = 𝐶𝑜𝑢𝑟𝑖𝑒𝑟 𝐶ℎ𝑎𝑟𝑔𝑒 𝑓𝑜𝑟 𝐷𝑒𝑙𝑖𝑣𝑒𝑟�

                let ActualweightOne = Actualweight - 0.5;
                let ActualweightFinal = (ActualweightOne / 0.5);

                CourierCharge_Delivery = ((AreaTypeR_uptoParcel_500g + AreaTypeR_AddtionalParcel_500g) * ActualweightFinal) + SpecialCharge;
                TotDomexCharge = CourierCharge_Delivery;
            } else if (volumeWeight > Actualweight) {
                console.log("7.2 Condition true");

                let volumeWeightOne = volumeWeight - 0.5;
                let volumeWeightFinal = (volumeWeightOne / 0.5);

                CourierCharge_Delivery = ((AreaTypeR_uptoParcel_500g + AreaTypeR_AddtionalParcel_500g) * volumeWeightFinal) + SpecialCharge;
                TotDomexCharge = CourierCharge_Delivery;

            }

            //type 3 not 

        }


    }

    const Add_Details = () => {
        try {

            //trcking ID genarate UniqueID 
            var timestamp2 = Date.now();
            setTrackingID("PACK" + Date.now());

            console.log("INSTANCE P DETAILS--> Add_detils method welcome--------->");




            const jsonPackageData = [
                {
                    id: lastPakageIDNewID,
                    sender_id: SaveSenderID,
                    receiver_id: lastReciverNewID,
                    details: Description,
                    special_instruct: Special,
                    package_count: NoofPackages,
                    pieces_count: NoofPieces,
                    width: width,
                    height: height,
                    length: lenght,
                    weight: weight,
                    is_new: 1,
                    is_synced: 0,
                    created_user: "userID",
                    created_date: moment().utcOffset('+05:30').format('YYYY-MM-DD'),
                    created_time: moment().utcOffset('+05:30').format('kk:mm:ss'),
                    pickup_user: "",
                    pickup_date: moment().utcOffset('+05:30').format('YYYY-MM-DD'),
                    pickup_time: moment().utcOffset('+05:30').format('kk:mm:ss'),
                    pickup_lat: 0,
                    pickup_long: 0,
                    delivery_user: "",
                    delivery_date: '',
                    delivery_time: '',
                    delivery_lat: 0,
                    delivery_long: 0,
                    job_stage: PICKUP_MODULE,
                    collection_ID: 1,
                    tracking_id: "PACK" + Date.now(),
                    job_status: PICKUP_AND_DELIVERY_JOB_ONGOING,
                    Payment_Mode_ID: value,
                    Payment_Mode_Des: PayModeType,
                    Package_amount: 1500.00,//need to add calulation
                    issettle: 0,
                    InquiryID: InquiryID_,
                    AreaTypeID: valuearea,
                    PacakgeTypeID: packageTypes,

                }

            ]

            const jsonReciverData = [
                {
                    id: lastReciverNewID,//instant pickup unique id need to generate (mix of appuser id and timestamp suggested)
                    recevier_name: ReciverName,
                    recevier_mobile: mobile,
                    recevier_mobile_alter: mobile,
                    InquiryID: InquiryID_,
                    DistrictId: district,
                    MainCityID: mainCity,
                    recevier_address_1: street,
                    recevier_address_2: "",
                    recevier_address_3: "",
                    CityID: street,
                    is_new: 1,
                    is_synced: 0,  //need to sync
                    audit_user: 1,
                    audit_date: moment().utcOffset('+05:30').format('YYYY-MM-DD'),
                    audit_time: moment().utcOffset('+05:30').format('kk:mm:ss'),
                    Tempory_Credit_Status: 0,
                    Tempory_Credit_Outstanding: 0.00,

                }
            ]


            if (InquiryID_ != "") {

                if (packageTypes != null || packageTypes != "") {

                    if (valuearea != null || valuearea != "") {
                        if (weight != "") {
                            if (width != "") {

                                if (height != "") {

                                    if (lenght != "") {
                                        if (NoofPieces != "") {
                                            if (NoofPackages != "") {
                                                if (ReciverName != "") {

                                                    if (mobile != "") {

                                                        if (street != "") {

                                                            if (PayModeType != null || PayModeType != "") {
                                                                setIsLoading(true);

                                                                console.log(jsonPackageData, "-----------NSTANCE P DETAILS--> PACAK JSON ");
                                                                console.log(jsonReciverData, "-----------NSTANCE P DETAILS--> RECIVER  JSON ");

                                                                SAVE_PACKAGE(jsonPackageData, (result: any) => {

                                                                    console.log(result, "-----------INSTANCE P DETAILS--> PACAKE SAVE --sucess-------");

                                                                });

                                                                SAVE_RECEIVER(jsonReciverData, (result: any) => {

                                                                    console.log(result, "-----------INSTANCE P DETAILS--> RECIVER SAVE --sucess-------");
                                                                    dropDownAlertRef.alertWithType('sucess', 'Success', "Data save sucessfully. ");

                                                                    getAllReciverByTrackingID();
                                                                    ClearFiled();
                                                                    //refresh next sequence numbers -----
                                                                    generateUNIQUEID_RECIVER();
                                                                    GENARATE_UNIQUEID_PACKAGE();
                                                                    getPackageCount();
                                                                    getReciverCount();
                                                                    setIsLoading(false);

                                                                });

                                                            } else {
                                                                dropDownAlertRef.alertWithType('warn', 'Warning', "Please Select Pay Mode ");
                                                                console.log('0');
                                                            }
                                                        } else {
                                                            dropDownAlertRef.alertWithType('warn', 'Warning', "Please Add Address ");
                                                            console.log('1');
                                                        }

                                                    } else {
                                                        dropDownAlertRef.alertWithType('warn', 'Warning', "Please Add Reciver Contact Number ");
                                                        console.log('1');
                                                    }

                                                } else {
                                                    dropDownAlertRef.alertWithType('warn', 'Warning', "Please Add Reciver Name");
                                                    console.log('2');
                                                }
                                            } else {
                                                dropDownAlertRef.alertWithType('warn', 'Warning', "Please Add No of Package");
                                                console.log('3');
                                            }
                                        } else {
                                            dropDownAlertRef.alertWithType('warn', 'Warning', "Please Add No of Pieces");
                                            console.log('4');
                                        }

                                    } else {
                                        dropDownAlertRef.alertWithType('warn', 'Warning', "Please Add Lenght");
                                        console.log('5');
                                    }

                                } else {
                                    dropDownAlertRef.alertWithType('warn', 'Warning', "Please Add Height");
                                    console.log('6');
                                }
                            } else {
                                dropDownAlertRef.alertWithType('warn', 'Warning', "Please Add Width");
                                console.log('7');
                            }

                        } else {
                            dropDownAlertRef.alertWithType('warn', 'Warning', "Please Add weight");
                            console.log('8');
                        }

                    } else {
                        dropDownAlertRef.alertWithType('warn', 'Warning', "Please Select Package Type ");
                        console.log('9');
                    }

                } else {
                    dropDownAlertRef.alertWithType('warn', 'Warning', "Please Select Area Type ");
                    console.log('10');
                }

            } else {
                dropDownAlertRef.alertWithType('warn', 'Warning', "Inquiry ID is Empty ");
                console.log('11');
            }

        } catch (error) {
            console.log("Add_Details -->INSTANCE PICKUP DETAILS SCREEEN", error);
        }
    }

    // GET added recever details by current inquriy id (tracking ID)

    const getAllReciverByTrackingID = () => {
        setInsertReciverDataList([]);
        console.log('InquiryID_', route.params.InquiryID);
        getReciverByTrackingID(route.params.InquiryID, (result: any) => {
            setInsertReciverDataList(result);
        });

    }
    //------------------------Load data fro drop down----------------------------
    const getAllActivePackgeTypes = () => {
        getPackageType((result: any) => {
            setpackageTypeList(result);
        });

    }

    const getAllAreaTypes = () => {
        getAreaTypes((result: any) => {
            setareatypeList(result);
        });

    }
    //----------------------------------------------------------
    const getPackageCount = () => {
        getNumberOFPackage(route.params.InquiryID, (result: any) => {
            setcountOfPackagesRelatedInquryID(result[0].count);

            console.log("[][]]]", countOfPackagesRelatedInquryID);
        });
    }


    const getReciverCount = () => {
        getNumberOFReciver(route.params.InquiryID, (result: any) => {
            setcountOfReciversRelatedInquryID(result[0].count);
            console.log("[][555]]]", countOfReciversRelatedInquryID);
        });
    }

    const ClearFiled = () => {
        setwidth('');
        setheight('');
        setlenght('');
        setweight('');
        setNoofPieces('');
        setNoofPackages('');
        setDescription('');
        setSpecial('');
        setReciverName('');
        setmobile('');
        setdistrict('');
        setmainCity('');
        setcity('');
        setstreet('');
        setPayModeType(null);



    }



    //-----------------------GET RECIVER LAST ID
    const generateUNIQUEID_RECIVER = () => {
        getLastReciverId((result: any) => {
            setlastReciverID(result);
            const uniqueID: any[] = [];
            if (result.length == 0) {
                GetLastID(0);
            } else {
                for (let i = 0; i < result.length; ++i) {
                    GetLastID(result[i]._ID);
                }
            }
        });
    };

    const GetLastID = (id: any) => {
        var _ID = parseInt(id) + 1;
        setlastReciverNewID("RE_" + moment().utcOffset('+05:30').format('YYYY-MM-DD') + "_" + _ID);
        console.log(",---->UNIEQUE ID-RE-> ", lastReciverNewID);
    }
    //---------------------------GET PACKAGE LAST SAVING ID-----------------------------------------------------------------

    const GENARATE_UNIQUEID_PACKAGE = () => {
        getLastPackgeId((result: any) => {
            setlastPakageID(result);
            const uniqueID: any[] = [];
            if (result.length == 0) {
                GetLastPakageID(0);
            } else {
                for (let i = 0; i < result.length; ++i) {
                    GetLastPakageID(result[i]._ID);
                }
            }
        });
    };
    const GetLastPakageID = (id: any) => {
        try{
        var _ID = parseInt(id) + 1;
        setlastPakageIDNewID("PA_" + moment().utcOffset('+05:30').format('YYYY-MM-DD') + "_" + _ID);
        console.log(",---->UNIEQUE ID-PA-> ", lastPakageIDNewID);
    } catch (error) {
        
        console.log(")))  -->INSTANCE PICKUP DETAILS SCREEEN", error);
    }
    }


    //------------------------------------------------------------------------------------

    const goInstancePickupPackgescreen =(trakingID:any)=>{
        try{
            navigation.navigate('InstanstPickupPackageViewScreen', {
                TrackingID: trakingID,
              
            })

        } catch (error) {
        
            console.log("goInstancePickupPackgescreen  -->INSTANCE PICKUP DETAILS SCREEEN", error);
        }
    }

    const deleteItem = (id: any, recevierame: any) => {
        Alert.alert(
            '',
            'Are you sure you want to delete? "' + recevierame + " ' and packge info ",
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK',
                    onPress: () =>
                        deleteReciver(id)
                    //  console.log('OK Pressed')


                },
            ],
            { cancelable: false }
        )


    }

    const deleteReciver = (id: any) => {
     try{
        //Pakage and reciver deleted ----
        DeletePakagebyReciver(id, route.params.InquiryID, (result: any) => {
            DeleteReceiver(id, (result: any) => {

                dropDownAlertRef.alertWithType('sucess', 'Success', "Package and Receiver deleted  sucessfully. ");

                getAllReciverByTrackingID();
            });
        });
    } catch (error) {
        dropDownAlertRef.alertWithType('error', 'Error', "Package and Receiver deleted  unsucessfully. ");
        console.log("deleteReciver  -->INSTANCE PICKUP DETAILS SCREEEN", error);
    }

    }


    return (

        <SafeAreaView style={ComponentsStyles.CONTAINER}>

            <TopHeader
                HeaderText="Package Details"
                Is_subtext={false}
                is_menu={false}
                Is_Search={false}
                onPress={backfuntion}
            />
            {/* <ScrollView style={{ marginBottom: 70 }}> */}

            <DropdownAlert
                ref={(ref) => {
                    if (ref) {
                        dropDownAlertRef = ref;
                    }
                }}
            />
            <Spinner
                visible={isLoading}
                textContent={'Saving...'}
                textStyle={{ color: '#FFF' }}
            />

            <View style={{ backgroundColor: ComponentsStyles.COLORS.BACKGROUND_COLOR, elevation: 10, margin: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>


                <FlatList
                    ListHeaderComponent={
                        <View style={{ marginRight: 10 }}>
                            <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', margin: 5, backgroundColor: ComponentsStyles.COLORS.WHITE, borderRadius: 5, elevation: 10 }}>
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <Text style={{ fontSize: 18, fontWeight: '700', color: ComponentsStyles.COLORS.BLACK }}>Inquiry ID</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text style={{ fontSize: 18, fontWeight: '700', color: ComponentsStyles.COLORS.BLACK }}>{InquiryID_}</Text>
                                </View>


                            </View>


                            <View style={{ height: 20, margin: 2 }}>
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <Text style={{ fontSize: 15, color: ComponentsStyles.COLORS.BLACK }}>Delivery Type *</Text>
                                </View>
                            </View>

                            <View style={{ height: 150, margin: 2 }}>

                                <RadioButton.Group onValueChange={value => setDeliveryType(value)} value={DeliveryTypevalue}>
                                    <RadioButton.Item
                                        label="General"
                                        value="1"
                                        color={ComponentsStyles.COLORS.ICON_BLUE}
                                        style={{ flexDirection: 'row-reverse', alignSelf: 'flex-start' }}
                                    />
                                    <RadioButton.Item
                                        label="Express"
                                        value="2"
                                        color={ComponentsStyles.COLORS.ICON_BLUE}
                                        style={{ flexDirection: 'row-reverse', alignSelf: 'flex-start' }}
                                    />
                                    <RadioButton.Item
                                        label="Some Day"
                                        value="3"
                                        color={ComponentsStyles.COLORS.ICON_BLUE}
                                        style={{ flexDirection: 'row-reverse', alignSelf: 'flex-start' }}
                                    />

                                </RadioButton.Group>

                            </View>


                            {/* <View style={{ height: 60, margin: 5 }}> */}
                            <View style={{
                                backgroundColor: ComponentsStyles.COLORS.BACKGROUND_COLOR, elevation: 10, margin: 10,
                                borderRadius: 5, justifyContent: 'center', alignItems: 'center'
                            }}>
                                <View style={styles.container}>
                                    <View style={styles.checkboxContainer}>
                                        <CheckBox
                                            value={isSelected}
                                            onValueChange={setSelection}
                                            style={styles.checkbox}
                                        />
                                        <Text style={styles.label}>Multiple Delivery Locations</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={{ backgroundColor: ComponentsStyles.COLORS.BACKGROUND_COLOR, elevation: 10, margin: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, color: 'black', fontWeight: '700' }}>Package Details</Text>

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>

                                        {/* <InputTextWithTopText
                                            exstyle={style.exstyle}
                                            is_ex={true}
                                            editable={true}
                                            ex="Payment Type"
                                            stateValue={Ptype}
                                            setState={(val) => setPtype(val)}
                                            style={style.detailsInputText}
                                        /> */}
                                        {/* {renderLabel()} */}
                                        <Dropdown
                                            style={[style.dropdown, isFocuspackage && { borderColor: 'blue' }]}
                                            placeholderStyle={style.placeholderStyle}
                                            selectedTextStyle={style.selectedTextStyle}
                                            inputSearchStyle={style.inputSearchStyle}
                                            iconStyle={style.iconStyle}
                                            data={packageTypeList}
                                            search
                                            maxHeight={300}
                                            labelField="description"
                                            valueField="id"
                                            placeholder={!isFocuspackage ? 'Select Package Type' : '...'}
                                            searchPlaceholder="Search..."
                                            value={packageTypes}
                                            onFocus={() => setisFocuspackage(true)}
                                            onBlur={() => setisFocuspackage(false)}
                                            onChange={item => {
                                                console.log(item.description, '&&&&', item.id);

                                                setpackageTypes(item.id);
                                                setisFocuspackage(false);
                                            }}
                                            renderLeftIcon={() => (
                                                <AntDesign
                                                    style={style.icon}
                                                    color={isFocuspackage ? 'blue' : 'black'}
                                                    name="Safety"
                                                    size={20}
                                                />
                                            )}
                                        />

                                    </View>


                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ flex: 1 }}>

                                        <InputTextWithTopText
                                            keyType="number-pad"
                                            exstyle={style.exstyle}
                                            is_ex={true}
                                            editable={true}
                                            ex="width *"
                                            stateValue={width}
                                            setState={(val) => setwidth(val)}
                                            style={style.detailsInputText}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>

                                        <InputTextWithTopText
                                            keyType="number-pad"
                                            exstyle={style.exstyle}
                                            is_ex={true}
                                            editable={true}
                                            ex="height *"
                                            stateValue={height}
                                            setState={(val) => setheight(val)}
                                            style={style.detailsInputText}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>

                                        <InputTextWithTopText
                                            keyType="number-pad"
                                            exstyle={style.exstyle}
                                            is_ex={true}
                                            editable={true}
                                            ex="length *"
                                            stateValue={lenght}
                                            setState={(val) => setlenght(val)}
                                            style={style.detailsInputText}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>

                                        <InputTextWithTopText
                                            keyType="number-pad"
                                            exstyle={style.exstyle}
                                            is_ex={true}
                                            editable={true}
                                            ex="weight(g) *"
                                            stateValue={weight}
                                            setState={(val) => setweight(val)}
                                            style={style.detailsInputText}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>

                                        <InputTextWithTopText
                                            keyType="number-pad"
                                            exstyle={style.exstyle}
                                            is_ex={true}
                                            editable={true}
                                            ex="No.pieces *"
                                            stateValue={NoofPieces}
                                            setState={(val) => setNoofPieces(val)}
                                            style={style.detailsInputText}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>

                                        <InputTextWithTopText
                                            keyType="number-pad"
                                            exstyle={style.exstyle}
                                            is_ex={true}
                                            editable={true}
                                            ex="No.Package *"
                                            stateValue={NoofPackages}
                                            setState={(val) => setNoofPackages(val)}
                                            style={style.detailsInputText}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>

                                        <InputTextWithTopText
                                            keyType="name-phone-pad"
                                            exstyle={style.exstyle}
                                            is_ex={true}
                                            editable={true}
                                            ex="Description"
                                            max={50}
                                            stateValue={Description}
                                            setState={(val) => setDescription(val)}
                                            style={style.detailsInputText}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>

                                        <InputTextWithTopText
                                            keyType="name-phone-pad"
                                            exstyle={style.exstyle}
                                            is_ex={true}
                                            editable={true}
                                            ex="Special Instruction"
                                            max={50}
                                            stateValue={Special}
                                            setState={(val) => setSpecial(val)}
                                            style={style.detailsInputText}
                                        />
                                    </View>

                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>

                                        {/* <InputTextWithTopText
                                            exstyle={style.exstyle}
                                            is_ex={true}
                                            editable={true}
                                            ex="Payment Type"
                                            stateValue={Ptype}
                                            setState={(val) => setPtype(val)}
                                            style={style.detailsInputText}
                                        /> */}
                                        {/* {renderLabel()} */}
                                        <Dropdown
                                            style={[style.dropdown, isFocusarea && { borderColor: 'blue' }]}
                                            placeholderStyle={style.placeholderStyle}
                                            selectedTextStyle={style.selectedTextStyle}
                                            inputSearchStyle={style.inputSearchStyle}
                                            iconStyle={style.iconStyle}
                                            data={areatypeList}
                                            search
                                            maxHeight={300}
                                            labelField="description"
                                            valueField="id"
                                            placeholder={!isFocusarea ? 'Select Area Type' : '...'}
                                            searchPlaceholder="Search..."
                                            value={valuearea}
                                            onFocus={() => setisFocusarea(true)}
                                            onBlur={() => setisFocusarea(false)}
                                            onChange={item => {
                                                console.log(item.id);

                                                setvaluearea(item.id);
                                                setisFocusarea(false);
                                            }}
                                            renderLeftIcon={() => (
                                                <AntDesign
                                                    style={style.icon}
                                                    color={isFocusarea ? 'blue' : 'black'}
                                                    name="Safety"
                                                    size={20}
                                                />
                                            )}
                                        />

                                    </View>


                                </View>

                            </View>
                            <View style={{ backgroundColor: ComponentsStyles.COLORS.BACKGROUND_COLOR, elevation: 10, margin: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, color: 'black', fontWeight: '700' }}>Receiver Details</Text>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1 }}>

                                        <InputTextWithTopText
                                            exstyle={style.exstyle}
                                            is_ex={true}
                                            editable={true}
                                            ex="Receiver Name *"
                                            stateValue={ReciverName}
                                            setState={(val) => setReciverName(val)}
                                            style={style.detailsInputText}
                                        />
                                    </View>

                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>

                                        <InputTextWithTopText
                                            exstyle={style.exstyle}
                                            is_ex={true}
                                            editable={true}
                                            ex="Contact Number *"
                                            max={10}
                                            keyType="number-pad"
                                            stateValue={mobile}
                                            setState={(val) => setmobile(val)}
                                            style={style.detailsInputText}
                                        />
                                    </View>

                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>

                                        <InputTextWithTopText
                                            exstyle={style.exstyle}
                                            is_ex={true}
                                            editable={true}
                                            ex="Distict  "
                                            stateValue={district}
                                            max={200}
                                            setState={(val) => setdistrict(val)}
                                            style={style.detailsInputText}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>

                                        <InputTextWithTopText
                                            exstyle={style.exstyle}
                                            is_ex={true}
                                            editable={true}
                                            ex="Main City  "
                                            max={200}
                                            stateValue={mainCity}
                                            setState={(val) => setmainCity(val)}
                                            style={style.detailsInputText}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <InputTextWithTopText
                                            exstyle={style.exstyle}
                                            is_ex={true}
                                            editable={true}
                                            ex="City"
                                            max={200}
                                            stateValue={city}
                                            setState={(val) => setcity(val)}
                                            style={style.detailsInputText}
                                        />
                                    </View>

                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>

                                        <InputTextWithTopText
                                            exstyle={style.exstyle}
                                            is_ex={true}
                                            editable={true}
                                            ex="Street & No * "
                                            max={200}
                                            stateValue={street}
                                            setState={(val) => setstreet(val)}
                                            style={style.detailsInputText}
                                        />
                                    </View>

                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>

                                        {/* <InputTextWithTopText
                                            exstyle={style.exstyle}
                                            is_ex={true}
                                            editable={true}
                                            ex="Payment Type"
                                            stateValue={Ptype}
                                            setState={(val) => setPtype(val)}
                                            style={style.detailsInputText}
                                        /> */}
                                        {/* {renderLabel()} */}
                                        <Dropdown
                                            style={[style.dropdown, isFocus && { borderColor: 'blue' }]}
                                            placeholderStyle={style.placeholderStyle}
                                            selectedTextStyle={style.selectedTextStyle}
                                            inputSearchStyle={style.inputSearchStyle}
                                            iconStyle={style.iconStyle}
                                            data={data}
                                            search
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            placeholder={!isFocus ? 'Select Payment Type' : '...'}
                                            searchPlaceholder="Search..."
                                            value={value}
                                            onFocus={() => setIsFocus(true)}
                                            onBlur={() => setIsFocus(false)}
                                            onChange={item => {
                                                //console.log("++++label++++",item.label);
                                                // console.log("=== value===",item.value);
                                                setValue(item.value);
                                                setPayModeType(item.label)
                                                setIsFocus(false);
                                            }}
                                            renderLeftIcon={() => (
                                                <AntDesign
                                                    style={style.icon}
                                                    color={isFocus ? 'blue' : 'black'}
                                                    name="Safety"
                                                    size={20}
                                                />
                                            )}
                                        />

                                    </View>


                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <ActionButton title="Add"
                                        onPress={() => Add_Details()}
                                        //onPress={() => ADD()}
                                        style={style.ButtonStyle}
                                        innerStyle={style.innerStyle}
                                    />
                                </View>

                            </View>

                        </View>
                    }
                    showsHorizontalScrollIndicator={false}
                    ListFooterComponent={
                        <View style={{ marginRight: 15 }}>
                            <View style={{ backgroundColor: ComponentsStyles.COLORS.BACKGROUND_COLOR, elevation: 10, margin: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>

                                <ActionButton title="Next"
                                    onPress={() => ActionNext()}
                                //onPress={ActionNext} 
                                />
                            </View>
                        </View>
                    }
                    ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={style.EmptyMassage}>No Added Packages</Text></View>}
                    data={InsertReciverDataList}
                    style={{ marginTop: 10, marginBottom: 130, }}
                    horizontal={false}
                    renderItem={({ item }) => {
                        return (

                            <View style={{ flexDirection: 'row', backgroundColor: ComponentsStyles.COLORS.DARK_GRAY, margin: 5, borderRadius: 5, marginRight: 30 }}>
                                <View style={{ flex: 3, height: 80 }}>
                                    <Text style={{ color: ComponentsStyles.COLORS.WHITE, fontSize: 20, marginLeft: 10, fontWeight: '600' }}>{item.recevier_name}</Text>
                                    <Text style={{ color: ComponentsStyles.COLORS.WHITE, fontSize: 15, marginLeft: 10, fontWeight: '500' }}>{item.recevier_address_1}</Text>
                                </View>
                                <View style={{ flex: 0.5, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        onPress={
                                            
                                            () => deleteItem(item.id, item.recevier_name)
                                            
                                        }>
                                        <IconB name="delete" size={27} color={ComponentsStyles.COLORS.WHITE} />
                                    </TouchableOpacity>

                                </View>

                                <View style={{ flex: 0.5, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        onPress={
                                            () => goInstancePickupPackgescreen(item.tracking_id)
                                        }>
                                        <IconB name="login" size={27} color={ComponentsStyles.COLORS.WHITE} />
                                    </TouchableOpacity>

                                </View>

                            </View>
                        );
                    }}
                    keyExtractor={item => `${item.id}`}
                />


            </View>



            {/* </ScrollView> */}
        </SafeAreaView>
    );
}
export default InstantPackageDetailsScreen;
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
        fontWeight: '400',
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