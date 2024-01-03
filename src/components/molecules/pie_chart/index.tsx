import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, View, Text, TouchableOpacity } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import { COLORS, FONTS } from "~/src/constants/color";
import { MainCard } from "../../atoms/card";

const data = [
  {
    name: "Seoul",
    population: 21500000,
    // color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Toronto",
    population: 2800000,
    // color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Beijing",
    population: 527612,
    // color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "New York",
    population: 8538000,
    // color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Moscow",
    population: 11920000,
    // color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];
export const Report = () => {
  return (
    <View
      style={{
        padding: 8,
      }}
    >
      <StatusBar style="light" backgroundColor={COLORS.white} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 22,
          backgroundColor: COLORS.white,
          height: 60,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={24}
              color={COLORS.black}
            />
          </TouchableOpacity>
          <Text style={{ ...FONTS.h4, marginLeft: 8 }}>
            Customer statistics
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => console.log("Menu")}
            style={{
              marginRight: 8,
            }}
          >
            <MaterialIcons name="menu" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {/* <Text>Bezier Line Chart</Text> */}
        <LineChart
          data={{
            labels: ["", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random(),
                  Math.random(),
                  Math.random(),
                  Math.random(),
                  Math.random(),
                  Math.random(),
                ],
              },
            ],
          }}
          width={
            Dimensions.get("window").width -
            0.04 * Dimensions.get("window").width
          } // from react-native
          height={220}
          // yAxisLabel="$"
          // yAxisSuffix="k"
          // yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <MainCard
          qty_task={100}
          percentage={"180"}
          title={"Task"}
          detail={"Customer quantity"}
        />
        <MainCard
          qty_task={60}
          percentage={"108"}
          title={"Resolved"}
          detail={"Message"}
        />
      </View>
    </View>
  );
};
