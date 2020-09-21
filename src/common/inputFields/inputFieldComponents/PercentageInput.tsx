import React from "react";
import {TextField} from "@material-ui/core";
import {NumberInput} from "./NumberInput";
import {IFieldProps} from "../FieldTypes";

export const PercentageInput = (props: IFieldProps) => {

    const {name, label, placeholder, handleChange, handleBlur, helperText, required, fullWidth, error} = props;

    return (
        <TextField
            fullWidth={fullWidth !== undefined ? fullWidth : true}
            required={required}
            name={name}
            label={label}
            error={error}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={helperText}
            InputLabelProps={{shrink: true}}
            InputProps={{
                inputComponent: NumberInput as any,
                inputProps: {suffix:'%'}
            }}

        />
    );
};
