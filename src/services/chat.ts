import { Request } from "./request";
const Controller = "chat-message";
export const ChatService = {
  SendMessage: async (message: any) => {
    return await Request(Controller).postAsync("send", message);
  },
  GetListMessage: async (id: any) => {
    return await Request(Controller).postAsync("search", id);
  },
};
