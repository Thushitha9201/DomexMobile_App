import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";

export const Conection_Checking =() =>{
    try {
        NetInfo.fetch().then(state => {
            { state.isConnected ? (
                console.log("Is Mobile connected????????????????????????????????????????", state.isConnected)

            ):
                Alert.alert("Device is Not Connected to the InterNet. Please Check Your Connection..")
            }
          });
    } catch (error) {
        console.log('Error : ',error)
    }
}