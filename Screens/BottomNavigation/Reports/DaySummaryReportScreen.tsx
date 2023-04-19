import React, { useState, useEffect, useRef } from "react";
import { Alert,Animated, Dimensions, FlatList, Keyboard, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CheckButton from "../../../Components/CheckButton";
import TopHeader from "../../../Components/TopHeader";
import ComponentsStyles from "../../../Constants/ComponentsStyles";
import style from "./DaySummryStyle";
import Style from "./Style";
import { PickupList } from '../../../Constants/DummyData';
import ListComponents from "../../../Components/ListComponents";
import ActionButton from "../../../Components/ActionButton";
import RBSheetConfirmComponent from "../../../Components/RBSheetConfirmComponent";
import { useNavigation } from "@react-navigation/native";
import IconA from 'react-native-vector-icons/FontAwesome';
import IconD from 'react-native-vector-icons/MaterialIcons';
import IconB from 'react-native-vector-icons/MaterialCommunityIcons';
import { getPickupsData, UpdatePendingOrderStart } from '../../../SQLiteDatabase/DBControllers/PickupsController';
import { DELIVERIY_MODULE, PICKUP_AND_DELIVERY_JOB_INCOMPLETE, PICKUP_AND_DELIVERY_JOB_COMPLETE, PICKUP_AND_DELIVERY_JOB_ONGOING, PICKUP_AND_DELIVERY_JOB_PENDING, PICKUP_MODULE } from "../../../Constants/ApiConstants";
import { getStatusOfPickups, getStatusOfDelivery, Get_DaySummaryReport } from "../../../SQLiteDatabase/DBControllers/PACKAGE_Contraller";
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import { DaySummeryReport } from '../../../Constants/DummyData';
import IconC from 'react-native-vector-icons/EvilIcons';
import InputTextWithTopText from "../../../Components/InputTextWithTopText";
import DashboradsummaryData from "../../../Components/DashboradsummaryData";
import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorageConstants from "../../../Constants/AsyncStorageConstants";
import DaysummaryReportData from "../../../Components/DaysummaryReportData";
import InputText from "../../../Components/InputText";
import DropdownAlert from "react-native-dropdownalert";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { getLastMeterReadingValueType, saveMeterReading } from "../../../SQLiteDatabase/DBControllers/METER_READING_Controller";
import moment from "moment";

let selectTypes: any;
let choosestatus: any;
let height = Dimensions.get("screen").height;

var currentDate = new Date();
var twoDigitMonth = ((currentDate.getMonth() + 1) >= 10) ? (currentDate.getMonth() + 1) : '0' + (currentDate.getMonth() + 1);
var twoDigitDate = ((currentDate.getDate()) >= 10) ? (currentDate.getDate()) : '0' + (currentDate.getDate());
var createdDateTo = currentDate.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate;
var create_Date = (createdDateTo);


const DaySummaryReportScreen = (props: any) => {

    const {
        navigation, route
    } = props;

    const refRBSheet = useRef();
    const [pickups, setpickups] = useState(false);
    const [returns, setreturns] = useState(false);
    const [delevary, setdelevary] = useState(false);

    // const [nodatamesseage, setnodatamesseage] = useState();

    const [number, setnumber] = useState(1);
    const [loandingspinner, setloandingspinner] = useState(false);
    const [value, setvalue] = useState('');
    const [flatlistItem, setflatlistItem] = useState([]);
    const [flatlisReturntItem, setflatlistReturnItem] = useState([]);
    //Pickup Status dispaly code usestate
    const [CompletePickup, setCompletePickup] = useState('');
    const [OngoingPickup, setOngoingPickup] = useState('');
    const [PendingPickup, setPendingPickup] = useState('');
    const [IncompletePickup, setIncompletePickup] = useState('');

    //Delevery Status dispaly code usestate
    const [CompleteDelevery, setCompleteDelevery] = useState('');
    const [OngoingDelevery, setOngoingDelevery] = useState('');
    const [PendingDelevery, setPendingDelevery] = useState('');
    const [IncompleteDelevery, setIncompleteDelevery] = useState('');

    //Meter Reading
    const [lastMeterReadervalue, setlastMeterReadervalue] = useState('0');
    const [readtype, setReadtype] = useState('');
    const [ButtonTitle, setButtonTitle] = useState('');
    const [meterValue, setMeterValue] = useState('');
    const [remark, setremark] = useState('');
    const [ImgStatus, setImgStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let dropDownAlertRef = useRef();

    //Animated View
    const [modalStyle, setModalStyle] = useState(new Animated.Value(height));


    const cklickPickup = () => {
        choosestatus = PICKUP_MODULE;
        setpickups(true)
        setreturns(false)
        setdelevary(false)
        Get_DaySummaryReport(choosestatus, PICKUP_AND_DELIVERY_JOB_ONGOING, (result: any) => {
            setflatlistItem(result);
            console.log(result, 'Pickuppp');
            //setnodatamesseage(result);
            setloandingspinner(false);
        });
    }
    const cklickreturn = () => {
        choosestatus = 0;
        setpickups(false)
        setreturns(true)
        setdelevary(false)
        Get_DaySummaryReport(0, 0, (result: any) => {
            setflatlistReturnItem(result);
            //setnodatamesseage(result);
            setloandingspinner(false);
        });
    }
    const cklickdelevary = () => {
        //choosestatus = DELIVERIY_MODULE;
        setflatlistItem([]);
        setpickups(false)
        setreturns(false)
        setdelevary(true)
        Get_DaySummaryReport(DELIVERIY_MODULE, PICKUP_AND_DELIVERY_JOB_ONGOING, (result: any) => {
            setflatlistItem(result);
            // setnodatamesseage(result);
            console.log("------>", result);
            console.log(result.length, 'mmmmmmmmmmmmmmmmmmm')
            setloandingspinner(false);
        });
    }

    const handlePress = () => {
        navigation.navigate('Login');
    }
    useEffect(() => {

        setflatlistItem([]);
        choosestatus = PICKUP_MODULE;
        setloandingspinner(true);

        selectTypes = PICKUP_AND_DELIVERY_JOB_ONGOING;
        AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_CHOOSETYPE, "1")




        setpickups(true)
        setreturns(false)
        setdelevary(false)

        //Meter reading
        getLastReadervalue();
        setHeaderNames();

        // Filter Option Load data
        // setfilterpickup(true)
        // setfilterdelevary(false)
        // setfilterText('Pickups')
        // setloandingspinner(false);


        Get_DaySummaryReport(PICKUP_MODULE, PICKUP_AND_DELIVERY_JOB_ONGOING, (result: any) => {
            setflatlistItem(result);
            console.log(result, '/////////////////////////');

            setloandingspinner(false);
        });

    }, [])
    const meaterreading = () => {

    }
   
    const backfuntion = () => {
        navigation.goBack();
    }

    const getIncrementNumber = () => {

        setnumber(+1);

    }

    //Pickup Status dispaly code

    getStatusOfPickups(PICKUP_MODULE, PICKUP_AND_DELIVERY_JOB_COMPLETE, (result: any) => {

        // console.log("^^^",result);
        const completepickupdata = result[0];
        //console.log('<<<<<<<<<<<<<<< show data --', completepickupdata.count);
        setCompletePickup(completepickupdata.count);

    });

    getStatusOfPickups(PICKUP_MODULE, PICKUP_AND_DELIVERY_JOB_ONGOING, (result: any) => {
        const ongoingpickupdata = result[0];
        setOngoingPickup(ongoingpickupdata.count);

    });

    //--------------------------complte pickupsand delivery count------------------------------

    getStatusOfPickups(PICKUP_MODULE, PICKUP_AND_DELIVERY_JOB_PENDING, (result: any) => {

        const pendingpickupdata = result[0];
        setPendingPickup(pendingpickupdata.count);

    });

    getStatusOfPickups(PICKUP_MODULE, PICKUP_AND_DELIVERY_JOB_INCOMPLETE, (result: any) => {
        const incompletepickupdata = result[0];
        setIncompletePickup(incompletepickupdata.count);

    });
    //

    //Delevery Status dispaly code
    getStatusOfDelivery(DELIVERIY_MODULE, PICKUP_AND_DELIVERY_JOB_COMPLETE, (result: any) => {
        const completedeliverydata = result[0];
        setCompleteDelevery(completedeliverydata.count);

    });

    getStatusOfDelivery(DELIVERIY_MODULE, PICKUP_AND_DELIVERY_JOB_ONGOING, (result: any) => {
        const ongoingdeliverydata = result[0];
        setOngoingDelevery(ongoingdeliverydata.count);

    });

    getStatusOfDelivery(DELIVERIY_MODULE, PICKUP_AND_DELIVERY_JOB_PENDING, (result: any) => {
        const pendingdeliverydata = result[0];
        setPendingDelevery(pendingdeliverydata.count);

    });

    getStatusOfDelivery(DELIVERIY_MODULE, PICKUP_AND_DELIVERY_JOB_ONGOING, (result: any) => {
        const incompletedeliverydata = result[0];
        setIncompleteDelevery(incompletedeliverydata.count);

    });

    //Meter Reading
    const setHeaderNames = () => {

        if (readtype == "OUT" || readtype == '') {
            setButtonTitle("Let's Get Day Start");

        } else {
            setButtonTitle("Let's Get Day End");
        }
    };

    const ValidateDayendvalue = () => {
        if (meterValue != '') {

            if (/^[0-9]+$/.test(meterValue)) {
                if (remark != '') {
                    if (parseInt(meterValue) >= parseInt(lastMeterReadervalue)) {
                        insertMeterReading();
                    } else {
                        dropDownAlertRef.alertWithType('Meter Reading Save Failed.Invalid Meter Value in Day End ', dropDownAlertRef.alertWithType,);
                    }
                } else {
                    dropDownAlertRef.alertWithType('pleas enter  remark ', dropDownAlertRef.alertWithType,);

                }
            } else {
                dropDownAlertRef.alertWithType('Please Enter only numeric characters.', dropDownAlertRef.alertWithType,);
            }

        } else {
            dropDownAlertRef.alertWithType('pleas enter meter valuve ', dropDownAlertRef.alertWithType,);
            console.log('Enter meater valuve');
        }
    };

    const insertMeterReading = () => {
        var _readingtype = '';
        var _status = 0;
        var _remark = remark;
        //  console.log("&&&&&&<>3<><>",readtype);

        if (readtype == 'OUT' || readtype == '') {
            _readingtype = 'IN';
            _status = 1;
        } else {
            _readingtype = 'OUT';
            _status = 2;
        }

        if (ImgStatus || meterValue != '') {
            setIsLoading(true);
            if (ImgStatus && meterValue != '') {
                setIsLoading(true);

                try {
                    //console.log("$$2222$$$$" +meterValue);
                    let mValue = parseFloat(meterValue);

                    let data = [
                        {

                            user_id: 1,//need to get User INFo
                            readingType: _readingtype,
                            Creation_date: moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss'),
                            branch_id: 0,
                            longitude: 0.00,
                            latitude: 0.00,
                            reader_value: mValue,
                            remark: _remark,
                            is_sync: 1,
                        },
                    ];

                    saveMeterReading(data, (result: any) => {
                        console.log(result, '/<><><> 1<><>');
                        setHeaderNames();
                        ClearFiled();

                        getLastReadervalue();
                        setIsLoading(false);

                        if (result === 'success') {
                            setIsLoading(false);

                            dropDownAlertRef.alertWithType(
                                'Attendance saved success ',
                                dropDownAlertRef.alertWithType,

                            );
                            // refRBSheet.current.close()
                            slideOutModal()
                        } else {
                            Alert.alert('Failed...!', 'Meter Reading Save Failed.', [
                                {
                                    text: 'OK',
                                    onPress: () => { },
                                },
                            ]);
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            } else if (ImgStatus) {
                // refRBSheet.current.close()
                slideOutModal()
            } else if (meterValue != '') {
                setIsLoading(true);
                try {

                    // console.log("$$$$$$" +meterValue);
                    let mValue = parseFloat(meterValue);
                    //console.log("$$******$$$$" +mValue);
                    let data = [
                        {

                            user_id: 1,//need to get User INFo
                            readingType: _readingtype,
                            Creation_date: moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss'),

                            branch_id: 0,
                            longitude: 0.00,
                            latitude: 0.00,
                            reader_value: mValue,
                            remark: _remark,
                            is_sync: 1,
                        },
                    ];


                    saveMeterReading(data, (result: any) => {
                        console.log(result, '/<><><> 2<><>');
                        setHeaderNames();
                        ClearFiled();
                        //setHeaderNames();
                        getLastReadervalue();



                        if (result === 'success') {
                            setIsLoading(false);
                            //setIsLoading(false);
                            dropDownAlertRef.alertWithType(
                                'Attendance saved success ',
                                dropDownAlertRef.alertWithType,
                            );
                            // refRBSheet.current.close()
                            slideOutModal()
                        } else {
                            Alert.alert('Failed...!', 'Meter Reading Save Failed.', [
                                {
                                    text: 'OK',
                                    onPress: () => { },
                                },
                            ]);
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            Alert.alert(
                'Warning...!',
                'Please Enter Meter Value or Submit a Photo of meter.',
                [
                    {
                        text: 'OK',
                        onPress: () => { },
                    },
                ],
            );
        }
    };


    const ClearFiled = () => {
        setMeterValue('');
        setremark('');
        setReadtype('');
        setlastMeterReadervalue('');
        //setButtonTitle('');

    };




    const getLastReadervalue = () => {
        try {
            getLastMeterReadingValueType((result: any) => {
                console.log("//////<><><><________", result);

                for (let i = 0; i < result.length; ++i) {
                    setlastMeterReadervalue(result[i].reader_value);
                    setReadtype(result[i].readingType);

                    //console.log("@@@1::::",readtype );
                    if (result[i].readingType == "OUT" || result[i].readingType == '') {

                        setButtonTitle("Let's Get Day Start");
                    } else {

                        setButtonTitle("Let's Get Day End");
                    }

                }
            });


        } catch (error) {
            console.log('ATTENDANCE GET LAST ' + error);
        }
    };

    //Animated View
    const slideInModal = () => {
        try {
            //setIsShowSweep(false);
            console.log('sampleIn');
            Animated.timing(modalStyle, {
                toValue: height / 3.2,
                duration: 500,
                useNativeDriver: false,
            }).start();

        } catch (error) {
            Alert.alert(error + "");
        }
    };
    //#endregion

    //#region SlideOutModal

    const slideOutModal = () => {
        try {
            //setIsShowSweep(true);
            Keyboard.dismiss();
            Animated.timing(modalStyle, {
                toValue: height,
                duration: 500,
                useNativeDriver: false,
            }).start();
        } catch (error) {
            Alert.alert(error + "");
        }
    };


    return (
        <SafeAreaView style={ComponentsStyles.CONTAINER}>
            <TopHeader
                HeaderText="Day Summary Report"
                Is_subtext={false}
                is_menu={false}
                Is_Search={false}
                onPress1={meaterreading}
                onPress={backfuntion}
                SubText="Let’s Start the journey!"
            />
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

            <View>
                <View style={{ height: '72%' }}>
                    <View style={{ height: 'auto', borderRadius: 5, elevation: 10, backgroundColor: ComponentsStyles.COLORS.WHITE, margin: 10 }}>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ color: 'black', fontSize: 12, marginLeft: 10, fontWeight: '600' }}>Courier Name :</Text>
                            <Text style={{ color: ComponentsStyles.COLORS.ICON_BLUE, fontSize: 12, marginLeft: 10, fontWeight: '600' }}>Test</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ color: 'black', fontSize: 12, marginLeft: 10, fontWeight: '600' }}>Date :</Text>
                            <Text style={{ color: ComponentsStyles.COLORS.ICON_BLUE, fontSize: 12, marginLeft: 10, fontWeight: '600' }}>{create_Date}</Text>
                        </View>

                        {pickups ?
                            <><View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: 'black', fontSize: 12, marginLeft: 10, marginTop: 5, marginBottom: 5, fontWeight: '600' }}>Today</Text>
                            </View><><View style={{ flexDirection: 'row' }}>

                                <DaysummaryReportData HeaderText3="Ongoing Pickups:" HeaderText4={OngoingPickup} />
                                <DaysummaryReportData HeaderText3="Complete Pickups:" HeaderText4={CompletePickup} />

                            </View><View style={{ flexDirection: 'row' }}>

                                        <DaysummaryReportData HeaderText3="Incomplete Pickups:" HeaderText4={IncompletePickup} />
                                        <DaysummaryReportData HeaderText3="Pending Pickups:" HeaderText4={PendingPickup} />
                                    </View></></>
                            : null}

                        {delevary ?
                            <><View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: 'black', fontSize: 12, marginLeft: 10, marginTop: 5, marginBottom: 5, fontWeight: '600' }}>Today</Text>
                            </View><><View style={{ flexDirection: 'row' }}>

                                <DaysummaryReportData HeaderText3="Ongoing Delivery:" HeaderText4={OngoingDelevery} />
                                <DaysummaryReportData HeaderText3="Complete Delivery:" HeaderText4={CompleteDelevery} />


                            </View><View style={{ flexDirection: 'row', }}>
                                        <DaysummaryReportData HeaderText3="Incomplete Delivery:" HeaderText4={IncompleteDelevery} />
                                        <DaysummaryReportData HeaderText3="Pending Delivery:" HeaderText4={PendingDelevery} />
                                    </View></></>
                            : null}

                        {/* <View style={{ flexDirection: 'row'}}>
                            <DashboradsummaryData HeaderText3="Today Pending" HeaderText4={TotalPickupCount} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <DashboradsummaryData HeaderText3="Today Incomplete" HeaderText4={TotalPickupCount} />
                        </View> */}
                    </View>


                    <View style={{ height: 50, flexDirection: 'row' }}>
                        <CheckButton
                            onPress={cklickPickup}
                            headerstyle={pickups === true ? style.selectedbutton : style.defaultbutton}
                            textstyle={pickups === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                            HeaderText="Pikups"
                        />
                        <CheckButton
                            onPress={cklickreturn}
                            headerstyle={returns === true ? style.selectedbutton : style.defaultbutton}
                            textstyle={returns === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                            HeaderText="Returns"
                        />
                        <CheckButton
                            onPress={cklickdelevary}
                            headerstyle={delevary === true ? style.selectedbutton : style.defaultbutton}
                            textstyle={delevary === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                            HeaderText="Deliveries"
                        />
                    </View>

                    <View style={{ margin: 5 }}>

                        {pickups ?
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={ComponentsStyles.EmptyMassage}>No data found</Text ></View>}
                                data={flatlistItem}
                                style={{ marginTop: 10, marginBottom: 0, }}
                                horizontal={false}
                                renderItem={({ item, index }) => {
                                    return (

                                        <View style={{ flexDirection: 'row', backgroundColor: ComponentsStyles.COLORS.WHITE, borderRadius: 5, elevation: 10, height: 40, borderEndColor: 'black' }}>
                                            <View style={{ flex: 0.3, alignItems: 'flex-start', justifyContent: 'center' }}>
                                                <Text style={{ color: ComponentsStyles.COLORS.BLACK }}>{index + 1}</Text>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                                <Text style={{ color: ComponentsStyles.COLORS.BLACK }}>{item.tracking_id}</Text>
                                            </View>
                                            {/* <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={{ color: ComponentsStyles.COLORS.BLACK }}>{item.recevier_name}</Text>
                                    </View> */}
                                            <View style={{ flex: 2, alignItems: 'flex-start', justifyContent: 'center' }}>
                                                <Text style={{ color: ComponentsStyles.COLORS.BLACK }}>{item.recevier_address_1}</Text>
                                            </View>
                                            <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'center', backgroundColor: ComponentsStyles.COLORS.DARK_GRAY, margin: 5, borderRadius: 8 }}>
                                                <Text style={{ color: ComponentsStyles.COLORS.WHITE, fontWeight: 'bold' }}>{item.Payment_Mode_Des}</Text>
                                            </View>

                                        </View>
                                    );
                                }}
                                keyExtractor={item => `${item.tracking_id}`}
                            />
                            : null}

                        {returns ?
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{flatlistItem.length == 0 ? <Text style={ComponentsStyles.EmptyMassage}>No data found</Text > : null}</View>}
                                data={flatlisReturntItem}
                                style={{ marginTop: 10, marginBottom: 0, }}
                                horizontal={false}
                                renderItem={({ item, index }) => {
                                    return (

                                        <View style={{ flexDirection: 'row', backgroundColor: ComponentsStyles.COLORS.WHITE, borderRadius: 5, elevation: 10, height: 40, borderEndColor: 'black' }}>
                                            <View style={{ flex: 0.3, alignItems: 'flex-start', justifyContent: 'center' }}>
                                                {/* <Text style={{ color: ComponentsStyles.COLORS.BLACK }}>{item.id}</Text> */}
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                                <Text style={{ color: ComponentsStyles.COLORS.BLACK }}>{index + 1}</Text>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                                <Text style={{ color: ComponentsStyles.COLORS.BLACK }}>{item.recevier_name}</Text>
                                            </View>
                                            <View style={{ flex: 2, alignItems: 'flex-start', justifyContent: 'center' }}>
                                                <Text style={{ color: ComponentsStyles.COLORS.BLACK }}>{item.recevier_address_1}</Text>
                                            </View>
                                            <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ color: ComponentsStyles.COLORS.BLACK }}>{item.Payment_Mode_Des}</Text>
                                            </View>

                                        </View>
                                    );
                                }}
                                keyExtractor={item => `${item.tracking_id}`}
                            />
                            : null}

                        {delevary ?
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{flatlistItem.length == 0 ? <Text style={ComponentsStyles.EmptyMassage}>No data found</Text > : null}</View>}

                                data={flatlistItem}
                                style={{ marginTop: 10, marginBottom: 0, }}
                                horizontal={false}
                                renderItem={({ item, index }) => {
                                    return (

                                        <View style={{ flexDirection: 'row', backgroundColor: ComponentsStyles.COLORS.WHITE, borderRadius: 5, elevation: 10, height: 40, borderEndColor: 'black' }}>
                                            <View style={{ flex: 0.3, alignItems: 'flex-start', justifyContent: 'center' }}>
                                                {/* <Text style={{ color: ComponentsStyles.COLORS.BLACK }}>{item.id}</Text> */}
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                                <Text style={{ color: ComponentsStyles.COLORS.BLACK }}>{index + 1}</Text>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                                <Text style={{ color: ComponentsStyles.COLORS.BLACK }}>{item.recevier_name}</Text>
                                            </View>
                                            <View style={{ flex: 2, alignItems: 'flex-start', justifyContent: 'center' }}>
                                                <Text style={{ color: ComponentsStyles.COLORS.BLACK }}>{item.recevier_address_1}</Text>
                                            </View>
                                            <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ color: ComponentsStyles.COLORS.BLACK }}>{item.Payment_Mode_Des}</Text>
                                            </View>

                                        </View>
                                    );
                                }}
                                keyExtractor={item => `${item.tracking_id}`}
                            />
                            : null}

                        {/* {Pikups ?
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={style.EmptyMassage}>No data found</Text></View>}
                    data={flatlistItem}
                    style={{ marginTop: 10, marginBottom: 60, }}
                    horizontal={false}
                    renderItem={({ item }) => {
                        return (

                            <ListComponents
                                HeaderText1={item.tracking_id}
                                HeaderText2={item.job_stage == 1 ? item.recevier_name : item.sender_name}  //need to load real data /this is dummy
                                HeaderText3={item.job_stage == 1 ? item.recevier_address_1 : item.sender_address_1}//need to load real data /this is dummy
                                isdescription={true}
                                isActionbutton={true}
                                iscorrecticons={false}
                                isqtyicons={false}
                                description={item.job_stage == 1 ? "Reciver Details" : "Delivery Details"}
                                iconName="log-in-outline"
                                BtnText="Attend"
                                onPress={() => Clicklistdata(item.tracking_id)}
                            />
                        );
                    }}
                    keyExtractor={item => `${item.tracking_id}`}
                />
                : null} */}



                    </View>


                </View>
                <View style={{ height: '15%', marginBottom: 60 }}>
                    <ActionButton
                        onPress={slideInModal}
                        style={style.ButtonStyle}
                        title={ButtonTitle} />
                </View>
                <Animated.View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    top: modalStyle,
                    backgroundColor: '#fff',
                    zIndex: 20,
                    borderRadius: 10,
                    elevation: 20,
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginLeft: 0,
                    ...Platform.select({
                        ios: {
                            paddingTop: 10
                        }
                    })
                }}>
                {/* <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    closeDuration={250}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "transparent", height: 60
                        },
                        draggableIcon: {
                            backgroundColor: "#000"
                        },
                        container: {
                            height: '67%',
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                            borderWidth: 1,
                            borderColor: ComponentsStyles.COLORS.SECONDRY

                        },
                    }}
                > */}

                    <View>
                        {/* <View style={{ height: 25, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={style.bottomheadertext}>Your Last Meter Reading</Text>
                    </View>
                    <View style={{ height: 35, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={style.bottomheaderMeetervalue}>10 KM</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <IconC name="location" size={30} color={ComponentsStyles.COLORS.BLACK} />
                        <Text style={style.bottomheaderMeeterlocation}>Location :</Text>
                        <Text style={style.bottomheaderMeeterlocationAdd}>Pristine pvt LTD</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <IconC name="clock" size={30} color={ComponentsStyles.COLORS.BLACK} />
                        <Text style={style.bottomheaderMeeterlocation}>Time :</Text>
                        <Text style={style.bottomheaderMeeterlocationAdd}>12.45AM</Text>
                    </View>
                    <View style={{ height: 35, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={style.bottomheadertext}>Add the Meter you are 150 from</Text>
                    </View>
                    <View style={{ height: 35, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                        <InputTextWithTopText
                            placeholder="Add Your Meter Value"
                            placeholderColor={ComponentsStyles.COLORS.BLACK}
                            is_ex={false}
                            style={style.textinput}
                            ex="Phone No"
                            setState={(val) => setvalue(val)}
                            stateValue={value} />
                    </View>
                    <View style={{ height: 1, backgroundColor: ComponentsStyles.COLORS.BLACK }} />
                    <View style={{ height: 35, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <Text style={style.bottomheadertext}>OR</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <Text style={style.bottomheadertext}>Upload the photo of the meter
                            time you are starting from</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <IconD name="cloud-upload" size={30} color={ComponentsStyles.COLORS.ICON_BLUE} />
                        <Text style={style.bottomheaderMeeterimage}>Photo of Meter*</Text>
                    </View> */}
                        {/* <View style={{ height: 1, backgroundColor: ComponentsStyles.COLORS.BLACK }} /> */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>

                            <Text style={style.bottomheaderMeeterlocation}>Last Reading Value :</Text>
                            <Text style={style.bottomheaderMeeterlocationAdd}>{lastMeterReadervalue} KM</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                            <IconC name="clock" size={30} color={ComponentsStyles.COLORS.BLACK} />
                            <Text style={style.bottomheaderMeeterlocation}>Time :</Text>
                            <Text style={style.bottomheaderMeeterlocationAdd}>{moment().utcOffset('+05:30').format(' hh:mm a')}</Text>
                        </View>
                        <View style={{ height: 35, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={style.bottomheaderMeetervalue}> Add the meter you are day</Text>
                        </View>
                        <View style={{
                            height: 35, alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 10
                        }}>

                            <InputText
                                style={style.inputTextStyle}
                                placeholder="125KM"
                                onFocus={() => ValidateDayendvalue()}
                                stateValue={meterValue}
                                keyType="numeric"
                                max={4}
                                setState={meterValue => setMeterValue(meterValue)}
                            />

                        </View>


                        <View style={{ height: 35, alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 5 }}>
                            <InputText
                                style={style.inputTextStyle}
                                placeholder="Enter Remark"
                                stateValue={remark}
                                max={15}
                                setState={remark => setremark(remark)}
                            />

                        </View>

                        <View style={{ height: 35, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                            <Text style={style.bottomheadertext}>OR</Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                            <Text style={style.bottomheadertext}>Upload the photo of the meter
                                time you are starting from</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                            <IconD name="cloud-upload" size={30} color={ComponentsStyles.COLORS.ICON_BLUE} />
                            <Text style={style.bottomheaderMeeterimage}>Photo of Meter*</Text>
                        </View>

                        {/* <View style={{ height: 1, backgroundColor: ComponentsStyles.COLORS.BLACK }} /> */}



                        <ActionButton
                            title={ButtonTitle}

                            // onPress={() => handlePress()}
                            onPress={() => ValidateDayendvalue()}
                            //style={{marginBottom: 70, }}
                            style={style.actionbuttonBottom}
                        />
                    </View>

                {/* </RBSheet> */}
            </Animated.View>
            </View>








            <OrientationLoadingOverlay
                visible={loandingspinner}
                color={ComponentsStyles.COLORS.WHITE}
                indicatorSize="large"
                messageFontSize={16}
                message="Loading..."
            />
        </SafeAreaView>
    );

}
export default DaySummaryReportScreen;