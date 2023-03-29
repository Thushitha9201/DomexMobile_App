import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import ActionButton from "../../../Components/ActionButton";
import TopHeader from "../../../Components/TopHeader";
import ComponentsStyles from "../../../Constants/ComponentsStyles";
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import { Get_Packages_Specific_Data } from '../../../SQLiteDatabase/DBControllers/PACKAGE_Contraller';
import { getTrackingIDAsyncStorage } from '../../../Constants/AsynStorageFuntion';
import RBSheet from "react-native-raw-bottom-sheet";
import RBSheetConfirmComponent from "../../../Components/RBSheetConfirmComponent";
import { getSelectTypeAsyncStorage } from '../../../Constants/AsynStorageFuntion';
var TrackingID: any;
var moduleType: any;
const PaymentSceen = (props: any) => {
    const {
        navigation, route
    } = props;
    const refRBSheet = useRef();
    const [loandingspinner, setloandingspinner] = useState(false);
    const [temporyActive, settemporyActive] = useState(false);

    const [temporyCredit, setttemporyCredit] = useState('');
    const [specialIntroduction, setspecialIntroduction] = useState('');
    const [NoofPackaages, setNoofPackaages] = useState('');
    const [NoofPieces, setNoofPieces] = useState('');
    const [Reciername, setReciername] = useState('');
    const [PType, setPType] = useState('');
    const [PackagePrice, setPackagePrice] = useState('');


    const [CurrentOutstanding, setCurrentOutstanding] = useState('');
    const [BalanceCheck, setBalanceCheck] = useState(false);
    const [BalanceAmount, setBalanceAmount] = useState('');
    const [checkTemportButton, setcheckTemportButton] = useState(false);



    const [cash, setcash] = useState(false);
    const [COD, setCOD] = useState(false);
    const [Ecom, setEcom] = useState(false);
    const [Credit, setCredit] = useState(false);

    const [pickupTypes, setpickupTypes] = useState(false);

    const backfuntion = () => {
        navigation.goBack();
    }
    const HandleYesCollect = () => {
        navigation.navigate('PickupandDelevaryScreen');

    }
    const HandleNoCollect = () => {
        refRBSheet.current.close()
    }

    const TakeTemporyCredit = () => {

        console.log(CurrentOutstanding,'----',PackagePrice);

        let balance = parseFloat(CurrentOutstanding)+parseFloat(PackagePrice);
        setBalanceAmount(balance+"");

        
        setBalanceCheck(true);
        setcheckTemportButton(false);

    }
    const CompleteProcess = () => {
        navigation.navigate('SignatureScreen');
    }

    useEffect(() => {
        // setloandingspinner(true);
        //set packages Data
        getTrackingIDAsyncStorage().then(res => {
            getReciverData(res);
            TrackingID = res;

            console.log(TrackingID, '-----------------');

        })
        getSelectTypeAsyncStorage().then(res => {
            console.log(res, ';;;;;;444444444;;;;;;;;;;;;;;;;;;;;;');
            moduleType = res;
        })





    }, []);
    const getReciverData = (TrackingID: any) => {
        Get_Packages_Specific_Data(TrackingID, (result: any) => {
            console.log(result, "/////////////////////");
            if (moduleType === "1") {
                // pickup
                setpickupTypes(true)
                if (result[0].Payment_Mode_Des === "CASH") {


                    console.log('++++++++++++++', result[0].Tempory_Credit_Status);

                    if (result[0].Tempory_Credit_Status == 1) {
                        setBalanceCheck(false);
                        setcheckTemportButton(true);
                        console.log('+++++okkkkkkkk+++++++++', result[0].Tempory_Credit_Status);
                        settemporyActive(true);
                        setcash(true);
                        setCOD(false);
                        setEcom(false);
                        setCredit(false);
                    } else {

                        setcheckTemportButton(false);
                        settemporyActive(false);
                        setcash(true);
                        setCOD(false);
                        setEcom(false);
                        setCredit(false);
                    }

                } else if (result[0].Payment_Mode_Des === "Credit") {
                    console.log("credit");
                    setcash(false);
                    setCOD(false);
                    setEcom(false);
                    setCredit(true);
                } else if (result.rows.item(0).PType === "ECOM") {
                    console.log("ecom");
                    setcash(false);
                    setCOD(false);
                    setEcom(true);
                    setCredit(false);
                } else if (result.rows.item(0).PType === "COD") {
                    console.log("cod");
                    setcash(false);
                    setCOD(true);
                    setEcom(false);
                    setCredit(false);
                }
            } else if (moduleType === "2") {

                console.log('DELEVARY');

                // Delevary
                setpickupTypes(false)
                settemporyActive(false);
                setcash(true);
                setCOD(false);
                setEcom(false);
                setCredit(false);
                // if (result.rows.item(0).PType === "Cash") {
                //     if (result.rows.item(0).temporyCredit === "YES") {

                //         settemporyActive(false);
                //         setcash(true);
                //         setCOD(false);
                //         setEcom(false);
                //         setCredit(false);
                //     } else {
                //         settemporyActive(false);
                //         setcash(true);
                //         setCOD(false);
                //         setEcom(false);
                //         setCredit(false);
                //     }

                // } else if (result.rows.item(0).PType === "Credit") {
                //     console.log("credit");
                //     setcash(false);
                //     setCOD(false);
                //     setEcom(false);
                //     setCredit(true);
                // } else if (result.rows.item(0).PType === "ECOM") {
                //     console.log("ecom");
                //     setcash(false);
                //     setCOD(false);
                //     setEcom(true);
                //     setCredit(false);
                // } else if (result.rows.item(0).PType === "COD") {
                //     console.log("cod");
                //     setcash(false);
                //     setCOD(true);
                //     setEcom(false);
                //     setCredit(false);
                // }
            }





            setReciername(result[0].recevier_name)
            if (result[0].Tempory_Credit_Status == 1) {
                setttemporyCredit('Avalable');
                setCurrentOutstanding(result[0].Tempory_Credit_Outstanding)
            } else {
                setttemporyCredit('Not Avalable');
            }

            setspecialIntroduction(result[0].recevier_name)
            setNoofPackaages(result[0].package_count)
            setNoofPieces(result[0].pieces_count)
            setPackagePrice(result[0].Package_amount)
            setPType(result[0].Payment_Mode_Des)

            // setloandingspinner(false);
        });

    }

    const collectPayment = () => {
        refRBSheet.current.open()
    }
    return (
        <SafeAreaView style={ComponentsStyles.CONTAINER}>
            <TopHeader
                HeaderText="Payment"
                Is_subtext={false}
                is_menu={false}
                onPress={backfuntion}
                Is_Search={false}
            />
            <ScrollView>
                <View style={{ flexDirection: 'column', marginBottom: 60 }}>
                    <View style={{ flexDirection: 'row', margin: 5, backgroundColor: ComponentsStyles.COLORS.WHITE, elevation: 8, height: 40 }}>
                        <View style={{ flex: 1, justifyContent: 'center', marginLeft: 5 }}>
                            <Text style={{ fontSize: 18, fontFamily: ComponentsStyles.FONT_FAMILY.BOLD }}>Tracking ID</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD }}>{TrackingID}</Text>
                        </View>
                    </View>
                    <View style={{ margin: 5, backgroundColor: ComponentsStyles.COLORS.WHITE, elevation: 8, marginTop: 10, paddingBottom: 10 }}>
                        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
                            <Text style={{ fontSize: 18, fontFamily: ComponentsStyles.FONT_FAMILY.BOLD, flex: 1 }}>Item Type</Text>
                            <Text style={{ fontSize: 18, fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD, flex: 1 }}>{specialIntroduction}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
                            <Text style={{ fontSize: 18, fontFamily: ComponentsStyles.FONT_FAMILY.BOLD, flex: 1 }}>Packages</Text>
                            <Text style={{ fontSize: 18, fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD, flex: 1 }}>{NoofPackaages}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
                            <Text style={{ fontSize: 18, fontFamily: ComponentsStyles.FONT_FAMILY.BOLD, flex: 1 }}>Pieces</Text>
                            <Text style={{ fontSize: 18, fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD, flex: 1 }}>{NoofPieces}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
                            <Text style={{ fontSize: 18, fontFamily: ComponentsStyles.FONT_FAMILY.BOLD, flex: 1 }}>Receiver Name</Text>
                            <Text style={{ fontSize: 18, fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD, flex: 1 }}>{Reciername}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
                            <Text style={{ fontSize: 18, fontFamily: ComponentsStyles.FONT_FAMILY.BOLD, flex: 1 }}>Payment Type</Text>
                            <Text style={{ fontSize: 18, fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD, flex: 1 }}>{PType}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', margin: 5, backgroundColor: ComponentsStyles.COLORS.WHITE, elevation: 8, height: 40 }}>
                        <View style={{ flex: 1, justifyContent: 'center', marginLeft: 5 }}>
                            <Text style={{ fontSize: 18, fontFamily: ComponentsStyles.FONT_FAMILY.BOLD, color: ComponentsStyles.COLORS.SECONDRY }}>Package Price</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD, color: ComponentsStyles.COLORS.SECONDRY }}>Rs : {PackagePrice}</Text>
                        </View>
                    </View>

                    {pickupTypes ?
                        <View style={{margin: 5, backgroundColor: ComponentsStyles.COLORS.WHITE, elevation: 8, }}>
                            <View style={{ flexDirection: 'row', height: 40 }}>
                                <View style={{ flex: 2, justifyContent: 'center', marginLeft: 5 }}>
                                    <Text style={{ fontSize: 15, fontFamily: ComponentsStyles.FONT_FAMILY.BOLD, color: ComponentsStyles.COLORS.GREEN }}>Temporary Credit Avalable</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 15, fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD, color: ComponentsStyles.COLORS.SECONDRY }}>{temporyCredit}</Text>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', height: 40 }}>
                                <View style={{ flex: 2, justifyContent: 'center', marginLeft: 5 }}>
                                    <Text style={{ fontSize: 15, fontFamily: ComponentsStyles.FONT_FAMILY.BOLD, color: ComponentsStyles.COLORS.GREEN }}>Currently Outstanding</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 15, fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD, color: ComponentsStyles.COLORS.SECONDRY }}>Rs : {CurrentOutstanding}</Text>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', height: 40 }}>
                                <View style={{ flex: 2, justifyContent: 'center', marginLeft: 5 }}>
                                    <Text style={{ fontSize: 15, fontFamily: ComponentsStyles.FONT_FAMILY.BOLD, color: ComponentsStyles.COLORS.GREEN }}>Package Amount</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 15, fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD, color: ComponentsStyles.COLORS.SECONDRY }}>Rs : {PackagePrice}</Text>
                                </View>

                            </View>
                            {BalanceCheck ?
                            <View style={{ flexDirection: 'row', height: 40 }}>
                            <View style={{ flex: 2, justifyContent: 'center', marginLeft: 5 }}>
                                <Text style={{ fontSize: 15, fontFamily: ComponentsStyles.FONT_FAMILY.BOLD, color: ComponentsStyles.COLORS.GREEN }}>Balance</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD, color: ComponentsStyles.COLORS.SECONDRY }}>Rs : {BalanceAmount}</Text>
                            </View>

                        </View>
                            : null}
                            {checkTemportButton ?<View style={{ flex: 1, }}>
                                <ActionButton
                                    style={styles.btn}
                                    onPress={TakeTemporyCredit}
                                    title="Temporary Credit Request"
                                />
                            </View> :null}
                            
                        </View>

                        :
                        null}

                    <View style={{ flexDirection: 'row', marginTop: 20 }}>

                        {COD ?
                            <View style={{ flex: 1, }}>

                                <ActionButton
                                    style={styles.btn}
                                    onPress={collectPayment}
                                    title="Collect Payment"
                                />
                            </View>
                            : Ecom ?
                                <View style={{ flex: 1, }}>

                                    <ActionButton
                                        style={styles.btn}
                                        onPress={collectPayment}
                                        title="Collect Payment"
                                    />
                                </View>
                                : null
                        }

                       

                    </View>
                    {/* {COD ==1 ? 1 : item.status==2 ? 2 : 3 } */}
                    {Credit ?
                        <ActionButton
                            onPress={CompleteProcess}
                            style={styles.btn}
                            innerStyle={styles.btn1}
                            title="Complete"
                        />
                        :

                        cash ?
                            <ActionButton
                                onPress={CompleteProcess}
                                style={styles.btn}
                                innerStyle={styles.btn1}
                                title="Complete"
                            />
                            : null
                    }

                </View>

            </ScrollView>
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
                        height: '28%',
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        borderWidth: 1,
                        borderColor: ComponentsStyles.COLORS.SECONDRY

                    },
                }}
            >

                <RBSheetConfirmComponent
                    textstyle={styles.rbText}
                    HeaderText="Are You Sure Collect Payment..!"
                    YesPress={HandleYesCollect}
                    NoPress={HandleNoCollect}
                />

            </RBSheet>
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
    },
    btn: {
        marginRight: 20,
        marginBottom: 10,
    },
    btn1: {

        backgroundColor: ComponentsStyles.COLORS.GREEN
    },
    rbText: {
        fontSize: 22,
    },
    buttonStyle: {
        fontSize: 16,
        color: 'white',
        backgroundColor: 'green',
        padding: 5,
        minWidth: 250,
    },
    buttonTextStyle: {
        padding: 5,
        color: 'white',
        textAlign: 'center',
    },
    textLinkStyle: {
        color: 'blue',
        paddingVertical: 20,
    },
});
export default PaymentSceen;