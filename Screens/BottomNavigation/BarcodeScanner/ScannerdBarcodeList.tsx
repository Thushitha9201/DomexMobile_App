import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import ComponentsStyles from "../../../Constants/ComponentsStyles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import TopHeader from "../../../Components/TopHeader";
import { Text } from "react-native-paper";
import ActionButton from "../../../Components/ActionButton";
import ScanComponent from "../../../Components/ScanComponent";
import { getTrackingIDAsyncStorage } from "../../../Constants/AsynStorageFuntion";
import { Get_PackageID_VS_TrackingID } from "../../../SQLiteDatabase/DBControllers/PACKAGE_Contraller";
import { getBarcode_List } from "../../../SQLiteDatabase/DBControllers/PACKAGE_BARCODE_Controller";
const ScannerdBarcodeList = (props: any) => {


    const {
        navigation, route
    } = props;
    const [barcodes, setBarcodes] = useState([]);
    const backfuntion = () => {
        navigation.goBack();
    }
    const Get_All_User_Data = () => {
        setBarcodes([]);
        getTrackingIDAsyncStorage().then(res => {
            console.log(res, '???????????????????????????');
            Get_PackageID_VS_TrackingID(res, (result: any) => {
                console.log(result, ">>>>>>PICKUP>>>>>>>>>");
                getBarcode_List(result[0].id, (result1: any) => {

                    console.log(result1, '<<<<<<<<<<<<<<<<<<<<<,');
                   
                    setBarcodes(result1);

                });


            });
        })

    }
    const completeProcess = () => {
        navigation.navigate('PaymentSceen');
    }
    useFocusEffect(
        React.useCallback(() => {
            setBarcodes([]);
            Get_All_User_Data();
           
        }, []),
    );
    return (
        <SafeAreaView style={ComponentsStyles.CONTAINER}>
            <TopHeader
                HeaderText="Scanned List"
                Is_subtext={false}
                is_menu={false}
                onPress={backfuntion}
                Is_Search={false}
            />
            <View style={{ height: '70%' }}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                    data={barcodes}
                    style={{ marginTop: 10, marginBottom: 60, }}
                    horizontal={false}
                    renderItem={({ item }) => {
                        return (

                            <ScanComponent
                                Textview={item.barcode_id + ""}
                                FirstIcon="dot-fill"
                            />
                        );
                    }}
                    keyExtractor={item => `${item.barcode_id}`}
                />

            </View>
            <View style={{ height: '10%' }}>
                <ActionButton
                    title="Done"
                    onPress={completeProcess}
                    style={styles.btn}
                />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    btn: {
        marginRight: 20,
    },
    mapView: {
        flex: 25,
    }
});
export default ScannerdBarcodeList;