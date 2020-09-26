import { IFormProps, IValues } from "../../../../../common/form/formTypes";
import { ratesCreationMessages } from "../RatesCreationMsg";
import { additionalChargesTable } from "../additionalChargesInput";
import { LocalOCEANLCLByWeightColumns } from "./TABLES/LocalByWeightProps";
import { rowIndexField } from "../common";
import { LocalOCEANLCLFixColumns } from "./TABLES/LocalFixProps";
//////////////////////////////////////////////////

export const LocalsOceanLCL = [
  {
    name: "LocalsOceanLCLFixTable",
    label: "Ocean LCL Local Fix rules",
    editor: "spreadsheet",
    spreadsheetColumns: LocalOCEANLCLFixColumns,
    required: true,
  },
  {
    name: "LocalsOceanLCLByByWeightTable",
    label: "Ocean LCL Local by weight rules",
    editor: "spreadsheet",
    spreadsheetColumns: LocalOCEANLCLByWeightColumns,
    required: true,
  },
];

export const LocalsOCEANLCLForm: IFormProps = {
  formSystemMessage: ratesCreationMessages,
  schema: LocalsOceanLCL,
  submitButtonTitle: "Next",
  title: "Add Locals OceanLCL ",
  validate: function(values: IValues) {
    return {};
  },
};
