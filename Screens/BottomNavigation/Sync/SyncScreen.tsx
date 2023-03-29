
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import ComponentsStyles from '../../../Constants/ComponentsStyles'
import TopHeader from '../../../Components/TopHeader';
import ActionButton from '../../../Components/ActionButton';
import SyncStyle from './SyncStyle';
import { SAVE_PACKAGE } from '../../../SQLiteDatabase/DBControllers/PACKAGE_Contraller';
import { AreaTypeList, IssueProblem, PACKAGE, PackageTypeList, Package_Barcode, reciverdetails, SenderDetails } from '../../../Constants/DummyData';
import { SAVE_SENDER } from '../../../SQLiteDatabase/DBControllers/SENDER_Controller';
import { SAVE_RECEIVER } from '../../../SQLiteDatabase/DBControllers/RECEIVER_Controller';
import { SAVE_PICKUP_COLLECTION } from '../../../SQLiteDatabase/DBControllers/PICKUP_COLLECTION_Controller';
import { SAVE_ISSUE_TYPE } from '../../../SQLiteDatabase/DBControllers/ISSUE_TYPE_Controller';
import { SAVE_PACKAGE_BARCODE } from '../../../SQLiteDatabase/DBControllers/PACKAGE_BARCODE_Controller';
import { SAVE_PACAKGE_TYPE } from '../../../SQLiteDatabase/DBControllers/PACAKGE_TYPE_Controller';
import { SAVE_AREA_TYPE } from '../../../SQLiteDatabase/DBControllers/AREA_TYPE_Controller';


let SyncArray1: any[] = [];
let arrayindex = 0;
const SyncScreen = (props: any) => {

  const {
    navigation, route
  } = props;

  const [data, setData] = useState("Not Found");
  const [torchMode, sertorchMode] = useState('off');
  const [cameraType, setcameraType] = useState("Not Found");
  const [ScreenType, setScreenType] = useState("");

  const [SyncArray, setSyncArray]: any[] = useState([]);
  const [onRefresh, setOnRefresh] = useState(false);
  const [disablebtn, setdisablebtn] = useState(false);
  const [btntitle, setbtntitle] = useState('');

  const syncbtn = () => {
     SyncArray1 = [];
    setSyncArray([]);
    if (btntitle == "Sync") {
      console.log("2222222222222222222222222");
      SyncArray1 = [];
      setSyncArray([]);
       setdisablebtn(false)
       Sync_PACKAGES();
    } else {
      // Alert.alert("Colse")
      console.log(btntitle,"close .............. ",ScreenType);

      if (ScreenType == "Home") {
        navigation.navigate("Home");
      } else {
        navigation.navigate("NavigationScreen");

      }

    }
    // console.log("Sync");
   

    // 
  }
  useEffect(() => {
    var ScreenTypeData = route.params.ScreenType;
    console.log('=======', ScreenTypeData);

    setScreenType(ScreenTypeData);

    if (ScreenTypeData == "Login") {
      setdisablebtn(false)
      setbtntitle("Colse")
      console.log('111111111111');
      Sync_PACKAGES();

    } else {
      console.log('2222222222');

      setdisablebtn(true)
      setbtntitle("Sync")
    }

  }, [])


  const Sync_PACKAGES = () => {
    SAVE_PACKAGE(PACKAGE, (res: any) => {
      setOnRefresh(false);

      if (res == 1) {

        arrayindex++;

        SyncArray1.push({
          name: 'Pckages Downloading...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);

      } else if (res == 2) {

        arrayindex++;

        SyncArray1.push({
          name: 'Pckages Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        // setsyncText(syncText + "\n" + 'Customer Save Failed...');

        Sync_RECEIVER();


      } else if (res == 3) {

        arrayindex++;

        SyncArray1.push({
          name: 'Pckages Downloaded Successfully...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        Sync_RECEIVER();

      }

    });
  }
  const Sync_RECEIVER = () => {
    SAVE_RECEIVER(reciverdetails, (res: any) => {
      setOnRefresh(false);

      if (res == 1) {

        arrayindex++;

        SyncArray1.push({
          name: 'Receiver Downloading...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);

      } else if (res == 2) {

        arrayindex++;

        SyncArray1.push({
          name: 'Receiver Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        // setsyncText(syncText + "\n" + 'Customer Save Failed...');

        ISSUE_TYPE();


      } else if (res == 3) {

        arrayindex++;

        SyncArray1.push({
          name: 'Receiver Downloaded Successfully...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        ISSUE_TYPE();

      }

    });
  }
  const ISSUE_TYPE = () => {
   
    SAVE_ISSUE_TYPE(IssueProblem, (res: any) => {

      setOnRefresh(false);

      if (res == 1) {

        arrayindex++;

        SyncArray1.push({
          name: 'Issue Type Downloading...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);

      } else if (res == 2) {

        arrayindex++;

        SyncArray1.push({
          name: 'Issue Type Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        // setsyncText(syncText + "\n" + 'Customer Save Failed...');

        PACKAGE_BARCODE();


      } else if (res == 3) {

        arrayindex++;

        SyncArray1.push({
          name: 'Issue Type Downloaded Successfully...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        PACKAGE_BARCODE();

      }

    });
  }
  const PACKAGE_BARCODE = () => {
   
    SAVE_PACKAGE_BARCODE(Package_Barcode, (res: any) => {

      setOnRefresh(false);

      if (res == 1) {

        arrayindex++;

        SyncArray1.push({
          name: 'Package Barcode List Downloading...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);

      } else if (res == 2) {

        arrayindex++;

        SyncArray1.push({
          name: 'Package Barcode List Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        // setsyncText(syncText + "\n" + 'Customer Save Failed...');

        PACAKGE_TYPE();


      } else if (res == 3) {

        arrayindex++;

        SyncArray1.push({
          name: 'Package Barcode List Successfully...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        PACAKGE_TYPE();

      }

    });
  }
  const PACAKGE_TYPE = () => {
   
    SAVE_PACAKGE_TYPE(PackageTypeList, (res: any) => {

      setOnRefresh(false);

      if (res == 1) {

        arrayindex++;

        SyncArray1.push({
          name: 'Package Type Downloading...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);

      } else if (res == 2) {

        arrayindex++;

        SyncArray1.push({
          name: 'Package Type List Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        // setsyncText(syncText + "\n" + 'Customer Save Failed...');

        AREA_TYPE();


      } else if (res == 3) {

        arrayindex++;

        SyncArray1.push({
          name: 'Package Type List Successfully...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        AREA_TYPE();

      }

    });
  }
  const AREA_TYPE = () => {
   
    SAVE_AREA_TYPE(AreaTypeList, (res: any) => {

      setOnRefresh(false);

      if (res == 1) {

        arrayindex++;

        SyncArray1.push({
          name: 'Area Type List Downloading...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);

      } else if (res == 2) {

        arrayindex++;

        SyncArray1.push({
          name: 'Area Type List Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        // setsyncText(syncText + "\n" + 'Customer Save Failed...');

        Sync_SENDER_LIST();


      } else if (res == 3) {

        arrayindex++;

        SyncArray1.push({
          name: 'Area Type List Successfully...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        Sync_SENDER_LIST();

      }

    });
  }
  
  const Sync_SENDER_LIST = () => {
    console.log('save sender');

    SAVE_SENDER(SenderDetails, (res: any) => {
      setOnRefresh(false);

      if (res == 1) {

        arrayindex++;

        SyncArray1.push({
          name: 'Sender Downloading...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);

      } else if (res == 2) {

        arrayindex++;

        SyncArray1.push({
          name: 'Sender Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        setOnRefresh(false);

        arrayindex++;

        SyncArray1.push({
          name: 'Finished...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        // setdisablebtn(true);
        // setbtntitle('Close')
        // ButtonTitle = "Close";
        setOnRefresh(true);
        setOnRefresh(false);

      } else if (res == 3) {

        arrayindex++;

        SyncArray1.push({
          name: 'Sender Download Sucsessfully...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        setOnRefresh(false);

        arrayindex++;

        SyncArray1.push({
          name: 'Finished...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setdisablebtn(true);
        setOnRefresh(true);
        setOnRefresh(false);
        setbtntitle('Close')
        // ButtonTitle = "Close";

      }

    });
  }
  return (
    <SafeAreaView style={ComponentsStyles.CONTAINER}>

      <View style={ComponentsStyles.CONTENT}>


        <View style={{ flex: 1.5, marginBottom: 5 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
            data={SyncArray}
            style={{ marginTop: 10, }}
            renderItem={({ item }) => {
              return (
                <View style={{ height: 25, flexDirection: 'row' }}>
                  <Text
                    style={{
                      marginLeft: 10,
                      color: ComponentsStyles.COLORS.SECONDRY,
                      fontSize: 16,
                      fontWeight:'bold'
                    }}>
                    {item.name}
                  </Text>
                </View>
              );
            }}
            onRefresh={() => null}
            refreshing={onRefresh}
            keyExtractor={item => `${item.id}`}
          />


          {/* {

            SyncArray1.map((item) => (
              <Text key={item.id}>{item.name}</Text>
            )

            )

          } */}



        </View>

        <View style={{ flexDirection: 'row', flex: 0.25, marginBottom: 50 }}>

          {
            disablebtn === true ? <View style={{ flex: 1, padding: 3 }}>
              <ActionButton title={btntitle} onPress={() => syncbtn()} />
            </View> : null
          }


        </View>
      </View>

    </SafeAreaView>
  );
};

export default SyncScreen;
