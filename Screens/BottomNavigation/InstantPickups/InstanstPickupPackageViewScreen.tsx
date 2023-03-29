import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import DetailsComponent from "../../../Components/DetailsComponent";
import TopHeader from "../../../Components/TopHeader";
import ComponentsStyles from "../../../Constants/ComponentsStyles";

import InputTextWithTopText from "../../../Components/InputTextWithTopText";
import { Get_AreaPackage_Type_Data, Get_Packages_Specific_Data } from '../../../SQLiteDatabase/DBControllers/PACKAGE_Contraller';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import Style from "../Pickup&Delevarys/Style";
import { useFocusEffect } from "@react-navigation/native";

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
const InstanstPickupPackageViewScreen = (props: any) => {

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
    const [district, setdistrict] = useState('');
    const [mainCity, setmainCity] = useState('');
    const [city, setcity] = useState('');

    const [packageType, setpackageType] = useState('');
    const [areaType, setareaType] = useState('');


    // const navigation = useNavigation();
    const [loandingspinner, setloandingspinner] = useState(false);

    let wi;


    const backfuntion = () => {
        navigation.goBack();
    }

    useFocusEffect(
        React.useCallback(() => {
            seteditdetails(true);

            //set packages Data
            TrackingID = route.params.TrackingID;
            console.log(route.params, "/////=====InstanstPickupPackageViewScreen==>", TrackingID);

            Get_Packages_Specific_Data(TrackingID, (result: any) => {

                console.log(result, '=============');

                //  [{"AreaTypeID": 2, "CityID": "yes", "DistrictId": "",
                //   "InquiryID": "IN1679632767742", "MainCityID": "",
                //    "PacakgeTypeID": 2, "Package_amount": 1500, 
                //    "Payment_Mode_Des": "Credit", "Payment_Mode_ID": 2,
                //     "Tempory_Credit_Outstanding": 0, 
                //     "Tempory_Credit_Status": 0, "_ID": 39,
                //      "audit_date": "2023-03-06", "audit_time": "12:20:10", 
                //      "audit_user": "1", "collection_ID": 1, "created_date": "2023-03-24", 
                //      "created_time": "10:17:45", "created_user": "userID", 
                //      "delivery_date": "", "delivery_lat": 0, "delivery_long": 0,
                //       "delivery_time": "", "delivery_user": "", 
                //       "details": "", "height": 6, "id": "3", "is_new": 0, "is_synced": 1,
                //        "issettle": 0, "job_stage": 1, "job_status": 1, "length": 3, 
                //        "package_count": 3, "pickup_date": "2023-03-24", "pickup_lat": 0,
                //         "pickup_long": 0, "pickup_time": "10:17:45", "pickup_user": "",
                //          "pieces_count": 2, "receiver_id": "RE_2023-03-24_21",
                //           "recevier_address_1": "yes", "recevier_address_2": "",
                //            "recevier_address_3": "", "recevier_mobile": "1222222222",
                //             "recevier_mobile_alter": "1222222222", "recevier_name": "kamal",
                //              "sender_address_1": "colombo.", "sender_address_2": "colombo2", 
                //              "sender_address_3": "Location No, Street 1, Street 2, City.",
                //               "sender_id": 3, "sender_mobile": "0776504791",
                //                "sender_mobile_alter": "0776504791", "sender_name": "Alan",
                //                 "sender_type": 1, "special_instruct": "", 
                //                 "tracking_id": "PACK1679633265275", "weight": 8, "width": 9}]


                console.log(result[0].width, '========================================');
                

                Plength = result[0].length;
                Pheight = result[0].height;
                Pwidth = result[0].width;
                Pweight = result[0].weight;
                setwidth(Pwidth.toString());
                setheight(Pheight.toString());
                setlenght(Plength.toString());
                setweight(Pweight.toString());
                setdistrict(result[0].DistrictId)
                setmainCity(result[0].MainCityID)
                setcity(result[0].CityID)



                console.log("YEHHHHs", Pwidth,'---',Pheight);

                // setTrackID(result[0].tracking_id)
                setPackagesPrice(result[0].Package_amount)
                setReciername(result[0].recevier_name)
                setReciermobile(result[0].recevier_mobile)
                setRecieraddress(result[0].recevier_address_1)

                setname(result[0].sender_name)
                setaddress(result[0].sender_address_1)
                setmobile(result[0].sender_mobile)

                setPType(result[0].Payment_Mode_Des)
                setspecialIntroduction(result[0].special_instruct)
                // // setdescription(result.rows.item(0).description)
                // setspecialIntroduction(result.rows.item(0).specialIntroduction)
                setNoofPackaages(result[0].package_count.toString())
                setNoofPieces(result[0].pieces_count.toString())
                
                

               





                setloandingspinner(false);

            });

            Get_AreaPackage_Type_Data(TrackingID, (result: any) => {
                
                setareaType(result[0].areatype)
                setpackageType(result[0].packagetype)

                setloandingspinner(false);

            });


        }, [])
    );

    return (
        <SafeAreaView style={ComponentsStyles.CONTAINER}>
            <TopHeader
                HeaderText="Request Details"
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
                    {/* <DetailsComponent
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
                    /> */}
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
                     <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <DetailsComponent
                                    headerstyle={Style.DetilsComponent}
                                    HeaderText="District"
                                    DetailsText={district}

                                />
                                <DetailsComponent
                                    headerstyle={Style.DetilsComponent}
                                    HeaderText="Main City"
                                    DetailsText={mainCity}
                                />
                                <DetailsComponent
                                    headerstyle={Style.DetilsComponent}
                                    HeaderText="City"
                                    DetailsText={city}
                                />

                            </View>

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
                                    DetailsText={width}

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
                    {/* <DetailsComponent
                        HeaderText="Item Description"
                        DetailsText={description}
                    /> */}
                    <DetailsComponent
                        HeaderText="Package Type"
                        DetailsText={packageType}
                    />
                    <DetailsComponent
                        HeaderText="Area Type"
                        DetailsText={areaType}
                    />
                    <DetailsComponent
                        HeaderText="Payment Type"
                        DetailsText={PType}
                    />



                </View>




            </ScrollView>

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
export default InstanstPickupPackageViewScreen;