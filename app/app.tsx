import { Slot, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View, StatusBar as RNStatusBar, Platform } from "react-native";
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

export const App = () => {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const isHome =
    pathName === "/" || pathName === "" || pathName === "/server_configuration";
  // const { selectedRow } = useAppSelector((x) => x.ProductionOutputReducer);
  // const navigateToQuanlity = () => {
  //   if (!selectedRow) {
  //     ShowAlert("ERROR", "Bạn chưa chọn Lệnh sản xuất");
  //     return false;
  //   }
  // };

  // const MenuData = [
  //   { title: "Sản xuất", id: MainMenu.manufacture },
  //   { title: "Chất lượng", id: MainMenu.quality, OnPress: navigateToQuanlity },
  //   { title: "Thiết bị", id: MainMenu.device },
  //   { title: "Vận chuyển", id: MainMenu.transpot },
  // ];

  useEffect(() => {
    const check = Navigation.find((x) => {
      return x.path === pathName;
    })?.menu;
    dispatch(setState({ activeMenu: check }));
  }, [pathName]);
  const inset = useSafeAreaInsets();

  return (
    <>
      <SafeAreaView
        edges={["top", "left", "right"]}
        style={{ flex: 1, backgroundColor: Colors.main }}
      >
        <KeyboardAwareScrollView contentContainerStyle={{ minHeight: "100%" }}>
          <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
            <StatusBar style="light" backgroundColor={Colors.main} />
            {/* <AppLoading></AppLoading>
            <Header></Header> */}
            <View
              style={{
                flex: 1,
                height:
                  GlobalConstant.DeviceHeight -
                  HeaderResponsive.height -
                  (isHome ? 0 : MenuBarResponsive.height) -
                  FooterResponsive.height -
                  (parseFloat(
                    `${
                      Platform.OS === "ios"
                        ? inset.top + inset.bottom
                        : RNStatusBar?.currentHeight
                    }`
                  ) || 0),
              }}
            >
              <Slot></Slot>
            </View>
            {/* {!isHome && <MenuBar data={MenuData}></MenuBar>}
            <Footer></Footer> */}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <SafeAreaView
        style={{ flex: 0, backgroundColor: Colors.backgroundColor }}
        edges={["bottom"]}
      ></SafeAreaView>
    </>
  );
};
