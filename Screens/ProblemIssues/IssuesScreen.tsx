import React, { useState, useEffect, useRef } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import TopHeader from "../../Components/TopHeader";
import { useNavigation } from "@react-navigation/native";
import ComponentsStyles from "../../Constants/ComponentsStyles";
import { IssueProblem } from '../../Constants/DummyData';
import InputTextWithTopText from "../../Components/InputTextWithTopText";
import { getIssuesData} from '../../SQLiteDatabase/DBControllers/IssuesController';
import style from "./style";
import ActionButton from "../../Components/ActionButton";
import IssuesComponent from "../../Components/IssuesComponent";
import { getTrackingIDAsyncStorage,getSelectTypeAsyncStorage } from '../../Constants/AsynStorageFuntion';
import { Card } from "react-native-elements";
import { getIssuesDataForSelectModule } from "../../SQLiteDatabase/DBControllers/ISSUE_TYPE_Controller";
import { DELIVERIY_MODULE_REASONS, PICKUP_MODULE_REASONS } from "../../Constants/ApiConstants";
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
const IssuesScreen = () => {
    const navigation = useNavigation();
    const [flatlistItem, setflatlistItem] = useState([]);
    const [type, settype] = useState('');
    const [remark, setremark] = useState('');
    const [pickReasonID, setpickReasonID] = useState('');
    const [loandingspinner, setloandingspinner] = useState(false);
   
    useEffect(() => {

        const focusHandler = navigation.addListener('focus', () => {
         setloandingspinner(true);
         getSelectTypeAsyncStorage().then(res => {
            console.log(res, ';;;;;;444444444;;;;;;;;;;;;;;;;;;;;;');
            if(res==="1"){
                console.log("11");
                
                getIssuesDataForSelectModule(PICKUP_MODULE_REASONS,(result: any) => {
                    console.log(result,'........');
                    setflatlistItem(result)
                    
                 });

              
                settype("Pickup Issues")
            }else if(res==="2"){

                getIssuesDataForSelectModule(DELIVERIY_MODULE_REASONS,(result: any) => {
                    console.log(result,'........');
                    setflatlistItem(result)
                    
                 });
                
                // console.log("22",SelectType);
                settype("Delivery Issues")
            }
        })
  
        setloandingspinner(false);

    });
    return focusHandler;
    }, [])

    const backfuntion = () => {
        navigation.goBack();
    }

    const onPressHandler= (data: any) => {
        setpickReasonID(data);

    }

    const onPress = () => {
     console.log("<><>>>>>---===",pickReasonID);

        if (pickReasonID != '') {
            if (remark != '') {
                navigation.navigate('PickupandDelevaryScreen');
             //add table save function call
    //              Also system should capture date,  time and geo-location of the  courie


            } else {
              ToastAndroid.show('pelase Enter  Remark ', ToastAndroid.SHORT);
            }
         
        
        } else {
          ToastAndroid.show('pelase Pick Issues ', ToastAndroid.SHORT);
        
        }
      };

    return (
        <SafeAreaView style={ComponentsStyles.CONTAINER}>
            <TopHeader
                HeaderText={type}
                Is_subtext={false}
                is_menu={false}
                onPress={backfuntion}
                Is_Search={false}
            />
            {/* <View style={{ height: '50%' }}> */}
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                    data={flatlistItem}
                    style={{ marginTop: 10, marginBottom: 10, }}
                    horizontal={false}
                    renderItem={({ item }) => {
                    
                        return (

                            <TouchableOpacity
                            onPress={() => onPressHandler(item.id)}>
                            <Card
                                containerStyle={pickReasonID === item.id ? {
                                    borderRadius: 2,
                                    height: 60,
                                    margin: 5, 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    backgroundColor: ComponentsStyles.COLORS.DARK_GRAY
                                } : {borderRadius: 2, 
                                    height: 60,
                                    margin: 5, 
                                    elevation:5,
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    backgroundColor: ComponentsStyles.COLORS.WHITE}}>

                                <Text style={[styles.destailsText]}>{item.issue_name}</Text>
                               
                            </Card>
                        </TouchableOpacity>

                        //      <IssuesComponent
                        //     HeaderText={item.Description}
                        //     onPress={() => onPressHandler(item.id)}
                        //     pickReasonID={pickReasonID}
                        //     selectItemID={item.id}
  
                            
                        //  />
                           

                        );
                        
                    }}
                    keyExtractor={item => `${item.id}`}
                />
            {/* </View> */}

            <InputTextWithTopText
                is_ex={true}
                ex="Remarks"
                placeholder="remark"
                max={20}
                setState={remark => setremark(remark)}
                style={style.inputtext}
            />
            <ActionButton
                title="Submit"
                innerStyle={style.actionbtn}
                onPress={() => onPress()}
                
            />

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

export default IssuesScreen;

const styles = StyleSheet.create({
    hederContainer: {
        height: 60, 
        backgroundColor: ComponentsStyles.COLORS.PRIMARY, 
        margin: 5, 
        alignItems: 'center', 
        justifyContent: 'center',
         borderRadius: 10
    },

    hederSubContainer: {
        height: 60, 
        backgroundColor: ComponentsStyles.COLORS.DARK_GRAY, 
        margin: 5, 
        alignItems: 'center', 
        justifyContent: 'center',
         borderRadius: 10
    },
    //

    destailsText: {
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        fontWeight: '700',
        color: ComponentsStyles.COLORS.BLACK,
        fontSize: 15,
        fontStyle: 'normal',
    },

   

});