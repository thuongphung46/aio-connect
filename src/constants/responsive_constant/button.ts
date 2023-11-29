import GlobalConstant from "../global_constant";
import { FontSize } from "./font";

const DeviceWidth = GlobalConstant.DeviceWidth;
const DeviceHeight = GlobalConstant.DeviceHeight;

const widthBig = DeviceWidth / 2.5;
const widthMedium = DeviceWidth / 4.5;
const widthSmall = DeviceWidth / 7;
export const ButtonStyle = {
  big: {
    borderRadius: widthBig / 6,
    width: widthBig,
    height: widthBig / 3,
  },
  medium: {
    borderRadius: widthMedium / 6,
    width: widthMedium,
    height: widthMedium / 3,
  },
  small: {
    borderRadius: widthSmall / 6,
    width: widthSmall,
    height: widthSmall / 3,
  },
};

export const ButtonTextStyle = {
  big: {
    fontSize: FontSize.big,
  },
  medium: {
    fontSize: FontSize.medium,
  },
  small: {
    fontSize: FontSize.small,
  },
};

export const ButtonIconStyle = {
  big: {
    right: 0,
    marginRight: DeviceWidth / 42,
    marginTop: 4,
    color: "white",
    fontSize: FontSize.big,
  },
  medium: {
    right: 0,
    marginRight: 8,
    marginTop: 2,
    color: "white",
    fontSize: FontSize.medium,
  },
  small: {
    right: 0,
    marginTop: 3.5,
    color: "white",
    fontSize: FontSize.smaller,
  },
};

export const SubmitButtonResponsive = {
  big: {
    borderRadius: widthBig / 3,
    width: widthBig,
    height: widthMedium / 3,
  },
  medium: {
    borderRadius: DeviceWidth / 10,
    width: DeviceWidth / 2.5,
    height: DeviceHeight / 22,
  },
  small: {
    borderRadius: widthSmall / 6,
    width: DeviceWidth / 3,
    height: DeviceWidth / 14,
  },
};
