import { Slot, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  View,
  StatusBar as RNStatusBar,
  Platform,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
// import { AppLoading } from "~/src/components/atoms/loading";
// import { MenuBar } from "~/src/components/molecules/menu_bar";
// import { Footer } from "~/src/components/organisms/footer";
// import { Header } from "~/src/components/organisms/header";
import { Colors } from "~/src/constants/colors";
import { ShowAlert } from "~/src/constants/common_function";
import GlobalConstant from "~/src/constants/global_constant";
import { MainMenu, Navigation } from "~/src/constants/navigation";
import {
  FooterResponsive,
  HeaderResponsive,
  MenuBarResponsive,
} from "~/src/constants/responsive_constant/common";
import { useAppDispatch, useAppSelector } from "~/src/redux/hook";
import { setState } from "~/src/redux/slices/common";

// export type StreamChannel = ChannelPreviewMessengerProps['channel'] | undefined
// export type StreamMessageId = string | undefined

// type AppContextType = {
//   messageInputRef: RefObject<TextInput> | null
//   channel: StreamChannel
//   setChannel: Dispatch<SetStateAction<StreamChannel>>
//   selectedChannelsForEditing: StreamChannel[]
//   setSelectedChannelsForEditing: Dispatch<SetStateAction<StreamChannel[]>>
//   selectedMessageIdsEditing: StreamMessageId[]
//   setSelectedMessageIdsEditing: Dispatch<SetStateAction<StreamMessageId[]>>
// }

// export const AppContext = React.createContext<AppContextType>(
//   {} as AppContextType,
// )
// export const useAppContext = () => React.useContext(AppContext)

export const App = () => {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const isHome =
    pathName === "/" || pathName === "" || pathName === "/server_configuration";
  useEffect(() => {
    const check = Navigation.find((x) => {
      return x.path === pathName;
    })?.menu;
    dispatch(setState({ activeMenu: check }));
  }, [pathName]);
  const inset = useSafeAreaInsets();
  const messageInputRef = useRef<TextInput>(null);
  // const [channel, setChannel] = useState<StreamChannel>()
  // const [clientReady, setClientReady] = useState<boolean>(false)
  // const [selectedChannelsForEditing, setSelectedChannelsForEditing] = useState<
  //   StreamChannel[]
  // >([])
  // const [selectedMessageIdsEditing, setSelectedMessageIdsEditing] = useState<
  //   StreamMessageId[]
  // >([])
  // const {bottom} = useSafeAreaInsets()

  // useEffect(() => {
  //   const setupClient = async () => {
  //     const connectPromise = chatClient.connectUser(user, userToken)
  //     setClientReady(true)
  //     await connectPromise
  //   }

  //   setupClient()
  // }, [])

  return (
    // <NavigationContainer theme={{colors: {background: colors.dark.background}}}>
    //   <AppContext.Provider
    //     value={{
    //       messageInputRef,
    //       channel,
    //       setChannel,
    //       selectedChannelsForEditing,
    //       setSelectedChannelsForEditing,
    //       selectedMessageIdsEditing,
    //       setSelectedMessageIdsEditing,
    //     }}>
    //     <GestureHandlerRootView style={{flex: 1}}>
    //       <OverlayProvider bottomInset={bottom} value={{style: theme}}>
    //         <ThemeProvider style={theme}>
    //           <Chat client={chatClient} enableOfflineSupport>
    //             <RootStack clientReady={clientReady} />
    //           </Chat>
    //         </ThemeProvider>
    //       </OverlayProvider>
    //     </GestureHandlerRootView>
    //   </AppContext.Provider>
    // </NavigationContainer>
    <Slot></Slot>
  );
};
