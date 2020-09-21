import * as React from "react";
import {IFieldProps} from "../FieldTypes";
import InputMask from "react-input-mask";
import axios, {AxiosResponse} from 'axios';
import {Button, Grid, TextField, Typography} from "@material-ui/core";


const postalCodeRangeFromStr = (postalCodeString: string): { rightMatch: string, leftMatch: string, country_state: string } | false => {
    const postalCodeRangeMatch = postalCodeString.match(/^Postal Code Range: ([\d]+)-([\d]+), Country\/State: ([a-bA-B,]+)$/);
    return postalCodeRangeMatch && postalCodeRangeMatch.length > 0 ?
        {
            rightMatch: postalCodeRangeMatch[1],
            leftMatch: postalCodeRangeMatch[2],
            country_state: postalCodeRangeMatch[3]
        } :
        false
};

function queryPostalCode(postalCodeMach: string, country_state: string | undefined, region: "Usa" | "Rest" | undefined) {
    return axios.get(
        'https://geocode.search.hereapi.com/v1/geocode',
        country_state && region === "Rest" ? {
                'params': {
                    'apiKey': 'WBh3V8kyxeozdY_-xUNvnAQBCkCRpBrShvAYE3BMX9A',
                    'qq': `postalCode=${postalCodeMach};country=${country_state}`,
                    'maxresults': 1,
                    'lang': 'en-US'
                }
            } :
            country_state && region === 'Usa' ? {
                    'params': {
                        'apiKey': 'WBh3V8kyxeozdY_-xUNvnAQBCkCRpBrShvAYE3BMX9A',
                        // 'q': postalCodeRange,
                        'qq': `postalCode=${postalCodeMach};country=United States;state=${country_state}`,
                        'maxresults': 1,
                        'lang': 'en-US'
                    }
                } :
                {
                    'params': {
                        'apiKey': 'WBh3V8kyxeozdY_-xUNvnAQBCkCRpBrShvAYE3BMX9A',
                        'q': postalCodeMach,
                        'lang': 'en-US'
                    }
                }
    )
}

const getPostalCodeValidationResponse = (addressAutocompletePromise: Promise<AxiosResponse>, setPostalCodeValidation: React.Dispatch<string>) =>
    addressAutocompletePromise.then(value => setPostalCodeValidation(value.data.items[0].title));

function validatePostalCodeRange(
    postalCodeRange: string,
    setLeftPostalCodeValidation: React.Dispatch<string>,
    setRightPostalCodeValidation: React.Dispatch<string>,
    country_state: string | undefined,
    region: 'Usa' | 'Rest' | undefined
) {
    const leftMatch = postalCodeRange.match(/([a-zA-Z0-9\s]+)\-/);
    const rightMatch = postalCodeRange.match(/\-([a-zA-Z0-9\s]+)/);

    const leftRange = leftMatch && leftMatch.length > 0 && queryPostalCode(leftMatch[1], country_state, region);
    const rightRange = rightMatch && rightMatch.length > 0 && queryPostalCode(rightMatch[1], country_state, region);

    leftRange !== undefined && leftRange &&
    getPostalCodeValidationResponse(leftRange, setLeftPostalCodeValidation);
    rightRange !== undefined && rightRange &&
    getPostalCodeValidationResponse(rightRange, setRightPostalCodeValidation);
}

export const PostalCodeRange: React.FunctionComponent<IFieldProps> = (props: IFieldProps) => {
    const zipRangeMask = '*****-*****';

    const {handleChange, handleBlur, name, label, placeholder, required, initialValue, error, region, country_state} = props;
    const [postalCodeRange, setPostalCodeRange] = React.useState<string>(initialValue === undefined ? '' : initialValue);
    const [leftPostalCodeValidation, setLeftPostalCodeValidation] = React.useState<string>('');
    const [rightPostalCodeValidation, setRightPostalCodeValidation] = React.useState<string>('');


    return (
        <Grid container direction={'column'}>
            <Grid item container spacing={1} direction={'row'} xs={6}>
                <Grid item xs={8}>
                    <InputMask
                        mask={zipRangeMask}
                        onChange={
                            event => {
                                const value = `Postal Code Range: ${event.target.value}, Country/State: ${country_state}`;
                                const changedEvent = {target: {name: name, value: value}} as React.ChangeEvent<any>;
                                handleChange(changedEvent);
                                setPostalCodeRange(event.target.value);
                            }
                        }
                        onBlur={handleBlur}
                    >
                        <TextField
                            required={required}
                            defaultValue={
                                initialValue ?
                                    postalCodeRangeFromStr(initialValue) ?
                                        postalCodeRangeFromStr(initialValue) :
                                        "" :
                                    ""
                            }
                            name={name}
                            label={label}
                            placeholder={placeholder}
                            InputLabelProps={{shrink: true}}
                            error={error}
                            fullWidth
                        />
                    </InputMask>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        onClick={
                            () =>
                                validatePostalCodeRange(
                                    postalCodeRange,
                                    setLeftPostalCodeValidation,
                                    setRightPostalCodeValidation,
                                    country_state,
                                    region
                                )
                        }
                        style={{textTransform: 'none', fontSize: 16}}
                        variant="contained"
                        disableElevation
                        color="inherit"
                        fullWidth={false}
                    >
                        Validate
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Typography>
                    {leftPostalCodeValidation}
                </Typography>
                <Typography>
                    {rightPostalCodeValidation}
                </Typography>
            </Grid>
        </Grid>

    );
};