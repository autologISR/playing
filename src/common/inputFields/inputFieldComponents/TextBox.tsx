import * as React from "react";
import {IFieldProps} from "../FieldTypes";
import {TextField} from "@material-ui/core";

export const TextBox: React.FunctionComponent<IFieldProps> = (props: IFieldProps) => {

    const {name, label, placeholder, handleChange, handleBlur, helperText, required, initialValue, inputClasses, fullWidth, error, readOnly} = props;



    return (
        <TextField
            value={initialValue}
            required={required}
            name={name}
            error={error}
            label={label}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={helperText}
            InputLabelProps={{shrink: true, className:inputClasses?.root}}
            fullWidth={true}
            InputProps={{
                readOnly: readOnly,
            }}
        />
    );
};