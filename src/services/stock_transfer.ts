import { Request } from "./request";

const controller = "StockTransfer";
export const StockTransferService = {
  GetData: async (barcode: string) => {
    return await Request(controller).getAsync("scan", { barcode });
  },
  SaveData: async (header: any[], lines: any[]) => {
    return await Request(controller).postAsync("Create", {
      Table1: header,
      Table2: lines,
    });
  },
};
