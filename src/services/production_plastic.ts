import { Request } from "./request";

const controller = "ProductionPlastic";
export const ProductionPlasticService = {
  GetPlanInDay: async () => {
    const data = {
      resource: "EPNHUA",
    };
    return await Request(controller).getAsync("GetPlanInDay", data);
  },
  SendPrintRequest: async (data: any) => {
    return await Request(controller).postAsync("SendPrintRequest", data);
  },
  Manual: async (data: any) => {
    return await Request(controller).postAsync("Manual", data);
  },
  Scan: async (data: any) => {
    return await Request(controller).postAsync("Scan", data);
  },
};
