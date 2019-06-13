import deepGet from "lodash/get"; 
import appConfig from "../constants/AppConfig"; 
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from "react-native";
import errorMessage from "../constants/ErrorMessages";

export default {
  async saveItem(key, val) {
    try {
      if( typeof val == "object"){
        val = JSON.stringify( val );
      }
      await AsyncStorage.removeItem(key);
      await AsyncStorage.setItem(key, val);
    } catch (error) {
      console.warn('AsyncStorage error: ' + error.message);
    }
  },

  removeItem(key){
    return AsyncStorage.removeItem(key);
  },

  getItem(key) {
    return AsyncStorage.getItem(key);
  },

  isActiveUser( user ){
    const userStatusMap = appConfig.userStatusMap ;
    let status = deepGet( user ,  'ost_status' ) || ""; 
    status = status.toLowerCase(); 
    return status == userStatusMap.activated || status == userStatusMap.activating ; 
  },
  
  showAlert( title , message ){
    title = title || "";
    if(!message) return ;
    setTimeout(()=>{
      Alert.alert(title , message) ;
    }, 10);
  }
};
