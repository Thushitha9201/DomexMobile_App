import React, { useRef, useEffect, useState } from "react";
import { Alert, Animated, Dimensions, Keyboard, Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import TopHeader from "../../../Components/TopHeader";
import ComponentsStyles from "../../../Constants/ComponentsStyles";
import RBSheet from "react-native-raw-bottom-sheet";
import ActionButton from "../../../Components/ActionButton";
import Style from "../Pickup&Delevarys/Style";
import IconA from 'react-native-vector-icons/Ionicons';
import IconB from 'react-native-vector-icons/MaterialIcons';
import Marker from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { getTrackingIDAsyncStorage,getSelectTypeAsyncStorage } from '../../../Constants/AsynStorageFuntion';
import { Get_Packages_Specific_Data } from '../../../SQLiteDatabase/DBControllers/PACKAGE_Contraller';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
var TRACKINGID: any;
var Type: any;

var SelectType:any;
let heigh = Dimensions.get("screen").height;

const MapScreen = () => {

    // const refRBSheet = useRef();
    const navigation = useNavigation();
    const [Reciername, setReciername] = useState('');
    const [type, settype] = useState('');
    const [Reciermobile, setReciermobile] = useState('');
    const [Recieraddress, setRecieraddress] = useState('');
    // const [selectType, setselectType] = useState("");
    //Animated View 
    const [modalStyle, setModalStyle] = useState(new Animated.Value(heigh));
    // const [isShowSweep, setIsShowSweep] = useState(true);
    
    useEffect(() => {
        getTrackingIDAsyncStorage().then(res => {
            console.log(res, ';;;;;;;;;;;;;;;;;;;;;;;;;;;');
            TRACKINGID = res;
            getReciverData(res);
        })
        getSelectTypeAsyncStorage().then(res => {
            console.log(res, ';;;;;;444444444;;;;;;;;;;;;;;;;;;;;;');
            if(res==="1"){
                console.log("11");
                
                SelectType = "Pickup Issues"
                settype("pickup Issue")
            }else if(res==="2"){
                SelectType = "Delivery Issues"
                console.log("22",SelectType);
                settype("Delivery Issues")
            }
        })

    }, [])

    const getReciverData = (TrackingID: any) => {
        Get_Packages_Specific_Data(TrackingID, (result: any) => {

            setReciername(result[0].recevier_name);
            setReciermobile(result[0].recevier_mobile);
            setRecieraddress(result[0].recevier_address_1);
            // setRecieraddress(result.rows.item(0).Type_module);
            console.log(result[0].job_stage);

            Type = result[0].job_stage;


        });

    }
    const Issueproblem = () => {
        navigation.navigate('IssuesScreen');
    }
    const slideInModal = () => {
        

        try {

            // setIsShowSweep(false);
            console.log('sampleIn');

            Animated.timing(modalStyle, {
                toValue: heigh / 1.7,
                duration: 500,
                useNativeDriver: false,
            }).start();

        } catch (error) {
            Alert.alert(error + "");
        }


    };
    const slideOutModal = () => {
        
        try {


            // setIsShowSweep(true);
            Keyboard.dismiss();
            Animated.timing(modalStyle, {
                toValue: heigh,
                duration: 500,
                useNativeDriver: false,
            }).start();


        } catch (error) {
            Alert.alert(error + "");
        }
    }
    // const HandleReached = () => {
    //     refRBSheet.current.open()
    // }
    const HandlePickupIssue = () => {
        slideOutModal()
        navigation.navigate('IssuesScreen');
    }
    const backfuntion = () => {
        navigation.goBack();
    }
    const HandleProceed = () => {
        slideOutModal()
        console.log(Type);
        if (Type == 1) {
            console.log("piclkup");
            navigation.navigate('PikupAndDelevaryDetailsScreen2');
        } else if (Type == 2) {
            console.log("delever");
            navigation.navigate('PaymentSceen');
        }


    }
    const [coordinates] = useState([
        {
            latitude: 48.8587741,
            longitude: 2.2069771,
        },
        {
            latitude: 48.8323785,
            longitude: 2.3361663,
        },
    ]);
    return (
        <SafeAreaView style={ComponentsStyles.CONTAINER}>

            <TopHeader
                HeaderText="Navigation Screen"
                Is_subtext={false}
                is_menu={false}
                onPress={backfuntion}
                Is_Search={false}
            />
            <View style={{ height: '55%', alignItems: 'center', justifyContent: 'center', }}>
                <Text>Map View</Text>
            </View>
            <View style={{ height: '30%', backgroundColor: ComponentsStyles.COLORS.WHITE, elevation: 10 }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flex: 2 }}>
                        <Text style={{ color: ComponentsStyles.COLORS.SECONDRY, fontSize: 20, marginLeft: 15, fontWeight: '700' }}>{Reciername}</Text>
                        <Text style={{ color: ComponentsStyles.COLORS.BLACK, fontSize: 18, marginLeft: 15, fontWeight: '500' }}>{Recieraddress}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={{ flex: 1 }}>
                            <IconA name="ios-call" size={37} color={ComponentsStyles.COLORS.GREEN} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1 }} onPress={Issueproblem}>
                            <IconB name="report-problem" size={37} color={ComponentsStyles.COLORS.SECONDRY} />
                        </TouchableOpacity>


                    </View>
                </View>
                <ActionButton
                    title="Reached"
                    onPress={slideInModal}
                    style={Style.Reachedbtn}
                />
            </View>

            {/* <MapView
                // style={styles.maps}
                initialRegion={{
                    latitude: coordinates[0].latitude,
                    longitude: coordinates[0].longitude,
                    latitudeDelta: 0.0622,
                    longitudeDelta: 0.0121,
                }}>
                <MapViewDirections
                    origin={coordinates[0]}
                    destination={coordinates[1]}
                    apikey={'AIzaSyC5RRxNyjY_hh7kq2WQN434LMEt45YIfCw'} // insert your API Key here
                    strokeWidth={4}
                    strokeColor="#111111"
                />
                <Marker coordinate={coordinates[0]} />
                <Marker coordinate={coordinates[1]} />
            </MapView> */}

            {/* <RBSheet
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

                <View>

                    <ActionButton
                        title="Proceed"
                        style={Style.Reachedbtn}
                        onPress={HandleProceed}
                    />
                    <ActionButton
                        title={type}
                        onPress={HandlePickupIssue}
                        innerStyle={Style.issuebtn}
                    />
                </View>

            </RBSheet> */}

            <Animated.View

                style={{
                    ...StyleSheet.absoluteFillObject,
                    top: modalStyle,
                    backgroundColor: '#fff',
                    zIndex: 20,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderWidth: 1,
                    borderColor: ComponentsStyles.COLORS.SECONDRY,
                    borderRadius: 10,
                    // borderColor:'red',
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

                    <View>

                    <ActionButton
                        title="Proceed"
                        style={Style.Reachedbtn}
                        onPress={HandleProceed}
                    />
                    <ActionButton
                        title={type}
                        onPress={HandlePickupIssue}
                        innerStyle={Style.issuebtn}
                    />
                    </View>
                </Animated.View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    mainbox: {
        textAlign: 'center',
        margin: 0,
        flex: 5,
        justifyContent: 'space-between',
    },
    mapView: {
        flex: 25,
    }
});
export default MapScreen;
