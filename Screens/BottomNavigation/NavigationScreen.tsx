/**
* @author Madushika Sewwandi
*/
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions, StyleSheet } from "react-native";
import IconA from 'react-native-vector-icons/MaterialIcons';
import PickupandDelevaryScreen from "./Pickup&Delevarys/PickupandDelevaryScreen";
import Home from "./Home/Home";
import ComponentsStyles from "../../Constants/ComponentsStyles";
import ProfileScreen from "./Profile/ProfileScreen";
import PikupAndDelevaryDetailsScreen from "./Pickup&Delevarys/PikupAndDelevaryDetailsScreen";
import MapScreen from "./MAP/MapScreen";
import IssuesScreen from "../ProblemIssues/IssuesScreen";
import CustomerPackagesListScreen from "./CustomerPackages/CustomerPackagesListScreen";
import BarcodeScanner from "./BarcodeScanner/BarcodeScannerSceen";
import BarcodeScannerSceen from "./BarcodeScanner/BarcodeScannerSceen";
import NotificationScreen from "./NotificationsList/NotificationScreen";
import PikupAndDelevaryDetailsScreen2 from "./Pickup&Delevarys/PikupAndDelevaryDetailsScreen2";
import ScannerdBarcodeList from "./BarcodeScanner/ScannerdBarcodeList";
import SignatureScreen from "./Signature/SignatureScreen";
import PaymentSceen from "./Payment/PaymentSceen";
import InstanstPickupScreen from "./InstantPickups/InstanstPickupScreen";
import InstantPackageDetailsScreen from "./InstantPickups/InstantPackageDetailsScreen";
import InstanstPickupPaymentScreen from "./InstantPickups/InstanstPickupPaymentScreen";
import TransactionReportScreen from "./Reports/TransactionReportScreen";
import DaySummaryReportScreen from "./Reports/DaySummaryReportScreen";
import SyncScreen from "./Sync/SyncScreen";
import InstanstPickupPackageViewScreen from "./InstantPickups/InstanstPickupPackageViewScreen";



let width = Dimensions.get("screen").width;

const Stack = createStackNavigator();
function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="PickupandDelevaryScreen" component={PickupandDelevaryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PikupAndDelevaryDetailsScreen" component={PikupAndDelevaryDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
            <Stack.Screen name="IssuesScreen" component={IssuesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CustomerPackagesListScreen" component={CustomerPackagesListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BarcodeScanner" component={BarcodeScannerSceen} options={{ headerShown: false }} />
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PikupAndDelevaryDetailsScreen2" component={PikupAndDelevaryDetailsScreen2} options={{ headerShown: false }} />
            <Stack.Screen name="ScannerdBarcodeList" component={ScannerdBarcodeList} options={{ headerShown: false }} />
            <Stack.Screen name="SignatureScreen" component={SignatureScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PaymentSceen" component={PaymentSceen} options={{ headerShown: false }} />
            <Stack.Screen name="InstanstPickupScreen" component={InstanstPickupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="InstantPackageDetailsScreen" component={InstantPackageDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="InstanstPickupPaymentScreen" component={InstanstPickupPaymentScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TransactionReportScreen" component={TransactionReportScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DaySummaryReportScreen" component={DaySummaryReportScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SyncScreen" component={SyncScreen} options={{ headerShown: false }} />
            <Stack.Screen name="InstanstPickupPackageViewScreen" component={InstanstPickupPackageViewScreen} options={{ headerShown: false }} />
            

        </Stack.Navigator>

    )
}


const Tab = createBottomTabNavigator();

const NavigationScreen = () => {

    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    position: "absolute",
                    elevation: 0,
                    backgroundColor: ComponentsStyles.COLORS.BACKGROUND,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    height: 65,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;


                    if (route.name === 'HomeManager') {
                        iconName = focused ? 'home' : 'home';
                    } else if (route.name === 'NotificationScreen') {
                        iconName = focused ? 'notifications' : 'notifications';
                    }else if (route.name === 'ProfileScreen') {
                        iconName = focused ? 'person' : 'person';
                    }
                    
                    // else if (route.name === 'Profile') {
                    //     iconName = focused ? 'person' : 'person';
                    // } else if (route.name === 'Add') {
                    //     iconName = focused ? 'add-box' : 'add-box';
                    // }

                    return <IconA name={iconName} size={size} color={color} />;
                },

                tabBarActiveTintColor:'#625454',
                tabBarInactiveTintColor: ComponentsStyles.COLORS.WHITE,
            })}

        >

            <Tab.Screen name="HomeManager" component={HomeStack} options={{ headerShown: false }} />
            <Tab.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }} />
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
            {/* <Tab.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} /> */}

        </Tab.Navigator >


    );

}
export default NavigationScreen;

const style = StyleSheet.create({
    modalCont: {
        flex: 1,
        flexGrow: 1,
        width: width,
        paddingHorizontal: 10,

    },
});