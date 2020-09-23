import * as React from "react";
import { FunctionComponent } from "react";

interface offerTypeHandler {
  index: number;
  operatedBy: string;
  rateID: string;
  totalForThisRate: any;
  setHighlight: any;
}

//this compeonent recives single offer and present it
//setHighlight will cause this specific offer to Dialog
export const OffersHandler: FunctionComponent<offerTypeHandler> = ({
  operatedBy,
  rateID,
  totalForThisRate,
  setHighlight,
  index,
}: offerTypeHandler) => {
  function handelClickView() {
    setHighlight(index);
  }
  return (
    <div>
      {" "}
      <label> {operatedBy} </label>
      <label>
        {" "}
        {totalForThisRate.exw +
          totalForThisRate.fob +
          totalForThisRate.local}{" "}
      </label>
      <button onClick={handelClickView}>Click To view</button>
    </div>
  );
};
