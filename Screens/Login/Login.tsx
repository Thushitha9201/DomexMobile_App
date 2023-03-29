import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    SafeAreaView,
    Platform,
    Animated, Keyboard,
    Image,
    ScrollView,
    Alert, Dimensions, TouchableOpacity
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import ComponentsStyles from "../../Constants/ComponentsStyles";
import InputTextWithTopText from "../../Components/InputTextWithTopText";
import style from "./style";
import IconA from 'react-native-vector-icons/Ionicons';
import * as DB from '../../SQLiteDatabase/DBService';
import ComponentsStyles from "../../Constants/ComponentsStyles";
import InputText from "../../Components/InputText";
import ActionButton from "../../Components/ActionButton";
import CheckBox from "@react-native-community/checkbox";
import { userLogin } from "../../Services/Api/UserAuthService";
import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorageConstants from "../../Constants/AsyncStorageConstants";
import { getLogin_Password, getLogin_UserName, getUser_ID } from "../../Constants/AsynStorageFuntion";
import { SAVE_PACAKGE_TYPE } from "../../SQLiteDatabase/DBControllers/PACAKGE_TYPE_Controller";
import { SAVE_AREA_TYPE } from "../../SQLiteDatabase/DBControllers/AREA_TYPE_Controller";
import { requestPermission } from "../../Services/permissionServise";
import { Genarate_Calulation } from "../../Constants/Calculation";
import packageJson from '../../package.json';
import axios from "axios";
import { SAVE_USER } from "../../SQLiteDatabase/DBControllers/USER_Controller";
import DeviceInfo from 'react-native-device-info';
import moment from "moment";
import DropdownAlert from "react-native-dropdownalert";
import { getLastMeterReadingValueType, saveMeterReading } from "../../SQLiteDatabase/DBControllers/METER_READING_Controller";

requestPermission();
let height = Dimensions.get("screen").height;
const Login = () => {
    const navigation = useNavigation();
    let dropDownAlertRef = useRef();

    const [uName, setuName] = useState('');
    const [pword, setPword] = useState('');
    const [deviceID, setdeviceID] = useState('');
    const [modalStyle, setModalStyle] = useState(new Animated.Value(height));
    const [isSelected, setSelection] = useState(false);

    const [meterValue, setMeterValue] = useState('');
    const [remark, setremark] = useState('');
    const [ReadingType, setReadingType] = useState('');
    const [ReadingDate, setReadingDate] = useState('');
    const [lastMeterReadervalue, setlastMeterReadervalue] = useState('0');


    const [ImgStatus, setImgStatus] = useState(false);
    const [image, setImage] = useState();
    const [isShowSweep, setIsShowSweep] = useState(true);
    const [LoginHeading, setLoginHeading] = useState('');
    const [ShowQuckAcess, setShowQuckAcess] = useState(false);


    const [MeaterBtnTitle, setMeaterBtnTitle] = useState('');




    useFocusEffect(
        React.useCallback(() => {

            DB.createTables();
            DB.tableIndexKey();
            DeviceInfo.getUniqueId().then((uniqueId) => {
                setdeviceID(uniqueId)
                // iOS: "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9"
                // Android: "dd96dec43fb81c97"
                // Windows: "{2cf7cb3c-da7a-d508-0d7f-696bb51185b4}"
                console.log('=================================================================r', uniqueId);
            });

            // setChecked(false);
            Get_LastMeterReading_Value();

            getLogin_Password().then(res => {
                console.log('============================111=====================================', res);

                if (res == null || res == "") {
                    setSelection(false);
                    console.log('Nulllllllllllllllllll*****************************');
                } else {
                    setPword(res);

                    getLogin_UserName().then(res => {
                        setuName(res);
                    })
                    setSelection(true);



                }

            })
        }, [])
    );


    const Get_LastMeterReading_Value = () => {
        getLastMeterReadingValueType((result: any) => {
            console.log("//////<><><><________", result);
            if (result.length > 0) {
                console.log('Avalable Meter Reading');
                var Date = result[0].Creation_date.split("T");

                setReadingType(result[0].readingType)
                setReadingDate(Date[0])

                if (result[0].readingType == "IN") {
                    console.log('meeter reading value eka ------IN');
                    setlastMeterReadervalue(result[0].reader_value)
                    setMeaterBtnTitle('End')
                } else {
                    setlastMeterReadervalue(result[0].reader_value)
                    setMeaterBtnTitle('Start')
                }


            } else {
                console.log('Not Avalable Meter Reading');

            }
        });
    }
    const HandleClick = () => {
        console.log("===***********************************=");

        setSelection(true);

    }
    const loginFuntion = () => {

        const URL = "http://servingcloudinc.com/domex/index.php/users/logIn";


        const data = new FormData();
        data.append('userId', uName);
        data.append('password', pword);
        data.append('deviceId', deviceID);
        data.append('loginDate', moment().utcOffset('+05:30').format('YYYY-MM-DD'));
        data.append('loginTime', moment().utcOffset('+05:30').format('kk:mm:ss'));
        data.append('versionCode', packageJson.version);


        console.log(data, '????????????????????????????');

        axios.post(URL, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log("[s][t][a][t][u][s][]", response.data.response);

                if (response.data.response == "ok") {

                    if (isSelected) {
                        AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_LOGIN_USER_NAME, uName)
                        AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_LOGIN_USER_PASSWORD, pword)
                    }
                    AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_LOGIN_USER_NAME, uName)
                    AsyncStorage.setItem(AsyncStorageConstants.ASYNC_USER_ID, response.data.sync_data.user_info.user_id)
                    const userData = [
                        {
                            id: "",
                            user_id: response.data.sync_data.user_info.user_id,
                            profile_name: response.data.sync_data.user_info.profile_name,
                            full_name: response.data.sync_data.user_info.full_name,
                            branch_id: response.data.sync_data.user_info.branch_id,
                            user_type: response.data.sync_data.user_info.user_type,
                            login_attempts: response.data.sync_data.user_info.login_attempts,
                            device_id: response.data.sync_data.user_info.device_id,
                            login_date: response.data.sync_data.user_info.login_date,
                            login_time: response.data.sync_data.user_info.login_time,
                            is_act: response.data.sync_data.user_info.is_act,
                            hash_key: response.data.sync_data.user_info.hash,
                        }
                    ]

                    SAVE_USER(userData, (result: any) => {
                        console.log(result, "-----------User-///////////////");

                    });

                    console.log(ReadingDate, '---1111---', moment().utcOffset('+05:30').format('YYYY-MM-DD'));

                    // if (ReadingDate == moment().utcOffset('+05:30').format('YYYY-MM-DD')) {
                        if (ReadingDate == "2023-03-30") {
                        navigation.navigate('NavigationScreen');
                    } else {
                        if (MeaterBtnTitle == "Start") {
                            setLoginHeading("LOGIN TO START THE DATE");
                            setShowQuckAcess(false);
                            slideInModal();
                        } else {
                            setLoginHeading("LOGIN TO END THE DATE");
                            setShowQuckAcess(false);
                            slideInModal();
                        }

                    }




                } else {
                    console.log("--------------", response.data.response);
                }


            })
            .catch((error) => {
                console.log("error .........", error);

                Alert.alert('error', error)

            })



    }
    const insertMeterReading = () => {
        console.log('fdddddddddddddddddddddd', meterValue, '------', remark);

        if (MeaterBtnTitle == "Start") {
            console.log('Continue Day end');
            try {
                getUser_ID().then(res => {

                    console.log("$$2222$$$$" + meterValue);
                    let mValue = parseFloat(meterValue);
                    var dateC = moment().utcOffset('+05:30').format('YYYY-MM-DD');
                    var timeC = moment().utcOffset('+05:30').format('kk:mm:ss');
                    var CreateTime = dateC + "T" + timeC;
                    let data = [
                        {

                            user_id: res,//need to get User INFo
                            readingType: 'IN',
                            Creation_date: CreateTime,
                            branch_id: 0,
                            longitude: 0.00,
                            latitude: 0.00,
                            reader_value: mValue,
                            remark: remark,
                            is_sync: 1,
                        },
                    ];
                    console.log(data, '||||||||||||||||||');

                    saveMeterReading(data, (result: any) => {
                        console.log(result, '/<><><> 1<><>');
                        slideOutModal();
                        // setMeaterBtnTitle('Start')
                        // setShowQuckAcess(false);
                        //     slideInModal();
                        // <Stack.Screen name="SyncScreen" component={SyncScreen} options={{ headerShown: false }} />

                        navigation.navigate('SyncScreen', {
                            ScreenType: 'Login',
                        })
                    });
                })




            } catch (error) {
                console.log('ATTENDANCE GET LAST 2' + error);
            }

        } else {
            console.log('Continue Day Start');
            try {
                getUser_ID().then(res => {

                    console.log("$$2222$$$$" + meterValue);
                    let mValue = parseFloat(meterValue);
                    var dateC = moment().utcOffset('+05:30').format('YYYY-MM-DD');
                    var timeC = moment().utcOffset('+05:30').format('kk:mm:ss');
                    var CreateTime = dateC + "T" + timeC;
                    let data = [
                        {

                            user_id: res,//need to get User INFo
                            readingType: 'OUT',
                            Creation_date: CreateTime,
                            branch_id: 0,
                            longitude: 0.00,
                            latitude: 0.00,
                            reader_value: mValue,
                            remark: remark,
                            is_sync: 1,
                        },
                    ];
                    console.log(data, '||||||||||||||||||');

                    saveMeterReading(data, (result: any) => {
                        console.log(result, '/<><><> 1<><>');
                        slideOutModal();
                        setMeaterBtnTitle('Start')
                        setShowQuckAcess(false);
                        slideInModal();
                        dropDownAlertRef.alertWithType('success', 'Success', "Day End Successfully... Please Day Start..!");

                    });
                })




            } catch (error) {
                console.log('ATTENDANCE GET LAST 2' + error);
            }
        }


    }
    //Temp UName, PWard validation function

    const Calculation = () => {
        console.log('sssssssssss');
        Genarate_Calulation(1).then(res => {
            console.log('============================111=====================================', res);


        })

    }
    const Validate = () => {
        // console.log(checked);

        if (uName == "" || pword == "") {
            console.log("empty");

            Alert.alert(
                "Please Enter Username and Password"
            );

        }
        else {

            loginFuntion();
        }


    }
    const slideInModal = () => {

        try {

            setIsShowSweep(false);
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


            setIsShowSweep(true);
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
        <SafeAreaView style={style.CONTAINER}>
             <DropdownAlert
                ref={(ref) => {
                    if (ref) {
                        dropDownAlertRef = ref;
                    }
                }}
            />

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



                <View style={style.modalCont}>

                    {/* ........................................ meter reading modal start.......................................... */}
                    <ScrollView
                        style={ComponentsStyles.CONTENTLOG}
                        showsVerticalScrollIndicator={true}>

                        <View style={style.modalMainContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>

                                <Text style={style.bottomheaderMeeterlocation}>Last Reading Value :</Text>
                                <Text style={style.bottomheaderMeeterlocationAdd}>{lastMeterReadervalue} KM</Text>
                            </View>
                            <View style={style.modalSubContainer}>
                                <IconA name='location-outline' size={20} />
                                <Text style={style.modalRegularTitle}>Location: </Text>
                                <Text style={style.modalTitle}>Colombo 05</Text>
                            </View>

                            <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", marginBottom: 10 }}>
                                <IconA name='time-outline' size={20} />
                                <Text style={style.modalRegularTitle}>Time: </Text>
                                <Text style={style.modalTitle}>{moment().utcOffset('+05:30').format(' hh:mm a')}</Text>
                            </View>

                            <View style={style.modalMainContainer}>
                                <Text style={{ fontFamily: ComponentsStyles.FONT_FAMILY.BOLD, color: ComponentsStyles.COLORS.HEADER_BLACK, fontSize: 15, marginTop: 10 }}>Add the meter you are starting from</Text>
                            </View>
                            <InputText
                                style={style.inputTextStyle}
                                placeholder="125KM"
                                stateValue={meterValue}
                                keyType='numeric'
                                setState={
                                    (meterValue) => setMeterValue(meterValue)}
                            />
                            <InputText
                                style={style.inputTextStyle}
                                placeholder="Enter Remark"
                                stateValue={remark}
                                setState={
                                    (remark) => setremark(remark)}
                            />
                            <Text style={style.subtxt}>OR</Text>

                            <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", }}>
                                <Text style={style.modalTitle}>Update the photo of the meter</Text>
                                <Text style={style.modalTitle}>time you are starting from</Text>
                            </View>

                            <View style={style.txtUpload}>
                                {
                                    image ?

                                        <View style={{ flexDirection: 'row', }}>
                                            <Text style={{ fontFamily: ComponentsStyles.FONT_FAMILY.BOLD, color: ComponentsStyles.COLORS.ORANGE, fontSize: 18, marginRight: 5 }}>Image Uploaded</Text>
                                            <IconA name='ios-checkmark-circle' size={20} color={ComponentsStyles.COLORS.LOW_BUTTON_GREEN} style={{ marginRight: 5 }} />
                                        </View>
                                        :
                                        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", }}>
                                            <IconA name='cloud-upload' size={20} color={ComponentsStyles.COLORS.ICON_BLUE} style={{ marginRight: 5 }} />
                                            <Text style={{ fontFamily: ComponentsStyles.FONT_FAMILY.BOLD, color: ComponentsStyles.COLORS.ICON_BLUE, fontSize: 18, marginRight: 5 }}>Photo of Meter*</Text>
                                        </TouchableOpacity>
                                }
                            </View>

                            <ActionButton
                                title={MeaterBtnTitle}
                                style={style.ActionButton}
                                onPress={() => insertMeterReading()}

                            />

                        </View>


                        {/* ........................................ meter reading modal end.......................................... */}

                    </ScrollView>
                </View>


            </Animated.View>
            <DropdownAlert
                ref={(ref) => {
                    if (ref) {
                        dropDownAlertRef = ref;
                    }
                }}
            />
            <View style={style.headerContainer}>
                <Text style={style.headerText}>Hello</Text>
                <Text style={style.headerText1}>Welcome Back..!</Text>
            </View>
            <DropdownAlert
                ref={(ref) => {
                    if (ref) {
                        dropDownAlertRef = ref;
                    }
                }}
            />
            <ScrollView>
                <View style={style.imagecontainer}>
                    <Image style={{ width: '100%', height: 200, }}
                        source={require('../../assets/images/delevsry.jpg')} />
                </View>
                <View style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={style.headerText}>Login</Text>
                </View>

                <InputText is_icon={true}
                    icon_name="user"
                    editable={true}
                    style={style.inputstyle}
                    bdrStyle={style.borderStyle}
                    stateValue={uName}
                    setState={(val: any) => setuName(val)}
                    placeholder="ENTER USER NAME"
                    placeholderColor={ComponentsStyles.COLORS.SECONDRY}
                />

                <InputText is_icon={true}
                    icon_name="lock"
                    editable={true}
                    style={style.inputstyle}
                    stateValue={pword}
                    setState={(val: any) => setPword(val)}
                    placeholder="ENTER PASSWORD"
                    secureTextEntry={true}
                    placeholderColor={ComponentsStyles.COLORS.SECONDRY}
                />
                <View style={{ height: 30, flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckBox
                            value={isSelected}
                            onValueChange={setSelection}
                            onChange={() => HandleClick()}
                            style={style.checkbox}
                        />
                        <Text style={{ marginTop: 5, marginRight: 20, color: ComponentsStyles.COLORS.ICON_BLUE }}>Remember Me</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Text style={{ marginRight: 20, color: ComponentsStyles.COLORS.ICON_BLUE }}>Forgot Password</Text>
                    </View>

                </View>
                <ActionButton
                    innerStyle={style.ButtonStyle}
                    onPress={Validate}
                    title="Login"
                />
                {/* <ActionButton
                    innerStyle={style.ButtonStyle}
                    onPress={Calculation}
                    title="Calculation"
                /> */}

            </ScrollView>

        </SafeAreaView>
    );
}
export default Login;


const styles = StyleSheet.create({
    container: {}
});