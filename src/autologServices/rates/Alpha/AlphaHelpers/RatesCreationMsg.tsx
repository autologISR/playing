import { AutologSystemMessageSchema } from "../../../../common/systemMessages/autologSystemMessageTypes";

export const ratesCreationMessages: AutologSystemMessageSchema = new Map([
  ["success", { message: "Rate was created." }],
  [
    "error",
    {
      message: "There was an error during rate creation, please check errors.",
    },
  ],
]);
