import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { GiftedChat, Send, Bubble, IMessage } from "react-native-gifted-chat";
import { COLORS, FONTS } from "~/src/constants/color";
import Images from "~/src/constants/images";
import { router } from "expo-router";
import { useAppSelector } from "~/src/redux/hook";
import { getRandomImage } from "../chat_internal";
import { ChatService } from "~/src/services/chat";
import { cloneDeep } from "lodash";
import { GlobalVariable } from "~/src/constants/global_constant";
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
export interface IListMessage {
  id: number;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  isDeleted: number;
  status: number;
  content: string;
  sender: string;
  chatId: number;
  staffId: number;
}

export const PersonalChat = ({}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { chatId, chatName, id, type } = useAppSelector(
    (state) => state.SelectUserToChatReducer
  );

  useEffect(() => {
    ChatService.GetListMessage({
      chatid: chatId,
    }).then((res) => {
      if (res.code === 200) {
        let dataResponsive: IListMessage[] = cloneDeep(res.data.content);
        const mappedMessages = dataResponsive.map((item) => ({
          _id: item.id,
          text: item.content,
          createdAt: new Date(item.createdAt),
          user: {
            _id: item.staffId,
            name: item.sender,
            avatar: "", // You can add avatar information if available in IListMessage
          },
        }));
        setMessages(mappedMessages);
      }
    });
  }, []);

  const onSend = useCallback((messages: any) => {
    // console.log(messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    ChatService.SendMessage({
      chatId: chatId,
      content: messages[0].text,
      type: "CHAT",
      sender: chatName,
      staffId: GlobalVariable.token,
    }).then((res) => {
      console.log(res);
    });
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
        onSend={onSend}
        scrollToBottom
        alwaysShowSend
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
        // loadEarlier={state.loadEarlier}
        // onLoadEarlier={onLoadEarlier}
        // isLoadingEarlier={state.isLoadingEarlier}
        // parsePatterns={parsePatterns}
        user={{
          _id: GlobalVariable.token,
          // name: chatName,
          // avatar: getRandomImage(),
        }}
        renderBubble={renderBubble}
        // onLongPressAvatar={onLongPressAvatar}
        // onPressAvatar={onPressAvatar}
        // onQuickReply={onQuickReply}
        quickReplyStyle={{ borderRadius: 2 }}
        quickReplyTextStyle={{
          fontWeight: "200",
        }}
        // renderQuickReplySend={renderQuickReplySend}
        // renderAccessory={renderAccessory}
        // renderActions={renderCustomActions}
        // renderSystemMessage={renderSystemMessage}
        // renderCustomView={renderCustomView}
        renderSend={renderSend}
        keyboardShouldPersistTaps="never"
        // timeTextStyle={{
        //   left: { color: "red" },
        //   right: { color: "yellow" },
        // }}
        // isTyping={state.isTyping}
        // inverted={Platform.OS !== "web"}
        inverted
        infiniteScroll
      />
    </SafeAreaView>
  );
};

// export default PersonalChat;
