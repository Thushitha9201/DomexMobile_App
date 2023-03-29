
import AsyncStorage from '@react-native-community/async-storage';

import AsyncStorageConstants from './AsyncStorageConstants';
export const getScreenTypeAsyncStorage = async () => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_STORAGE_SCREENTYPE)
    return value

  } catch (e) {
    console.log('Failed to fetch the data from storage')
  }
}
export const getTrackingIDAsyncStorage = async () => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_STORAGE_TrackID)
    return value

  } catch (e) {
    console.log('Failed to fetch the data from storage')
  }
}

export const getSelectTypeAsyncStorage = async () => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_STORAGE_CHOOSETYPE)
    return value

  } catch (e) {
    console.log('Failed to fetch the data from storage')
  }
}



export const getInquryIDAsyncStorage = async () => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_STORAGE_InquryID)
    return value

  } catch (e) {
    console.log('Failed to fetch the data from storage')
  }
}


export const getSelectAmountAsyncStorage = async () => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_STORAGE_SELECTAMOUNT)
    return value

  } catch (e) {
    console.log('Failed to fetch the data from storage')
  }
}
export const getLogin_UserName = async () => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_STORAGE_LOGIN_USER_NAME)
    return value

  } catch (e) {
    console.log('Failed to fetch the data from storage')
  }
}
export const getLogin_Password = async () => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_STORAGE_LOGIN_USER_PASSWORD)
    return value

  } catch (e) {
    console.log('Failed to fetch the data from storage')
  }
}
export const getUser_ID = async () => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_USER_ID)
    return value

  } catch (e) {
    console.log('Failed to fetch the data from storage')
  }
}
// export const getCustomerIDAsyncStorage = async () => {
//   try {
//     const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_STORAGE_CUSTOMERID)
//     return value

//   } catch (e) {
//     console.log('Failed to fetch the data from storage')
//   }
// }
// export const getCustomerTypeAsyncStorage = async () => {
//   try {
//     const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_STORAGE_CUSTOMER_TYPE)
//     return value

//   } catch (e) {
//     console.log('Failed to fetch the data from storage')
//   }
// }
export const ClearAsyncStorage = async () => {
 
    try {
      await AsyncStorage.clear()
      return "OK"
    } catch (e) {
      console.log('Failed to clear the async storage.')
    }
  
}

