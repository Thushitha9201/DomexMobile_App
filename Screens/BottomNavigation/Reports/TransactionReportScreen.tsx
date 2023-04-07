import React, { useState, useEffect, useRef } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import CheckButton from "../../../Components/CheckButton";
import TopHeader from "../../../Components/TopHeader";
import ComponentsStyles from "../../../Constants/ComponentsStyles";
import style from "./Style";
import { PickupList } from '../../../Constants/DummyData';
import ListComponents from "../../../Components/ListComponents";
import RBSheet from "react-native-raw-bottom-sheet";
import ActionButton from "../../../Components/ActionButton";
import RBSheetConfirmComponent from "../../../Components/RBSheetConfirmComponent";
import { useNavigation } from "@react-navigation/native";
import IconA from 'react-native-vector-icons/FontAwesome';
import IconB from 'react-native-vector-icons/MaterialCommunityIcons';
import Style from "./Style";
import { Get_Packages_Data, UpdateSellteled_Data, getslectedAmount } from '../../../SQLiteDatabase/DBControllers/PACKAGE_Contraller';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
// import CheckBox from '@react-native-community/checkbox';
import { Checkbox } from 'react-native-paper';
import DropdownAlert from "react-native-dropdownalert";
import AsyncStorageConstants from "../../../Constants/AsyncStorageConstants";
import AsyncStorage from '@react-native-community/async-storage'
import { getSelectAmountAsyncStorage } from "../../../Constants/AsynStorageFuntion";
let selectTypes: any;
let choosestatus: any;
const TransactionReportScreen = (props: any) => {

    const {
        navigation, route
    } = props;
    let dropDownAlertRef = useRef();
    const refRBSheet = useRef();
    const refRBSheet1 = useRef();
    // const navigation = useNavigation();
    const [Collected, setCollected] = useState(false);
    const [outstanding, setoutstanding] = useState(false);
    const [complete, setcomplete] = useState(false);
    const [incomplete, setincomplete] = useState(false);
    const [filterpickup, setfilterpickup] = useState(false);
    const [filterdelevary, setfilterdelevary] = useState(false);
    const [plaseholdertext, setplaseholdertext] = useState('');
    const [Headertext, setHeadertext] = useState('');
    const [filterText, setfilterText] = useState('');
    // const [selectTypes, setselectTypes] = useState('');
    // const [choosestatus, setchoosestatus] = useState('');
    const [loandingspinner, setloandingspinner] = useState(false);

    const [flatlistItem, setflatlistItem] = useState([]);
    const [SelectItems, setSelectItems]: any = useState([]);
    const [SelectAmount, setSelectAmount]: any = useState('');
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [checked, setChecked] = React.useState(false);


    const handleCollected = () => {

        // setloandingspinner(true);
        setCollected(true);
        setoutstanding(false);

        Get_Packages_Data(0, (result: any) => {
            setflatlistItem(result);

        });

    }
    const handleoutstanding = () => {
        setoutstanding(true);
        setCollected(false);
        Get_Packages_Data(1, (result: any) => {
            setflatlistItem(result);

        });

    }


    useEffect(() => {
        AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_SELECTAMOUNT, '0')
        setSelectAmount('0');
        setCollected(true);
        setoutstanding(false);

        getCurrnetDate_Data();


    }, [])

    const getCurrnetDate_Data = () => {
        Get_Packages_Data(0, (result: any) => {
            setflatlistItem(result);

        });
    }
    const HandleClick = (data: any) => {
        console.log(data);
        if (SelectItems.includes(data)) {
            console.log("if");

            setSelectItems(SelectItems.filter((tracking_id) => tracking_id !== data));
            getCkickDataAmount(1, data);
        } else {
            console.log("else");
            setSelectItems([...SelectItems, data]);
            getCkickDataAmount(2, data);
        }
    }
    const getCkickDataAmount = (data: any, trackid: any) => {
        if (data == 1) {
            //delete
            getslectedAmount(trackid, (result: any) => {

                getSelectAmountAsyncStorage().then(res => {
                    console.log(res, '???????????????????????????');
                    var asyncAmount = res;
                    let value2 = parseFloat(asyncAmount + "") - parseFloat(result[0].Package_amount);
                    AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_SELECTAMOUNT, value2.toString())
                    setSelectAmount(value2.toString());
                })
            });
        } else {
            // add
            getslectedAmount(trackid, (result: any) => {
                console.log(result, '?????++++++?????');
                getSelectAmountAsyncStorage().then(res => {
                    console.log(res, '???????????????????????????');
                    var asyncAmount = res;
                    let value1 = parseFloat(asyncAmount + "") + parseFloat(result[0].Package_amount);
                    AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_SELECTAMOUNT, value1.toString())
                    setSelectAmount(value1.toString());
                })



            });

        }



    }
    const SellteFuntion = () => {
        getSelectAmountAsyncStorage().then(res => {
            console.log(res, '???????????????????????????');

        })
        // for (let i = 0; i < SelectItems.length; i++) {
        //     console.log(SelectItems[i]);


        //     UpdateSellteled_Data(1, SelectItems[i], (result: any) => {

        //         getCurrnetDate_Data();

        //     });
        // }
        // dropDownAlertRef.alertWithType('success', 'Success', "Your Pakages Submited...!");
    }
    const backfuntion = () => {
        navigation.goBack();
        AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_SELECTAMOUNT, '0')
    }

    return (
        <SafeAreaView style={ComponentsStyles.CONTAINER}>
            <TopHeader
                HeaderText="Transaction History"
                Is_subtext={false}
                is_menu={false}
                Is_Search={false}
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
            <View style={style.container}>
                <CheckButton
                    onPress={handleCollected}
                    headerstyle={Collected === true ? style.selectedbutton : style.defaultbutton}
                    textstyle={Collected === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                    HeaderText="Collected"
                />
                <CheckButton
                    onPress={handleoutstanding}
                    headerstyle={outstanding === true ? style.selectedbutton : style.defaultbutton}
                    textstyle={outstanding === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                    HeaderText="Outstanding"
                />

            </View>
            <View style={{ height: 40, margin: 5, borderRadius: 5, borderColor:ComponentsStyles.COLORS.SECONDRY,borderWidth:2, flexDirection: 'row' }}>
                <View style={{flex:1,alignItems:'flex-start',justifyContent:'center',marginLeft:10}}>
                    <Text style={{fontSize:17,fontWeight:'bold',color:ComponentsStyles.COLORS.BLACK}}>Selected Amount</Text>
                </View>
                {/* //{SelectAmount} */}
                <View style={{flex:1,alignItems:'flex-end',justifyContent:'space-evenly',marginRight:'5%'}}>
                <Text style={{fontSize:17,fontWeight:'bold',color:ComponentsStyles.COLORS.BLACK}}>Rs : {SelectAmount} </Text>
                </View>

            </View>

            <View style={{ flex: 1, marginBottom: 60 }}>
                <View style={{ height: '85%' }}>
                    {Collected ?
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={style.EmptyMassage}>No data found</Text></View>}
                            data={flatlistItem}
                            style={{ marginTop: 0, marginBottom: 0, }}
                            horizontal={false}
                            renderItem={({ item }) => {
                                return (

                                    <View style={{ backgroundColor: ComponentsStyles.COLORS.WHITE, margin: 10, elevation: 15 }}>
                                        <View style={{ height: 40, flexDirection: 'row' }}>
                                            <View style={{ justifyContent: 'center', alignItems: 'flex-start', flex: 1, flexDirection: 'row', borderRadius: 5, backgroundColor: ComponentsStyles.COLORS.DARK_GRAY, height: 30 }}>
                                                <Text style={{ color: ComponentsStyles.COLORS.WHITE, fontSize: 14, fontWeight: '600' }}>Tracking ID:</Text>
                                                <Text style={{ color: ComponentsStyles.COLORS.WHITE, fontSize: 14, fontWeight: '600' }}>{item.tracking_id}</Text>
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, borderRadius: 5, marginLeft: 20, backgroundColor: ComponentsStyles.COLORS.SECONDRY, height: 30 }}>
                                                <Text style={{ color: ComponentsStyles.COLORS.WHITE, fontSize: 14, fontWeight: '600' }}>{item.job_stage == 1 ? "Pickup" : "Delivery"}</Text>
                                            </View>

                                        </View>
                                        <View style={{ height: 30, flexDirection: 'row' }}>
                                            <View style={{ flex: 2 }}>
                                                <Text style={{ marginLeft: 10, fontWeight: '800', fontSize: 14, color: ComponentsStyles.COLORS.BLACK }}>{item.recevier_name}</Text>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'center' }}>

                                                <Checkbox

                                                    color="#270DCB"
                                                    uncheckedColor="#270DCB"
                                                    status={SelectItems.includes(item.tracking_id) ? 'checked' : 'unchecked'}
                                                    onPress={() => HandleClick(item.tracking_id)}

                                                />
                                                {/* <CheckBox
                                                    disabled={false}
                                                    value={toggleCheckBox}
                                                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                                /> */}
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 5, marginBottom: 5, flexDirection: 'row' }}>
                                            <View style={{ flex: 2 }}>
                                                <Text style={{ marginLeft: 10, fontWeight: '500', fontSize: 14, color: ComponentsStyles.COLORS.BLACK }}>{item.recevier_address_1}</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ marginLeft: 10, fontWeight: '800', fontSize: 14, color: ComponentsStyles.COLORS.ICON_BLUE }}>LKR:{item.Package_amount}</Text>
                                            </View>
                                        </View>
                                    </View>
                                );
                            }}
                            keyExtractor={item => `${item.tracking_id}`}
                        />
                        : null}
                    {outstanding ?
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={style.EmptyMassage}>No data found</Text></View>}
                            // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                            data={flatlistItem}
                            style={{ marginTop: 10, marginBottom: 60, }}
                            horizontal={false}
                            renderItem={({ item }) => {
                                return (

                                    <View style={{ backgroundColor: ComponentsStyles.COLORS.WHITE, margin: 10, elevation: 15 }}>
                                        <View style={{ height: 40, flexDirection: 'row' }}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'row', borderRadius: 5, backgroundColor: ComponentsStyles.COLORS.DARK_GRAY, height: 30 }}>
                                                <Text style={{ color: ComponentsStyles.COLORS.WHITE, fontSize: 16, fontWeight: '600' }}>Tracking ID:</Text>
                                                <Text style={{ color: ComponentsStyles.COLORS.WHITE, fontSize: 16, fontWeight: '600' }}>{item.tracking_id}</Text>
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, borderRadius: 5, marginLeft: 20, backgroundColor: ComponentsStyles.COLORS.SECONDRY, height: 30 }}>
                                                <Text style={{ color: ComponentsStyles.COLORS.WHITE, fontSize: 16, fontWeight: '600' }}>{item.job_stage == 1 ? "Pickup" : "Delivery"}</Text>
                                            </View>

                                        </View>
                                        <View style={{ height: 30, flexDirection: 'row' }}>
                                            <View style={{ flex: 2 }}>
                                                <Text style={{ marginLeft: 10, fontWeight: '800', fontSize: 18, color: ComponentsStyles.COLORS.BLACK }}>{item.recevier_name}</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Checkbox

                                                    color="#270DCB"
                                                    uncheckedColor="#270DCB"
                                                    status={SelectItems.includes(item.tracking_id) ? 'checked' : 'unchecked'}
                                                    onPress={() => HandleClick(item.tracking_id)}

                                                />
                                            </View>
                                        </View>
                                        <View style={{ height: 40, flexDirection: 'row' }}>
                                            <View style={{ flex: 2 }}>
                                                <Text style={{ marginLeft: 10, fontWeight: '500', fontSize: 18 }}>{item.recevier_address_1}</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ marginLeft: 10, fontWeight: '800', fontSize: 18, color: ComponentsStyles.COLORS.ICON_BLUE }}>LKR:{item.Package_amount}</Text>
                                            </View>
                                        </View>
                                    </View>
                                );
                            }}
                            keyExtractor={item => `${item.tracking_id}`}
                        />
                        : null}
                </View>
                <View style={{ height: '20%', }}>
                    <ActionButton
                        style={style.ButtonStyle}
                        onPress={SellteFuntion}
                        title="Settle" />
                </View>
            </View>

            {/* <View style={{ height: '80%', backgroundColor: 'red' }}> */}

            {/* </View> */}
            {/* <View style={{ height: '20%', backgroundColor: 'blue' }}> </View> */}








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
export default TransactionReportScreen;