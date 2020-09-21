import * as React from "react";
import {IFieldProps} from "../../FieldTypes";
import {InputField} from "../../InputField";
import {Box, Button} from "@material-ui/core";
import {useGroupedInput} from "./useGroupedInput";

export const GroupedInputFields: React.FunctionComponent<IFieldProps> = (props: IFieldProps) => {
    const {
        parentInputField,
        name,
        handleChange,
        handleBlur,
        conditionalInputFunc,
        initialChildDefinition,
    } = props;

    const {
        childInputComponent,
        handleParentChange,
        generateChildComponent
    } = useGroupedInput({initialChildDefinition: (initialChildDefinition as IFieldProps), handleBlur, parentInputField, name, handleChange, conditionalInputFunc})


    return (
        <Box>
            {
                <Box>
                    {parentInputField !== undefined &&
                    <InputField
                        name={parentInputField.name}
                        label={parentInputField.label}
                        editor={parentInputField.editor}
                        handleChange={handleParentChange}
                        handleBlur={handleBlur}
                        required={parentInputField.required}
                        spreadsheetColumns={parentInputField.spreadsheetColumns}
                        key={parentInputField.name}
                        options={parentInputField.options}
                    />
                    }
                </Box>}
            {
                <Box>
                    <div className='button'>
                        <Button variant="contained" color="inherit" onClick={generateChildComponent}>
                            {`Generate ${initialChildDefinition !== undefined ? initialChildDefinition.label : ''}`}
                        </Button>
                    </div>
                </Box>
            }

            <Box>
                {childInputComponent}
            </Box>
        </Box>
    );
};

