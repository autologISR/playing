import * as React from "react";
import {IFieldProps} from "../FieldTypes";
import {TextField} from "@material-ui/core";
import {NumberInput} from "./NumberInput";

export const WeightTextBox: React.FunctionComponent<IFieldProps> = (props: IFieldProps) => {
    const {handleChange, handleBlur, name, label, placeholder, required, initialValue, error, unitOfMeasurement} = props;


    return (

            <TextField
                required={required}
                defaultValue={initialValue}
                name={name}
                label={label}
                placeholder={placeholder}
                InputLabelProps={{shrink: true}}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error}
                fullWidth
                InputProps={{
                    inputComponent: NumberInput as any,
                    inputProps: {suffix: ` ${unitOfMeasurement}`}
                }}
            />
    );
};