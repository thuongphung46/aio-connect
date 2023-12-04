import { Text, StyleSheet } from "react-native";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants/color";

export interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: any;
  color?: string;
}
export const Button: FC<Props> = ({
  title,
  onPress,
  color,
  disabled,
  style,
}) => {
  const enabledBgColor = color || COLORS.primary;
  const disabledBgColor = COLORS.secondaryWhite;
  const bgColor = disabled ? disabledBgColor : enabledBgColor;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.btn,
        ...{ backgroundColor: bgColor },
        ...style,
      }}>
      <Text
        style={{
          ...FONTS.body3,
          color: disabled ? COLORS.primary : COLORS.white,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding3,
    borderColor: COLORS.primary,
    borderRadius: SIZES.padding,
    justifyContent: "center",
    alignItems: "center",
  },
});
