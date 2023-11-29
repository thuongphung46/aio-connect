import axios, { HttpStatusCode } from "axios";
import { ApiAddress } from "../constants/api_address";
import GlobalConstant, { GlobalVariable } from "../constants/global_constant";
import { ShowAlert } from "../constants/common_function";

const baseUrl = ApiAddress.api;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: GlobalConstant.REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
    // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJhZG1pbmlzdHJhdG9yQGlyc3ZpZXRuYW0uY29tIiwiUFlYSVMiLCIwMi8xMy8yMDIzIDA0OjQzOjA5IiwiMjAyMzAzMTMiXSwibmJmIjoxNjc2MjYzMzg5LCJleHAiOjE2Nzg2ODI1ODksImlhdCI6MTY3NjI2MzM4OX0.H8fldq4AknYQD5HUGWIjae1R_euC537mlrh9UCFreuE"
  },
});

const instancePdf = axios.create({
  baseURL: baseUrl,
  timeout: GlobalConstant.REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
    // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJhZG1pbmlzdHJhdG9yQGlyc3ZpZXRuYW0uY29tIiwiUFlYSVMiLCIwMi8xMy8yMDIzIDA0OjQzOjA5IiwiMjAyMzAzMTMiXSwibmJmIjoxNjc2MjYzMzg5LCJleHAiOjE2Nzg2ODI1ODksImlhdCI6MTY3NjI2MzM4OX0.H8fldq4AknYQD5HUGWIjae1R_euC537mlrh9UCFreuE"
  },
  responseType: "blob",
});

const composeUri = (controller: string, action: string, obj: any) => {
  try {
    let arr = [];
    let controllerName = "";
    if (controller !== "") {
      controllerName = "/" + controller;
    }
    if (obj === null || obj === undefined) {
      return controllerName + "/" + action;
    }
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        arr.push(key + "=" + encodeURIComponent(obj[key]));
      }
    }
    return controllerName + "/" + action + "?" + arr.join("&");
  } catch (error) {
    throw error;
  }
};

export const Request = (controller: string) => {
  return {
    getAsync: async (action: string, params?: any): Promise<any> => {
      try {
        const uri = composeUri(controller, action, params);
        const token = GlobalVariable.token;
        const authorization = token ? `Bearer ${token}` : undefined;
        return await axiosInstance
          .get(uri, {
            baseURL: ApiAddress.api,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: authorization,
            },
          })
          .then((response) => {
            if (response.status === HttpStatusCode.Ok) {
              return response.data;
            }
          })
          .catch((error) => {
            if (error.response) {
              return {
                MessageCode: "408",
                Content: error.response,
                Message: error.message,
              };
            }
            throw error;
          });
      } catch (e: any) {
        ShowAlert("ERROR", e.message);
        return;
      }
    },

    postAsync: async (action: string, params?: any): Promise<any> => {
      try {
        const uri = composeUri(controller, action, null);
        const token = GlobalVariable.token;
        const authorization = token ? `Bearer ${token}` : undefined;
        return await axiosInstance
          .post(uri, params, {
            baseURL: ApiAddress.api,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: authorization,
            },
          })
          .then((response) => {
            if (response.status === HttpStatusCode.Ok) {
              return response.data;
            }
          })
          .catch((error) => {
            if (error.response) {
              return {
                MessageCode: "408",
                Content: error.response,
                Message: error.message,
              };
            }
            throw error;
          });
      } catch (error: any) {
        ShowAlert("ERROR", error.message);
        return;
      }
    },

    getPdfAsync: async (action: string, params?: any): Promise<any> => {
      try {
        let uri = composeUri(controller, action, params);
        return await instancePdf
          .get(uri, params)
          .then((response) => {
            if (response.status === HttpStatusCode.Ok) {
              return response.data;
            }
          })
          .catch((error) => {
            if (error.response) {
              return error.response;
            }
            throw error;
          });
      } catch (e) {
        throw e;
      }
    },
  };
};
