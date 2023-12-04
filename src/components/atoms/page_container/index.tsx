import React, { FC, useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { COLORS } from "../../../constants/color";

export interface Props {
  children: any;
}
const PageContainer: FC<Props> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: COLORS.white,
      }}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default PageContainer;
