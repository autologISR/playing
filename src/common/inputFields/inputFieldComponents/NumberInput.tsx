import NumberFormat from 'react-number-format';
import React from "react";


interface NumberFormatCustomProps {
    inputRef: (instance: NumberFormat | null) => void;
    onChange: (event: { target: { value: string } }) => void;
    suffix?: string;
    prefix?: string;
}

export const NumberInput = (props: NumberFormatCustomProps) => {
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}

            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            isNumericString

        />
    );
};
