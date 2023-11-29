import { Dimensions } from "react-native";

const dimension = Dimensions.get("window");
const GlobalConstant = {
  REQUEST_TIMEOUT: 60000,
  DateDisplayFormat: "dd/MM/yyyy",
  DateValueFormat: "yyyy-MM-dd",
  Version: "1.1.5",
  DeviceWidth: dimension.width,
  DeviceHeight: dimension.height,
};

export let GlobalVariable = {
  token: "",
};

export default GlobalConstant;
