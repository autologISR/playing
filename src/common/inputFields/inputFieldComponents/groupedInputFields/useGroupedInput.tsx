import * as React from "react";
import {IFieldProps} from "../../FieldTypes";
import {IValues} from "../../../form/formTypes";
import {InputField} from "../../InputField";

export type GroupedFieldInputsType = Map<'parentInputField' | 'childInputField', [IFieldProps, IValues | {}]>;

function handleGroupedInputChange(name: string, newGroupedInputState: Map<"parentInputField" | "childInputField", [IFieldProps, (IValues | {})]>, handleChange: (event: React.ChangeEvent<any>) => void) {
    let newGroupInputFieldEvent = {} as React.ChangeEvent<any>
    newGroupInputFieldEvent.target = {name: name, editor: 'groupedinput', value: newGroupedInputState};
    console.log(newGroupInputFieldEvent);
    console.log(handleChange);
    handleChange(newGroupInputFieldEvent)
}


export interface NewInputComponentProps {
    childInputFieldProps: IFieldProps | undefined,
    handleChildComponentChange: (e: React.ChangeEvent<any>) => void,
    handleChildBlur: () => void
}

export function newInputComponent(props: NewInputComponentProps) {
    const {childInputFieldProps, handleChildComponentChange, handleChildBlur} = props;
    return <>{
        childInputFieldProps !== undefined &&
        <InputField
            required={childInputFieldProps.required}
            editor={childInputFieldProps.editor}
            name={childInputFieldProps.name}
            key={childInputFieldProps.name}
            label={childInputFieldProps.label}
            handleBlur={handleChildBlur}
            handleChange={handleChildComponentChange}
            spreadsheetColumns={childInputFieldProps.spreadsheetColumns}
            options={childInputFieldProps.options}
        />
    }
    </>
}

export interface UseGroupedInputProps {
    initialChildDefinition: IFieldProps | undefined,
    handleBlur: () => void,
    parentInputField: { [p: string]: any } | undefined,
    name: string,
    handleChange: (event: React.ChangeEvent<any>) => void,
    conditionalInputFunc: ((parentResultState: IValues, handleChildComponentChange: (e: React.ChangeEvent<any>) => void, handleBlur: () => void, childResultState?: IValues) => IFieldProps) | undefined
}


export function useGroupedInput(props: UseGroupedInputProps) {

    const {initialChildDefinition, handleBlur, parentInputField, name, handleChange, conditionalInputFunc} = props;

    const [parentResultState, setParentState] = React.useState<IValues | {}>({});
    const [childResultState, setChildResultState] = React.useState<IValues | {}>({});
    const [childInput, setChildInput] = React.useState<IFieldProps | undefined>(initialChildDefinition);


    const handleChildComponentChange = (e: React.ChangeEvent<any>) => {
        const newValue = {
            ...childResultState,
            [e.target.name as string]: e.target.value as any
        };
        setChildResultState(newValue);
    };

    const handleChildBlur = () => {
        handleBlur();
    };

    const handleParentChange = (e: React.ChangeEvent<any>) => {

        const newValue = {
            ...parentResultState,
            [e.target.name as string]: e.target.value as any
        };
        setParentState(newValue);
    };

    const generateChildComponent = () => {
        const childInputComponent =
            conditionalInputFunc !== undefined &&
            parentResultState !== undefined &&
            conditionalInputFunc(parentResultState, handleChildComponentChange, handleChildBlur, childResultState);
        childInputComponent && setChildInput(childInputComponent);
        return childInputComponent;
    };

    const [childInputComponent, setChildInputComponent] = React.useState<JSX.Element>(newInputComponent({
        childInputFieldProps: initialChildDefinition,
        handleChildBlur,
        handleChildComponentChange
    }));


    const initialGroupedInputState: GroupedFieldInputsType = new Map([
        ["parentInputField", [(parentInputField as IFieldProps), parentResultState]],
    ]);
    childInput !== undefined && initialGroupedInputState.set("childInputField", [(childInput as IFieldProps), childResultState])

    const [groupedValues, setGroupedValues] = React.useState(initialGroupedInputState)

    React.useEffect(() => {
            let newGroupedInputState = groupedValues;
            newGroupedInputState.set('parentInputField', [parentInputField as IFieldProps, parentResultState]);
            newGroupedInputState.set('childInputField', [childInput as IFieldProps, childResultState])
            setGroupedValues(newGroupedInputState);
            console.log(newGroupedInputState)
            handleGroupedInputChange(name, newGroupedInputState, handleChange);

            const [childInputFieldProps,] = newGroupedInputState.get('childInputField') as [IFieldProps, IValues];
            childInputFieldProps && setChildInputComponent(newInputComponent({
                childInputFieldProps,
                handleChildComponentChange,
                handleChildBlur
            }));
        },
        [childInput, setChildInputComponent]
    );

    return {
        groupedValues,
        handleChildComponentChange,
        handleChildBlur,
        handleParentChange,
        childInputComponent,
        generateChildComponent,
    };
}