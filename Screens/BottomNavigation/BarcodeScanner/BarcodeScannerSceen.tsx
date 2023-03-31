
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
  Alert, Animated, Keyboard, Dimensions, FlatList
} from 'react-native';
import ComponentsStyles from '../../../Constants/ComponentsStyles';
// import BarcodeScanner from 'react-native-scan-barcode';
import TopHeader from '../../../Components/TopHeader';
import ActionButton from '../../../Components/ActionButton';
import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorageConstants from '../../../Constants/AsyncStorageConstants';
import { getLastBarcodeId, SAVE_PACKAGE_BARCODE } from '../../../SQLiteDatabase/DBControllers/PACKAGE_BARCODE_Controller';
import DropdownAlert from 'react-native-dropdownalert';
import { RNCamera } from 'react-native-camera';
let width = Dimensions.get("screen").width;
let height = Dimensions.get("screen").height;
import IconA from 'react-native-vector-icons/Ionicons';
import IconB from 'react-native-vector-icons/MaterialCommunityIcons';
// import CameraKitCameraScreen
// import {CameraKitCameraScreen} from 'react-native-camera-kit';
let ListArray1: any[] = [];
const BarcodeScannerSceen = (props: any) => {

  const {
    navigation, route
  } = props;

  const [modalStyle, setModalStyle] = useState(new Animated.Value(height));
  const [barcodes, setBarcodes] = useState([]);
  const [ListArray, setListArray]: any[] = useState([]);
  const [isShowSweep, setIsShowSweep] = useState(true);
  // var  packageID: any;
  const handleBarcodeScan = (event) => {
    console.log(event);


    if (event.type === RNCamera.Constants.BarCodeType.qr || RNCamera.Constants.BarCodeType.ean13) {
      const barcodeData = event.data;
      if (!barcodes.includes(barcodeData)) {
        setBarcodesdata(barcodeData)

      } else {
        Alert.alert('Already added..! ')
      }
    }
  };
  useEffect(() => {
    // BarcodeID_Number();
    ListArray1 = [];
  })

  const setBarcodesdata = (data) => {
    Alert.alert('Scaned Barcode No : ', data, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => setBarcodes([...barcodes, data]) },
    ]);


  }


  const backfuntion = () => {
    navigation.goBack();
  }




  const add_Barcode_Details = () => {
    console.log(barcodes.length, "#####################");
    console.log(barcodes, "#####################");
    for (let i = 0; barcodes.length > i; i++) {
      console.log(barcodes[i]);

      ListArray1.push({
        id: barcodes[i],
      });
      setListArray(ListArray1)
      slideInModal();
    }
  }
  const slideInModal = () => {

    try {

      setIsShowSweep(false);
      console.log('sampleIn');

      Animated.timing(modalStyle, {
        toValue: height / 3.2,
        duration: 500,
        useNativeDriver: false,
      }).start();

    } catch (error) {
      Alert.alert(error + "");
    }


  };

  const Save_All_Data = () => {

  }
  const slideOutModal = () => {


    try {


      setIsShowSweep(true);
      Keyboard.dismiss();
      Animated.timing(modalStyle, {
        toValue: height,
        duration: 500,
        useNativeDriver: false,
      }).start();


    } catch (error) {
      Alert.alert(error + "");
    }

  };

  return (
    <SafeAreaView style={ComponentsStyles.CONTAINER}>
      <TopHeader
        HeaderText="Pickup List"
        Is_subtext={false}
        is_menu={false}
        onPress={backfuntion}
        Is_Search={false}
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          top: modalStyle,
          backgroundColor: '#fff',
          zIndex: 20,
          borderRadius: 10,
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



        <View style={styles.modalCont}>
          <View style={{height:'75%'}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
            ListHeaderComponent={<View>
              <View style={{ height: 35, alignItems: 'center', }}>
                <IconA name='close-circle' size={35} color={ComponentsStyles.COLORS.SECONDRY} onPress={slideOutModal} />
              </View>
            </View>}
           
            data={ListArray}
            style={{ marginTop: 10, }}
            renderItem={({ item }) => {
              return (
                <View style={{ borderRadius: 8, margin: 5,  flexDirection: 'row', elevation: 5, backgroundColor: ComponentsStyles.COLORS.WHITE }}>
                  <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Text
                      style={{
                        marginLeft: 10,
                        color: ComponentsStyles.COLORS.BLACK,
                        fontSize: 16,
                        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,

                      }}>No :
                      {item.id}
                    </Text>
                  </View>
                  <View style={{ flex: 0.4, alignItems: 'flex-end' }}>
                    <IconB name='delete' size={30} color={ComponentsStyles.COLORS.SECONDRY} onPress={slideOutModal} />
                  </View>

                </View>
              );
            }}
            // onRefresh={() => null}
            // refreshing={onRefresh}
            keyExtractor={item => `${item.id}`}
          />
          </View>
          
          <View style={{height:'10%'}}>
              <ActionButton
                onPress={Save_All_Data}
                style={styles.btn1}
                title={'View Scanned List'} />
            </View>
          

         
        </View>


      </Animated.View>
      <RNCamera
        style={{ flex: 1 }}
        onBarCodeRead={handleBarcodeScan}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr, RNCamera.Constants.BarCodeType.ean13]}
        flashMode={RNCamera.Constants.FlashMode.on}

      />


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
    marginRight: 20,

  },
  btn1: {
    marginTop:20,
    marginRight: 20,

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
    margin: 30,
  },
  modalCont: {
    flex: 1,
    flexGrow: 1,
    width: width,
    paddingHorizontal: 10,

  },
});