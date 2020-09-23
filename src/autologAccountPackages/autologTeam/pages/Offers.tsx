import * as React from "react";
import { FunctionComponent, useState, useEffect } from "react";
import { OffersHandler } from "./../../../autologServices/offers/OffersHandler";
import { OffersDialog } from "./../../../autologServices/offers/OffersDialog";
import { createStyles, Divider, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as queries from "../../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

// import { GraphQLResult } from "@aws-amplify/api";
// import { uuid } from "uuidv4";
// import { getMaxListeners, off } from "process";
// import { string } from "prop-types";
// import { initial } from "lodash";
// import { RouteComponentProps } from "react-router-dom";
// import queryString from "query-string";

type getAllRequests = {
  id: string;
  requestID: string;
  fromRegion: string;
  fromState: string;
  fromPort: string;
  terms: string;
  airOcean: string;
  madeByUserMail: string;
  createdAt: string;
  status?: string;
  details: string;
  Test: string;
  offersCount: string;
  offers: string;
  updatedAt: string;
};

let initialRequest: getAllRequests = {
  id: "initialRequest",
  requestID: "initialRequest",
  fromRegion: "initialRequest",
  fromState: "initialRequest",
  fromPort: "initialRequest",
  terms: "initialRequest",
  airOcean: "initialRequest",
  madeByUserMail: "initialRequest",
  createdAt: "initialRequest",
  status: "initialRequest",
  details: "initialRequest",
  Test: "initialRequest",
  offersCount: "initialRequest",
  offers: "initialRequest",
  updatedAt: "initialRequest",
};

interface offerType {
  operatedBy: string;
  rateID: string;
  totalForThisRate: any;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },

    section1: {
      margin: theme.spacing(3, 2),
    },
    section2: {
      margin: theme.spacing(2),
    },
    section3: {
      margin: theme.spacing(3, 1, 1),
    },
  })
);

let initialOffers: offerType = {
  operatedBy: "",
  rateID: "",
  totalForThisRate: "",
};

//return the Object from AllRequests by id
const myOffers = async (idHelper: string) => {
  let response = await API.graphql(
    graphqlOperation(queries.getAllRequests, {
      id: idHelper,
    })
  );
  if (response) return response;
};

export const Offers: FunctionComponent = () => {
  const [offers, setOffers] = useState<[offerType]>([initialOffers]);
  const [highlight, setHighlight] = useState(-1);

  const [requestId, setRequestId] = useState("");
  const [loading, setLoading] = useState(true);

  const [originalRequest, setOriginalRequest] = useState<getAllRequests>(
    initialRequest
  );
  const queryString = window.location.search;

  useEffect(() => {
    //getting the reuestID from the url using queryString
    let idHelper = queryString
      .toString()
      .slice(4, queryString.toString().length);

    //fetching request id from url   
    setRequestId(idHelper);

    //at my offers we get the relevant offers for this request  
    myOffers(idHelper).then((res: any) => {
      if (res) {
        console.log("results from getAllRequests by idHelper -> ", res);

        let curRequest: getAllRequests = res.data.getAllRequests;

        //from useEffetc, initialized once
        //initializing component with CurrentRequest object
        initialData(curRequest);
      }
    });
  }, []);

  //at initialData we initialize  Offers && OriginialRequest
  function initialData(curRequest: getAllRequests) {
    if (loading) {
      let allOfers: [offerType] = JSON.parse(curRequest.offers);
      setOffers(allOfers);

      setOriginalRequest(curRequest);
    }
  }

  //after fetching data and setting Offers and Requests State,
  //we set loading to off and showing offersHandler
  if (offers && originalRequest !== initialRequest) {
    if (offers[0] !== initialOffers) {
      if (loading) {
        console.log("offers -> ", offers);
        console.log("originalRequest  ->  ", originalRequest);

        //only now setting loading to false
        setLoading(false);
      }
    }
  }

  const classes = useStyles();

  if (loading) {
    return (
      <>
        <div> Loading Awsome Quotes for {requestId}</div>
      </>
    );
    // this else meanse loading is false, means data is fetched
  } else {
    console.log("this is highlight -> ", highlight);

    //if highlight is > 1,
    // than user is focosuing on a specific offer, located in offers[highlight]

    //pnly if highlight is positive (or zero) we go into Dialog
    if (highlight > -1) {
      if (highlight < offers.length) {
        let curOffer = offers[highlight];

        //curOffer is the highlighted offer in dialog
        if (curOffer) {
          return (
            <OffersDialog
              curOffer={JSON.stringify(curOffer)}
              requestId={requestId}
              setHighlight={setHighlight}
              operatedBy={curOffer.operatedBy}
              rateID={curOffer.rateID}
              totalForThisRate={curOffer.totalForThisRate}
              originalRequest={JSON.stringify(originalRequest)}
            />
          );
        } else {
          return <div>OOpsi curOffer is somehow not a thing</div>;
        }
      } else {
        //cant reach here
        //it means offers[highlight] is actually null
        return (
          <div>OOpsi highlight is positive but longer the offers length</div>
        );
      }
    } else {
      // reached here ->
      //            highlight === -1
      //            presenting all ofers
      return (
        <>
          <div>
            {offers.map((offer: offerType, index: number) => {
              return (
                <div>
                  <OffersHandler
                    index={index}
                    operatedBy={offer.operatedBy}
                    totalForThisRate={offer.totalForThisRate}
                    rateID={offer.rateID}
                    setHighlight={setHighlight}
                  />
                </div>
              );
            })}
          </div>
        </>
      );
    }
  }
};

// const choisesUSA_Ports = ["port1USA_Ocean", "port2USA_Ocean"];
// const choisesEurope_Ports = ["port1Europ_Ocean", "port2Europ_Ocean"];
// const choisesFarEast_Ports = ["port1FarEast_Ocean", "port2FarEast_Ocean"];

// const choisesUSA_States = ["state1USA_Ocean", "state2USA_Ocean"];
// const choisesEurope_States = ["state1Europ_Ocean", "state2Europ_Ocean"];
// const choisesFarEast_States = ["state1FarEast_Ocean", "state2FarEast_Ocean"];
