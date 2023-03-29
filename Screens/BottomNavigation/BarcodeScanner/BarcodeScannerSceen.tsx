
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
// import CameraKitCameraScreen
// import {CameraKitCameraScreen} from 'react-native-camera-kit';

const BarcodeScannerSceen = (props: any) => {

  const {
    navigation, route
  } = props;

  const [data, setData] = useState("Not Found");
  const [torchMode, sertorchMode] = useState('off');
  const [cameraType, setcameraType] = useState("back");




  const backfuntion = () => {
    navigation.goBack();
  }
  const barcodeReceived = (e) => {

    console.log(e.data,'=================');
    Alert.alert('Scan', e.data)
    // navigation.navigate('ScannerdBarcodeList');
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
        style={{ flex: 1 }}
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
    marginRight: 20,
    marginBottom: 10,
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
});