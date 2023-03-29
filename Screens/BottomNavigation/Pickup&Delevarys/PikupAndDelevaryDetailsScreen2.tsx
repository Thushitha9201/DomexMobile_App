import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import ActionButton from "../../../Components/ActionButton";
import DetailsComponent from "../../../Components/DetailsComponent";
import TopHeader from "../../../Components/TopHeader";
import ComponentsStyles from "../../../Constants/ComponentsStyles";
import Style from "./Style";

import IconB from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import RBSheetConfirmComponent from "../../../Components/RBSheetConfirmComponent";
import InputTextWithTopText from "../../../Components/InputTextWithTopText";
import { Get_Packages_Specific_Data ,UpdatePackageDetails} from '../../../SQLiteDatabase/DBControllers/PACKAGE_Contraller';
import { getScreenTypeAsyncStorage } from '../../../Constants/AsynStorageFuntion';
import AsyncStorage from '@react-native-community/async-storage'
import AsyncStorageConstants from "../../../Constants/AsyncStorageConstants";
import { getTrackingIDAsyncStorage } from '../../../Constants/AsynStorageFuntion';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
var ScreenType: any;
var PackagesPrice: any;
var TrackingID1: any;

var NoofPackaages: any;
var NoofPieces: any;
var Pweight: any;
var Plength: any;
var Pheight: any;
var Pwidth: any;
const PikupAndDelevaryDetailsScreen2 = (props: any) => {

    const {
        navigation, route
    } = props;


    const [actionButtonTitle, setactionButtonTitle] = useState('');
    const [editdetails, seteditdetails] = useState(false);
    const [senderaltmobile, setsenderaltmobile] = useState('');
    const [TrackingID, setTrackingID] = useState('');
    const [PackagesPrice, setPackagesPrice] = useState('');
    const [Reciername, setReciername] = useState('');
    const [Reciermobile, setReciermobile] = useState('');
    const [Recieraddress, setRecieraddress] = useState('');
    const [name, setname] = useState('');
    const [address, setaddress] = useState('');
    const [mobile, setmobile] = useState('');
    const [namePickups, setnamePickups] = useState('');
    const [PType, setPType] = useState('');
    const [description, setdescription] = useState('');
    const [specialIntroduction, setspecialIntroduction] = useState('');
    const [NoofPackaages, setNoofPackaages] = useState('');
    const [NoofPieces, setNoofPieces] = useState('');

    const [width, setwidth] = useState('');
    const [height, setpheight] = useState('');
    const [lenght, setlenght] = useState('');

    const [weight, setweight] = useState('');
    // const navigation = useNavigation();
    const [loandingspinner, setloandingspinner] = useState(false);
    const refRBSheet = useRef();
    const HandleClick = () => {
        navigation.navigate('BarcodeScanner');
    }
    const HandleYes = () => {
        if (ScreenType === 'Home') {
            navigation.navigate('MapScreen');
        } else if (ScreenType === 'PackagesList') {
            navigation.navigate('BarcodeScanner');
        }

    }
    const backfuntion = () => {
        navigation.goBack();
    }
    const HandleNo = () => {
        console.log("aaaaaaaaaaaaaaaa");

        refRBSheet.current.close()
    }
    useEffect(() => {
        setloandingspinner(true);
        //set packages Data
        getTrackingIDAsyncStorage().then(res => {
            console.log(res, '???????????????????????????');
            TrackingID1 = res;
            getReciverData(res);
        })

        // console.log(ScreenType);
        // if (ScreenType === 'Home') {
        //     seteditdetails(true)
        //     setactionButtonTitle('Attend')
        // } else if (ScreenType === 'PackagesList') {
        //     seteditdetails(false)
        setactionButtonTitle('Scan Packages')
        // }





    }, []);
    const getReciverData = (TrackingID: any) => {
        Get_Packages_Specific_Data(TrackingID, (result: any) => {

            console.log(result,'=============');
            
            
            
       
            setTrackingID(result[0].tracking_id)
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
        setNoofPackaages(result[0].package_count.toString())
        setNoofPieces(result[0].pieces_count.toString())

       
        Plength = result[0].length;
        Pheight = result[0].height;
        Pwidth = result[0].width;
        Pweight = result[0].weight;
        setwidth(Pwidth.toString());
        setpheight(Pheight.toString());
        setlenght(Plength.toString());
        setweight(Pweight.toString());
          
        setloandingspinner(false);
        });

    }
    const updatepackages = () =>{
        setloandingspinner(true);
        console.log(TrackingID);
        // UpdatePackages = (p_width: any, p_height: any, p_lenght: any,p_weight: any,noofpeices: any,noofpackages: any, Trackingid: any,
    
        UpdatePackageDetails(width,height,lenght,weight,NoofPieces,NoofPackaages,TrackingID, (result: any) => {

            console.log(result,'<<<<<<<<<<<<<');
            setloandingspinner(false); 
        });

        // let Totcal = lenght +
    }
    return (
        <SafeAreaView style={ComponentsStyles.CONTAINER}>
            <TopHeader
                HeaderText="Pick up confrimation"
                HeaderText2 ="Details"
                Is_subtext={false}
                Is_Header2={true}
                is_menu={false}
                onPress={backfuntion}
                Is_Search={false}
            />

            <ScrollView style={{ marginBottom: 60 }}>
                <View style={{ height: 50, backgroundColor: ComponentsStyles.COLORS.WHITE, borderRadius: 10, elevation: 8, margin: 5, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ flex: 1, color: ComponentsStyles.COLORS.BLACK, fontSize: 18, marginLeft: 10 }}>TrackingID</Text>
                    <Text style={{ flex: 1, color: ComponentsStyles.COLORS.SECONDRY, fontSize: 18, fontWeight: '700' }}>{TrackingID}</Text>
                </View>
                <View style={{ height: 50, backgroundColor: ComponentsStyles.COLORS.WHITE, borderRadius: 10, elevation: 8, margin: 5, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ flex: 1, color: ComponentsStyles.COLORS.BLACK, fontSize: 18, marginLeft: 10 }}>Package Price</Text>
                    <Text style={{ flex: 1, color: ComponentsStyles.COLORS.SECONDRY, fontSize: 18, fontWeight: '700' }}>Rs: { parseFloat(PackagesPrice)}</Text>
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
                        DetailsText="Ann Perera"
                    />
                    <DetailsComponent
                        HeaderText="Pickup Name"
                        DetailsText={namePickups}
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
                    <View style={{ height: 40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '700', fontSize: 20, color: ComponentsStyles.COLORS.SECONDRY }}>Package Details</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <IconB name="edit" size={30} color={ComponentsStyles.COLORS.ICON_BLUE} />
                            <Text style={{ fontWeight: '700', fontSize: 14, color: ComponentsStyles.COLORS.ICON_BLUE }}>Edit</Text>
                        </View>
                    </View>


                    {editdetails ?
                        <View style={{ marginTop: 10 }}>
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
                                        stateValue={height}
                                        setState={(val) => setpheight(val)}
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
                                        editable={true}
                                        ex="Weight (Kg)"
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
                                        editable={true}
                                        ex="No.Pieces"
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
                                        editable={true}
                                        ex="No.Packages"
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

                    <ActionButton
                    onPress={updatepackages}
                     style={Style.AttendButton}
                    title="Update Package Details"/>


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
export default PikupAndDelevaryDetailsScreen2;