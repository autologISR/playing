import * as React from "react";
import {IFieldProps} from "../FieldTypes";
import {TextField} from "@material-ui/core";

export const PasswordTextBox: React.FunctionComponent<IFieldProps> = (props: IFieldProps) => {

    const {handleChange, handleBlur, name, label, placeholder, helperText, required, error,fullWidth} = props;

    return <TextField
        required={required}
        name={name}
        label={label}
        error={error}
        placeholder={placeholder}
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={helperText}
        InputLabelProps={{shrink: true}}
        fullWidth={fullWidth !== undefined ? fullWidth : true}
    />;
};