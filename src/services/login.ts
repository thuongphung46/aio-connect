import { Request } from "./request";
const Controller = "auth";
export const UserService = {
  Login: async (values: any) => {
    return await Request(Controller).postAsync("login", values);
  },
  GetUserName: async (values: any) => {
    return await Request(Controller).getAsync("GetUserName", values);
  },
  GetMqttConfig: async () => {
    return await Request("config").getAsync("mqtt", null);
  },
};
