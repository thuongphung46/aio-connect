import { Request } from "./request";
const Controller = "chat";
export const ChatInternalService = {
  GetList: async (staffId: any) => {
    return await Request(Controller).postAsync("search", { staffId });
  },
  GetMqttConfig: async () => {
    return await Request("config").getAsync("mqtt", null);
  },
};
