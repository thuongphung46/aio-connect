import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import PageContainer from '../components/PageContainer'
import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { contacts } from "~/src/constants/data";
import { COLORS, FONTS } from "~/src/constants/color";
import PageContainer from "../../atoms/page_container";
import { router } from "expo-router";
import { ChatInternalService } from "~/src/services/chat_internal";
import { PxStorage } from "~/src/constants/common_function";
import { GlobalVariable } from "~/src/constants/global_constant";
import { setState } from "~/src/redux/slices/select_user";
import { useAppDispatch } from "~/src/redux/hook";
import { ChatSocialService } from "~/src/services/chat_social";
// import { FONTS, COLORS } from '../constants'
// import { contacts } from '../constants/data'
export interface Props {}
export interface IListData {
  id: number;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  isDeleted: number;
  status: number;
  chatName: string;
  socialType: "FACEBOOK" | "ZALO" | "INTERNAL" | "SHOPEE";
  psid: string;
  staffId: number;
  lastMessage: string;
}

type ImageKey = keyof typeof images;

const images = {
  illustration: require("../../../../assets/images/illustration.png"),
  cat: require("../../../../assets/images/cat.png"),
  down: require("../../../../assets/images/down.png"),
  usFlag: require("../../../../assets/images/us-flag.jpg"),
  user1: require("../../../../assets/images/user1.jpg"),
  user2: require("../../../../assets/images/user2.jpg"),
  user3: require("../../../../assets/images/user3.jpg"),
  user4: require("../../../../assets/images/user4.jpg"),
  user5: require("../../../../assets/images/user5.jpg"),
  user6: require("../../../../assets/images/user6.jpg"),
  user7: require("../../../../assets/images/user7.jpg"),
  user8: require("../../../../assets/images/user8.jpg"),
  fb: require("../../../../assets/images/icon_facebook.png"),
  zalo: require("../../../../assets/images/icon_zalo.png"),
  shoppee: require("../../../../assets/images/shopee.png"),
};

export const getRandomImage = (): (typeof images)[keyof typeof images] => {
  const imageKeys: ImageKey[] = Object.keys(images) as ImageKey[];
  const randomKey = imageKeys[Math.floor(Math.random() * imageKeys.length)];
  return images[randomKey];
};

export const ChatSocial: FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const [listData, setListData] = useState<IListData[]>([]);
  const [search, setSearch] = useState("");
  // const [filteredUsers, setFilteredUsers] = useState(contacts);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filteredData = listData.filter((user) =>
      user.chatName.toLowerCase().includes(text.toLowerCase())
    );
    setListData(filteredData);
  };

  useEffect(() => {
    const ID = GlobalVariable.token;
    // const ID = PxStorage.get("token");
    // console.log(ID);
    ChatSocialService.GetList({
      staffId: ID,
    }).then((res) => {
      // console.log(res);
      if (res.code === 200) {
        setListData(res.data.content);
      }
    });
  }, []);

  const isOnline = Math.random() < 0.5;
  const handleSelectUser = useCallback((item: IListData) => {
    dispatch(
      setState({
        chatId: item.id,
        chatName: item.chatName,
        id: item.id,
        psid: item.psid,
        type_chat: item.socialType,
      })
    );

    router.push("/personal_chat");
  }, []);

  const renderIconChatSocial = useCallback((item: any) => {
    switch (item.socialType) {
      case "FACEBOOK":
        return (
          <ImageBackground
            style={{
              width: 16,
              height: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
            source={images.fb}></ImageBackground>
        );
      case "ZALO":
        return (
          <ImageBackground
            style={{
              width: 16,
              height: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
            source={images.zalo}></ImageBackground>
        );
      case "SHOPEE":
        return (
          <ImageBackground
            style={{
              width: 16,
              height: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
            source={images.shoppee}></ImageBackground>
        );
      default:
        return null; // Return null for cases where socialType doesn't match any known type
    }
  }, []);

  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity
      key={index}
      onPress={() => handleSelectUser(item)}
      style={[
        {
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 22,
          borderBottomColor: COLORS.secondaryWhite,
          borderBottomWidth: 1,
        },
        index % 2 !== 0
          ? {
              backgroundColor: COLORS.tertiaryWhite,
            }
          : null,
      ]}>
      <View
        style={{
          paddingVertical: 15,
          marginRight: 22,
        }}>
        {/* {item.isOnline && item.isOnline == true && ( */}
        {isOnline && (
          <View
            style={{
              height: 14,
              width: 14,
              borderRadius: 7,
              backgroundColor: COLORS.green,
              borderColor: COLORS.white,
              borderWidth: 2,
              position: "absolute",
              top: 14,
              right: 2,
              zIndex: 1000,
            }}></View>
        )}

        <Image
          source={{
            uri: `data:image/png;base64,${item.img}`,
          }}
          resizeMode="contain"
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
        }}>
        <Text style={{ ...FONTS.h4, marginBottom: 4 }}>{item.chatName}</Text>
        <View
          style={{
            ...FONTS.h4,
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
          }}>
          <Text
            style={{ fontSize: 14, color: COLORS.secondaryGray, width: "70%" }}>
            {item.lastMessage}
          </Text>
          {renderIconChatSocial(item)}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 22,
              marginTop: 22,
            }}>
            <Text style={{ ...FONTS.h4 }}>Chats</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => console.log("Add contacts")}>
                <MaterialCommunityIcons
                  name="message-badge-outline"
                  size={20}
                  color={COLORS.secondaryBlack}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 12,
                }}
                onPress={() => console.log("Add contacts")}>
                <MaterialCommunityIcons
                  name="playlist-check"
                  size={20}
                  color={COLORS.secondaryBlack}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: 22,
              flexDirection: "row",
              alignItems: "center",
            }}>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginRight: 4,
              }}>
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#e6edff",
                  marginBottom: 4,
                }}>
                <AntDesign name="plus" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>

            <FlatList
              horizontal={true}
              data={contacts}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <TouchableOpacity
                    style={{
                      paddingVertical: 15,
                      marginRight: 22,
                    }}>
                    <Image
                      source={item.userImg}
                      resizeMode="contain"
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                      }}
                    />
                  </TouchableOpacity>
                  <Text>{item.userName.substring(0, 5)}...</Text>
                </View>
              )}
            />
          </View>
          <View
            style={{
              marginHorizontal: 22,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: COLORS.secondaryWhite,
              height: 48,
              marginVertical: 22,
              paddingHorizontal: 12,
              borderRadius: 20,
            }}>
            <Ionicons
              name="ios-search-outline"
              size={24}
              color={COLORS.black}
            />

            <TextInput
              style={{
                width: "100%",
                height: "100%",
                marginHorizontal: 12,
              }}
              value={search}
              onChangeText={handleSearch}
              placeholder="Search contact..."
            />
          </View>

          <View
            style={{
              flex: 0.8,
            }}>
            <FlatList
              data={listData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled
            />
          </View>
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};
