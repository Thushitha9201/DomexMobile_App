import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import ListComponents from "../../../Components/ListComponents";
import TopHeader from "../../../Components/TopHeader";
import ComponentsStyles from "../../../Constants/ComponentsStyles";
import { PickupList } from '../../../Constants/DummyData';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-community/async-storage'
import AsyncStorageConstants from "../../../Constants/AsyncStorageConstants";
import { getPackage_barcodeList } from '../../../SQLiteDatabase/DBControllers/PACKAGE_Contraller';
import { getTrackingIDAsyncStorage } from '../../../Constants/AsynStorageFuntion';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';

const CustomerPackagesListScreen = (props: any) => {
    const [flatlistItem, setflatlistItem] = useState([]);
    const [loandingspinner, setloandingspinner] = useState(false);
    const {
        navigation, route
    } = props;
    // const navigation = useNavigation();

    const Clicklistdata = () => {


        navigation.navigate('PikupAndDelevaryDetailsScreen2', {
            ScreenType: 'PackagesList',
        })

    }
    const backfuntion = () => {
        navigation.goBack();
    }
    useEffect(() => {
        // setloandingspinner(true);
        AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_SCREENTYPE, 'PackagesList')

        getTrackingIDAsyncStorage().then(res => {
            console.log(res, ';;;;;;;;;;;;;;;;;;;;;;;;;;;');

            getReciverData(res);
        })

    }, [])
    const getReciverData = (TrackingID: any) => {
        getPackage_barcodeList(TrackingID, (result: any) => {
            console.log(result, '.................');

            setflatlistItem(result);

            setloandingspinner(false);
        });

    }
    return (
        <SafeAreaView style={ComponentsStyles.CONTAINER}>
            <TopHeader
                HeaderText="Pick up Confirmation"
                Is_subtext={false}
                is_menu={false}
                onPress={backfuntion}
                Is_Search={false}
            />
            {/* <ScrollView style={{ marginBottom: 60 }}> */}
                <Text style={[style.maintxt]}>To Be Collected</Text>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                    data={flatlistItem}
                    style={{ marginTop: 10, marginBottom: 60, }}
                    horizontal={false}
                    renderItem={({ item }) => {
                        return (

                            <ListComponents
                                HeaderText1={"Tracking ID: " + "item.TrackingId"}
                                HeaderText2={"item.Reciername"}
                                HeaderText3={"item.Recieraddress"}
                                isdescription={true}
                                isActionbutton={false}
                                iscorrecticons={true}
                                isqtyicons={true}
                                qty={"item.NoofPieces"}
                                iconName="log-in-outline"
                                description="Reciver Details"
                                BtnText="Complete"
                                onPressbox={Clicklistdata}
                            />
                        );
                    }}
                    keyExtractor={item => `${item.id}`}
                />

            {/* </ScrollView> */}


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
export default CustomerPackagesListScreen;

const style = StyleSheet.create({


    maintxt: {
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        fontWeight: '700',
        color: ComponentsStyles.COLORS.BLACK,
        fontSize: 15,
        fontStyle: 'normal',



    },





});