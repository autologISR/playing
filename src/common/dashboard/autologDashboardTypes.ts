import React from "react";

export interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

export interface AutologDashboardProps {
    tabValues: string[];
    serviceComponents: Array<React.FunctionComponent<Array<any>>>;
}