import { Request } from "./request";

const controller = "PQCNgoaiQuanEN";
export const PQCExternalService = {
  GetDefectByModel: async (model: string) => {
    return await Request(controller).getAsync("GetDefectByModel", { model });
  },
  SaveDefect: async (doc_entry: any, post_data: any[]) => {
    return await Request(controller).postAsync(
      `SaveDefect?doc_entry=${doc_entry}`,
      post_data
    );
  },
};
