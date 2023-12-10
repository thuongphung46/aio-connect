import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { COLORS, SIZES, FONTS } from '../constants'
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { GiftedChat, Send, Bubble, IMessage } from "react-native-gifted-chat";
import { COLORS, FONTS } from "~/src/constants/color";
import Images from "~/src/constants/images";
import { router } from "expo-router";
import { useAppSelector } from "~/src/redux/hook";
type Message = {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
};

export const PersonalChat = ({}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { chatId, chatName, id, type } = useAppSelector(
    (state) => state.SelectUserToChatReducer
  );

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: Images.user1,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages: any) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  // change button of send
  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View
          style={{
            height: 36,
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            borderRadius: 18,
            backgroundColor: COLORS.primary,
            marginRight: 5,
            marginBottom: 5,
          }}
        >
          <FontAwesome name="send" size={12} color={COLORS.white} />
        </View>
      </Send>
    );
  };

  // customize sender messages
  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: COLORS.primary,
          },
        }}
        textStyle={{
          right: {
            color: COLORS.white,
          },
        }}
      />
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // color: COLORS.secondaryWhite,
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
          <Text style={{ ...FONTS.h4, marginLeft: 8 }}>{chatName}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => console.log("search")}
            style={{
              marginRight: 8,
            }}
          >
            <MaterialIcons name="search" size={24} color={COLORS.black} />
          </TouchableOpacity>
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

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        // textInputStyle={{
        //     borderRadius: 22,
        //     borderWidth: 1,
        //     borderColor: COLORS.gray,
        //     marginRight: 6,
        //     paddingHorizontal: 12,
        // }}
        timeTextStyle={{
          left: {
            color: COLORS.gray,
            ...FONTS.body4,
          },
          right: {
            color: COLORS.white,
            ...FONTS.body4,
          },
        }}
      />
    </SafeAreaView>
  );
};

// export default PersonalChat;
