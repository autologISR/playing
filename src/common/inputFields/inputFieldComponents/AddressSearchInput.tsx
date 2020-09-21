import * as React from "react";
import {IFieldProps} from "../FieldTypes";
import {TextField} from "@material-ui/core";
import axios from 'axios';
import {IValues} from "../../form/formTypes";
import Autocomplete from '@material-ui/lab/Autocomplete';


export const AddressSearchInput: React.FunctionComponent<IFieldProps> = (props: IFieldProps) => {

    const {name, label, placeholder, handleChange, handleBlur, helperText, required, initialValue, inputClasses, country_state, region, fullWidth, error, readOnly} = props;
    const [searchState, setSearchState] = React.useState<IValues[]>([]);
    const [searchQueryKey, setSearchQueryKey] = React.useState<string>(initialValue);
    const [searchResult, setSearchResult] = React.useState<string>();
    const [open, setOpen] = React.useState(false);
    const loading = open && searchState.length === 0;

    const query = React.useMemo(
        () =>
        axios.get(
            'https://geocode.search.hereapi.com/v1/geocode',
            country_state && region === "Rest" ?
                {
                    'params': {
                        'apiKey': 'WBh3V8kyxeozdY_-xUNvnAQBCkCRpBrShvAYE3BMX9A',
                        'q': searchQueryKey,
                        'qq': `country=${country_state}`,
                        // 'maxresults': 4,
                        'lang': 'en-US'
                    }
                } :
                country_state && region === 'Usa' ?
                    {
                        'params': {
                            'apiKey': 'WBh3V8kyxeozdY_-xUNvnAQBCkCRpBrShvAYE3BMX9A',
                            'q': searchQueryKey,
                            'qq': `country=United States;state=${country_state}`,
                             // 'maxresults': 4,
                            'lang': 'en-US'
                        }
                    } :
                    {
                        'params': {
                            'apiKey': 'WBh3V8kyxeozdY_-xUNvnAQBCkCRpBrShvAYE3BMX9A',
                            'q': searchQueryKey,
                            'lang': 'en-US'
                        }
                    }
        ),
        [searchQueryKey]
    );
    React.useEffect(
        () => {
            query.then(
                value => {
                    console.log('response',value.data);
                    setSearchState(value.data.items);
                }
            );
        },
        [query, searchState, loading]
    );

    React.useEffect(
        () => {
            !open && setSearchState([]);
        }, [open]
    );
    console.log('searchResult', searchResult);
    return (
        <Autocomplete
            options={searchState.map(value => value.title)}
            open={open}
            onOpen={
                () => setOpen(true)
            }

            onClose={
                () => setOpen(false)
            }

            getOptionLabel={
                (option) => {
                    setSearchResult(option);
                    return option;
                }
            }

            onSelect={
                () =>
                    handleChange(
                        {
                            target: {
                                name: name,
                                value: searchResult
                            }
                        } as React.ChangeEvent<any>
                    )
            }

            onInputChange={(event, newInputValue) => {
                setSearchQueryKey(newInputValue);
            }}

            onBlur={handleBlur}

            renderInput={
                params => {
                    return (
                        <TextField
                            {...params}
                            required={required}
                            value={searchResult}
                            id={'form-address'}
                            error={error}
                            label={label}
                            InputLabelProps={{shrink: true, className: inputClasses?.root}}
                            fullWidth={true}
                            inputProps={{...params.inputProps,}}
                        />
                    )
                }
            }
        />
    );
};
