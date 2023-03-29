import React from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import ComponentsStyles from "../../../Constants/ComponentsStyles";
import { useNavigation } from "@react-navigation/native";
import TopHeader from "../../../Components/TopHeader";
import { Text } from "react-native-paper";
import ActionButton from "../../../Components/ActionButton";
import ScanComponent from "../../../Components/ScanComponent";
import { ScanList } from '../../../Constants/DummyData';
const ScannerdBarcodeList = (props: any) => {


    const {
        navigation, route
    } = props;

    const backfuntion = () => {
        navigation.goBack();
    }
    const completeProcess = () => {
        navigation.navigate('PaymentSceen');
    }
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
             data={ScanList}
             style={{ marginTop: 10, marginBottom: 60, }}
             horizontal={false}
             renderItem={({ item }) => {
                 return (

                    <ScanComponent
                    Textview={item.BarcodeID}
                    FirstIcon="dot-fill"
                    />
                 );
             }}
             keyExtractor={item => `${item.id}`}
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
        marginRight:20,
          },
    mapView: {
        flex: 25,
    }
});
export default ScannerdBarcodeList;