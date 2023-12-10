import { View, Text } from "react-native";
import React, { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "~/src/constants/color";
import { Chats } from "~/src/components/organisms/chat_internal";
import { More } from "~/src/components/organisms/more";
import { Contacts } from "~/src/components/organisms/contacts";

const Tab = createBottomTabNavigator();
interface Props {}
export const BottomTabNavigation: FC<Props> = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: COLORS.white,
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {focused ? (
                  <>
                    <Text
                      style={{
                        ...FONTS.body3,
                        color: COLORS.secondaryBlack,
                      }}
                    >
                      External
                    </Text>
                    <FontAwesome name="circle" size={8} color={COLORS.black} />
                  </>
                ) : (
                  <Feather name="users" size={24} color={COLORS.black} />
                )}
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {focused ? (
                  <>
                    <Text
                      style={{
                        ...FONTS.body3,
                        color: COLORS.secondaryBlack,
                      }}
                    >
                      Internal
                    </Text>
                    <FontAwesome name="circle" size={8} color={COLORS.black} />
                  </>
                ) : (
                  <Ionicons
                    name="chatbubble-outline"
                    size={24}
                    color={COLORS.black}
                  />
                )}
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {focused ? (
                  <>
                    <Text
                      style={{
                        ...FONTS.body3,
                        color: COLORS.secondaryBlack,
                      }}
                    >
                      More
                    </Text>
                    <FontAwesome name="circle" size={8} color={COLORS.black} />
                  </>
                ) : (
                  <Feather
                    name="more-horizontal"
                    size={24}
                    color={COLORS.black}
                  />
                )}
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

// export default BottomTabNavigation;
