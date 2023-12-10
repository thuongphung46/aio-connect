import { Request } from "./request";
const Controller = "chat-social";
export const ChatSocialService = {
  SendMessage: async (message: any) => {
    return await Request(Controller).postAsync("send", message);
  },
  GetList: async (staffId: any) => {
    return await Request(Controller).postAsync("search", staffId);
  },
};
