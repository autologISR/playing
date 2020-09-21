import { IFormProps, IValues } from "../../../common/form/formTypes";
import { quoteRequestCreationMessages } from "./QuotesRequestsProps";
const allStates = ["state1", "state2"];
export const quoteRequestSupplierDetailsForm = [
  {
    name: "supplierState",
    label: "Supplier's state",
    editor: "dropdown",
    options: allStates,
    required: true,
  },
  {
    name: "zipCode",
    label: "Supplier's zipcode",
    editor: "textbox",
    required: true,
  },
  {
    name: "fullAddress",
    label: "Supplier's address",
    editor: "addressSearch",
    required: true,
  },
  {
    name: "additionalInfo",
    label: "Additional info ",
    editor: "multilinetextbox",
  },
];

export const AddSupplierDetails: IFormProps = {
  formSystemMessage: quoteRequestCreationMessages,
  schema: quoteRequestSupplierDetailsForm,
  submitButtonTitle: "Next",
  title: "Add supplier's info",
  validate: function (values: IValues) {
    return {};
  },
};
