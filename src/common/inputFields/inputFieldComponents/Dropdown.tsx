import * as React from "react";
import {IFieldProps} from "../FieldTypes";
import {MenuItem, TextField} from "@material-ui/core";

export const Dropdown: React.FunctionComponent<IFieldProps> = (props: IFieldProps) => {
    const {initialValue,options, handleChange, handleBlur, name, label, placeholder, helperText, required, error, readOnly,fullWidth} = props;

    return (
        <TextField
            required={required}
            name={name}
            value={initialValue}
            select
            fullWidth={true}
            label={label}
            placeholder={placeholder}
            onChange={
                (e) =>
                handleChange(e)
            }
            onBlur={handleBlur}
            helperText={helperText}
            error={error}
            InputLabelProps={{shrink: true}}
            aria-readonly={readOnly}
        >
            {options &&
            options.map((option, index) => (
                    <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );
};