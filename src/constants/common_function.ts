import { cloneDeep } from "lodash";
import { AlertType, show } from "../redux/slices/app_alert";
import { hide, show as showLoad } from "../redux/slices/app_loading";
import { store } from "../redux/store";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocalStore } from "./app_config";

const SHA256 = require("crypto-js/sha256");

export const thousandFormat = (num: any) => {
  try {
    num = `${num}`.replace(/,/g, "");
    var num_parts = num.toString().split(",");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return num_parts.join(",");
  } catch {
    return num;
  }
};

export const ShowAlert = (type: AlertType, message: string) => {
  store.dispatch(show({ message: message, type: type }));
};

export const showLoading = (message?: string) => {
  store.dispatch(showLoad({ message: message }));
};
export const hideLoading = () => {
  store.dispatch(hide());
};

export interface ApiResponse {
  Content: any;
  Message: any;
  MessageCode: number;
  msg_array?: any;
}
export const checkResponseStatus = (data: ApiResponse) => {
  let check = false;
  if (data) {
    if (`${data.MessageCode}` === "200") {
      check = true;
      ShowAlert("SUCCESS", "Thành công");
      return check;
    } else {
      check = false;
      ShowAlert("ERROR", data.Message);
    }
  } else {
    check = false;
    ShowAlert("ERROR", "Không tìm thấy dữ liệu");
  }
  return check;
};

export const checkResponseData = (data: ApiResponse) => {
  let result: any = null;
  if (data) {
    if (`${data.MessageCode}` === "200") {
      result = data.Content;
      return result;
    } else {
      result = null;
      ShowAlert("ERROR", data.Message);
    }
  } else {
    result = null;
    ShowAlert("ERROR", "Không tìm thấy dữ liệu");
  }
  return result;
};

/**
 * Mã hóa dữ liệu
 * @param value Giá trị cần mã hóa
 * @param pass Mật khẩu mã hóa
 * @returns
 */
export function encrypt(value: string, pass: string): string {
  const CryptoJS = require("crypto-js");
  let salt = CryptoJS.lib.WordArray.random(128 / 8);

  let key = CryptoJS.PBKDF2(pass, salt, {
    keySize: 256 / 32,
    iterations: 100,
  });

  let iv = CryptoJS.lib.WordArray.random(128 / 8);

  let encrypted = CryptoJS.AES.encrypt(value, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  let transitmessage = salt.toString() + iv.toString() + encrypted.toString();
  return transitmessage;
}

/**
 * Giải mã dữ liệu
 * @param value Giá trị mã hóa
 * @param pass Mật khẩu giải ma
 * @returns
 */
export function decrypt(value: string, pass: string): string {
  const CryptoJS = require("crypto-js");
  let salt = CryptoJS.enc.Hex.parse(value.substr(0, 32));
  let iv = CryptoJS.enc.Hex.parse(value.substr(32, 32));
  let encrypted = value.substring(64);

  let key = CryptoJS.PBKDF2(pass, salt, {
    keySize: 256 / 32,
    iterations: 100,
  });

  let decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

function compare(a: any, b: any, field: string) {
  if (a[field] < b[field]) {
    return -1;
  }
  if (a[field] > b[field]) {
    return 1;
  }
  return 0;
}

export const sortArray = (arr: any[], field: string) => {
  let result = cloneDeep(arr);
  result = result.sort((a: any, b: any) => {
    return compare(a, b, field);
  });
  return result;
};

export function createUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c === "x" ? r : r && 0x3 | 0x8;
    return v.toString(16);
  });
}

/**
 * Lưu trữ localStorage đã được mã hóa.
 */
export const PxStorage = {
  get: async (key: string): Promise<string> => {
    if (Platform.OS === "web") {
      try {
        // const Util = require("../utils/util");
        // const SHA256 = require("crypto-js/sha256");
        const keySave = SHA256(key).toString();
        const value = localStorage.getItem(keySave);
        if (value !== "" && value !== null) {
          let data = decrypt(value, keySave);
          return data;
        }
        return "";
      } catch (error) {
        console.log("ERROR:", error);
        return "";
      }
    } else {
      let data = await AsyncStorage.getItem(LocalStore.serverAddress);
      return data ? data : "";
    }
  },
  set: (key: string, value?: string): any => {
    if (Platform.OS === "web") {
      try {
        // const Util = require("../utils/util");
        //const SHA256 = require("crypto-js/sha256");
        const keySave = SHA256(key).toString();
        let saveData = "";
        if (value !== undefined && value !== "") {
          saveData = encrypt(value, keySave);
        }
        localStorage.setItem(keySave, saveData);
        return true;
      } catch (error) {
        console.log("ERROR:", error);
        return false;
      }
    } else {
      AsyncStorage.setItem(key, value ? value : "");
    }
  },
  remove: (key: string): boolean => {
    try {
      //const SHA256 = require("crypto-js/sha256");
      const keySave = SHA256(key).toString();
      localStorage.removeItem(keySave);
      return true;
    } catch (error) {
      console.log("ERROR:", error);
      return false;
    }
  },
  clear: () => {
    localStorage.clear();
  },
};

export const formatNumber = (value: any) => {
  let result = value;
  if (typeof value === "number") {
    result = thousandFormat(value);
  }
  return result;
};
