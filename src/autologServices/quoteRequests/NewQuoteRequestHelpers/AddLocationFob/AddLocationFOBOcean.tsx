//
import { IFormProps, IValues } from "../../../../common/form/formTypes";
import { quoteRequestCreationMessages } from "../QuotesRequestsProps";

const choisesUSA_Ports = ["port1USA_Ocean", "port2USA_Ocean"];
const choisesEurope_Ports = ["port1Europ_Ocean", "port2Europ_Ocean"];
const choisesFarEast_Ports = ["port1FarEast_Ocean", "port2FarEast_Ocean"];

const choisesUSA_States = ["state1USA_Ocean", "state2USA_Ocean"];
const choisesEurope_States = ["state1Europ_Ocean", "state2Europ_Ocean"];
const choisesFarEast_States = ["state1FarEast_Ocean", "state2FarEast_Ocean"];

const locationFobOceanFarEastForm = [
  {
    name: "state",
    label: "State",
    editor: "dropdown",
    options: choisesFarEast_States,
    required: true,
  },
  {
    name: "portFrom",
    label: "port",
    editor: "dropdown",
    options: choisesFarEast_Ports,
    required: true,
  },
];

const locationFobOceanEuropeForm = [
  {
    name: "state",
    label: "State",
    editor: "dropdown",
    options: choisesEurope_States,
    required: true,
  },
  {
    name: "portFrom",
    label: "port",
    editor: "dropdown",
    options: choisesEurope_Ports,
    required: true,
  },
];

const locationFobOceanUSAForm = [
  {
    name: "state",
    label: "State",
    editor: "dropdown",
    options: choisesUSA_States,
    required: true,
  },
  {
    name: "portFrom",
    label: "port",
    editor: "dropdown",
    options: choisesUSA_Ports,
    required: true,
  },
];

export const AddLocationFOBOceanUSA: IFormProps = {
  formSystemMessage: quoteRequestCreationMessages,
  schema: locationFobOceanUSAForm,
  submitButtonTitle: "Next",
  title: "Choose state and port",
  validate: function(values: IValues) {
    return {};
  },
};

export const AddLocationFOBOceanEurope: IFormProps = {
  formSystemMessage: quoteRequestCreationMessages,
  schema: locationFobOceanEuropeForm,
  submitButtonTitle: "Next",
  title: "Choose state and port",
  validate: function(values: IValues) {
    return {};
  },
};

export const AddLocationFOBOceanFarEast: IFormProps = {
  formSystemMessage: quoteRequestCreationMessages,
  schema: locationFobOceanFarEastForm,
  submitButtonTitle: "Next",
  title: "Choose state and port",
  validate: function(values: IValues) {
    return {};
  },
};
