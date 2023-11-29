import { Request } from "./request";
const Controller = "User";
export const UserService = {
  Login: async (values: any) => {
    return await Request(Controller).postAsync("Login", values);
  },
  GetUserName: async (values: any) => {
    return await Request(Controller).getAsync("GetUserName", values);
  },
  GetMqttConfig: async () => {
    return await Request("config").getAsync("mqtt", null);
  },
};
