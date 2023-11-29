export const CreateSagaAction = (id: string, actions: any[]) => {
  let result: any = {};
  for (let i = 0; i < actions.length; i++) {
    result[actions[i]] = `${id}.${actions[i]}`;
  }
  return result;
};

export const sleep = (ms: number) => {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
