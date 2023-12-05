import { useFocusEffect, useRouter } from "expo-router";
import { MqttClient, connect } from "precompiled-mqtt";
import { useCallback, useEffect, useState } from "react";
import { Login } from "src/components/molecules/login";
import { ApiAddress } from "~/src/constants/api_address";
import { LocalStore } from "~/src/constants/app_config";
import {
  PxStorage,
  ShowAlert,
  checkResponseData,
  createUUID,
} from "~/src/constants/common_function";
import { TopicList } from "~/src/constants/mqtt";
import { useAppDispatch, useAppSelector } from "~/src/redux/hook";
import { Actions } from "~/src/redux/slices/login";
import { setState } from "~/src/redux/slices/mqtt";
import { UserService } from "~/src/services/login";

export const HomeTemplate = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { auth, account } = useAppSelector((state) => state.LoginReducer);
  const [client, setClient] = useState<MqttClient>();

  const [userData, setUserData] = useState({
    // emp_id: "",
    username: "",
    password: "",
  });
  // Effects
  const connectMqtt = async () => {
    const result = await UserService.GetMqttConfig();
    const data = checkResponseData(result);
    if (data) {
      const mqttUrl = `mqtt://${data.host}:${data.port}`;
      const mqttClient = connect(mqttUrl, {
        clientId: createUUID(),
      });
      setClient(mqttClient);
    }
  };

  useEffect(() => {
    if (auth) {
      connectMqtt();
    }
  }, [auth]);

  useEffect(() => {
    if (client) {
      client.on("connect", (e) => {
        console.log("Connected", e);
        client.subscribe(TopicList.productionPlastic);
      });
      client.on("error", (e) => {
        ShowAlert("ERROR", e.message);
      });
      client.on("message", (topic: any, message: any) => {
        console.log(message.toString());
        dispatch(setState({ message: message.toString(), topic }));
      });
    }
  }, [client, dispatch]);

  const getDataLocalStore = async () => {
    let server_address: any = "";
    server_address = await PxStorage.get(LocalStore.serverAddress);
    if (!server_address) {
      router.replace("/");
    } else {
      ApiAddress.api = server_address;
    }
  };

  // useFocusEffect(() => {
  //   getDataLocalStore();
  // });

  // Functions
  // const updateUserData = (field: string, value: any) => {
  //   let newData = { ...userData };
  //   if (value !== userData[field]) {
  //     newData[field] = value;
  //     setUserData(newData);
  //   }
  //   if (field === "emp_id" && value && value.length === 6) {
  //     dispatch(
  //       Actions.fetchUserData(
  //         "ONCHANGE",
  //         value,
  //         newData.emp_name,
  //         (username) => {
  //           setUserData((prevValue: any) => {
  //             return {
  //               ...prevValue,
  //               emp_name: username,
  //             };
  //           });
  //         }
  //       )
  //     );
  //   }
  // };

  const requestLogin = useCallback(() => {
    dispatch(
      Actions.requestLogin(userData, () => {
        setUserData({
          // emp_id: "",
          username: "",
          password: "",
        });
      })
    );
  }, [dispatch, userData]);

  const handleSubmit = useCallback(() => {
    if (!auth) requestLogin();
    else dispatch(Actions.logoutRequest());
  }, [requestLogin, auth, dispatch]);

  return (
    <>
      <Login />
    </>
  );
};
