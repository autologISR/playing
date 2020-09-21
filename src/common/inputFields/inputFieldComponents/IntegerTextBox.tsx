import * as React from "react";
import {IFieldProps} from "../FieldTypes";
import {TextField} from "@material-ui/core";

export const IntegerTextBox: React.FunctionComponent<IFieldProps> = (props: IFieldProps) => {

    const {handleChange, handleBlur, name, label, placeholder, helperText, required, initialValue, error, fullWidth} = props;

    return <TextField
        error={error}
        defaultValue={initialValue}
        required={required}
        name={name}
        label={label}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={helperText}
        InputLabelProps={{shrink: true}}
        type='number'
        fullWidth={
            fullWidth !== undefined ?
                fullWidth :
                true
        }

    />;
};