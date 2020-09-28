import * as React from "react";
import {
  CustomComponentFuncProps,
  CustomComponentProps,
} from "../../../../../common/inputFields/FieldTypes";
import { GridElement } from "../../../../../common/inputFields/inputFieldComponents/spreadsheetInput/spreadsheetInputTypes";
import { Box, Button, Grid } from "@material-ui/core";
import { InputField } from "../../../../../common/inputFields/InputField";
// import { additionalChargesTable } from "../../AlphaHelpers/additionalChargesInput";
import { containerOptions } from "./../../AlphaHelpers/rateConstants";
import { rowIndexField, TableCurrency } from "./../common";
import { IFormProps, IValues } from "../../../../../common/form/formTypes";
import { ratesCreationMessages } from "../RatesCreationMsg";
import { FreightOceanFCLFIXCols } from "./FreightFix/FreightOceanFCLFIX";

const oceanFreightPartColumns = [
  { field: "portFrom", value: "Port From", readOnly: true, head: true },
  { field: "portTo", value: "Port To", readOnly: true, head: true },
  {
    field: "transitTime",
    value: "Transit Time",
    readOnly: true,
    head: true,
    fieldType: "day",
  },
];

const standardContainerRates = [
  {
    field: "DV20",
    head: true,
    value: "20DV",
    style: { width: 20 },
    readonly: true,
    fieldType: "currency",
    currencyType: "NIS",
  },
  {
    field: "DV40",
    head: true,
    value: "40DV",
    style: { width: 20 },
    readonly: true,
    fieldType: "currency",
    currencyType: "NIS",
  },
  {
    field: "HC40",
    head: true,
    value: "HC40",
    style: { width: 20 },
    readonly: true,
    fieldType: "currency",
    currencyType: "NIS",
  },
];
const routeColumn = {
  field: "route",
  head: true,
  value: "Route",
  style: { width: 20 },
  readonly: true,
};

export const oceanFclColumns = [
  ...oceanFreightPartColumns,
  ...standardContainerRates,
  routeColumn,
];

const ContainerTypeInput: React.FunctionComponent<CustomComponentProps> = (
  props: CustomComponentProps
) => {
  const { customComponentState, setCustomComponentState } = props;
  const [containerType, setContainerType] = React.useState<string>();
  const [containerTypeColumn, setContainerTypeColumn] = React.useState<
    GridElement | undefined
  >();

  React.useEffect(() => {
    containerType &&
      setContainerTypeColumn({
        head: true,
        value: containerType,
        field: containerType,
        readOnly: true,
        fieldType: "currency",
        currencyType: "NIS",
        style: { width: 20 },
      });
  }, [containerType]);

  const handleChange = (event: React.ChangeEvent<any>) => {
    setContainerType(event.target.value);
  };

  const handleBlur = () => {};
  const addContainerType = () => {
    const existingContainerTypeColumns: GridElement[] =
      "containerType" in customComponentState
        ? customComponentState.containerType
        : [];

    setCustomComponentState({
      containerType: [
        ...existingContainerTypeColumns,
        containerTypeColumn,
      ] as GridElement[],
    });
  };

  return (
    <Grid container alignItems={"center"} direction={"row"}>
      <Grid item md={4}>
        <InputField
          handleBlur={handleBlur}
          label={"Add Container"}
          name={"containerType"}
          initialValue={containerType}
          required={false}
          handleChange={handleChange}
          editor="dropdown"
          options={containerOptions()}
        />
      </Grid>
      <Grid item md={4}>
        <Button
          style={{ textTransform: "none", fontSize: 16 }}
          variant="contained"
          disableElevation
          onClick={() => {
            addContainerType();
          }}
          fullWidth={false}
        >
          Add Container Type Column
        </Button>
      </Grid>
    </Grid>
  );
};

const oceanFclCustomComponentFunc = (props: CustomComponentFuncProps) => {
  const { customComponentState, state } = props;
  const [headers, ...bodyRows] = state.grid;

  let newState = state;

  if ("containerType" in customComponentState) {
    const newContainerTypeHeader = customComponentState.containerType.pop();

    const newHeaders = !headers.some((header) => {
      return header.field === newContainerTypeHeader.field;
    })
      ? [...headers, newContainerTypeHeader]
      : headers;

    const newBodyRows = !headers.some((header) => {
      return header.field === newContainerTypeHeader.field;
    })
      ? bodyRows.map((row) => [
          ...row,
          {
            field: newContainerTypeHeader.field,
            value: "",
            fieldType: "currency",
            currencyType: "NIS",
          },
        ])
      : bodyRows;

    return {
      grid: [newHeaders, ...newBodyRows],
      columnMetadataTable: state.columnMetadataTable,
    };
  }
  if ("currency" in customComponentState) {
    newState = {
      grid: state.grid.map((row) =>
        row.map((cell) => {
          if (cell.currencyType !== undefined) {
            const { currencyType, ...otherCellProps } = cell;
            return {
              currencyType: customComponentState.currency,
              ...otherCellProps,
            };
          } else {
            return cell;
          }
        })
      ),
      columnMetadataTable: state.columnMetadataTable,
    };
  }
  return newState;
};

const OceanFclCustomComponent: React.FunctionComponent<CustomComponentProps> = (
  props: CustomComponentProps
) => {
  return (
    <>
      <ContainerTypeInput {...props} />
      <TableCurrency {...props} />
    </>
  );
};

const pointsOfDestination = {
  field: "toPort",
  head: true,
  value: "To Port",
  style: { width: 20 },
  readonly: true,
};
const PointsOfDestinationAddOnColumns = [
  [rowIndexField, pointsOfDestination, ...standardContainerRates],
];
const oceanFclRateColumns = [[rowIndexField, ...oceanFclColumns]];

export const OceanFclRates = [
  {
    name: "portDefaultDestinationIsrael",
    label: "Destination Port Israel",
    editor: "dropdown",
    options: ["Ashdod", "Haifa", "Ignore"],
    required: true,
  },
  {
    name: "trainTransIsraelAmount",
    label: "Train travel to other port",
    editor: "number",
    required: true,
  },
  {
    name: "oceanFCLTable",
    label: "Ocean FCL Rates:",
    editor: "spreadsheet",
    customComponent: OceanFclCustomComponent,
    customSpreadsheetInputFunc: oceanFclCustomComponentFunc,
    spreadsheetColumns: oceanFclRateColumns,
    required: true,
  },
  {
    name: "oceanFCLFreightFix",
    label: "Ocean FCL Fix Taxes:",
    editor: "spreadsheet",
    spreadsheetColumns: FreightOceanFCLFIXCols,
    required: true,
  },
];

export const FreightTransportOceanFclForm: IFormProps = {
  formSystemMessage: ratesCreationMessages,
  schema: OceanFclRates,
  submitButtonTitle: "Next",
  title: "Add Freight OceanFCL Transport Rates",
  validate: function(values: IValues) {
    return {};
  },
};
