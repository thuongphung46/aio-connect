import { View, Text } from "react-native";
// import { CircularProgressbar } from "react-circular-progressbar";
// import moment from "moment";
// import { HiDotsHorizontal } from "react-icons/hi"; // Make sure to import the correct React Icons component
import { FC } from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export interface Props {
  percentage: string;
  date?: string | Date;
  qty_task: number;
  title?: string;
  detail?: string;
}
export const MainCard: FC<Props> = ({
  percentage,
  date,
  title,
  detail,
  qty_task,
}) => {
  return (
    <View style={{ margin: 24, width: 140, flex: 1.5 }}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 20,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      >
        {/* <Text>{moment().format("h:mm")}</Text> */}
        <Text
          style={{
            marginLeft: 16,
            marginTop: 16,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
        <View
          style={{
            margin: 5,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ width: 50, height: 60, borderRadius: 10 }}>
            <Text
              style={{
                color: "black",
              }}
            >
              <AnimatedCircularProgress
                size={54}
                width={6}
                fill={qty_task}
                tintColor="#00e0ff"
                backgroundColor="#3d5875"
                children={() => {
                  return <Text style={{ color: "black" }}>{percentage}</Text>;
                }}
              ></AnimatedCircularProgress>
            </Text>
          </View>
        </View>
        <Text
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {detail}
        </Text>
        <View
          style={{
            margin: 5,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <HiDotsHorizontal /> */}
        </View>
      </View>
    </View>
  );
};
