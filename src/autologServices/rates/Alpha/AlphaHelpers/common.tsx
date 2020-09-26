import * as React from "react";
import {
  AdHocColumnsSpreadsheetParser,
  CustomComponentFuncProps,
  CustomComponentProps,
} from "../../../../common/inputFields/FieldTypes";
import { GridElement } from "../../../../common/inputFields/inputFieldComponents/spreadsheetInput/spreadsheetInputTypes";
import { Box, Button, Grid } from "@material-ui/core";
import { InputField } from "../../../../common/inputFields/InputField";

export function getChooseCurrencyInput(
  handleBlur: () => void,
  handleChange: (event: React.ChangeEvent<any>) => void,
  currencyType?: "NIS" | "USD"
) {
  return (
    <InputField
      handleBlur={handleBlur}
      label={"Choose Currency"}
      required={true}
      handleChange={handleChange}
      name={"rulesCurrency"}
      groupOrientation={"row"}
      editor={"radio"}
      initialValue={currencyType === undefined ? "NIS" : currencyType}
      options={["USD", "NIS"]}
    />
  );
}

export function currencyInputs(
  handleBlur: () => void,
  handleChange: (event: React.ChangeEvent<any>) => void,
  onClickChangeCurrency: () => void
) {
  return (
    <Grid container alignItems={"center"} direction={"row"} xs={8}>
      <Grid item xs={3}>
        {getChooseCurrencyInput(handleBlur, handleChange)}
      </Grid>
      <Grid item xs={3}>
        <Button
          style={{ textTransform: "none", fontSize: 16 }}
          className="button"
          variant="contained"
          disableElevation
          color="inherit"
          onClick={() => {
            onClickChangeCurrency();
          }}
          fullWidth={false}
        >
          Change Currency
        </Button>
      </Grid>
    </Grid>
  );
}

export const TableCurrency: React.FunctionComponent<CustomComponentProps> = (
  props: CustomComponentProps
) => {
  const { customComponentState, setCustomComponentState } = props;
  const [currency, setCurrency] = React.useState<"USD" | "NIS">("NIS");

  const handleChange = (event: React.ChangeEvent<any>) => {
    setCurrency(event.target.value);
  };

  const handleBlur = () => {};

  const onClickChangeCurrency = () => {
    customComponentState !== currency &&
      setCustomComponentState({
        currency: currency,
      });
  };

  return (
    <Grid justify={"flex-start"} alignItems={"center"} direction={"column"}>
      {currencyInputs(handleBlur, handleChange, onClickChangeCurrency)}
    </Grid>
  );
};
export const currencyCustomComponentFunc = (
  props: CustomComponentFuncProps
) => {
  const { customComponentState, state } = props;
  const [headers, ...bodyRows] = state.grid;

  let newState = state;
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
    };
  }
  return newState;
};
export const rowIndexField = {
  head: true,
  field: "rowIndex",
  value: "",
  readOnly: true,
};
export const WeightLimits: React.FunctionComponent<CustomComponentProps> = (
  props: CustomComponentProps
) => {
  const { customComponentState, setCustomComponentState } = props;
  const [fromWeight, setFromWeight] = React.useState<string>();
  const [fromWeightColumn, setFromWeightColumn] = React.useState<
    GridElement | undefined
  >();

  React.useEffect(() => {
    fromWeight &&
      setFromWeightColumn({
        head: true,
        value: ">=" + fromWeight + " kg",
        field: "from" + fromWeight,
        readOnly: true,
        style: { width: 20 },
        fieldType: "currency",
        currencyType: "NIS",
      });
  }, [fromWeight]);

  const handleChange = (event: React.ChangeEvent<any>) => {
    setFromWeight(event.target.value);
  };

  const handleBlur = () => {};
  const addNewFromWeightColumn = () => {
    const existingFromWeightColumns: GridElement[] =
      "fromWeight" in customComponentState
        ? customComponentState.fromWeight
        : [];

    setCustomComponentState({
      fromWeight: [
        ...existingFromWeightColumns,
        fromWeightColumn,
      ] as GridElement[],
    });
  };

  return (
    <Box>
      <Box order={1}>
        <InputField
          handleBlur={handleBlur}
          label={"Add weight from"}
          name={"fromWeight"}
          initialValue={fromWeight}
          required={false}
          handleChange={handleChange}
          editor="weight"
          unitOfMeasurement={"kg"}
        />
      </Box>
      <Box order={2} paddingTop={2}>
        <Button
          style={{ textTransform: "none", fontSize: 16 }}
          variant="contained"
          color="inherit"
          onClick={() => {
            addNewFromWeightColumn();
          }}
          fullWidth={false}
        >
          Add New Weight From Column
        </Button>
      </Box>
    </Box>
  );
};
export const WeightLimitsComponent: React.FunctionComponent<CustomComponentProps> = (
  props: CustomComponentProps
) => {
  return (
    <>
      <WeightLimits {...props} />
      <TableCurrency {...props} />
    </>
  );
};
export const fromWeightRatesCustomComponentFunc = (
  props: CustomComponentFuncProps
) => {
  const { customComponentState, state } = props;
  const [headers, ...bodyRows] = state.grid;

  let newState = state;

  if ("fromWeight" in customComponentState) {
    const newFromWeightHeader = customComponentState.fromWeight.pop();

    const newHeaders = !headers.some((header) => {
      return header.field === newFromWeightHeader.field;
    })
      ? [...headers, newFromWeightHeader]
      : headers;

    const newBodyRows = !headers.some((header) => {
      return header.field === newFromWeightHeader.field;
    })
      ? bodyRows.map((row) => [
          ...row,
          {
            field: newFromWeightHeader.field,
            value: "",
            fieldType: "currency",
            currencyType: "NIS",
          },
        ])
      : bodyRows;

    newState = { grid: [newHeaders, ...newBodyRows] };
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
export const fromWeightAdHocColumnsSpreadsheetParser: AdHocColumnsSpreadsheetParser = (
  fieldName
) => {
  const fromWeightRegex = /^from(\d+)$/;
  const fromWeightField = fieldName.match(fromWeightRegex);
  return fromWeightField === null
    ? fieldName
    : "> " + fromWeightField[1] + " kg";
};
