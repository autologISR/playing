import * as React from "react";
import {IFieldProps} from "../FieldTypes";
import {TextField} from "@material-ui/core";

export const MultiLineTextBox: React.FunctionComponent<IFieldProps> = (props: IFieldProps) => {
    const {handleChange, handleBlur, name, label, placeholder, helperText, rows, required, initialValue, error, fullWidth} = props;

    return <TextField
        defaultValue={initialValue}
        required={required}
        name={name}
        label={label}
        placeholder={placeholder}
        error={error}
        rows={rows}
        onChange={handleChange}
        onBlur={handleBlur}
        InputLabelProps={{shrink: true}}
        helperText={helperText}
        multiline
        fullWidth={fullWidth !== undefined ? fullWidth : true}
    />;
};