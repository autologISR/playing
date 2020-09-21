import * as React from "react";
import { ChangeEvent } from "react";

import { Button, Grid } from "@material-ui/core";
import { InputField } from "../../../common/inputFields/InputField";
import {
  CustomComponentFuncProps,
  CustomComponentProps,
} from "../../../common/inputFields/FieldTypes";
import {
  convertToReadOnly,
  GridElement,
  MyReactDataSheet,
} from "../../../common/inputFields/inputFieldComponents/spreadsheetInput/spreadsheetInputTypes";
import { countries, usStates } from "./rateConstants";
import { rowIndexField, TableCurrency } from "./common";
import { additionalChargesTable } from "./additionalChargesInput";
import { IValues } from "../../../common/form/formTypes";
import { Measure, meters } from "safe-units";
import Typography from "@material-ui/core/Typography";
import {
  defaultCellRenderer,
  defaultValueRenderer,
} from "../../../common/inputFields/inputFieldComponents/spreadsheetInput/SpreadsheetInput";
import {
  ChipsArray,
  useChipStyles,
} from "../../../common/chipsArray/ChipsArray";

export const kilometer = Measure.of(1000, meters, "km");

export const weightRangeField = {
  head: true,
  field: "fromWeight",
  fieldType: "kg",
  value: "From Weight",
  style: { width: 20 },
  readonly: true,
};

export function toZoneColumn(
  zone: () => string,
  currentZoneMeta?: ZoneMetadata
): GridElement {
  const zoneColumnLabel = "Zone_" + zone();
  const zoneColumn = {
    field: zoneColumnLabel,
    head: true,
    value: zoneColumnLabel,
    readOnly: true,
    fieldType: "currency",
    currencyType: "NIS",
    style: { width: 20 },
  } as GridElement;

  return { ...zoneColumn, fieldMetadata: currentZoneMeta };
}

export interface Zone {
  zoneName: string;
  includeExcludeFromZoneSet: "include" | "exclude";
  region: "Usa" | "Rest";
  country_state: string;
  postalCodeRange: string;
  zoneMetadata: ZoneMetadata;
  zoneRadius: string;
}

const zoneLabel = (newZone: Zone, inlandType?: string) => newZone.zoneName;

interface RegionInputProps {
  newZone: Zone;
  handleBlur: () => void;
  handleChange: (prop: keyof Zone) => (e: React.ChangeEvent<any>) => void;
}

const RegionInput = (props: RegionInputProps) => (
  <InputField
    name={"region"}
    label={"Region"}
    editor={"dropdown"}
    options={["Usa", "Rest"]}
    initialValue={props.newZone.region}
    required={true}
    handleBlur={props.handleBlur}
    handleChange={props.handleChange("region")}
    fullWidth={false}
  />
);

interface RegionRestInputsProps {
  zoneType: ZoneType;
  handleBlur: () => void;
  handleChange: (prop: keyof Zone) => (e: React.ChangeEvent<any>) => void;
  newZone: Zone;
}

const RegionRestInputs = (props: RegionRestInputsProps) => (
  <InputField
    label={"Country"}
    editor="dropdown"
    initialValue={"CHINA"}
    options={countries().map((state) => state.name)}
    required={true}
    handleBlur={props.handleBlur}
    handleChange={props.handleChange("country_state")}
    name={"country_state"}
    fullWidth={false}
  />
);

interface StateDropDownProps {
  handleBlur: () => void;
  handleChange: (prop: keyof Zone) => (e: React.ChangeEvent<any>) => void;
  country_state: string;
}

const StateDropdown = (props: StateDropDownProps) => (
  <InputField
    label={"State"}
    editor="dropdown"
    options={usStates().map((state) => state.name)}
    required={true}
    handleBlur={props.handleBlur}
    handleChange={props.handleChange("country_state")}
    name={"country_state"}
    fullWidth={true}
    initialValue={props.country_state}
  />
);

interface CourierZoneInputNameProps {
  handleBlur: () => void;
  handleChange: (prop: keyof Zone) => (e: React.ChangeEvent<any>) => void;
  newZone: Zone;
}

const ZoneNameInput = (props: CourierZoneInputNameProps) => (
  <InputField
    label={"Zone Name"}
    name={"zoneName"}
    handleBlur={props.handleBlur}
    handleChange={props.handleChange("zoneName")}
    required={false}
    initialValue={props.newZone.zoneName}
  />
);

interface NewZoneButtonParams {
  addNewColumnsButtonClickCallback: () => void;
}

const NewZoneButton = (props: NewZoneButtonParams) => (
  <Button
    style={{ textTransform: "none", fontSize: 16 }}
    variant="contained"
    disableElevation
    color="inherit"
    onClick={props.addNewColumnsButtonClickCallback}
    fullWidth={true}
  >
    Add New Zone
  </Button>
);

interface AddChipsToSetButtonProps {
  setNewZone: (value: Zone) => void;
  newZone: Zone;
  zoneType: ZoneType;
}

export type Radius = { point: string; diameter: typeof kilometer | "" | "NaN" };

type ZoneMetadata = { zoneArea: ZoneSet; region: "Usa" | "Rest" };

interface ZoneRadiusInputParams {
  handleChange: (prop: keyof Zone) => (e: React.ChangeEvent<any>) => void;
  handleBlur: () => void;
  newZone: Zone;
}

const ZoneRadiusInput = (props: ZoneRadiusInputParams) => (
  <InputField
    required={false}
    name={"zoneRadius"}
    label={"Zone Radius"}
    editor={"radius"}
    handleBlur={props.handleBlur}
    handleChange={props.handleChange("zoneRadius")}
    country_state={props.newZone.country_state}
    region={props.newZone.region}
  />
);

interface ZoneSetFunc {
  zoneMetadata: Pick<ZoneMetadata, any>;
  zoneMetadataProps: Pick<
    Zone,
    | "region"
    | "country_state"
    | "postalCodeRange"
    | "zoneRadius"
    | "includeExcludeFromZoneSet"
  >;
  setNewZone: (value: Zone) => void;
  zoneName: string;
  zoneType: ZoneType;
}

function updateZoneSetFunc(props: ZoneSetFunc) {
  const {
    zoneMetadata,
    zoneMetadataProps,
    setNewZone,
    zoneName,
    zoneType,
  } = props;
  const { zoneArea, region } = zoneMetadata as ZoneMetadata;
  const { areasIncludedInZone, areasExcludedFromZone } = zoneArea;
  const {
    postalCodeRange: postalCodeRangeIncluded,
    countries_states: countries_statesIncluded,
    zoneRadius: zoneRadiusIncluded,
  } = areasIncludedInZone;
  const {
    postalCodeRange: postalCodeRangeExcluded,
    countries_states: countries_statesExcluded,
    zoneRadius: zoneRadiusExcluded,
  } = areasExcludedFromZone;

  return () => {
    switch (zoneType) {
      case "Postal Code Range":
        let postalCodeRangeZone: Zone = {
          zoneMetadata: {
            zoneArea: {
              areasIncludedInZone: {
                postalCodeRange:
                  zoneMetadataProps.includeExcludeFromZoneSet === "include" &&
                  !postalCodeRangeIncluded.some(
                    (value) => value === zoneMetadataProps.postalCodeRange
                  )
                    ? [
                        ...postalCodeRangeIncluded,
                        zoneMetadataProps.postalCodeRange,
                      ]
                    : postalCodeRangeIncluded,
                countries_states: countries_statesIncluded,
                zoneRadius: zoneRadiusIncluded,
              },
              areasExcludedFromZone: {
                postalCodeRange:
                  zoneMetadataProps.includeExcludeFromZoneSet === "exclude" &&
                  !postalCodeRangeExcluded.some(
                    (value) => value === zoneMetadataProps.postalCodeRange
                  )
                    ? [
                        ...postalCodeRangeExcluded,
                        zoneMetadataProps.postalCodeRange,
                      ]
                    : postalCodeRangeExcluded,
                countries_states: countries_statesExcluded,
                zoneRadius: zoneRadiusExcluded,
              },
            },
          },
          zoneName: props.zoneName,
          zoneRadius: "",
          postalCodeRange: "",
          country_state: "",
          region: zoneMetadataProps.region,
          includeExcludeFromZoneSet:
            zoneMetadataProps.includeExcludeFromZoneSet,
        } as Zone;

        setNewZone(postalCodeRangeZone);

        break;
      case "Radius":
        let radiusZone: Zone = {
          zoneMetadata: {
            zoneArea: {
              areasIncludedInZone: {
                zoneRadius:
                  zoneMetadataProps.includeExcludeFromZoneSet === "include" &&
                  !zoneRadiusIncluded.some(
                    (value) => value === zoneMetadataProps.zoneRadius
                  )
                    ? [...zoneRadiusIncluded, zoneMetadataProps.zoneRadius]
                    : zoneRadiusIncluded,
                countries_states: countries_statesIncluded,
                postalCodeRange: postalCodeRangeIncluded,
              },
              areasExcludedFromZone: {
                zoneRadius:
                  zoneMetadataProps.includeExcludeFromZoneSet === "exclude" &&
                  !zoneRadiusExcluded.some(
                    (value) => value === zoneMetadataProps.zoneRadius
                  )
                    ? [...zoneRadiusExcluded, zoneMetadataProps.zoneRadius]
                    : zoneRadiusExcluded,
                countries_states: countries_statesExcluded,
                postalCodeRange: postalCodeRangeExcluded,
              },
            },
          },
          zoneName: zoneName,
          zoneRadius: "",
          postalCodeRange: "",
          country_state: zoneMetadataProps.country_state,
          region: zoneMetadataProps.region,
          includeExcludeFromZoneSet:
            zoneMetadataProps.includeExcludeFromZoneSet,
        } as Zone;

        setNewZone(radiusZone);
        break;
      case "Country/State":
        let countryState: Zone = {
          zoneMetadata: {
            zoneArea: {
              areasIncludedInZone: {
                countries_states:
                  zoneMetadataProps.includeExcludeFromZoneSet === "include" &&
                  !countries_statesIncluded.some(
                    (value) => value === zoneMetadataProps.country_state
                  )
                    ? [
                        ...countries_statesIncluded,
                        zoneMetadataProps.country_state,
                      ]
                    : countries_statesIncluded,
                zoneRadius: zoneRadiusIncluded,
                postalCodeRange: postalCodeRangeIncluded,
              },
              areasExcludedFromZone: {
                countries_states:
                  zoneMetadataProps.includeExcludeFromZoneSet === "exclude" &&
                  !countries_statesExcluded.some(
                    (value) => value === zoneMetadataProps.country_state
                  )
                    ? [
                        ...countries_statesExcluded,
                        zoneMetadataProps.country_state,
                      ]
                    : countries_statesExcluded,
                zoneRadius: zoneRadiusExcluded,
                postalCodeRange: postalCodeRangeExcluded,
              },
            },
          },
          zoneName: zoneName,
          zoneRadius: "",
          postalCodeRange: "",
          country_state: "",
          region: zoneMetadataProps.region,
          includeExcludeFromZoneSet:
            zoneMetadataProps.includeExcludeFromZoneSet,
        } as Zone;

        setNewZone(countryState);
        break;
      case "":
        break;
    }
  };
}

const AddToChipsToSetButton = (props: AddChipsToSetButtonProps) => {
  const { newZone, setNewZone, zoneType } = props;
  const { zoneName, zoneMetadata, ...otherZoneProps } = newZone;

  return (
    <>
      <Button
        style={{ textTransform: "none", fontSize: 16 }}
        variant="contained"
        disableElevation
        color="inherit"
        onClick={updateZoneSetFunc({
          zoneMetadata,
          zoneMetadataProps: otherZoneProps,
          setNewZone,
          zoneName,
          zoneType,
        })}
        fullWidth={false}
      >
        Add To Zone Set
      </Button>
    </>
  );
};

interface InlandRegularOrCourierInputs {
  newZone: Zone;
  handleBlur: () => void;
  handleChange: (prop: keyof Zone) => (e: React.ChangeEvent<any>) => void;
  region: "Usa" | "Rest" | undefined;
  addNewColumnsButtonClickCallback: () => void;
  classes: Record<string, string>;
  setNewZone: React.Dispatch<Zone>;
  handleDelete: (chipToDelete: string) => () => void;
}

type ZoneType = "Country/State" | "Postal Code Range" | "Radius" | "";

interface RegionUsInputProps {
  handleBlur: () => void;
  handleChange: (prop: keyof Zone) => (e: React.ChangeEvent<any>) => void;
  newZone: Zone;
}

const RegionUsInputs = (props: RegionUsInputProps) => (
  <StateDropdown
    handleBlur={props.handleBlur}
    handleChange={props.handleChange}
    country_state={props.newZone.country_state}
  />
);

interface ZoneTypeInputProps {
  handleBlur: () => void;
  zoneType: ZoneType;
  setZoneType: React.Dispatch<ZoneType>;
}

function ZoneTypeInput(props: ZoneTypeInputProps) {
  return (
    <InputField
      label={"Zone Member Type"}
      name={"zoneType"}
      handleBlur={props.handleBlur}
      initialValue={props.zoneType}
      required={true}
      handleChange={(event) => props.setZoneType(event.target.value)}
      options={["Country/State", "Postal Code Range", "Radius"]}
      editor={"dropdown"}
      fullWidth
    />
  );
}

interface PostalCodeRangeInputsParams {
  region: "Usa" | "Rest" | undefined;
  handleChange: (prop: keyof Zone) => (e: React.ChangeEvent<any>) => void;
  handleBlur: () => void;
  zoneType: "Postal Code Range";
  newZone: Zone;
  props: InlandRegularOrCourierInputs;
}

const PostalCodeRangeInputs = (props: PostalCodeRangeInputsParams) => (
  <>
    {props.region === "Rest" && (
      <RegionRestInputs
        handleChange={props.handleChange}
        handleBlur={props.handleBlur}
        zoneType={props.zoneType}
        newZone={props.newZone}
      />
    )}
    {props.region === "Usa" && (
      <RegionUsInputs
        handleBlur={props.handleBlur}
        handleChange={props.handleChange}
        newZone={props.newZone}
      />
    )}
    <InputField
      name={"postalCodeRange"}
      handleBlur={props.handleBlur}
      handleChange={props.handleChange("postalCodeRange")}
      label={"Postal Code Range"}
      required={true}
      fullWidth={false}
      editor="postalCodeRange"
      region={props.region}
      country_state={props.newZone.country_state}
      initialValue={props.newZone.postalCodeRange}
    />
  </>
);

interface CountryStateInputsParams {
  region: "Usa" | "Rest" | undefined;
  handleChange: (prop: keyof Zone) => (e: React.ChangeEvent<any>) => void;
  handleBlur: () => void;
  zoneType: "Country/State";
  newZone: Zone;
}

const CountryStateInputs = (props: CountryStateInputsParams) => (
  <>
    {props.region === "Rest" && (
      <RegionRestInputs
        handleChange={props.handleChange}
        handleBlur={props.handleBlur}
        zoneType={props.zoneType}
        newZone={props.newZone}
      />
    )}
    {props.region === "Usa" && (
      <RegionUsInputs
        handleBlur={props.handleBlur}
        handleChange={props.handleChange}
        newZone={props.newZone}
      />
    )}
  </>
);

interface RadiusInputsParams {
  region: "Usa" | "Rest" | undefined;
  handleChange: (prop: keyof Zone) => (e: React.ChangeEvent<any>) => void;
  handleBlur: () => void;
  zoneType: "Radius";
  newZone: Zone;
}

const RadiusInputs = (props: RadiusInputsParams) => (
  <>
    {props.region === "Rest" && (
      <RegionRestInputs
        handleChange={props.handleChange}
        handleBlur={props.handleBlur}
        zoneType={props.zoneType}
        newZone={props.newZone}
      />
    )}
    {props.region === "Usa" && (
      <RegionUsInputs
        handleBlur={props.handleBlur}
        handleChange={props.handleChange}
        newZone={props.newZone}
      />
    )}
    <ZoneRadiusInput
      handleChange={props.handleChange}
      handleBlur={props.handleBlur}
      newZone={props.newZone}
    />
  </>
);

const InlandInput = (props: InlandRegularOrCourierInputs) => {
  const {
    handleBlur,
    handleChange,
    handleDelete,
    addNewColumnsButtonClickCallback,
    classes,
    newZone,
    region,
    setNewZone,
  } = props;

  const [zoneType, setZoneType] = React.useState<ZoneType>("Country/State");

  const { region: metadataRegion, ...metaData } = newZone.zoneMetadata;
  const areasToInclude = Object.values(
    metaData.zoneArea.areasIncludedInZone
  ).flat(1);
  const areasToExclude = Object.values(
    metaData.zoneArea.areasExcludedFromZone
  ).flat(1);

  return (
    <Grid
      justify={"flex-start"}
      container
      spacing={1}
      alignItems={"baseline"}
      direction={"row"}
    >
      <Grid item md={12}>
        <Typography style={{ fontSize: 18 }}>Add Zone</Typography>
      </Grid>
      <Grid container direction={"row"}>
        <Grid item container direction={"column"} md={12}>
          <Grid item md={4}>
            <ZoneNameInput
              handleChange={handleChange}
              handleBlur={handleBlur}
              newZone={newZone}
            />
          </Grid>
          <Grid item md={4}>
            <ZoneTypeInput
              zoneType={zoneType}
              handleBlur={handleBlur}
              setZoneType={setZoneType}
            />
          </Grid>
        </Grid>
        <Grid item md={12} direction={"column"}>
          <Grid item md={4}>
            <InputField
              label={"Include/Exclude from Zone"}
              name={"includeExcludeFromZoneSet"}
              handleBlur={handleBlur}
              initialValue={newZone.includeExcludeFromZoneSet}
              required={true}
              handleChange={handleChange("includeExcludeFromZoneSet")}
              editor={"dropdown"}
              fullWidth
              options={["include", "exclude"]}
            />
          </Grid>
          <Grid item md={4}>
            <RegionInput
              handleBlur={handleBlur}
              handleChange={handleChange}
              newZone={newZone}
            />
          </Grid>
        </Grid>
        <Grid item md={12}>
          {zoneType === "Country/State" && (
            <CountryStateInputs
              {...{ region, handleChange, handleBlur, zoneType, newZone }}
            />
          )}
          {zoneType === "Postal Code Range" && (
            <PostalCodeRangeInputs
              {...{
                region,
                handleChange,
                handleBlur,
                zoneType,
                newZone,
                props,
              }}
            />
          )}
          {zoneType === "Radius" && (
            <RadiusInputs
              {...{ region, handleChange, handleBlur, zoneType, newZone }}
            />
          )}
        </Grid>

        <Grid
          container
          item
          md={12}
          direction={"row"}
          style={{ verticalAlign: "baseline", padding: "16px" }}
          spacing={2}
        >
          <Grid item md={12}>
            <AddToChipsToSetButton
              newZone={newZone}
              setNewZone={setNewZone}
              zoneType={zoneType}
            />
          </Grid>
          <Grid item md={12}>
            <ChipsArray
              dataArray={areasToInclude}
              classes={classes}
              label={"Includes Areas"}
              handleDelete={handleDelete}
            />
          </Grid>
          <Grid item md={12}>
            <ChipsArray
              dataArray={areasToExclude}
              classes={classes}
              label={"Excludes Areas"}
              handleDelete={handleDelete}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12}>
        <NewZoneButton
          addNewColumnsButtonClickCallback={addNewColumnsButtonClickCallback}
        />
      </Grid>
    </Grid>
  );
};

function zoneGridSectionUpdate(updateArea: GridElement[][]) {
  return ([zoneType, values]: [string, any]) => {
    switch (zoneType) {
      case "countries_states":
        updateArea = [
          [
            { field: "areaType", value: "Country/State" },
            { field: "area", value: JSON.stringify(values) },
          ],
        ] as GridElement[][];
        break;

      case "zoneRadius":
        updateArea = [
          // ...updateArea,
          [
            { field: "areaType", value: "Radius", readOnly: true },
            { field: "area", value: JSON.stringify(values), readOnly: true },
          ],
        ] as GridElement[][];
        break;

      case "postalCodeRange":
        updateArea = [
          // ...updateArea,
          [
            { field: "areaType", value: "Postal Code Range", readOnly: true },
            { field: "area", value: JSON.stringify(values), readOnly: true },
          ],
        ] as GridElement[][];
        break;

      case "":
        break;
    }
    return updateArea;
  };
}

export function convertAreaObjectToSpreadsheet(
  area: ZoneArea,
  updateArea: GridElement[][],
  zoneColumn: GridElement,
  includeExcludeFromZoneSet: "include" | "exclude"
) {
  const areaEntries = Object.entries(area).sort((prev, next) =>
    prev[0] === "countries_state"
      ? 1
      : prev[0] === "postalCodeRange" && next[0] === "radius"
      ? 1
      : -1
  );

  return [
    [
      {
        field: "areaIncludedExcluded",
        value:
          includeExcludeFromZoneSet === "include"
            ? "Areas Included"
            : "Areas Excluded",
        section: "horizontal" as "horizontal" | "vertical",
        head: true,
        colSpan: 2,
      },
    ],
    // ...areaEntries.filter(
    //     areaTypeArr =>
    //         areaTypeArr[1].length > 0
    // ).map(
    //     zoneGridSectionUpdate(updateArea)
    // ).flat()
  ];
}

function getNewZoneClickCallBack(
  customComponentState: IValues | {},
  setCustomComponentState: (value: IValues | {}) => void,
  newZoneColumn: GridElement | undefined,
  region: "Usa" | "Rest" | undefined,
  setNewZone: React.Dispatch<Zone>,
  handleCustomColumnDelete: (field: string) => void,
  zoneSectionMap: ZoneSectionMap,
  setZoneSectionMap: React.Dispatch<ZoneSectionMap>
) {
  return () => {
    const zoneColumns: GridElement[] =
      "newZones" in customComponentState ? customComponentState.newZones : [];

    if (newZoneColumn) {
      const zoneGridSection = zoneSectionMap.get(newZoneColumn.value as string);
      const zoneMetadata = newZoneColumn.fieldMetadata as ZoneMetadata;

      if (zoneMetadata !== undefined) {
        const gridSectionAreasExcluded = convertAreaObjectToSpreadsheet(
          zoneMetadata.zoneArea.areasExcludedFromZone,
          zoneGridSection === undefined ? [] : zoneGridSection.areasIncluded,
          newZoneColumn,
          "exclude"
        );

        const gridSectionAreasIncluded = convertAreaObjectToSpreadsheet(
          zoneMetadata.zoneArea.areasIncludedInZone,
          zoneGridSection === undefined ? [] : zoneGridSection.areasIncluded,
          newZoneColumn,
          "include"
        );

        const zoneSectionGrid = zoneSectionMap.set(
          newZoneColumn.value as string,
          {
            areasIncluded: gridSectionAreasIncluded,
            areasExcluded: gridSectionAreasExcluded,
          }
        );

        setCustomComponentState({
          newZones: [...zoneColumns, newZoneColumn] as GridElement[],
          region: region,
          handleCustomColumnDelete: handleCustomColumnDelete,
          columnMetadataTable: convertToReadOnly(getZoneTable(zoneSectionGrid)),
        });
        setZoneSectionMap(zoneSectionGrid);
      }
    }

    setNewZone(getInitialZoneState());
  };
}

function getInitialZoneState() {
  return {
    zoneName: "",
    includeExcludeFromZoneSet: "include",
    region: "Usa",
    country_state: "",
    postalCodeRange: "",
    courierZoneName: "",
    zoneMetadata: {
      region: "Usa",
      zoneArea: {
        areasExcludedFromZone: {
          zoneRadius: [],
          postalCodeRange: [],
          countries_states: [],
        },
        areasIncludedInZone: {
          zoneRadius: [],
          postalCodeRange: [],
          countries_states: [],
        },
      },
    } as ZoneMetadata,
    zoneRadius: "",
    address: "",
  } as Zone;
}

function setZoneColumn(
  newZone: Zone,
  setNewZoneColumn: React.Dispatch<GridElement | undefined>
) {
  const zoneColumn = toZoneColumn(
    () => zoneLabel(newZone),
    newZone.zoneMetadata
  );
  setNewZoneColumn(zoneColumn);
}

export function getZoneTable(zoneSectionMap: ZoneSectionMap) {
  const zoneGridSections = Array.from(zoneSectionMap.entries())
    .map(([zoneName, value]) => [
      [
        {
          field: "zoneName",
          value: zoneName,
          section: "vertical",
          rowSpan: value.areasIncluded.length + value.areasExcluded.length + 1,
          head: true,
        },
      ],
      ...value.areasIncluded,
      ...value.areasExcluded,
    ])
    .flat() as GridElement[][];
  return [
    [
      {
        field: "zoneName",
        value: "Zone Name",
        section: "vertical" as "horizontal" | "vertical",
        head: true,
        staticSection: true,
      },
      {
        field: "zoneType",
        value: "Zone Type",
        section: "vertical" as "horizontal" | "vertical",
        head: true,
        staticSection: true,
      },
      {
        field: "zoneDetails",
        value: "Zone Details",
        section: "vertical" as "horizontal" | "vertical",
        head: true,
        staticSection: true,
        colSpan: 4,
      },
    ],
    ...(zoneGridSections === undefined ? [] : zoneGridSections),
  ];
}

type ZoneArea = { postalCodeRange: string[] | [] } & {
  countries_states: string[] | [];
} & { zoneRadius: string[] };

type ZoneSet = {
  areasIncludedInZone: ZoneArea;
  areasExcludedFromZone: ZoneArea;
};

export type ZoneGridSection = {
  areasIncluded: GridElement[][];
  areasExcluded: GridElement[][];
};
export type ZoneSectionMap = Map<string, ZoneGridSection>;

const AddZoneComponent: React.FunctionComponent<CustomComponentProps> = (
  props: CustomComponentProps
) => {
  const { customComponentState, setCustomComponentState } = props;

  const [newZoneColumn, setNewZoneColumn] = React.useState<
    GridElement | undefined
  >();
  const [region, setRegion] = React.useState<"Usa" | "Rest">();
  const [newZone, setNewZone] = React.useState<Zone>(getInitialZoneState());
  const [zoneSectionMap, setZoneSectionMap] = React.useState<ZoneSectionMap>(
    new Map([])
  );

  React.useEffect(() => {
    const regionUS = newZone.region === "Usa";
    regionUS && setRegion("Usa");
    regionUS && setZoneColumn(newZone, setNewZoneColumn);

    const regionOther = newZone.region === "Rest";

    regionOther && setRegion("Rest");

    regionOther && setZoneColumn(newZone, setNewZoneColumn);
    regionOther && setRegion("Rest");
  }, [newZone]);

  const handleChange = (prop: keyof Zone) => (e: ChangeEvent<any>) => {
    setNewZone({
      ...newZone,
      [prop]: e.target.value,
    });
  };
  const handleBlur = () => {};
  const classes = useChipStyles();

  const handleDeleteZoneChip = (chipToDelete: string) => () => {
    const { zoneMetadata, ...otherZoneProps } = newZone;
    const { region, zoneArea } = zoneMetadata as ZoneMetadata;
    const { areasIncludedInZone, areasExcludedFromZone } = zoneArea;

    const removeSubAreaFromIncludedSubAreas = {
      postalCodeRange: areasIncludedInZone.postalCodeRange.filter(
        (postCode) => postCode !== chipToDelete
      ),
      zoneRadius: areasIncludedInZone.zoneRadius.filter(
        (radius) => radius !== chipToDelete
      ),
      countries_states: areasIncludedInZone.countries_states.filter(
        (country_state) => country_state !== chipToDelete
      ),
    } as ZoneArea;

    const removeSubAreaFromExcludedSubAreas = {
      postalCodeRange: areasExcludedFromZone.postalCodeRange.filter(
        (postCode) => postCode !== chipToDelete
      ),
      zoneRadius: areasExcludedFromZone.zoneRadius.filter(
        (radius) => radius !== chipToDelete
      ),
      countries_states: areasExcludedFromZone.countries_states.filter(
        (country_state) => country_state !== chipToDelete
      ),
    } as ZoneArea;

    setNewZone({
      zoneMetadata: {
        zoneArea: {
          areasIncludedInZone: removeSubAreaFromIncludedSubAreas,
          areasExcludedFromZone: removeSubAreaFromExcludedSubAreas,
        },
        region,
      },
      ...otherZoneProps,
    });
  };

  const handleCustomColumnDelete = (field: string) => {
    if (
      "newZones" in customComponentState &&
      "region" in customComponentState &&
      "handleCustomColumnDelete"
    ) {
      if (zoneSectionMap.get(field) !== undefined) {
        let zoneSectionMapWithoutField = zoneSectionMap;
        const removed = zoneSectionMapWithoutField.delete(field);
        removed && setZoneSectionMap(zoneSectionMapWithoutField);
        setCustomComponentState({
          newZones: customComponentState.newZones.filter(
            (zone: GridElement) => zone.field !== field
          ),
          region: customComponentState.region,
          handleCustomColumnDelete:
            customComponentState.handleCustomColumnDelete,
          columnMetadataTable: convertToReadOnly(
            getZoneTable(zoneSectionMapWithoutField)
          ),
        });
      }
    }
  };

  return (
    <Grid container direction={"column"} spacing={2}>
      <Grid item xs={12}>
        <InlandInput
          classes={classes}
          handleChange={handleChange}
          handleDelete={handleDeleteZoneChip}
          handleBlur={handleBlur}
          newZone={newZone}
          region={region}
          setNewZone={setNewZone}
          addNewColumnsButtonClickCallback={getNewZoneClickCallBack(
            customComponentState,
            setCustomComponentState,
            newZoneColumn,
            region,
            setNewZone,
            handleCustomColumnDelete,
            zoneSectionMap,
            setZoneSectionMap
          )}
        />
      </Grid>
    </Grid>
  );
};

export interface CustomRowRenderer {
  state: { grid: GridElement[][]; columnMetadataTable?: GridElement[][] };
  setState: React.Dispatch<{
    grid: GridElement[][];
    columnMetadataTable?: GridElement[][];
  }>;
}

const inlandRateColumns = [[rowIndexField, weightRangeField]];

type SpreadsheetInputContext = "Courier" | "NonCourier";

export const customComponentFunc = (props: CustomComponentFuncProps) => {
  const { customComponentState, state, initialHeaders } = props;
  const [headers, ...bodyRows] = state.grid;
  let newState = state;

  if ("newZones" in customComponentState) {
    if (customComponentState.newZones.length > 0) {
      const newZoneHeader = customComponentState.newZones.pop();
      const headerNotInTable = !headers.some((header) => {
        return header.field === newZoneHeader.field;
      });

      const newHeaders = headerNotInTable
        ? [...headers, newZoneHeader]
        : headers;

      const { head, readOnly, value, ...newZoneCellProps } = newZoneHeader;

      const newBodyRows = headerNotInTable
        ? bodyRows.map((row) => [...row, { value: "", ...newZoneCellProps }])
        : bodyRows.map((row) =>
            row.filter(
              (cell) =>
                !customComponentState.newZones.some(
                  (zone: GridElement) => zone.field !== cell.field
                )
            )
          );
      console.log(
        "columnMetadataTable: ",
        customComponentState.columnMetadataTable
      );

      newState = {
        grid: [newHeaders, ...newBodyRows],
        columnMetadataTable: customComponentState.columnMetadataTable as GridElement[][],
      };
    } else {
      newState =
        initialHeaders === undefined
          ? newState
          : {
              grid: [...initialHeaders, ...bodyRows],
              columnMetadataTable: customComponentState.columnMetadataTable as GridElement[][],
            };
    }
  }
  if ("currency" in customComponentState) {
    newState = {
      grid: state.grid.map((row) =>
        row.map((cell) => {
          if (cell.currencyType !== undefined) {
            const { currencyType, ...otherCellProps } = cell;
            return {
              currencyType: customComponentState.currency,
              ...otherCellProps,
            };
          } else {
            return cell;
          }
        })
      ),
      columnMetadataTable: customComponentState.columnMetadataTable,
    };
  }

  return newState;
};

const InlandCustomComponent = (inlandType: string) => (
  props: CustomComponentProps
) => {
  return (
    <Grid justify={"flex-start"} alignItems={"center"} direction={"column"}>
      <Grid item md={12}>
        <AddZoneComponent
          {...{ ...props, customComponentContext: { inlandType: inlandType } }}
        />
      </Grid>
      <Grid item md={12}>
        <TableCurrency {...props} />
      </Grid>
    </Grid>
  );
};

export const inlandInputFields = (inlandType: SpreadsheetInputContext) => [
  {
    name: "inlandRates",
    required: true,
    label: "Add Inland Rates",
    editor: "spreadsheet",
    customComponent: InlandCustomComponent(inlandType),
    customSpreadsheetInputFunc: customComponentFunc,
    spreadsheetColumns: inlandRateColumns,
  },
  additionalChargesTable(),
];
