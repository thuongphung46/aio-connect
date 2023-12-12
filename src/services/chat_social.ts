import { GetResult } from "../constants/mqtt";
import { Request } from "./request";
const Controller = "chat-social";

export interface IFacebookBody {
  recipient: Recipient;
  messaging_type: string;
  message: Message;
  staffId: any;
  chatId: any;
}

export interface Recipient {
  id: string;
}

export interface Message {
  text: any;
}

export const ChatSocialService = {
  SendFB: async (message: IFacebookBody) => {
    return await Request(Controller).postAsync("facebook/send", message);
  },
  GetList: async (staffId: any) => {
    return await Request(Controller).postAsync("search", staffId);
  },
  // http://localhost:8082/api/v1/chat-social/detail?page=0&size=10
  GetListHistoryChat: async (staffId: any) => {
    return await Request(Controller).postAsync(
      "detail?page=0&size=10",
      staffId
    );
  },
};
