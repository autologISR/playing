import { IFormProps, IValues } from "../../../../../common/form/formTypes";
import { ratesCreationMessages } from "../RatesCreationMsg";
// import { additionalChargesTable } from "../additionalChargesInput";
import { LocalAIRFixColumns } from "./TABLES/LocalFixProps";
import { rowIndexField } from "../common";
import { additionalChargesTable } from "../additionalChargesInput";
import { LocalAIRByWeightColumns } from "./TABLES/LocalByWeightProps";
export const LocalsAirSchema = [
  {
    name: "LocalsAirFixTable",
    label: "Air Local Fix rules",
    editor: "spreadsheet",
    spreadsheetColumns: LocalAIRFixColumns,
    required: true,
  },

  {
    name: "LocalsAirByWeightTable",
    label: "Air Local weight rules",
    editor: "spreadsheet",
    spreadsheetColumns: LocalAIRByWeightColumns,
    required: true,
  },
  {
    name: "yata",
    label: "YATA % ( by Air Freight value)",
    editor: "number",
    required: true,
  },
];

export const LocalsAIRForm: IFormProps = {
  formSystemMessage: ratesCreationMessages,
  schema: LocalsAirSchema,
  submitButtonTitle: "Next",
  title: "Add Locals Air",
  validate: function(values: IValues) {
    return {};
  },
};
