
import React, { useState, useEffect } from "react";
import { Alert, Button, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ListBox from "../../../Components/ListBox";
import TopHeader from "../../../Components/TopHeader";
import ComponentsStyles from "../../../Constants/ComponentsStyles";
import { Input } from 'react-native-elements';
import style from "./Paymentstyle";
import InputText from "../../../Components/InputText";
import Geolocation from '@react-native-community/geolocation';
import GetLocation from 'react-native-get-location'
import ActionButton from "../../../Components/ActionButton";


import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorageConstants from "../../../Constants/AsyncStorageConstants";
import { getPakageAndReciverInfoPayment, getSumPakagePrice, UpdatePackegsbyIquryID } from "../../../SQLiteDatabase/DBControllers/PACKAGE_Contraller";
import { useFocusEffect } from "@react-navigation/native";
var watchID: any;
// var TrackingID: any;
const InstanstPickupPaymentScreen = (props: any) => {

    const {
        navigation, route
    } = props;
    // const [TrackingID, setTrackingID] = useState('');

    const [InsertReciverDataList, setInsertReciverDataList] = useState([]);
    const [InquiryID_, setInquiryID] = useState('');
    const [SubAmount, setSubAmount] = useState('');
    const [SpecialCharge, setSpecialCharge] = useState(200.0);
    const [NetAmount, setNetAmount] = useState('');



    useFocusEffect(
        React.useCallback(() => {
        console.log(route.params.InquiryID, ',,,,111,,,,,,,,,,,,');
        setInquiryID(route.params.InquiryID)
        setInsertReciverDataList([]);
        //-----------GET pacakgeand reciver info for payment screen
        try{
            getAllPakacgeAndReciverInfo();
        } catch (error) {
            console.log("useFocusEffect -->PAYMENT SCREEEN",error);
        }

    }, [])
    );


    const backfuntion = () => {
        navigation.goBack();
    }

    const completeProcess = () => {
        try {
            Alert.alert(
                '',
                'Are you sure complete this process? "' + InquiryID_ + "",
                [
                    {
                        text: 'Cancel', onPress: () =>
                            console.log('need to rollback all process'),
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: () =>
                            completeFinalProcess()



                    },
                ],
                { cancelable: false }
            )
        } catch (error) {
            console.log(error);
        }

    }

    const completeFinalProcess = () => {
        try {


            UpdatePackegsbyIquryID(2, route.params.InquiryID, (result: any) => {
                console.log(result,'++++++++');
                
                       //when complte process clear shared key 
            AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_InquryID, '' + "");
            navigation.navigate('Home');
                    });

          
        } catch (error) {
            console.log(error);
        }
    }

    // GET added recever details by current inquriy id (tracking ID)

    const getAllPakacgeAndReciverInfo = () => {
        try {
            setInsertReciverDataList([]);
            getPakageAndReciverInfoPayment(route.params.InquiryID, (result: any) => {
               // console.log('query result ', result);
                setInsertReciverDataList(result);
            });

            getSumPakagePrice(route.params.InquiryID, (result: any) => {
                console.log('query------------- result ', result);
                //  setInsertReciverDataList(result);
                setSubAmount(result[0].Package_amount);

                let Amount = parseFloat(result[0].Package_amount)+SpecialCharge;
                setNetAmount(Amount.toString());
             });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={ComponentsStyles.CONTAINER}>
            <TopHeader
                HeaderText="Pricing Details"
                onPress={backfuntion}
                Is_subtext={false}
                is_menu={false}
                Is_Search={false}
            />
            <FlatList
                showsHorizontalScrollIndicator={false}
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
                    </View>
                }
                ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={style.EmptyMassage}>No data found</Text></View>}
                ListFooterComponent={
                    <View>
                        <View style={{ backgroundColor: ComponentsStyles.COLORS.WHITE, elevation: 10, margin: 5, marginTop: 30, borderRadius: 10 }}>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <View style={{ flex: 2 }}>
                                    <Text style={{ fontSize: 20, marginLeft: 10, color: ComponentsStyles.COLORS.BLACK }}>Packages Fee</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <Text style={{ fontSize: 20, marginRight: 10, color: ComponentsStyles.COLORS.BLACK, fontWeight: '600' }}>{SubAmount}.00</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <View style={{ flex: 2 }}>
                                    <Text style={{ fontSize: 20, marginLeft: 10, color: ComponentsStyles.COLORS.BLACK }}>Special Chargers</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <Text style={{ fontSize: 20, marginRight: 10, color: ComponentsStyles.COLORS.BLACK, fontWeight: '600' }}>{SpecialCharge}.00</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <View style={{ flex: 2 }}>
                                    <Text style={{ fontSize: 20, marginLeft: 10, color: ComponentsStyles.COLORS.BLACK }}>Tax</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <Text style={{ fontSize: 20, marginRight: 10, color: ComponentsStyles.COLORS.BLACK, fontWeight: '600' }}>0.00</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <View style={{ flex: 2 }}>
                                    <Text style={{ fontSize: 20, marginLeft: 10, color: ComponentsStyles.COLORS.BLACK }}>Discount</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <Text style={{ fontSize: 20, marginRight: 10, color: ComponentsStyles.COLORS.BLACK, fontWeight: '600' }}>-0.00</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <View style={{ flex: 2 }}>
                                    <Text style={{ fontSize: 23, marginLeft: 10, color: ComponentsStyles.COLORS.ICON_BLUE }}>Total Price</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <Text style={{ fontSize: 23, marginRight: 10, color: ComponentsStyles.COLORS.ICON_BLUE, fontWeight: '600' }}>{NetAmount}.00</Text>
                                </View>
                            </View>
                        </View>

                        <ActionButton
                            style={style.ButtonStyle}
                            onPress={completeProcess}
                            title="Complete" />
                    </View>
                }
                data={InsertReciverDataList}
                style={{ marginTop: 10, marginBottom: 60, }}
                horizontal={false}
                renderItem={({ item }) => {
                    return (

                        <View style={{ flexDirection: 'row', backgroundColor: ComponentsStyles.COLORS.DARK_GRAY, margin: 5, borderRadius: 5, marginRight: 10 }}>
                            <View style={{ flex: 3, height: 100 }}>
                                <Text style={{ color: ComponentsStyles.COLORS.WHITE, fontSize: 20, marginLeft: 10, fontWeight: '600' }}>{item.tracking_id}</Text>
                                <Text style={{ color: ComponentsStyles.COLORS.WHITE, fontSize: 18, marginLeft: 10, fontWeight: '600' }}>{item.recevier_name}</Text>
                                <Text style={{ color: ComponentsStyles.COLORS.WHITE, fontSize: 15, marginLeft: 10 }}>{item.recevier_address_1}</Text>
                            </View>
                            <View style={{ flex: 1, height: 50, alignItems: 'center', justifyContent: 'center' }}>

                                <Text style={{ color: ComponentsStyles.COLORS.WHITE, fontSize: 15, marginLeft: 10 }}>{item.Package_amount}.00</Text>
                            </View>

                        </View>
                    );
                }}
                keyExtractor={item => `${item.tracking_id}`}
            />

        </SafeAreaView>
    );

}
export default InstanstPickupPaymentScreen;