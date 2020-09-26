import { IFormProps, IValues } from "../../../../../common/form/formTypes";
import { ratesCreationMessages } from "../RatesCreationMsg";
// import { additionalChargesTable } from "../additionalChargesInput";
import { LocalOCEANFCLFixColumns } from "./TABLES/LocalFixProps";
import { LocalOCEANFCLByContainerColumns } from "./TABLES/LocalByContainerType";
import { rowIndexField } from "../common";

export const LocalsOceanFCL = [
  {
    name: "LocalsOceanFCLFixTable",
    label: "Ocean FCL Local Fix rules",
    editor: "spreadsheet",
    spreadsheetColumns: LocalOCEANFCLFixColumns,
    required: true,
  },
  {
    name: "LocalsOceanFCLByContainerTypeTable",
    label: "Ocean FCL Local by Container Type rules",
    editor: "spreadsheet",
    spreadsheetColumns: LocalOCEANFCLByContainerColumns,
    required: true,
  },
  {
    name: "thc20",
    label: "thc20 (usd)",
    editor: "number",
    required: true,
  },
  {
    name: "thc40",
    label: "thc40 (usd)",
    editor: "number",
    required: true,
  },
];
export const LocalsOCEANFCLForm: IFormProps = {
  formSystemMessage: ratesCreationMessages,
  schema: LocalsOceanFCL,
  submitButtonTitle: "Next",
  title: "Add Locals OceanFCL (collection Fee 0.6% included)",
  validate: function(values: IValues) {
    return {};
  },
};
