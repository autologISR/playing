import * as React from "react";
import {IFieldProps} from "./FieldTypes";
import {Dropdown} from "./inputFieldComponents/Dropdown";
import {MultiLineTextBox} from "./inputFieldComponents/MultiLineTextBox";
import {LengthTextBox} from "./inputFieldComponents/LengthTextBox";
import {PasswordTextBox} from "./inputFieldComponents/PasswordTextBox";
import {IntegerTextBox} from "./inputFieldComponents/IntegerTextBox";
import {PhoneNumber} from "./inputFieldComponents/PhoneNumber";
import {WeightTextBox} from "./inputFieldComponents/WeightTextBox";
import {ChargeAmountTextBox} from "./inputFieldComponents/ChargeAmountTextBox";
import {EmailTextBox} from "./inputFieldComponents/EmailTextBox";
import {TextBox} from "./inputFieldComponents/TextBox";
import {DateInput} from "./inputFieldComponents/DateInput";
import {SpreadsheetInput} from "./inputFieldComponents/spreadsheetInput/SpreadsheetInput";
import {RadioInput} from "./inputFieldComponents/RadioInput";
import {GroupedInputFields} from "./inputFieldComponents/groupedInputFields/GroupedInputFields";
import {Box, createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {PercentageInput} from "./inputFieldComponents/PercentageInput";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {PostalCodeRange} from "./inputFieldComponents/PostalCodeRange";
import {RadiusInput} from "./inputFieldComponents/RadiusInput";
import {AddressSearchInput} from "./inputFieldComponents/AddressSearchInput";


const theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiInputLabel: {
            // Name of the rule
            shrink:{
                fontSize: 20,
                color: "rgba(0, 0, 0, 0.70)",
                fontWeight: 500
            }

        },
        MuiFormLabel: {
            root:{
                fontSize:18,
                color: "rgba(0, 0, 0, 0.70)",
                fontWeight: 500
            }
        }
    },
});

export const InputField: React.FunctionComponent<IFieldProps> = (props: IFieldProps) => {
    const {editor, ...args} = props;

    const inputType = editor!.toLowerCase();
    return (
        <MuiThemeProvider theme={theme}>
        <Box padding={2}>
            {inputType === "radio" && <RadioInput {...args}/>}

            {inputType === "dropdown" && <Dropdown {...args}/>}

            {inputType === "textbox" && <TextBox {...args} />}

            {inputType === "phonemasktextbox" && <PhoneNumber {...args}/>}

            {inputType === 'email' && <EmailTextBox {...args}/>}

            {inputType === "chargeamount" && <ChargeAmountTextBox {...args}/>}

            {inputType === "weight" && <WeightTextBox {...args}/>}

            {inputType === "length" && <LengthTextBox {...args}/>}

            {inputType === "number" && <IntegerTextBox {...args}/>}

            {inputType === "percentageinput" && <PercentageInput {...args}/>}

            {inputType === "password" && <PasswordTextBox {...args}/>}

            {inputType === "multilinetextbox" && <MultiLineTextBox {...args}/>}

            {inputType === "dateinput" && <DateInput {...args}/>}

            {inputType === "spreadsheet" && <SpreadsheetInput {...args} />}

            {inputType === "groupedinput" && <GroupedInputFields {...args} />}

            {inputType === "postalcoderange" && <PostalCodeRange {...args} />}

            {inputType === "radius" && <RadiusInput {...args} />}
            {inputType === "addresssearch" && <AddressSearchInput {...args}/>}
        </Box>
            </MuiThemeProvider>
    );
};

InputField.defaultProps = {editor: "textbox"};


