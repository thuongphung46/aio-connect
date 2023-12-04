import { View, Text, StyleSheet, TextInputProps } from "react-native";
import React, { FC } from "react";
import { COLORS, SIZES, FONTS } from "../../../constants/color";
import { TextInput } from "react-native";

export interface Props extends TextInputProps {
  placeholder: string;
  errorText?: string;
}
const Input: FC<Props> = ({ placeholder, errorText, ...props }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          {...props}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
        />
      </View>
      {errorText && (
        <View
        // style={styles.errorContainer}
        >
          <Text style={{ ...FONTS.body4, color: "red" }}>{errorText[0]}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: COLORS.secondaryWhite,
    paddingHorizontal: SIZES.padding,
    paddingVertical: 8,
    borderRadius: 8,
    borderColor: COLORS.secondaryWhite,
    borderWidth: 1,
    flexDirection: "row",
    marginVertical: 5,
  },
  input: {
    flex: 1,
    paddingTop: 0,
  },
});

export default Input;
