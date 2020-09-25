import * as React from "react";
import { FunctionComponent, useState, useEffect } from "react";
import * as mutations from "../../graphql/mutations";
import { Dialog, DialogContent } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { NewOrderSuccess } from "./NewOrderSuccess";
import { uuid } from "uuidv4";
import { API, graphqlOperation } from "aws-amplify";

import { createStyles, Divider, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface offerTypeDialog {
  operatedBy: string;
  rateID: string;
  totalForThisRate: any;
  setHighlight: any;
  requestId: string;
  originalRequest: string;
  curOffer: string;
}

interface Appending {
  id: string;
  requestid: string;
  byUserMail: string;

  operatedByFF: string;
  rateId: string;

  info: string;
}

export const OffersDialog: FunctionComponent<offerTypeDialog> = ({
  setHighlight,
  operatedBy,
  rateID,
  totalForThisRate,
  requestId,
  originalRequest,
  curOffer,
}: offerTypeDialog) => {
  const [open, setOpen] = React.useState(true);
  const [submitted, setSubmitted] = React.useState(false);

  async function appedndPendingTable() {
    let originRFQ = JSON.parse(originalRequest);
    let offer = JSON.parse(curOffer);

    let infoH = {
      originalRFQ: originRFQ,
      offerAccepted: offer,
    };
    //inputToAdd - the item we add to PENDING
    let inputToAdd: Appending = {
      id: uuid(),
      requestid: requestId,
      byUserMail: originRFQ.madeByUserMail,

      operatedByFF: "operatedBy",
      rateId: rateID,

      info: JSON.stringify(infoH),
    };
    console.log("this is inputToAdd to Appending ->  ", inputToAdd);

    let responseFromPending = await API.graphql(
      graphqlOperation(mutations.createPendingRequests, {
        input: inputToAdd,
      })
    );
    if (responseFromPending) {
      console.log("responseFromPending -> ", responseFromPending);
    }
  }

  //by setting Highlight to -1
  //we comeback to original page with all the offers
  const handleClose = () => {
    setHighlight(-1);
    setOpen(false);
  };

  const handleAgree = async () => {
    await appedndPendingTable();
    // setOpen(false);
    setSubmitted(true);
  };
  const MyButtons = (
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Disagree
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
          Title
          {/* {"Order id" + "requestID"} */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Hello from inside
          </DialogContentText>
          {MyButtons}
        </DialogContent>
      </Dialog>
    );
    return <div> {MyDialog}</div>;
  } else {
    //means submited is true
    return <NewOrderSuccess />;
  }
};

// const handleClickOpen = () => {
//   setOpen(true);
// };

// {operatedBy}
// <br />
// {rateID}
// <br />
// {totalForThisRate.exw}
// {"  "}
// {totalForThisRate.fob}
// {"  "}
// {totalForThisRate.local}
// {"  "}
