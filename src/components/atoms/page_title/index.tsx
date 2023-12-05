import { View, Text, StyleSheet } from "react-native";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SIZES, COLORS, FONTS } from "../../../constants/color";

export interface Props {
  title: string;
  onPress: () => void;
}
export const PageTitle: FC<Props> = ({ title, onPress }) => {
  return (
    <View style={styles.pageTitleContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          marginRight: 12,
        }}
      >
        <MaterialIcons
          name="keyboard-arrow-left"
          size={SIZES.padding * 3}
          color={COLORS.black}
        />
      </TouchableOpacity>
      {title && (
        <Text style={{ ...FONTS.h4, color: COLORS.black }}>{title}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pageTitleContainer: {
    marginHorizontal: 22,
    marginVertical: 22,
    flexDirection: "row",
    alignItems: "center",
  },
});
