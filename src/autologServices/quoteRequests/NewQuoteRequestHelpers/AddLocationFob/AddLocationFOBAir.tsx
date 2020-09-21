//
import { IFormProps, IValues } from "../../../../common/form/formTypes";
import { quoteRequestCreationMessages } from "../QuotesRequestsProps";

const choisesUSA_Ports = ["port1USA_Air", "port2USA_Air"];
const choisesEurope_Ports = ["port1Europ_Air", "port2Europ_Air"];
const choisesFarEast_Ports = ["port1FarEast_Air", "port2FarEast_Air"];

const choisesUSA_States = ["state1USA_Air", "state2USA_Air"];
const choisesEurope_States = ["state1Europ_Air", "state2Europ_Air"];
const choisesFarEast_States = ["state1FarEast_Air", "state2FarEast_Air"];

const locationFobAirFarEastForm = [
  {
    name: "state",
    label: "State",
    editor: "dropdown",
    options: choisesFarEast_States,
    required: true,
  },
  {
    name: "portFrom",
    label: "Airport",
    editor: "dropdown",
    options: choisesFarEast_Ports,
    required: true,
  },
];

const locationFobAirEuropeForm = [
  {
    name: "state",
    label: "State",
    editor: "dropdown",
    options: choisesEurope_States,
    required: true,
  },
  {
    name: "portFrom",
    label: "Airport",
    editor: "dropdown",
    options: choisesEurope_Ports,
    required: true,
  },
];

const locationFobAirUSAForm = [
  {
    name: "state",
    label: "State",
    editor: "dropdown",
    options: choisesUSA_States,
    required: true,
  },
  {
    name: "portFrom",
    label: "Airport",
    editor: "dropdown",
    options: choisesUSA_Ports,
    required: true,
  },
];

export const AddLocationFOBAirUSA: IFormProps = {
  formSystemMessage: quoteRequestCreationMessages,
  schema: locationFobAirUSAForm,
  submitButtonTitle: "Next",
  title: "Choose airport",

  validate: function (values: IValues) {
    return {};
  },
};

export const AddLocationFOBAirEurope: IFormProps = {
  formSystemMessage: quoteRequestCreationMessages,
  schema: locationFobAirEuropeForm,
  submitButtonTitle: "Next",
  title: "Choose airport",
  validate: function (values: IValues) {
    return {};
  },
};

export const AddLocationFOBAirFarEast: IFormProps = {
  formSystemMessage: quoteRequestCreationMessages,
  schema: locationFobAirFarEastForm,
  submitButtonTitle: "Next",
  title: "Choose airport",

  validate: function (values: IValues) {
    return {};
  },
};
