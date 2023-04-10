import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";

export const Conection_Checking =  (callBack: any) =>{
    try {    
        NetInfo.fetch().then(state => {

            console.log("Is Mobile connected????????????????????????????????????????",state.isConnected)
            return callBack(state.isConnected);       
          });
          
    } catch (error) {
        console.log('Error : ',error)
    }
}