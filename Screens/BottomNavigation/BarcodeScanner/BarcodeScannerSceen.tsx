
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
// import CameraKitCameraScreen
// import {CameraKitCameraScreen} from 'react-native-camera-kit';

const BarcodeScannerSceen = (props: any) => {

  const {
    navigation, route
  } = props;

  const [data, setData] = useState("Not Found");
  const [torchMode, sertorchMode] = useState('off');
  const [cameraType, setcameraType] = useState("back");
  const [userbarcode,setuserbarcode] = useState([]);


  var bar: any;

  const bttnFunction = () => {
    navigation.navigate('ScannerdBarcodeList')

  }

  const backfuntion = () => {
    navigation.goBack();
  }
  const barcodeReceived = (e) => {

    // Alert.alert('Scan', e.data)
    
    console.log(userbarcode,'nnnnnnn=================');
    if (userbarcode.includes(e.data)) {
      //console.log(userbarcode.includes(e.data));
      console.log('haiiiiiiiiii');
      setuserbarcode(userbarcode.filter((data) => data !== e.data));
    } else {
      console.log("else");


      setuserbarcode([userbarcode, e.data]);
      // console.log(userbarcode,"eeeeee");
     
  }
    
    
    //AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_BARCODE,userbarcode)

    // if ((userbarcode =="")|| (e.data =! userbarcode) ) {
    //   setuserbarcode(e.data);
    //   AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_BARCODE,userbarcode)
    //   console.log(userbarcode,'///////////');  
    //   Alert.alert('Scan', e.data)
    // }
    //console.log(userbarcode,'///////////');
    // navigation.navigate('ScannerdBarcodeList');
  }

  const getBarcode = () => {
    console.log(userbarcode,'====================================');
   

  }


  return (
    <SafeAreaView style={ComponentsStyles.CONTAINER}>
      <TopHeader
        HeaderText="Pickup List"
        Is_subtext={false}
        is_menu={false}
        onPress={backfuntion}
        Is_Search={false}
      />
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
                        onPress={bttnFunction}
                        style={styles.btn}
                        title={'Next'} />
                </View>

        <View style={{ height: '15%', marginBottom: 60 }}>
                    <ActionButton
                        onPress={getBarcode}
                        style={styles.btn}
                        title={'TstFunction'} />
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