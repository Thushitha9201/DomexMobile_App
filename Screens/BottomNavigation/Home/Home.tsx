import React, {useState, useEffect, useRef } from "react";
import { FlatList, SafeAreaView, ScrollView, Text, View, ActivityIndicator,Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Dashboradicon from "../../../Components/Dashboradicon";
import DashboradsummaryData from "../../../Components/DashboradsummaryData";
import TopHeader from "../../../Components/TopHeader";
import ComponentsStyles from "../../../Constants/ComponentsStyles";
import IconA from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from "react-native-raw-bottom-sheet";
import TodayActionComponent from "../../../Components/TodayActionComponent";
import ListComponents from "../../../Components/ListComponents";
import DashboardListComponents from "../../../Components/DashboardListComponents";
import ActionButton from "../../../Components/ActionButton";
import styles from "./style";
import InputTextWithTopText from "../../../Components/InputTextWithTopText";
import { useFocusEffect } from "@react-navigation/native";
import IconB from 'react-native-vector-icons/EvilIcons';
import IconD from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage'
import AsyncStorageConstants from "../../../Constants/AsyncStorageConstants";

import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import style from "./style";
import CheckButton from "../../../Components/CheckButton";
import { DELIVERIY_MODULE,PICKUP_AND_DELIVERY_JOB_COMPLETE,PICKUP_AND_DELIVERY_JOB_ONGOING, PICKUP_MODULE } from "../../../Constants/ApiConstants";
import {  getALLPendigPickupsAndDelivery, getNumberOFPickupsandDelivery } from "../../../SQLiteDatabase/DBControllers/PACKAGE_Contraller";
import { getLogin_UserName } from "../../../Constants/AsynStorageFuntion";
import ListBox from "../../../Components/ListBox";
import { TrackingID } from "../../../Constants/Strings";
const width = Dimensions.get('screen').width;
var UniqueVlue: any;


var date = new Date().getDate(); //Current Date
var month = new Date().getMonth() + 1; //Current Month
var year = new Date().getFullYear(); //Current Year
var create_Date = year + "-" + month + "-" + date;

const Home = (props: any) => {
  const {
    navigation, route
  } = props;
  const refRBSheet = useRef();
  const [value, setvalue] = useState('');
  const [loandingspinner, setloandingspinner] = useState(false);
  const [flatlistItem, setflatlistItem] = useState([]);
  const [flatDelivrylistItem, setflatDeliverylistItem] = useState([]);
  const [pickups, setpickups] = useState(false);
  const [returns, setreturns] = useState(false);
  const [delevary, setdelevary] = useState(false);
  const [wellComeTitle, setwellComeTitle] = useState('');

  const [TotalPickupCount, setTotalPickupsCount] = useState('');
  const [TotalDeliveryCount, setTotalDeliveryCount] = useState('');

  const [TotalCollectedPickupCount, setTotalCollectedPickupsCount] =useState('');
  const [TotalCollectedDeliveryCount, setTotalCollectedDeliveryCount] = useState('');

  const handleReport = () => {
    navigation.navigate('TransactionReportScreen');
  }
  const Signaturescreen = () => {
    console.log(":;;;;;;;;;;;;;");

    navigation.navigate('InstanstPickupScreen');
  }
  const pickupAndDelevaryList = () => {
    AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_SCREENTYPE, 'Home')
    navigation.navigate('PickupandDelevaryScreen', {
      ScreenType: 'AAAAAAAAAAAAAAA',
    })
  }
  const handleseeall = () => {
    AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_SCREENTYPE, 'Home')
    navigation.navigate('PickupandDelevaryScreen', {
      ScreenType: 'AAAAAAAAAAAAAAA',
    })
  }
  useFocusEffect(
    React.useCallback(() => {
      setpickups(true)
      setreturns(false)
      setdelevary(false)
      setloandingspinner(true);
      AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_SCREENTYPE, 'Home')
      UniqueVlue = 1;
  
      getLogin_UserName().then(res => {

        getWellcomeNote(res);
    })
  
  
    
  
  
      //-----------------Displays the number of active pick ups that are assigned to the logged in user.
      getNumberOFPickupsandDelivery(PICKUP_MODULE, PICKUP_AND_DELIVERY_JOB_ONGOING, (result: any) => {
       
       // console.log("^^^",result);
        const data =  result[0];
       // console.log('<<<<<<<<<<<<<<< show data --', data.count);
         setTotalPickupsCount(data.count);
        
       });
   
       getNumberOFPickupsandDelivery(DELIVERIY_MODULE, PICKUP_AND_DELIVERY_JOB_ONGOING, (result: any) => {
         const Deliverydata =  result[0];
         setTotalDeliveryCount(Deliverydata.count);
         
       });
  
       //--------------------------complte pickupsand delivery count------------------------------
  
       getNumberOFPickupsandDelivery(PICKUP_MODULE, PICKUP_AND_DELIVERY_JOB_COMPLETE, (result: any) => {
       
         const Completedata =  result[0];
          setTotalCollectedPickupsCount(Completedata.count);
          
        });
    
        getNumberOFPickupsandDelivery(DELIVERIY_MODULE, PICKUP_AND_DELIVERY_JOB_COMPLETE, (result: any) => {
          const DeliveryCompeltedata =  result[0];
          setTotalCollectedDeliveryCount(DeliveryCompeltedata.count);
         
        });
  
  
      //-------------------------Pickup and delivery packege Info ---------------
      getALLPendigPickupsAndDelivery(PICKUP_MODULE, PICKUP_AND_DELIVERY_JOB_ONGOING, (result: any) => {
        setflatlistItem(result);
        
      });
  
      getALLPendigPickupsAndDelivery(DELIVERIY_MODULE, PICKUP_AND_DELIVERY_JOB_ONGOING, (result: any) => {
        setflatDeliverylistItem(result);
       
      });
      
  
     
      setloandingspinner(false);
  

    }, []),
);





  // get welocmme note title acording to the time
  const getWellcomeNote = (logingUser:any) => {

   
    
    var hourTime = new Date().getHours();
    var minutes = new Date().getMinutes();
    // var hourTime = 12;
    // var minutes =1;
    if (wellComeTitle === '') {
      console.log(logingUser,'=======================');
      console.log('hour' + hourTime);
      console.log('min' + minutes);
      if (hourTime == 0) {
        if (minutes > 0) {
          setwellComeTitle('Good Morning '+logingUser);
        } else if (minutes == 0) {
          setwellComeTitle('Good Night '+logingUser);
        }
      } else if (hourTime > 0 && hourTime < 12) {
        setwellComeTitle('Good Morning '+logingUser);
      } else if (hourTime == 12) {
        if (minutes > 0) {
          setwellComeTitle('Good Afternoon '+logingUser);
        } else {
          setwellComeTitle('Good Morning! '+logingUser);
        }
      } else if (hourTime > 12 && hourTime < 16) {
        setwellComeTitle('Good Afternoon '+logingUser);
      } else if (hourTime == 16) {
        if (minutes > 0) {
          setwellComeTitle('Good Evening '+logingUser);
        } else {
          setwellComeTitle('Good Afternoon '+logingUser);
        }
      } else if (hourTime > 16 && hourTime < 18) {
        setwellComeTitle('Good Evening '+logingUser);
      } else if (hourTime == 18) {
        if (minutes > 0) {
          setwellComeTitle('Good Night '+logingUser);
        } else {
          setwellComeTitle('Good Evening '+logingUser);
        }
      } else if (hourTime > 18 && hourTime <= 23) {
        setwellComeTitle('Good Night '+logingUser);
      }
    } else {
      console.log('Hello');
    }
  };

  const SyncScreen = () => {
    navigation.navigate('SyncScreen', {
      ScreenType: 'Home',
    })
  }
  const loadDayEntSummary = () => {
    navigation.navigate('DaySummaryReportScreen');
  }
  const Clicklistdata = (data: any) => {
    // navigation.navigate('PikupAndDelevaryDetailsScreen');
    navigation.navigate('PikupAndDelevaryDetailsScreen', {
      ScreenType: 'Home',
      TrackingID: data,
    })
    console.log(data);

  }
  return (
    <SafeAreaView style={ComponentsStyles.CONTAINER}>
      <TopHeader
        HeaderText={wellComeTitle}
        Is_subtext={true}
        is_menu={true}
        onPress2={SyncScreen}
        onPress1={loadDayEntSummary}
        SubText="Let’s Start the journey!"
      />

      {/* <AwesomeLoading indicatorId={8} size={50} isActive={true} text="loading" /> */}
      <ScrollView>
        <View style={{ flex: 1, marginBottom: 80 }}>

          <View style={{ height: 150, margin: 10, }}>

            <View style={{ flex: 1, elevation: 5, backgroundColor: 'white', borderRadius: 10 }}>
              <DashboradsummaryData HeaderText="Total Delivery" HeaderText2={TotalDeliveryCount} />
              <DashboradsummaryData HeaderText="Total Pickup" HeaderText2={TotalPickupCount} />
              <DashboradsummaryData HeaderText="Collected Delivery" HeaderText2={TotalCollectedDeliveryCount} />
              <DashboradsummaryData HeaderText="Collected Pickup" HeaderText2={TotalCollectedPickupCount} />
            </View>
          </View>
          <TodayActionComponent
            HeaderText="Today Pickups"
            HeaderText2="See All"
            onPress={handleseeall}
            iconName="chevron-double-right"
          />

          <FlatList
            keyExtractor={(item) => item.id}
            horizontal={true}
            data={flatlistItem}
            ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={ComponentsStyles.EmptyMassage}>No data found</Text></View>}
            renderItem={({ item }) => {
              return (
                <View style={{ width: width - 70, padding: 5 }}>
                <ListBox
                  ticketNo={item.tracking_id}
                  headerType={TrackingID +" : "}
                  nameAddress={true}
                  name={item.sender_name}
                  address={item.sender_address_1}
                  isIcon={true}
                  onPressIcon={() => Clicklistdata(item.tracking_id)}
                />

                {/* <Text>{item.serviceId}</Text> */}
              </View>
                // <DashboardListComponents
                //   HeaderText1={item.tracking_id}
                //   HeaderText2={item.sender_name}
                //   HeaderText3={item.sender_address_1}
                //   onPressmore={() => Clicklistdata(item.tracking_id)}

                // />
              )
            }}
          />
          <TodayActionComponent
            HeaderText="Today Deliveries"
            HeaderText2="See All"
            onPress={handleseeall}
            iconName="chevron-double-right"
          />

          <FlatList
            keyExtractor={(item) => item.id}
            horizontal={true}
            data={flatDelivrylistItem}
            ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={ComponentsStyles.EmptyMassage}>No data found</Text></View>}
            renderItem={({ item }) => {
              return (
                <View style={{ width: width - 70, padding: 5 }}>
                <ListBox
                  ticketNo={item.tracking_id}
                  headerType={TrackingID +" : "}
                  nameAddress={true}
                  name={item.sender_name}
                  address={item.sender_address_1}
                  isIcon={true}
                  onPressIcon={() => Clicklistdata(item.tracking_id)}
                />
                </View>
                
              )
            }}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
            <Dashboradicon
              IconName="truck"
              onPress={pickupAndDelevaryList}
              HeaderText="Pickups & Deliveries"
            />
            <Dashboradicon IconName="file-plus-outline"
              onPress={Signaturescreen}

              HeaderText="Instant Pickup"
            />
            <Dashboradicon
              onPress={handleReport}
              HeaderText="Reports"
              IconName="file-chart-outline" />

          </View>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                        <Dashboradicon
                            IconName="truck"
                            HeaderText="Pickups & Deliveries"
                        />
                        <Dashboradicon IconName="file-plus-outline"
                            HeaderText="Instant Pickup"
                        />
                        <Dashboradicon
                            HeaderText="Reports"
                            IconName="file-chart-outline" />

                    </View> */}



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
export default Home;