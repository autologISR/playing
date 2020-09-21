import * as React from "react";
import {IFieldProps} from "../FieldTypes";
import {TextField} from "@material-ui/core";

export const EmailTextBox: React.FunctionComponent<IFieldProps> = (props: IFieldProps) => {

    const {name, placeholder, handleBlur, handleChange, helperText, required, initialValue, error, fullWidth} = props;

    return <TextField
        error={error}
        defaultValue={initialValue}
        required={required}
        margin='normal'
        fullWidth={fullWidth !== undefined ? fullWidth : true}
        placeholder={placeholder}
        onBlur={handleBlur}
        onChange={handleChange}
        InputLabelProps={{shrink: true}}
        id='email'
        label='Email Address'
        name={name}
        autoComplete='email'
        helperText={helperText}
    />;
};