import * as React from "react";
import {IFieldProps} from "../FieldTypes";
import InputMask from "react-input-mask";
import {TextField} from "@material-ui/core";

export const PhoneNumber: React.FunctionComponent<IFieldProps> = (props: IFieldProps) => {
    const phoneNumberMask = '+ (999) 99 999 9999';
    const {handleChange, handleBlur, name, label, placeholder, required, initialValue, error} = props;


    return (
            <InputMask
                mask={phoneNumberMask}
                onChange={handleChange}
                onBlur={handleBlur}
            >
                <TextField
                    required={required}
                    defaultValue={initialValue}
                    name={name}
                    label={label}
                    placeholder={placeholder}
                    InputLabelProps={{shrink: true}}
                    error={error}
                    fullWidth
                />
            </InputMask>
    );
};