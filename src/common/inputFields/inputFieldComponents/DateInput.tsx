import React from "react";
import { IFieldProps } from "../FieldTypes";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { dynamoDbDateForTable } from "../../entityKeyPair";
import moment from "moment"
 
export const DateInput = (props: IFieldProps) => {
  const {
    name,
    label,
    handleChange,
    handleBlur,
    required,
    error,
    initialValue,
    fullWidth,
    readOnly,
  } = props;
  const [date, setDate] = React.useState<Date | string | null>(
    initialValue !== undefined
      ? typeof initialValue === "string"
        ? new Date(moment(initialValue).format("YYYY-MM-DD"))
        : initialValue
      : null
  );

  const handleDateChange = (name: string) => (
    date: Date | null,
    value?: string | null | undefined
  ) => {
    const event = {
      target: {
        name: name,
        value: dynamoDbDateForTable(date?.toString() as string),
      },
    } as React.ChangeEvent<{ name: string; value: string }>;
    handleChange(event);
    date !== null && setDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        name={name}
        required={required}
        disableToolbar
        variant="inline"
        format="yyyy-MM-dd"
        margin="normal"
        id="date-picker-inline"
        label={label}
        value={date}
        onChange={handleDateChange(name)}
        onBlur={handleBlur}
        error={error}
        readOnly={readOnly}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
};
