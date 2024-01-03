import { View, Text, Pressable } from "react-native";
import React, { FC } from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router/tabs";
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "~/src/constants/color";
import { Chats } from "~/src/components/organisms/chat_internal";
import { More } from "~/src/components/organisms/more";
import { ChatSocial } from "~/src/components/organisms/chat_social";
import { Link } from "expo-router";

// const Tab = createBottomTabNavigator();
interface Props {}
export const BottomTabNavigation: FC<Props> = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="chat_social"
        options={{
          // title: "Social",
          headerShown: false,
          tabBarShowLabel: false,
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
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                {focused ? (
                  <>
                    <Text
                      style={{
                        ...FONTS.body3,
                        color: COLORS.secondaryBlack,
                      }}>
                      Social
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

      <Tabs.Screen
        name="internal"
        options={{
          // title: "Internal",
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                {focused ? (
                  <>
                    <Text
                      style={{
                        ...FONTS.body3,
                        color: COLORS.secondaryBlack,
                      }}>
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
          headerShown: false,
          tabBarShowLabel: false,
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
      />

      <Tabs.Screen
        name="more"
        options={{
          // title: "More",
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                {focused ? (
                  <>
                    <Text
                      style={{
                        ...FONTS.body3,
                        color: COLORS.secondaryBlack,
                      }}>
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
          headerShown: false,
          tabBarShowLabel: false,
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
      />
    </Tabs>
  );
};
