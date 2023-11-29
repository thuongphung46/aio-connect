export const TopicList = {
  productionOrder: "production_order",
  productionPlastic: "production_plastic",
};

export const checkRelease = (topic: string, message: string) => {
  let check = false;
  try {
    if (topic === TopicList.productionPlastic && message) {
      const data = JSON.parse(message);
      if (
        data &&
        (data.action === "release" ||
          data.action === "new" ||
          data.action === "close" ||
          data.action === "start-stop")
      ) {
        check = true;
      }
    }
  } catch (error) {
    console.log(error);
  }
  return check;
};

export const CheckType = {
  match: "match",
  notMatch: "notMatch",
  none: "none",
};
export interface GetQuantityCurrentValue {
  checkResult?: string;
  docEntry: any;
  itemCode: any;
  value: any;
}

export const getOKQuantity = (
  topic: any,
  message: any,
  currentValue: GetQuantityCurrentValue
) => {
  let result = currentValue;
  result.checkResult = CheckType.none;
  if (topic === TopicList.productionPlastic && message) {
    const data = JSON.parse(message);
    if (data && data.action === "ok_qty") {
      if (
        data.payload?.doc_entry === currentValue.docEntry &&
        data.payload?.item_code === currentValue.itemCode
      ) {
        result = {
          checkResult: CheckType.match,
          docEntry: currentValue.docEntry,
          itemCode: currentValue.itemCode,
          value: parseFloat(`${data.payload?.ok_qty}`) || 0,
        };
      } else {
        result = {
          checkResult: CheckType.notMatch,
          docEntry: data.payload?.doc_entry,
          itemCode: data.payload?.item_code,
          value: parseFloat(`${data.payload?.ok_qty}`) || 0,
        };
      }
    }
  }
  return result;
};

export const getNGQuantity = (
  topic: any,
  message: any,
  currentValue: GetQuantityCurrentValue
) => {
  let result = currentValue;
  result.checkResult = CheckType.none;
  if (topic === TopicList.productionPlastic && message) {
    const data = JSON.parse(message);
    if (data && data.action === "ng_qty") {
      if (
        data.payload?.doc_entry === currentValue.docEntry &&
        data.payload?.item_code === currentValue.itemCode
      ) {
        result = {
          checkResult: CheckType.match,
          itemCode: currentValue.itemCode,
          docEntry: currentValue.docEntry,
          value: parseFloat(`${data.payload?.ng_qty}`) || 0,
        };
      } else {
        result = {
          checkResult: CheckType.notMatch,
          itemCode: data.payload?.item_code,
          docEntry: data.payload?.doc_entry,
          value: parseFloat(`${data.payload?.ng_qty}`) || 0,
        };
      }
    }
  }
  return result;
};

export const GetResult = (topic: any, message: any, currentValue: any) => {
  let result: any = currentValue;
  if (topic === TopicList.productionPlastic && message) {
    const data = JSON.parse(message);
    if (data && data.action === "total") {
      result = parseFloat(`${data.payload?.result}`) || 0;
    }
  }
  return result;
};
