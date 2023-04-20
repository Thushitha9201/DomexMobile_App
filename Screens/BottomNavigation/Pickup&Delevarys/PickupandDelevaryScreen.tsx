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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import IconA from 'react-native-vector-icons/FontAwesome';
import IconB from 'react-native-vector-icons/MaterialCommunityIcons';
import Style from "./Style";
import { Get_Packages, } from '../../../SQLiteDatabase/DBControllers/PACKAGE_Contraller';
import { Get_FilterData } from "../../../SQLiteDatabase/DBControllers/PICKUP_COLLECTION_Controller";
import { UpdatePendingOrderStart } from '../../../SQLiteDatabase/DBControllers/PACKAGE_Contraller';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import AsyncStorage from '@react-native-community/async-storage'
import AsyncStorageConstants from "../../../Constants/AsyncStorageConstants";
import { DELIVERIY_MODULE, PICKUP_AND_DELIVERY_JOB_NEW, PICKUP_AND_DELIVERY_JOB_PENDING, PICKUP_MODULE } from "../../../Constants/ApiConstants";
import { TrackingID } from "../../../Constants/Strings";

let selectTypes: any;
let choosestatus: any;
const PickupandDelevaryScreen = (props: any) => {

    const {
        navigation, route
    } = props;

    const refRBSheet = useRef();
    const refRBSheet1 = useRef();
    // const navigation = useNavigation();
    const [ongoing, setongoing] = useState(false);
    const [pendings, setpendings] = useState(false);
    const [complete, setcomplete] = useState(false);
    const [incomplete, setincomplete] = useState(false);
    const [filterpickup, setfilterpickup] = useState(false);
    const [filterdelevary, setfilterdelevary] = useState(false);
    const [plaseholdertext, setplaseholdertext] = useState('');
    const [Headertext, setHeadertext] = useState('');
    const [filterText, setfilterText] = useState('');
    const [searchQuery, setSearchQuery] = React.useState('');
    // const [selectTypes, setselectTypes] = useState('');
    // const [choosestatus, setchoosestatus] = useState('');
    const [loandingspinner, setloandingspinner] = useState(false);

    const [flatlistItem, setflatlistItem] = useState([]);
    const [statusShift,setstatusShift] = useState(1);
    const [stageShift,setstageShift] = useState(1);

    const filterPickups = () => {
        selectTypes = 1;
        setstageShift(1);
        AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_CHOOSETYPE, "1")
        setfilterpickup(true)
        setfilterdelevary(false)
        setfilterText('Pickups')
        setplaseholdertext('Search Pickup List')
        setHeadertext('Pickup Request List')
        setflatlistItem([]);
        Get_Packages(choosestatus, PICKUP_MODULE, (result: any) => {
            console.log(result, ">>>>>>PICKUP>>>>>>>>>");

            setflatlistItem(result);
            setloandingspinner(false);
        });
        refRBSheet1.current.close();

    }
    const filterDelevary = () => {
        console.log("///////////", choosestatus);
        selectTypes = 2;
        setstageShift(2);
        AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_CHOOSETYPE, "2")
        setfilterpickup(false)
        setfilterdelevary(true)
        setfilterText('Deliveries')
        setplaseholdertext('Search Delivery By '+TrackingID)
        setHeadertext('Delivery Request List')
        setflatlistItem([]);
        Get_Packages(choosestatus, DELIVERIY_MODULE, (result: any) => {
            setflatlistItem(result);
            setloandingspinner(false);
            console.log(result, "<<<<<<<<<<<<>>>>>>>>>>>>");
        });
        refRBSheet1.current.close();
    }
    const handleongoing = () => {
        choosestatus = 1;
        setstatusShift(1);
        setloandingspinner(true);
        setongoing(true);
        setpendings(false);
        setcomplete(false);
        setincomplete(false);

        Get_Packages(choosestatus, selectTypes, (result: any) => {
            setflatlistItem(result);
            setloandingspinner(false);
        });
    }
    const handlependings = () => {
        choosestatus = 3;
        setstatusShift(3);
        setloandingspinner(true);
        setpendings(true);
        setongoing(false);
        setcomplete(false);
        setincomplete(false);
        setflatlistItem([]);
        console.log(flatlistItem.length, '--------------1');

        Get_Packages(choosestatus, selectTypes, (result: any) => {
            console.log(flatlistItem.length, '----------------2');
            setflatlistItem(result);
            setloandingspinner(false);
        });
    }
    const handleComplete = () => {
        choosestatus = 2;
        setstatusShift(2);
        setloandingspinner(true);
        setpendings(false);
        setongoing(false);
        setincomplete(false);
        setcomplete(true);
        Get_Packages(choosestatus, selectTypes, (result: any) => {
            setflatlistItem(result);
            setloandingspinner(false);
        });

    }
    const handleincomplete = () => {
        choosestatus = 0;
        setstatusShift(0);
        setloandingspinner(true);
        setpendings(false);
        setongoing(false);
        setcomplete(false);
        setincomplete(true);
        setflatlistItem([]);
        Get_Packages(choosestatus, selectTypes, (result: any) => {
            setflatlistItem(result);
            setloandingspinner(false);
        });

    }
    useFocusEffect(
        React.useCallback(() => {
            setflatlistItem([]);
            choosestatus = 1;
            setloandingspinner(true);
    
            // selectTypes=1;
    
            selectTypes = PICKUP_MODULE;
            AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_CHOOSETYPE, "1")
    
    
    
    
            setongoing(true);
            setpendings(false);
            setplaseholdertext('Search By Tracking ID')
            setHeadertext('Pickup Request List')
    
    
            // Filter Option Load data
            setfilterpickup(true)
            setfilterdelevary(false)
            setfilterText('Pickups')
            setloandingspinner(false);
    
    
            Get_Packages(choosestatus, 1, (result: any) => {
                setflatlistItem(result);
                console.log(result, '/////////////////////////');
    
                setloandingspinner(false);
            });
          
        }, [])
    );
   

    const Clicklistdata = (data: any) => {
        // navigation.navigate('PikupAndDelevaryDetailsScreen');

        UpdatePendingOrderStart(3,data, (result: any) => {

            console.log("UPDATE RES" , result);
                navigation.navigate('PikupAndDelevaryDetailsScreen', {
                    ScreenType: 'Home',
                    TrackingID: data,
                })

        });



        console.log(data);

    }
    const backfuntion = () => {
        navigation.goBack();
    }
    const HandleNo = () => {
        console.log("aaaaaaaaaaaaaaaa");

        refRBSheet.current.close()
    }
    const HandleFilter = () => {
        console.log("aaaaaaaaaaaaaaaa");

        refRBSheet1.current.open()
    }
    //Search Filter
    const onChangeSearch = (query:any) => {
        console.log(query,'--------------');
        Get_FilterData(statusShift,stageShift,query,(result: any)=> {

            //console.log('====================================');
            console.log(statusShift,'========',stageShift,'+++++',result,'______________==================');
            //console.log('====================================');
            setflatlistItem(result);
        })


    }
    return (
        <SafeAreaView style={ComponentsStyles.CONTAINER}>
            <TopHeader
                HeaderText={Headertext}
                Is_subtext={false}
                is_menu={false}
                Is_Search={true}
                onPress={backfuntion}
                onChangeText={onChangeSearch}
                onChangeSearch={searchQuery}
                plaseorderText={plaseholdertext}
                SubText="Let’s Start the journey!"
            />
            <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                <View style={{ flex: 2, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, marginLeft: 15,color:ComponentsStyles.COLORS.BLACK }}>{filterText}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 10 }}>
                    <TouchableOpacity onPress={HandleFilter}>
                        <IconA name="sliders" size={37} color={ComponentsStyles.COLORS.SECONDRY} />
                    </TouchableOpacity>

                </View>

            </View>
            <View style={style.container}>
                <CheckButton
                    onPress={handleongoing}
                    headerstyle={ongoing === true ? style.selectedbutton : style.defaultbutton}
                    textstyle={ongoing === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                    HeaderText="Ongoing"
                />
                <CheckButton
                    onPress={handlependings}
                    headerstyle={pendings === true ? style.selectedbutton : style.defaultbutton}
                    textstyle={pendings === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                    HeaderText="Pending"
                />
                <CheckButton
                    onPress={handleComplete}
                    headerstyle={complete === true ? style.selectedbutton : style.defaultbutton}
                    textstyle={complete === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                    HeaderText="Completed"
                />
                <CheckButton
                    onPress={handleincomplete}
                    headerstyle={incomplete === true ? style.selectedbutton : style.defaultbutton}
                    textstyle={incomplete === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                    HeaderText="Incompleted"
                />
            </View>

            {ongoing ?
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={style.EmptyMassage}>No data found</Text></View>}
                    data={flatlistItem}
                    style={{ marginTop: 10, marginBottom: 60, }}
                    horizontal={false}
                    renderItem={({ item }) => {
                        return (

                            <ListComponents
                                HeaderText1={item.tracking_id}
                                HeaderText2={item.job_stage == 1 ? item.recevier_name : item.sender_name}  //need to load real data /this is dummy
                                HeaderText3={item.job_stage == 1 ? item.recevier_address_1 : item.sender_address_1}//need to load real data /this is dummy
                                isdescription={true}
                                isActionbutton={true}
                                iscorrecticons={false}
                                isqtyicons={false}
                                description={item.job_stage == 1 ? "Receiver Details" : "Delivery Details"}
                                iconName="log-in-outline"
                                BtnText="Attend"
                                btnstyle={style.AttendButton1}
                                onPress={() => Clicklistdata(item.tracking_id)}
                            />
                        );
                    }}
                    keyExtractor={item => `${item.tracking_id}`}
                />
                : null}
            {pendings ?
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                    data={flatlistItem}
                    style={{ marginTop: 10, marginBottom: 60, }}
                    horizontal={false}
                    renderItem={({ item }) => {
                        return (

                            <ListComponents
                                HeaderText1={item.tracking_id}
                                HeaderText2={item.job_stage == 1 ? item.recevier_name : item.sender_name}  //need to load real data /this is dummy
                                HeaderText3={item.job_stage == 1 ? item.recevier_address_1 : item.sender_address_1}//need to load real data /this is dummy
                                isdescription={true}
                                isActionbutton={true}
                                iscorrecticons={false}
                                isqtyicons={false}
                                btnstyle={style.btnStyleComponent}
                                description={item.job_stage == 1 ? "Receiver Details" : "Delivery Details"}
                                BtnText='Proceed'
                                iconName="log-in-outline"

                                onPress={() => Clicklistdata(item.tracking_id)}
                            />
                        );
                    }}
                    keyExtractor={item => `${item.tracking_id}`}
                />
                : null}
            {complete ?
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                    data={flatlistItem}
                    style={{ marginTop: 10, marginBottom: 60, }}
                    horizontal={false}
                    renderItem={({ item }) => {
                        return (

                            <ListComponents
                            HeaderText1={item.tracking_id}
                            HeaderText2={item.job_stage == 1 ? item.recevier_name : item.sender_name}  //need to load real data /this is dummy
                            HeaderText3={item.job_stage == 1 ? item.recevier_address_1 : item.sender_address_1}//need to load real data /this is dummy
                                isdescription={true}
                                isActionbutton={false}
                                iscorrecticons={false}
                                isqtyicons={false}
                                iconName="log-in-outline"
                                description={item.job_stage == 1 ? "Receiver Details" : "Delivery Details"}
                                BtnText="Complete"
                                onPress={() => Clicklistdata(item.tracking_id)}
                            />
                        );
                    }}
                    keyExtractor={item => `${item.tracking_id}`}
                />
                : null}
            {incomplete ?
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                    data={flatlistItem}
                    style={{ marginTop: 10, marginBottom: 60, }}
                    horizontal={false}
                    renderItem={({ item }) => {
                        return (

                            <ListComponents
                            HeaderText1={item.tracking_id}
                            HeaderText2={item.job_stage == 1 ? item.recevier_name : item.sender_name}  //need to load real data /this is dummy
                            HeaderText3={item.job_stage == 1 ? item.recevier_address_1 : item.sender_address_1}//need to load real data /this is dummy
                                iconName="log-in-outline"
                                isdescription={true}
                                isActionbutton={true}
                                iscorrecticons={false}
                                isqtyicons={false}
                                description={item.job_stage == 1 ? "Receiver Details" : "Delivery Details"}
                                BtnText="Incomplete"
                                onPress={() => Clicklistdata(item.tracking_id)}
                            />
                        );
                    }}
                    keyExtractor={item => `${item.tracking_id}`}
                />
                : null}




            <RBSheet
                ref={refRBSheet1}
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
                        height: '20%',
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        borderWidth: 1,
                        borderColor: ComponentsStyles.COLORS.SECONDRY

                    },
                }}
            >
                <View style={{ flexDirection: 'column' }}>
                    <TouchableOpacity onPress={filterPickups}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <IconB name="truck-flatbed" size={37} color={ComponentsStyles.COLORS.SECONDRY} />
                            </View>
                            <View style={{ flex: 2, alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, marginLeft: 15, fontWeight: '700' }}>Pickups</Text>
                            </View>

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                {filterpickup === true
                                    ?
                                    <IconB name="checkbox-marked-circle-outline" size={27} color={ComponentsStyles.COLORS.GREEN} />
                                    :
                                    null}

                            </View>


                        </View>
                    </TouchableOpacity>

                    <View style={{ height: 1, backgroundColor: 'black', marginTop: 5 }} />
                    <TouchableOpacity onPress={filterDelevary}>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <IconB name="truck-delivery" size={37} color={ComponentsStyles.COLORS.SECONDRY} />
                            </View>
                            <View style={{ flex: 2, alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, marginLeft: 15, fontWeight: '700' }}>Delivery</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                {filterdelevary === true
                                    ?
                                    <IconB name="checkbox-marked-circle-outline" size={27} color={ComponentsStyles.COLORS.GREEN} />
                                    :
                                    null}

                            </View>


                        </View>
                    </TouchableOpacity>


                </View>


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
export default PickupandDelevaryScreen;