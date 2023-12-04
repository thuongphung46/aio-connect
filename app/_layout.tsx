import { Provider } from "react-redux";
import { store } from "~/src/redux/store";
import "~/src/translation/i18n";
import { App } from "./app";

export default function Layout() {
  return (
    <Provider store={store}>
      <App></App>
    </Provider>
  );
}
