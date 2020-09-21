import * as React from "react";
import {IFieldProps} from "../FieldTypes";
import {TextField} from "@material-ui/core";
import {kilo, meters, Measure} from "safe-units";
import {kilometer, Radius} from "../../../autologServices/rates/newRates/inlandInputs";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {InputField} from "../InputField";


export function radiusToString(radius: Radius) {
    return radius ?
        radius.diameter + ' from ' + radius.point :
        "";
}

export const RadiusInput: React.FunctionComponent<IFieldProps> = (props: IFieldProps) => {
    const {handleChange, handleBlur, name, label, country_state, region, placeholder, helperText, required, error, fullWidth, initialValue} = props;
    const [radius, setRadius] = React.useState<Radius>({point: "", diameter: ""});



    const handleChangeRadius = (event: React.ChangeEvent<any>) => {
        const {diameter, point} = radius as Radius;
        const newRadius =
            event.target.name === 'point' ?
                {point: event.target.value, diameter: diameter} :
                {point: point, diameter: event.target.value}

        handleChange({ target: { name: name, value: radiusToString(newRadius)}} as React.ChangeEvent<any>);
        setRadius(newRadius);
    }

    return (
        <Grid container direction={'row'} style={{verticalAlign: 'middle'}}>
            <Grid item md={1}>
                <Typography style={{fontSize: 18}}>
                    {label}
                </Typography>
            </Grid>
            <Grid container item md={12} direction={'row'} style={{verticalAlign: 'middle', padding: 0}}>
                <Grid item md={5}>
                    <InputField
                        label={'Distance'}
                        editor={'length'}
                        name={'diameter'}
                        handleBlur={handleBlur}
                        required={required}
                        handleChange={handleChangeRadius}
                    />
                </Grid>
                <Grid item md={1} container direction={'column'} justify={'center'}>
                    <Grid item>
                        <Typography style={{fontSize: 18}} align={'center'}>
                            from
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item md={6}>
                    <InputField
                        label={'Point'}
                        name={'point'}
                        editor={'addressSearch'}
                        handleBlur={handleBlur}
                        required={false}
                        handleChange={handleChangeRadius}
                        country_state={country_state}
                        region={region}
                        error={error}
                    />
                </Grid>

            </Grid>
        </Grid>
    );
};