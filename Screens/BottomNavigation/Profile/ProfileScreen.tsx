import React, { useRef, useState, useEffect } from "react";
import { Alert, Animated, Platform, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, View } from "react-native";
import ActionButton from "../../../Components/ActionButton";
import ComponentsStyles from "../../../Constants/ComponentsStyles";
import styles from "./Style";
import RBSheet from "react-native-raw-bottom-sheet";
import IconB from 'react-native-vector-icons/AntDesign';
import IconD from 'react-native-vector-icons/MaterialIcons';
import IconC from 'react-native-vector-icons/EvilIcons';
import ProfileComponent from "../../../Components/ProfileComponent";
import InputTextWithTopText from "../../../Components/InputTextWithTopText";
import { getLastMeaterReading, ENDReadingProcess, InsertMeterReading } from "../../../SQLiteDatabase/DBControllers/MeterReadingController";
import { getLastMeterReadingValueType, saveMeterReading } from "../../../SQLiteDatabase/DBControllers/METER_READING_Controller";
import InputText from "../../../Components/InputText";
import moment from 'moment';
import { useFocusEffect } from "@react-navigation/native";
import { Get_All_User_Data } from "../../../SQLiteDatabase/DBControllers/USER_Controller";
import DropdownAlert from "react-native-dropdownalert";
import Spinner from "react-native-loading-spinner-overlay/lib";
import packageJson from '../../../package.json';
import RBSheetConfirmComponent from "../../../Components/RBSheetConfirmComponent";
import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorageConstants from "../../../Constants/AsyncStorageConstants";

var date = new Date().getDate(); //Current Date
var month = new Date().getMonth() + 1; //Current Month
var year = new Date().getFullYear(); //Current Year
var hours = new Date().getHours(); //Current Hours
var min = new Date().getMinutes(); //Current Minutes
var sec = new Date().getSeconds(); //Current Seconds


var readingType: any;
var yestadyReading: any;
var todayReading: any;
var starttime: any;
let validateReading: any;
let buttonType: any;
let readingID: any;

var datec = year + "-" + month + "-" + date;
var currenttime = hours + ":" + min + ":" + sec;

const ProfileScreen = (props: any) => {
    const refRBSheet = useRef();
    const [value, setvalue] = useState('');
    const [readtype, setReadtype] = useState('');
    const [headertext, setheadertext] = useState('');
    const [MeterReading, setMeaterReading] = useState('');
    const [ButtonTitle, setButtonTitle] = useState('');

    const [meterValue, setMeterValue] = useState('');
    const [ImgStatus, setImgStatus] = useState(false);
    const [lastMeterReadervalue, setlastMeterReadervalue] = useState('0');
    const [isLoading, setIsLoading] = useState(false);

    const [fullName, setfullName] = useState('');
    const [UseId, setUseId] = useState('');

    const [uName, setuName] = useState('');
    const [pword, setPword] = useState('');

    const [remark, setremark] = useState('');

    const {
        navigation, route
    } = props;
   

    let dropDownAlertRef = useRef();

    useEffect(() => {

       
       
      
    }, []);
    useFocusEffect(
        React.useCallback(() => {
            getLastReadervalue();
            setHeaderNames();
            GetHeadereDetails();
    
        }, []),
    );
    const meeterreading = () => {
        refRBSheet.current.open()
    }
 

    const GetHeadereDetails = () => {

        Get_All_User_Data( (result: any) => {
          
            console.log(result, '/////////////////////////');
            console.log(result, '/////////////////////////');
            setfullName(result[0].full_name)
            setUseId(result[0].user_id)
        });


    }
    const getLastReadervalue = () => {
        try {
          getLastMeterReadingValueType((result: any) => {
            console.log("//////<><><><________",result );

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
          console.log('ATTENDANCE GET LAST 2' + error);
        }
    };

    const setHeaderNames = () => {
    
        if (readtype == "OUT" || readtype == '') {
          setButtonTitle("Let's Get Day Start");
          
        } else {
            setButtonTitle("Let's Get Day End");
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
                            refRBSheet.current.close()
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
                refRBSheet.current.close()
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
                            refRBSheet.current.close()
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

    // const Logout =() =>{
    //    Alert.alert("Are you Sure You want to log out");

    // }

    const Handlelogout = async () => {
        Alert.alert("Are you Sure You want to log out");    
        console.log('Done')
    

        await AsyncStorage.clear();

        AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_LOGIN_USER_NAME, 'null')
        AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_LOGIN_USER_PASSWORD, 'null')
        AsyncStorage.setItem(AsyncStorageConstants.ASYNC_USER_ID, 'null')
 
        navigation.navigate('Login')
        
    }

    const HandleYes = () => {
        // if (ScreenType === 'Home') {
        //     navigation.navigate('MapScreen');
        // } else if (ScreenType === 'PackagesList') {
        //     navigation.navigate('BarcodeScanner');
        // } 
        Alert.alert("Are you Sure You want to log out");
    }
    const HandleNo = () => {
        console.log("aaaaaaaaaaaaaaaa");

        refRBSheet.current.close()
    }


    return (
        <SafeAreaView style={ComponentsStyles.CONTAINER}>
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
            {/* <Animated.View
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
            </Animated.View> */}

             
            <View style={{ height: 150, backgroundColor: ComponentsStyles.COLORS.BACKGROUND, flexDirection: 'row', borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}>
                <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
                    <View style={{ borderColor: 'white', borderWidth: 2, height: 100, width: 100, borderRadius: 90, marginBottom: 150 }}>

                    </View>
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={{ fontSize:20, marginTop: 10, color: ComponentsStyles.COLORS.WHITE,fontFamily:ComponentsStyles.FONT_FAMILY.BOLD }}>{fullName}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, color: ComponentsStyles.COLORS.WHITE, fontFamily:ComponentsStyles.FONT_FAMILY.SEMI_BOLD  }}>UserID : </Text>
                        <Text style={{ fontSize: 20, marginLeft: 15, color: ComponentsStyles.COLORS.WHITE, fontFamily:ComponentsStyles.FONT_FAMILY.SEMI_BOLD  }}>{UseId}</Text>
                    </View>
                    <Text style={{ fontSize: 20, marginTop: 10, color: ComponentsStyles.COLORS.WHITE, fontFamily:ComponentsStyles.FONT_FAMILY.BOLD  }}>View Profile</Text>
                </View>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ height: 60 }}>
                    <ActionButton
                        title="Check In/Out"
                        innerStyle={styles.Reachedbtn}
                        onPress={meeterreading}
                    />
                </View>
                {/* <ProfileComponent
                    Title="Menu 1"
                    IconName='menuunfold'
                />
                <ProfileComponent
                    Title="Menu 1"
                    IconName='menuunfold'
                /> */}
                {/* <View style={{ height: 2, backgroundColor: ComponentsStyles.COLORS.BLACK, marginTop: 5 }} /> */}
                <ProfileComponent
                    Title="About Us"
                    IconName='exclamationcircleo'
                />
                <ProfileComponent
                    Title="Setting"
                    IconName='setting'
                />
                {/* <View style={{ height: 2, backgroundColor: ComponentsStyles.COLORS.BLACK, marginTop: 5 }} /> */}
                <ProfileComponent
                    Title="Log out"
                    IconName='login'
                    onPress={Handlelogout}
                />
                <View style={{ marginTop: 20 }}></View>

                
            </ScrollView>
            <View style={{ height: 60, marginBottom: 70, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 17, color: ComponentsStyles.COLORS.ICON_BLUE ,fontFamily:ComponentsStyles.FONT_FAMILY.SEMI_BOLD}}>Privacy Policy | Terms of Service App</Text>
                <Text style={{fontFamily:ComponentsStyles.FONT_FAMILY.SEMI_BOLD}}>Version {packageJson.version}</Text>
            </View>
            <RBSheet
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
            >
                


                <View>
                    {/* <View style={{ height: 25, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.bottomheadertext}>Your Last Meter Reading</Text>
                    </View>
                    <View style={{ height: 35, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.bottomheaderMeetervalue}>{lastMeterReadervalue} KM</Text>
                    </View> */}
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <IconC name="location" size={30} color={ComponentsStyles.COLORS.BLACK} />
                        <Text style={styles.bottomheaderMeeterlocation}>Location :</Text>
                        <Text style={styles.bottomheaderMeeterlocationAdd}>Pristine pvt LTD</Text>
                    </View> */}


                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>

                        <Text style={styles.bottomheaderMeeterlocation}>Last Reading Value :</Text>
                        <Text style={styles.bottomheaderMeeterlocationAdd}>{lastMeterReadervalue} KM</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <IconC name="clock" size={30} color={ComponentsStyles.COLORS.BLACK} />
                        <Text style={styles.bottomheaderMeeterlocation}>Time :</Text>
                        <Text style={styles.bottomheaderMeeterlocationAdd}>{moment().utcOffset('+05:30').format(' hh:mm a')}</Text>
                    </View>
                    <View style={{ height: 35, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.bottomheaderMeetervalue}> Add the meter you are day</Text>
                    </View>
                    <View style={{
                        height: 35, alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10
                    }}>
                        {/* {<InputTextWithTopText
                            placeholder="Enter Value"
                            placeholderColor={ComponentsStyles.COLORS.BLACK}
                            is_ex={false}
                            style={styles.textinput}
                            ex="Phone No"
                            setState={(meterValue) => setMeterValue(meterValue)}
                            stateValue={meterValue} />} */}



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


                    <View style={{ height: 35, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                        <InputText
                            style={style.inputTextStyle}
                            placeholder="Enter Remark"
                            stateValue={remark}
                            max={10}
                            setState={remark => setremark(remark)}
                        />

                    </View>

                    {/* TEMP disabaled iMage UI */}

                    {/* {
                        <View style={{
                            height: 35, alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 10
                        }}>
                            <Text style={style.subtxt}>OR</Text>
                        </View>}


                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10
                    }}>
                        <Text style={style.modalTitle}>Upload the photo of the meter
                        </Text>
                    </View>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10
                    }}>
                        <Text style={style.modalTitle}>
                            time you are </Text>
                    </View>


                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10
                    }}>
                        <IconD name="cloud-upload" size={18} color={ComponentsStyles.COLORS.ICON_BLUE} />
                        <Text style={styles.bottomheaderMeeterimage}>Photo of Meter*</Text>
                    </View> */}



                    {/* <View style={{ height: 1, backgroundColor: ComponentsStyles.COLORS.BLACK }} /> */}

                  

                    <ActionButton
                        title={ButtonTitle}
                        
                        // onPress={() => handlePress()}
                        onPress={() => ValidateDayendvalue()}
                        style={{marginBottom: 70}}
                        //style={styles.actionbuttonBottom}
                    />
                </View>
               
            </RBSheet>
           

        </SafeAreaView>
    );

}

export default ProfileScreen;
const style = StyleSheet.create({
    modalMainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalSubContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 2,
    },

    modalRegularTitle: {
        fontFamily: ComponentsStyles.FONT_FAMILY.REGULAR,
        color: ComponentsStyles.COLORS.HEADER_BLACK,
        fontSize: 15,
        fontWeight: '100',
        marginRight: 5,
    },

    modalTitle: {
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        color: ComponentsStyles.COLORS.HEADER_BLACK,
        fontSize: 15,
    },
    txtUpload: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderStyle: 'dashed',
        width: '100%',
        marginTop: 25,
    },
    subtxt: {
        color: ComponentsStyles.COLORS.BLACK,
        fontSize: 13,
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        marginBottom: 10,
        marginTop: 10,
    },
    ActionButton: {
        marginTop: 20,
        marginBottom: 5,
    },

    inputTextStyle: {
        borderWidth: 0,
        paddingLeft: 0,
        marginLeft: 0,
        width: '100%',
        fontSize: 20,
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        color: ComponentsStyles.COLORS.HEADER_BLACK,
        borderBottomWidth: 0.5,
        borderColor: ComponentsStyles.COLORS.HEADER_BLACK,
        borderStyle: 'dashed',
        textAlign: 'center',
        margin: 5,
        borderRadius: 0,
    },
    scrollStyle: {
        marginBottom: 0,
        marginLeft: 13,
        marginRight: 13,
    },
});