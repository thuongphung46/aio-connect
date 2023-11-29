import { StyleSheet } from "react-native";

export const styleSheetGlobal = StyleSheet.create({
  box: {
    backgroundColor: "#fff", // Set the background color for inset shadows
    shadowColor: "rgba(0, 0, 0, 0.5)", // Shadow color for non-inset shadows
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0,

    // Inset shadows are not directly supported in React Native.
    // You can achieve a similar effect by using multiple overlapping views with shadows.
  },
  //box-shadown viền ngoài
  insetShadow1: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    shadowColor: "rgba(0, 0, 0, 0.45)",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  insetShadow2: {
    // position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    // shadowColor: "rgba(255, 255, 255, 1.45)",
    shadowColor: "rgba(245, 20, 22, 1.45)",
    shadowOffset: {
      width: 20,
      height: 9,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  insetShadow3: {
    // position: "absolute",
    top: 32,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    shadowColor: "rgba(255, 255, 255, 0.15)",
    shadowOffset: {
      width: 0,
      height: 32,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  insetShadow4: {
    // position: "absolute",
    top: -32,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: -32,
    },
    shadowOpacity: 1,
    shadowRadius: 32,
  },
  insetShadow5: {
    // position: "absolute",
    top: 32,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    shadowColor: "rgba(255, 255, 255, 0.39)",
    shadowOffset: {
      width: 0,
      height: 32,
    },
    shadowOpacity: 1,
    shadowRadius: 32,
  },
});
