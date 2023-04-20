import React, { createRef, useEffect,useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import TopHeader from "../../../Components/TopHeader";
import ComponentsStyles from "../../../Constants/ComponentsStyles";
import SignatureCapture from 'react-native-signature-capture';
import ActionButton from "../../../Components/ActionButton";
import { getTrackingIDAsyncStorage } from '../../../Constants/AsynStorageFuntion';
import {  UpdatePendingOrderStart } from '../../../SQLiteDatabase/DBControllers/PACKAGE_Contraller';



var TRACKINGID: any;
const SignatureScreen = (props: any) => {

  const [Signature,setSignature] = useState(false);

  const {
    navigation, route
  } = props;

  const sign = createRef();

  const _onDragEvent = () => {
		// This callback will be called when the user enters signature
		console.log('dragged');
    setSignature(true);
	};

  //Function validate the signature 
  const checkSignature = () =>{
    if (Signature!=false) { 
      console.log('Signature to save is true');
      saveSign()
    }else{
      console.log('No Signature to save===========================');
      Alert.alert("Please enter the signature to proceed..");
    }
  }

  const resetSign = () => {
    sign.current.resetImage();
    setSignature(false);
    console.log('undragged');
  };

  const saveSign = () => {
    // console.log(sign,'IIIIIIIIIIIIKKKKKKKKKK');
    sign.current.saveImage();

    UpdatePendingOrderStart(2, TRACKINGID, (result: any) => {
console.log(result,'++++++++');

      navigation.navigate('PickupandDelevaryScreen');
    });

  };
  const backfuntion = () => {
    navigation.goBack();
  }
  useEffect(() => {
    getTrackingIDAsyncStorage().then(res => {
      console.log(res, ';;;;;;;;;;;;;;;;;;;;;;;;;;;');
      TRACKINGID = res;

    })

  }, [])
  return (
    <SafeAreaView style={ComponentsStyles.CONTAINER}>
      <TopHeader
        HeaderText="Signature Pad"
        Is_subtext={false}
        is_menu={false}
        onPress={backfuntion}
        Is_Search={false}
      />

      <View style={{ height: '65%', margin: 5, borderColor: 'black', borderWidth: 2 }}>
        <SignatureCapture
          style={styles.container}
          ref={sign}
          onDragEvent={_onDragEvent}
          showNativeButtons={false}
          showTitleLabel={false}
          viewMode={'portrait'}
        />
      </View>
      <View style={{ height: '8%', flexDirection: 'row' }}>

        <View style={{ flex: 1, margin: 3, }}>
          <ActionButton
            onPress={() => {
              resetSign();
            }}
            title="Reset"
          />
        </View>
        <View style={{ flex: 1, margin: 3, marginRight: 15 }}>
          <ActionButton
            onPress={() => {
              checkSignature();
            }}
            title="Complete"
          />
        </View>


      </View>


    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#eeeeee',
    margin: 10,
  },

});
export default SignatureScreen;