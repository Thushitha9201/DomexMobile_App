
// import React in our code
import React, { useEffect, useState } from 'react';

// import all the components we are going to use
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
} from 'react-native';
import ComponentsStyles from '../../../Constants/ComponentsStyles';
// import BarcodeScanner from 'react-native-scan-barcode';
import TopHeader from '../../../Components/TopHeader';
import ActionButton from '../../../Components/ActionButton';
import BarcodeScanner from 'react-native-scan-barcode';
import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorageConstants from '../../../Constants/AsyncStorageConstants';
import { getLastBarcodeId, SAVE_PACKAGE_BARCODE } from '../../../SQLiteDatabase/DBControllers/PACKAGE_BARCODE_Controller';
import DropdownAlert from 'react-native-dropdownalert';
// import CameraKitCameraScreen
// import {CameraKitCameraScreen} from 'react-native-camera-kit';

const BarcodeScannerSceen = (props: any) => {

  const {
    navigation, route
  } = props;

  const [data, setData] = useState("Not Found");
  const [torchMode, sertorchMode] = useState('off');
  const [cameraType, setcameraType] = useState("back");
  const [userbarcode,setuserbarcode]: any = useState([]);
  const [barcodevalue, setbarcodevalue] = useState('');
  const [BarcodeIDNewID, setBarcodeIDNewID] = useState(0);

  
  //let BarcodeIDNewID =0;
  //const [packageID, setpackageID] = useState('1234psdf');
  


  var  packageID: any;

  useEffect(() => {
    BarcodeID_Number();
  })

  const bttnFunction = () => {
    navigation.navigate('ScannerdBarcodeList')
  }

  const backfuntion = () => {
    navigation.goBack();
  }

  const BarcodeID_Number = () => {
    getLastBarcodeId((result: any) => {
      //packageID=parseInt(result) + 1
      setBarcodeIDNewID(parseInt(result) + 1);
    })}

  const barcodeReceived = (e) => {

    // Alert.alert('Scan', e.data)
    console.log(e.data,'nnnnnnn=================');
    if (userbarcode.includes(e.data)) {
      //console.log(userbarcode.includes(e.data));
      console.log('haiiiiiiiiii');
      setuserbarcode(userbarcode.filter((id:any) => id !== e.data));
    } else {
      console.log("else");
      setuserbarcode([...userbarcode, e.data]);
      //saveBarcode_data(e.data);
      // console.log(userbarcode,"eeeeee");
    }
  }
    
  


  const add_Barcode_Details = () => {
    console.log(userbarcode.length, "#####################");
     try {
      console.log(BarcodeIDNewID, "dddddddddddd");

    for ( let loop =0 ; loop <userbarcode.length;++loop){
        BarcodeID_Number();
        setbarcodevalue(userbarcode[loop]);
        console.log(userbarcode.length, "NNNNNNNNNNN");
        console.log(BarcodeIDNewID, "dddddddddddd");


      const jsonData = [
        {
          id:7,
          package_id:1,
          image: 'NULL',      
          barcode_id:barcodevalue,
          is_deleted: 0,
          is_new: 0,  
          is_synced:0,
        }
      ]
      //console.log('-WWWWWWWW--+++++++>', BarcodeIDNewID);
      //console.log('coooooooooooooooooo>', userbarcode);
      if (BarcodeIDNewID != null) {
        if (userbarcode.length != 0) {
          SAVE_PACKAGE_BARCODE(jsonData, (result: any) => {
            console.log(result, "-----------BARCODE INSERT --sucess-------");
            navigation.navigate('ScannerdBarcodeList')
          });
          console.log('Save was sucessful');
          
        }else {
          //DropdownAlert.alertWithType( 'Warning', "Barcode havent' been scaned ");
        }
        
      }else {
        //DropdownAlert.alertWithType( 'Warning', "ID isn't generated");
      }
    }
    } catch (error) {
      console.log("SAVE BARCODE DATA -->BARCODE SCANER SCREEEN", error);
      
    }

  }

  const saveBarcode_data = (code: any) => {

  }

  // const GENARATE_UNIQUEID_BARCODE = () => {
  //   getLastBarcodeId((result: any) => {
  //     setlastbarcodeID(result);
  //       const uniqueID: any[] = [];
  //       if (result.length == 0) {
  //           GetLastBarcodeID(0);
  //       } else {
  //           for (let i = 0; i < result.length; ++i) {
  //               GetLastPakageID(result[i]._ID);
  //           }
  //       }
  //   });
  // };

 



  return (
    <SafeAreaView style={ComponentsStyles.CONTAINER}>
      <TopHeader
        HeaderText="Pickup List"
        Is_subtext={false}
        is_menu={false}
        onPress={backfuntion}
        Is_Search={false}
      />
      {/* <DropdownAlert
        ref={(ref) => {
            if (ref) {
              dropDownAlertRef = ref;
            }
          }}
        /> */}

       <BarcodeScanner
        onBarCodeRead={barcodeReceived}
        style={styles.barcodesty}
        torchMode={torchMode}
        cameraType={cameraType}
      />
      {/* <ActionButton
        style={styles.btn}
        onPress={viewList}
        title='Scan Finished'
      /> */}
      {/* <BarcodeScanner
        onBarCodeRead={barcodeReceived}
        style={{ flex: 1 }}
        torchMode={torchMode}
        cameraType={cameraType}
      /> */}
      <View style={{ height: '15%', marginBottom: 60 }}>
                    <ActionButton
                        onPress={add_Barcode_Details}
                        style={styles.btn}
                        title={'Next'} />
                </View>
    </SafeAreaView>
  );
};

export default BarcodeScannerSceen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  btn: {
    marginRight:20,

  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    marginTop: 16,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textLinkStyle: {
    color: 'blue',
    paddingVertical: 20,
  },
  barcodesty: {
    flex: 1,
    margin:30,
  }
});