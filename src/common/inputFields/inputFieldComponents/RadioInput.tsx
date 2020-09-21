import React from "react";
import {IFieldProps} from "../FieldTypes";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@material-ui/core";


export const RadioInput: React.FunctionComponent<IFieldProps> = (props: IFieldProps) => {
    const {options, name, label, handleChange, required, handleBlur, initialValue, groupOrientation, error, readOnly} = props;
    const [selectedValue, setSelectedValue] = React.useState<string>(initialValue);

    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue((event.target as HTMLInputElement).value);
        handleChange(event);
    };


    return (
        <FormControl
            required={required}
            error={error}
            style={
                groupOrientation === 'row' ?
                    {height: 80, paddingBottom: 0} :
                    undefined
            }
        >

            <FormLabel>
                {label}
            </FormLabel>

            {
                options !== undefined &&
                <RadioGroup
                    onBlur={handleBlur}
                    name={name}
                    value={selectedValue}
                    onChange={readOnly ? () => {} : handleSelectChange}
                    row={groupOrientation === 'row'}
                    style={groupOrientation === 'row' ? {height: 40} : undefined}
                >
                    {
                        options.map(
                            option =>
                                <FormControlLabel
                                    key={`${name}-${option}`}
                                    control={
                                        <Radio
                                            inputProps={{readOnly: readOnly}}
                                            size={'medium'}
                                            key={option}
                                            value={option}
                                        />
                                    }
                                    label={option}
                                    labelPlacement="start"
                                />
                        )
                    }
                </RadioGroup>
            }
        </FormControl>
    );
};