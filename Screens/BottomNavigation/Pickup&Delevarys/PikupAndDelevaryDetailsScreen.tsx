import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import ActionButton from "../../../Components/ActionButton";
import DetailsComponent from "../../../Components/DetailsComponent";
import TopHeader from "../../../Components/TopHeader";
import ComponentsStyles from "../../../Constants/ComponentsStyles";
import Style from "./Style";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import RBSheetConfirmComponent from "../../../Components/RBSheetConfirmComponent";
import InputTextWithTopText from "../../../Components/InputTextWithTopText";
import {Get_Packages_Specific_Data} from '../../../SQLiteDatabase/DBControllers/PACKAGE_Contraller';
import { getScreenTypeAsyncStorage } from '../../../Constants/AsynStorageFuntion';
import AsyncStorage from '@react-native-community/async-storage'
import AsyncStorageConstants from "../../../Constants/AsyncStorageConstants";
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';

var ScreenType: any;
var TrackingID: any;
var TId: any;
var PackagesPrice: any;
var Reciername: any;
var Reciermobile: any;
var Recieraddress: any;
var name: any;
var address: any;
var mobile: any;
var namePickups: any;
var PType: any;
var description: any;
var specialIntroduction: any;
var NoofPackaages: any;
var NoofPieces: any;
var Pweight: any;
var Plength: any;
var Pheight: any;
var Pwidth: any;
const PikupAndDelevaryDetailsScreen = (props: any) => {

    const {
        navigation, route
    } = props;


    const [actionButtonTitle, setactionButtonTitle] = useState('');
    const [editdetails, seteditdetails] = useState(false);


    const [senderaltmobile, setsenderaltmobile] = useState('');
    const [TrackID, setTrackID] = useState('');
    const [PackagesPrice, setPackagesPrice] = useState('');
    const [Reciername, setReciername] = useState('');
    const [Reciermobile, setReciermobile] = useState('');
    const [Recieraddress, setRecieraddress] = useState('');
    const [name, setname] = useState('');
    const [address, setaddress] = useState('');
    const [mobile, setmobile] = useState('');
    const [namePickups, setnamePickups] = useState('');
    const [addressPickups, setaddressPickups] = useState('');
    const [PType, setPType] = useState('');
    const [description, setdescription] = useState('');
    const [specialIntroduction, setspecialIntroduction] = useState('');
    const [NoofPackaages, setNoofPackaages] = useState('');
    const [NoofPieces, setNoofPieces] = useState('');

    const [width, setwidth] = useState('');
    const [height, setheight] = useState('');
    const [lenght, setlenght] = useState('');
    
    const [weight, setweight] = useState('');
    // const navigation = useNavigation();
    const [loandingspinner, setloandingspinner] = useState(false);
    const refRBSheet = useRef();
    const HandleClick = () => {
        refRBSheet.current.open()
    }
    const HandleYes = () => {
        if (ScreenType === 'Home') {
            navigation.navigate('MapScreen');
        } else if (ScreenType === 'PackagesList') {
            navigation.navigate('BarcodeScanner');
        } 
       
    }
    const HandleNo = () => {
        console.log("aaaaaaaaaaaaaaaa");

        refRBSheet.current.close()
    }
    const backfuntion = () => {
        navigation.goBack();
    }
    useEffect(() => {
        // setloandingspinner(true);
        //set packages Data
       
        ScreenType = route.params.ScreenType;
        TrackingID = route.params.TrackingID;
        console.log(route.params, "/////===========/////////",ScreenType,'........',TrackingID);

        // getScreenTypeAsyncStorage().then(res => {
        //     ScreenType = res;
        // })
        AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_TrackID,TrackingID+"" )
        console.log(ScreenType);
        if (ScreenType === 'Home') {
            seteditdetails(true)
            setactionButtonTitle('Attend')
        } else if (ScreenType === 'PackagesList') {
            seteditdetails(false)
            setactionButtonTitle('Scan Packages')
        }
        console.log( TrackingID,'-----------');
        Get_Packages_Specific_Data(TrackingID, (result: any) => {

            console.log(result,'=============');
            
            
            
       
        setTrackID(result[0].tracking_id)
        setPackagesPrice(result[0].Package_amount)
        setReciername(result[0].recevier_name)
        setReciermobile(result[0].recevier_mobile)
        setRecieraddress(result[0].recevier_address_1)
        setname(result[0].sender_name)
        setaddress(result[0].sender_address_1)
        setmobile(result[0].sender_mobile)
        setsenderaltmobile(result[0].sender_mobile_alter)
        // setnamePickups(result.rows.item(0).namePickups)
        // setaddressPickups(result.rows.item(0).Recieraddress)// need to change with real data with
        setPType(result[0].Payment_Mode_Des)
        // setdescription(result.rows.item(0).description)
        // setspecialIntroduction(result.rows.item(0).specialIntroduction)
        setNoofPackaages(result[0].package_count)
        setNoofPieces(result[0].pieces_count)

       
        Plength = result[0].length;
        Pheight = result[0].height;
        Pwidth = result[0].width;
        Pweight = result[0].weight;
        setwidth(Pwidth);
        setheight(Pheight);
        setlenght(Plength);
        setweight(Pweight);
          
        // setloandingspinner(false);
        });
        


    }, []);

    return (
        <SafeAreaView style={ComponentsStyles.CONTAINER}>
            <TopHeader
                HeaderText="Request Detils"
                Is_subtext={false}
                is_menu={false}
                onPress={backfuntion}
                Is_Search={false}
            />

            <ScrollView style={{ marginBottom: 60 }}>
                <View style={{ height: 50, backgroundColor: ComponentsStyles.COLORS.WHITE, borderRadius: 10, elevation: 8, margin: 5, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ flex: 1, color: ComponentsStyles.COLORS.BLACK, fontSize: 18, marginLeft: 10 }}>Tracking ID</Text>
                    <Text style={{ flex: 1, color: ComponentsStyles.COLORS.SECONDRY, fontSize: 18, fontWeight: '700' }}>{TrackingID}</Text>
                </View>
                <View style={{ height: 50, backgroundColor: ComponentsStyles.COLORS.WHITE, borderRadius: 10, elevation: 8, margin: 5, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ flex: 1, color: ComponentsStyles.COLORS.BLACK, fontSize: 18, marginLeft: 10 }}>Package Price</Text>
                    <Text style={{ flex: 1, color: ComponentsStyles.COLORS.SECONDRY, fontSize: 18, fontWeight: '700' }}>Rs: {PackagesPrice}</Text>
                </View>
                <View style={{ backgroundColor: ComponentsStyles.COLORS.WHITE, borderRadius: 10, elevation: 8, margin: 5 }}>
                    <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: '700', fontSize: 20, color: ComponentsStyles.COLORS.SECONDRY }}>Sender Details</Text>
                    </View>
                    <DetailsComponent
                        HeaderText="Sender Name"
                        DetailsText={name}
                    />
                    <DetailsComponent
                        HeaderText="Sender Address"
                        DetailsText={address}
                    />
                    <DetailsComponent
                        HeaderText="Sender Contact Number"
                        DetailsText={mobile}
                    />
                    <DetailsComponent
                        HeaderText="Alternate Contact Number"
                        DetailsText={senderaltmobile}
                    />
                    <DetailsComponent
                        HeaderText="Pickup Name"
                        DetailsText={namePickups}
                    />

                      <DetailsComponent
                        HeaderText="Pickup Address"
                        DetailsText={addressPickups}
                    />
                </View>
                <View style={{ backgroundColor: ComponentsStyles.COLORS.WHITE, borderRadius: 10, elevation: 8, margin: 5 }}>
                    <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: '700', fontSize: 20, color: ComponentsStyles.COLORS.SECONDRY }}>Receiver Details</Text>
                    </View>
                    <DetailsComponent
                        HeaderText="Receiver Name"
                        DetailsText={Reciername}
                    />
                    <DetailsComponent
                        HeaderText="Receiver Contact Number"
                        DetailsText={Reciermobile}
                    />
                    <DetailsComponent
                        HeaderText="Receiver Address"
                        DetailsText={Recieraddress}
                    />

                </View>

                <View style={{ backgroundColor: ComponentsStyles.COLORS.WHITE, borderRadius: 10, elevation: 8, margin: 5 }}>
                    <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: '700', fontSize: 20, color: ComponentsStyles.COLORS.SECONDRY }}>Package Details</Text>
                    </View>


                    {editdetails ?
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <DetailsComponent
                                    headerstyle={Style.DetilsComponent}
                                    HeaderText="Width (m)"
                                    DetailsText={Pwidth}
                                />
                                <DetailsComponent
                                    headerstyle={Style.DetilsComponent}
                                    HeaderText="height (m)"
                                    DetailsText={Pheight}
                                />
                                <DetailsComponent
                                    headerstyle={Style.DetilsComponent}
                                    HeaderText="Length (m)"
                                    DetailsText={Plength}
                                />

                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <DetailsComponent
                                    headerstyle={Style.DetilsComponent}
                                    HeaderText="Weight (Kg)"
                                    DetailsText={Pweight}
                                />
                                <DetailsComponent
                                    headerstyle={Style.DetilsComponent}
                                    HeaderText="No.Pieces"
                                    DetailsText={NoofPieces}
                                />
                                <DetailsComponent
                                    headerstyle={Style.DetilsComponent}
                                    HeaderText="No.Packages"
                                    DetailsText={NoofPackaages}
                                />

                            </View>
                        </View>

                        :
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                                <View style={{ flex: 1, margin: 2 }}>
                                    <InputTextWithTopText
                                        keyType="number-pad"
                                        exstyle={Style.exstyle}
                                        is_ex={true}
                                        editable={true}
                                        ex="Width (m)"
                                        placeholder="0.53"
                                        stateValue={width}
                                        setState={(val) => setwidth(val)}
                                        style={Style.detailsInputText}
                                    />
                                </View>
                                <View style={{ flex: 1, margin: 2 }}>
                                    <InputTextWithTopText
                                     exstyle={Style.exstyle}
                                        keyType="number-pad"
                                        is_ex={true}
                                        editable={true}
                                        ex="height (m)"
                                        placeholder="0.53"
                                        stateValue={height}
                                        setState={(val) => setheight(val)}
                                        style={Style.detailsInputText}
                                    />
                                </View>
                                <View style={{ flex: 1, margin: 2 }}>
                                    <InputTextWithTopText
                                        keyType="number-pad"
                                        exstyle={Style.exstyle}
                                        is_ex={true}
                                        editable={true}
                                        ex="Lenght (m)"
                                        placeholder="0.53"
                                        stateValue={lenght}
                                        setState={(val) => setlenght(val)}
                                        style={Style.detailsInputText}
                                    />
                                </View>


                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                                <View style={{ flex: 1, margin: 2 }}>
                                    <InputTextWithTopText
                                     exstyle={Style.exstyle}
                                        keyType="number-pad"
                                        is_ex={true}
                                        editable={false}
                                        ex="Weight (Kg)"
                                        placeholder="0.53"
                                        stateValue={weight}
                                        setState={(val) => setweight(val)}
                                        style={Style.detailsInputText}
                                    />
                                </View>
                                <View style={{ flex: 1, margin: 2 }}>
                                    <InputTextWithTopText
                                     exstyle={Style.exstyle}
                                        keyType="number-pad"
                                        is_ex={true}
                                        editable={false}
                                        ex="No.Pieces"
                                        placeholder="0.53"
                                        stateValue={NoofPieces}
                                        setState={(val) => setNoofPieces(val)}
                                        style={Style.detailsInputText}
                                    />
                                </View>
                                <View style={{ flex: 1, margin: 2 }}>
                                    <InputTextWithTopText
                                     exstyle={Style.exstyle}
                                        keyType="number-pad"
                                        is_ex={true}
                                        editable={false}
                                        ex="No.Packages"
                                        placeholder="0.53"
                                        stateValue={NoofPackaages}
                                        setState={(val) => setNoofPackaages(val)}
                                        style={Style.detailsInputText}
                                    />
                                </View>

                            </View>
                        </View>
                    }




                    <DetailsComponent
                        HeaderText="Special Introduction"
                        DetailsText={specialIntroduction}
                    />
                    <DetailsComponent
                        HeaderText="Item Description"
                        DetailsText={description}
                    />
                    <DetailsComponent
                        HeaderText="Payment Type"
                        DetailsText={PType}
                    />



                </View>
                <ActionButton
                    onPress={HandleClick}
                    title={actionButtonTitle}
                    style={Style.AttendButton}
                />



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
                    HeaderText="Are You Sure..!"
                    YesPress={HandleYes}
                    NoPress={HandleNo}
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
export default PikupAndDelevaryDetailsScreen;