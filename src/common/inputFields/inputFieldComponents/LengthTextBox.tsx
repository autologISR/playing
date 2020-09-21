import * as React from "react";
import {IFieldProps} from "../FieldTypes";
import {TextField} from "@material-ui/core";
import {kilo, meters, Measure} from "safe-units";
import {kilometer} from "../../../autologServices/rates/newRates/inlandInputs";
import {NumberInput} from "./NumberInput";

const serializeInput = (lengthStr: string) => Measure.of(Number(lengthStr), kilo(meters), 'km').in(kilometer).toString();

export const LengthTextBox: React.FunctionComponent<IFieldProps> = (props: IFieldProps) => {
    const {handleChange, handleBlur, name, label, placeholder, helperText, required, error, fullWidth, initialValue} = props;

    const handleChangeLength = (event: React.ChangeEvent<any>) => {
        handleChange(
            {
                target: {
                    name: event.target.name,
                    value: serializeInput(event.target.value)
                }
            } as React.ChangeEvent<any>
        )
    }

    return (
        <TextField
            fullWidth={fullWidth !== undefined ? fullWidth : true}
            required={required}
            name={name}
            label={label}
            placeholder={placeholder}
            error={error}
            defaultValue={initialValue}
            onChange={handleChangeLength}
            onBlur={handleBlur}
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                inputComponent: NumberInput as any,
                inputProps: {suffix: " km"}
            }}
            helperText={helperText}
        />
    );
};