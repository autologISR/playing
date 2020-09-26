import * as React from "react";
import { FunctionComponent, useState, useEffect } from "react";
import * as mutations from "../../../graphql/mutations";
import * as queries from "../../../graphql/queries";

import { Dialog, DialogContent } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
// import { NewOrderSuccess } from "./NewOrderSuccess";
import { uuid } from "uuidv4";
import { API, graphqlOperation } from "aws-amplify";
import { sys } from "typescript";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DeclinecType {
  requestid: string;
  info: string;
}

interface infoCurPending {
  originalRFQ: any;
  Test: string;
  offersCount: number;
  offers: any;
  info: any;
}

interface shipmentsOnGoingAppendingType {
  madeByUserMail: string;
  createdAt: string;
  operatedByFF: string;
  offerID: string;
  status: string;
  info: string;
}
interface pendingType {
  byUserMail: string;
  createdAt: string;
  id: string;
  info: infoCurPending;
  operatedBY: string;
  rateId: string;
  requestid: string;
  updatedAt: string;
}

interface pendingTypeDialog {
  setHighLight: any;
  curPending: any;
}
//this compeonent recives single offer and present it
//setHighlight will cause this specific offer to Dialog
export const PendingDialog: FunctionComponent<pendingTypeDialog> = ({
  setHighLight,
  curPending,
}: pendingTypeDialog) => {
  const [open, setOpen] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [curPendingRequestID, setCurPendingRequestID] = useState("");

  useEffect(() => {
    console.log("from  useEffect ... curPending -> ", curPending);
    let helperPendingID = curPending.id;
    setCurPendingRequestID(helperPendingID);
  }, []);

  async function appedndDeclinedRFQTable(pendingiD: string) {
    let helper: infoCurPending = JSON.parse(JSON.stringify(curPending));

    console.log(
      "this is helper..NEWNEWNEW -> ",
      JSON.parse(helper.info)
      // JSON.stringify(curPending.info.offers)
    );

    //

    let offerAcceptedByUser = JSON.parse(helper.info).offerAccepted;
    let originalRFQ = JSON.parse(helper.info).offerAccepted;

    let infoH = {
      originalRFQ: originalRFQ,
      offerAccepted: offerAcceptedByUser,
      requestID: curPending.requestid,
      pendingiD: pendingiD,
      declinedPending: curPending,
    };

    let dateHelper = new Date().toString();

    // #info.originalRFQ
    // #info.offerAccepted
    //inputToAdd - the item we add to PENDING
    let inputToAdd: DeclinecType = {
      requestid: curPending.requestid,
      info: JSON.stringify(infoH),
    };
    console.log("this is inputToAdd to Appending ->  ", inputToAdd);

    //first appending shipment table
    let responseFromShipmentOnGoing = await API.graphql(
      graphqlOperation(mutations.createDeclinedRfq, {
        input: inputToAdd,
      })
    );
    if (responseFromShipmentOnGoing) {
      //shipment Added Successfuly
      console.log("createShipmentsOnGoing -> ", responseFromShipmentOnGoing);
    }
  }

  async function appedndShipmentsTable(pendingiD: string) {
    let helper: infoCurPending = JSON.parse(JSON.stringify(curPending));

    console.log(
      "this is helper..NEWNEWNEW -> ",
      JSON.parse(helper.info)
      // JSON.stringify(curPending.info.offers)
    );

    let offerAccepted = JSON.parse(helper.info).offerAccepted;
    let originalRFQ = JSON.parse(helper.info).offerAccepted;

    let infoH = {
      originalRFQ: originalRFQ,
      offerAccepted: offerAccepted,
      requestID: curPending.requestid,
      pendingiD: pendingiD,
    };

    let dateHelper = new Date().toString();

    // #info.originalRFQ
    // #info.offerAccepted
    //inputToAdd - the item we add to PENDING
    let inputToAdd: shipmentsOnGoingAppendingType = {
      madeByUserMail: curPending.byUserMail,
      createdAt: dateHelper,
      operatedByFF: curPending.operatedByFF,
      // offerID: curPending.info.,
      offerID: offerAccepted.offerUniqeId,
      status: "Pending",
      info: JSON.stringify(infoH),
    };
    console.log("this is inputToAdd to Appending ->  ", inputToAdd);

    //first appending shipment table
    let responseFromShipmentOnGoing = await API.graphql(
      graphqlOperation(mutations.createShipmentsOnGoing, {
        input: inputToAdd,
      })
    );
    if (responseFromShipmentOnGoing) {
      //shipment Added Successfuly
      console.log("createShipmentsOnGoing -> ", responseFromShipmentOnGoing);
    }
  }

  //by setting Highlight to -1
  //we comeback to original page with all the offers
  const handleClose = () => {
    setHighLight(-1);
    setOpen(false);
  };

  const handleDecline = async () => {
    if (curPendingRequestID.length > 0) {
      console.log(
        "entered if.. this is curPendingRequestID ->",
        curPendingRequestID
      );
      await appedndDeclinedRFQTable(curPendingRequestID);
    }

    // setOpen(false);
    setSubmitted(true);
  };

  const handleAgree = async () => {
    // let x: any = await getPendingIdByRequestID();
    if (curPendingRequestID.length > 0) {
      console.log(
        "entered if.. this is curPendingRequestID ->",
        curPendingRequestID
      );
      await appedndShipmentsTable(curPendingRequestID);
    }

    // setOpen(false);
    setSubmitted(true);
  };

  const MyButtons = (
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Back
      </Button>
      <Button onClick={handleDecline} color="primary">
        Decline
      </Button>
      <Button onClick={handleAgree} color="primary">
        Agree
      </Button>
    </DialogActions>
  );

  if (!submitted) {
    let MyDialog = (
      <Dialog
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Order for {curPending.byUserMail}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div>
              <label>Operated by {curPending.operatedBY}</label>
              <br />
              <label>rate Id {curPending.rateId}</label>
            </div>
          </DialogContentText>
          {MyButtons}
        </DialogContent>
      </Dialog>
    );
    console.log(
      "from pending.. this is specific pending aka curPending-> ",
      curPending
    );
    return <div> {MyDialog}</div>;
  } else {
    return <div>Nice</div>;
    //means submited is true
    // return <NewOrderSuccess />;
  }
};

// <button
// onClick={() => {
//   appedndShipmentsTable();
// }}
// >
// Click
// </button>

// byUserMail: "autologisr@gmail.com"
// createdAt: "2020-09-24T13:14:17.885Z"
// id: "62013887-3344-4051-8e84-297fea92c2a4"
// info: "{"originalRFQ":{"id":"d9f4425d-56fd-42b9-8b3f-948a1ec8cc61","fromRegion":"USA","fromState":"state1USA_Air","fromPort":null,"terms":"FOB","airOcean":"Air","madeByUserMail":"autologisr@gmail.com","createdAt":"2020-09-24T13:14:09.399Z","status":null,"details":"{\"offersData\":{\"requestID\":\"d9f4425d-56fd-42b9-8b3f-948a1ec8cc61\",\"madeByUserMail\":\"autologisr@gmail.com\",\"relevantOffers\":[{\"rateID\":\"01841a9e-83e6-417c-8700-9d25af3d4f3212\",\"operatedBy\":\"name11\",\"totalForThisRate\":{\"exw\":0,\"fob\":{\"usd\":{\"fobFreight\":1000,\"fobRules\":0},\"eur\":{},\"nis\":{}},\"local\":{\"usd\":{\"locals\":0},\"eur\":{\"locals\":0},\"nis\":{\"locals\":0}}},\"offerUniqeId\":\"undefined0\"},{\"rateID\":\"01841a9e-83e6-417c-8700-9d25af3d4f32121\",\"operatedBy\":\"name22\",\"totalForThisRate\":{\"exw\":0,\"fob\":{\"usd\":{\"fobFreight\":0,\"fobRules\":0},\"eur\":{},\"nis\":{}},\"local\":{\"usd\":{\"locals\":0},\"eur\":{\"locals\":0},\"nis\":{\"locals\":0}}},\"offerUniqeId\":\"undefined1\"}]},\"submissionData\":{\"GeneralInfo\":{\"incoTerms\":\"FOB\",\"dischargePort\":\"TLV\",\"region\":\"USA\",\"airOcean\":\"Air\",\"shipmentType\":\"LCL\",\"direction\":\"Import\",\"dateFrom\":\"Today at 16:13\",\"dateTo\":\"Today at 16:13\",\"insurance\":\"yes\",\"dangerouseGoods\":\"yes\"},\"LocationFOBAirUSA\":{\"state\":\"state1USA_Air\",\"portFrom\":\"port1USA_Air\"},\"ShipmentDetailsAir\":{\"shipmentDetailsAir\":\"{\\n \\\"grid\\\": [\\n  [\\n   {\\n    \\\"head\\\": true,\\n    \\\"field\\\": \\\"rowIndex\\\",\\n    \\\"value\\\": \\\"\\\",\\n    \\\"readOnly\\\": true\\n   },\\n   {\\n    \\\"field\\\": \\\"unitWeight\\\",\\n    \\\"value\\\": \\\"unit Weight(kg)\\\",\\n    \\\"fieldType\\\": \\\"kg\\\",\\n    \\\"readOnly\\\": true,\\n    \\\"head\\\": true\\n   },\\n   {\\n    \\\"field\\\": \\\"numberOfUnits\\\",\\n    \\\"value\\\": \\\"Number of units\\\",\\n    \\\"readOnly\\\": true,\\n    \\\"head\\\": true\\n   },\\n   {\\n    \\\"field\\\": \\\"unitLength\\\",\\n    \\\"value\\\": \\\"Length (cm)\\\",\\n    \\\"readOnly\\\": true,\\n    \\\"head\\\": true\\n   },\\n   {\\n    \\\"field\\\": \\\"unitWidth\\\",\\n    \\\"value\\\": \\\"Width (cm)\\\",\\n    \\\"readOnly\\\": true,\\n    \\\"head\\\": true\\n   },\\n   {\\n    \\\"field\\\": \\\"unitHeight\\\",\\n    \\\"value\\\": \\\"Height (cm)\\\",\\n    \\\"readOnly\\\": true,\\n    \\\"head\\\": true\\n   }\\n  ],\\n  [\\n   {\\n    \\\"field\\\": \\\"rowIndex\\\",\\n    \\\"value\\\": \\\"1.\\\",\\n    \\\"readOnly\\\": true\\n   },\\n   {\\n    \\\"value\\\": \\\"20 kg\\\",\\n    \\\"nonDeletable\\\": true,\\n    \\\"field\\\": \\\"unitWeight\\\",\\n    \\\"fieldType\\\": \\\"kg\\\"\\n   },\\n   {\\n    \\\"value\\\": \\\"150\\\",\\n    \\\"nonDeletable\\\": true,\\n    \\\"field\\\": \\\"numberOfUnits\\\"\\n   },\\n   {\\n    \\\"value\\\": \\\"150\\\",\\n    \\\"nonDeletable\\\": true,\\n    \\\"field\\\": \\\"unitLength\\\"\\n   },\\n   {\\n    \\\"value\\\": \\\"150\\\",\\n    \\\"nonDeletable\\\": true,\\n    \\\"field\\\": \\\"unitWidth\\\"\\n   },\\n   {\\n    \\\"value\\\": \\\"150\\\",\\n    \\\"nonDeletable\\\": true,\\n    \\\"field\\\": \\\"unitHeight\\\"\\n   }\\n  ],\\n  [\\n   {\\n    \\\"field\\\": \\\"rowIndex\\\",\\n    \\\"value\\\": \\\"2.\\\",\\n    \\\"readOnly\\\": true\\n   },\\n   {\\n    \\\"value\\\": \\\"\\\",\\n    \\\"nonDeletable\\\": true,\\n    \\\"field\\\": \\\"unitWeight\\\",\\n    \\\"fieldType\\\": \\\"kg\\\"\\n   },\\n   {\\n    \\\"value\\\": \\\"\\\",\\n    \\\"nonDeletable\\\": true,\\n    \\\"field\\\": \\\"numberOfUnits\\\"\\n   },\\n   {\\n    \\\"value\\\": \\\"\\\",\\n    \\\"nonDeletable\\\": true,\\n    \\\"field\\\": \\\"unitLength\\\"\\n   },\\n   {\\n    \\\"value\\\": \\\"\\\",\\n    \\\"nonDeletable\\\": true,\\n    \\\"field\\\": \\\"unitWidth\\\"\\n   },\\n   {\\n    \\\"value\\\": \\\"\\\",\\n    \\\"nonDeletable\\\": true,\\n    \\\"field\\\": \\\"unitHeight\\\"\\n   }\\n  ],\\n  [\\n   {\\n    \\\"field\\\": \\\"rowIndex\\\",\\n    \\\"value\\\": \\\"3.\\\",\\n    \\\"readOnly\\\": true\\n   },\\n   {\\n    \\\"value\\\": \\\"\\\",\\n    \\\"nonDeletable\\\": true,\\n    \\\"field\\\": \\\"unitWeight\\\",\\n    \\\"fieldType\\\": \\\"kg\\\"\\n   },\\n   {\\n    \\\"value\\\": \\\"\\\",\\n    \\\"nonDeletable\\\": true,\\n    \\\"field\\\": \\\"numberOfUnits\\\"\\n   },\\n   {\\n    \\\"value\\\": \\\"\\\",\\n    \\\"nonDeletable\\\": true,\\n    \\\"field\\\": \\\"unitLength\\\"\\n   },\\n   {\\n    \\\"value\\\": \\\"\\\",\\n    \\\"nonDeletable\\\": true,\\n    \\\"field\\\": \\\"unitWidth\\\"\\n   },\\n   {\\n    \\\"value\\\": \\\"\\\",\\n    \\\"nonDeletable\\\": true,\\n    \\\"field\\\": \\\"unitHeight\\\"\\n   }\\n  ],\\n  [\\n   {\\n    \\\"field\\\": \\\"rowIndex\\\",\\n    \\\"value\\\": \\\"4.\\\",\\n    \\\"readOnly\\\": true\\n   },\\n   {\\n    \\\"value\\\": \\\"\\\",\\n    \\\"nonDeletable\\\": true,\\n    \\\"field\\\": \\\"unitWeight\\\",\\n    \\\"fieldType\\\": \\\"kg\\\"\\n   },\\n   {\\n    \\\"value\\\": \\\"\\\",\\n    \\\"nonDeletable\\\": true,\\n    \\\"field\\\": \\\"numberOfUnits\\\"\\n   },\\n   {\\n    \\\"value\\\": \\\"\\\",\\n    \\\"nonDeletable\\\": true,\\n    \\\"field\\\": \\\"unitLength\\\"\\n   },\\n   {\\n    \\\"value\\\": \\\"\\\",\\n    \\\"nonDeletable\\\": true,\\n    \\\"field\\\": \\\"unitWidth\\\"\\n   },\\n   {\\n    \\\"value\\\": \\\"\\\",\\n    \\\"nonDeletable\\\": true,\\n    \\\"field\\\": \\\"unitHeight\\\"\\n   }\\n  ]\\n ]\\n}\"}}}","Test":"NO","offersCount":"2","offers":"[{\"rateID\":\"01841a9e-83e6-417c-8700-9d25af3d4f3212\",\"operatedBy\":\"name11\",\"totalForThisRate\":{\"exw\":0,\"fob\":{\"usd\":{\"fobFreight\":1000,\"fobRules\":0},\"eur\":{},\"nis\":{}},\"local\":{\"usd\":{\"locals\":0},\"eur\":{\"locals\":0},\"nis\":{\"locals\":0}}},\"offerUniqeId\":\"undefined0\"},{\"rateID\":\"01841a9e-83e6-417c-8700-9d25af3d4f32121\",\"operatedBy\":\"name22\",\"totalForThisRate\":{\"exw\":0,\"fob\":{\"usd\":{\"fobFreight\":0,\"fobRules\":0},\"eur\":{},\"nis\":{}},\"local\":{\"usd\":{\"locals\":0},\"eur\":{\"locals\":0},\"nis\":{\"locals\":0}}},\"offerUniqeId\":\"undefined1\"}]","updatedAt":"2020-09-24T13:14:09.706Z"},"offerAccepted":{"rateID":"01841a9e-83e6-417c-8700-9d25af3d4f32121","operatedBy":"name22","totalForThisRate":{"exw":0,"fob":{"usd":{"fobFreight":0,"fobRules":0},"eur":{},"nis":{}},"local":{"usd":{"locals":0},"eur":{"locals":0},"nis":{"locals":0}}},"offerUniqeId":"undefined1"}}"
// operatedBY: "name22"
// rateId: "01841a9e-83e6-417c-8700-9d25af3d4f32121"
// requestid: "d9f4425d-56fd-42b9-8b3f-948a1ec8cc61"
// updatedAt: "2020-09-24T13:14:17.885Z"

// function getPendingIdByRequestID() {
//   return API.graphql(
//     graphqlOperation(queries.byRequestId, {
//       requestid: "555",
//     })
//   );
// }
