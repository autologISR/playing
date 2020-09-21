import * as React from "react";
import {IFieldProps} from "../FieldTypes";
import {TextField} from "@material-ui/core";
import {NumberInput} from "./NumberInput";
import InputMask from "react-input-mask";

export const ChargeAmountTextBox: React.FunctionComponent<IFieldProps> = (props: IFieldProps) => {

    const {name, label, placeholder, handleChange, handleBlur, helperText, required, fullWidth, error, unitOfMeasurement} = props;

    return (
        <TextField
            fullWidth={fullWidth !== undefined ? fullWidth : true}
            required={required}
            name={name}
            label={label}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={helperText}
            InputLabelProps={{shrink: true}}
            error={error}
            InputProps={{
                inputComponent: NumberInput as any,
                inputProps: {prefix: unitOfMeasurement !== undefined ? `${unitOfMeasurement}  ` : ''}
            }}
        />
    );
};