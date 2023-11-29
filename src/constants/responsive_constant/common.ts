import GlobalConstant from "../global_constant";

const deviceHeight = GlobalConstant.DeviceHeight;
const deviceWidth = GlobalConstant.DeviceWidth;

export const HeaderResponsive = {
  titleWidth: deviceWidth / 1.3,
  height: deviceHeight / 7,
};
export const FooterResponsive = {
  height: deviceHeight / 25,
};

export const PopupMenuResponsive = {
  width: deviceWidth / 1.7,
  padding: deviceHeight / 68,
};

export const MenuBarResponsive = {
  height: deviceHeight / 17,
  marginTop: deviceHeight / 68,
};

export const GlossyButtonResponsive = {
  width: deviceWidth / 10,
  height: deviceWidth / 22,
};

export const TextInputResponsive = {
  paddingVertical: deviceWidth / 50,
};

export const SeparatorResponsive = {
  padding_small: deviceHeight / 180,
  padding_medium: deviceHeight / 120,
  padding_large: deviceHeight / 77,
};
