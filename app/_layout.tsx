import { Provider } from "react-redux";
import { store } from "~/src/redux/store";
import { App } from "./app";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Provider store={store}>
      <App></App>
    </Provider>
    // <Stack
    //   screenOptions={{
    //     headerStyle: {
    //       backgroundColor: "#f4511e",
    //     },
    //     headerTintColor: "#fff",
    //     headerTitleStyle: {
    //       fontWeight: "bold",
    //     },
    //   }}
    // />
  );
}
