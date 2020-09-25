import React, { useEffect, useState } from "react";
import { PendingDialog } from "./PendingHandler";

//PendingOverview is same level as Offers Page

interface PendingHandlerType {
  id: string;
  requestid: string;
  byUserMail: string;

  operatedBY: string;
  rateId: string;

  info: string;
}

interface allPendingsType {
  // allPendings: [PendingHandlerType];
  allPendings: any;
}

export const PendingOverview: React.FC<allPendingsType> = (
  allPendings: allPendingsType
) => {
  const [highLight, setHighLight] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [pendingsOverviewFixed, setPendingsOverviewFixed] = useState();

  function initial() {
    if (allPendings.allPendings) {
      let ClickableHelper = allPendings.allPendings.map(
        (Pending: any, index: number) => {
          return (
            <div>
              {Pending.byUserMail}
              <button onClick={() => setHighLight(index)}>
                Click To overview
              </button>
            </div>
          );
        }
      );

      setPendingsOverviewFixed(ClickableHelper);
      setLoading(false);
    }
  }
  useEffect(() => {
    initial();
  }, []);

  console.log("this is highlight -> ", highLight);
  //loading is false once array of pendings is set
  if (loading) {
    return <div>Loading123...</div>;
  } else {
    //ENTERED ELSE -> LOADING IS FALSE
    //highLight === -1 -> Showing All Pendings
    // highLight > 1   -> Showing specific Pending
    if (highLight === -1) {
      //showing all pendings
      return <div>{pendingsOverviewFixed}</div>;
    } else {
      //means highlight is not -1
      //verifying highlight is in range off Pendings..
      if (highLight < allPendings.allPendings.length) {
        let curPending = allPendings.allPendings[highLight];
        console.log(" yo.. this is curPending -> ", curPending);
        return (
          <div>
            <PendingDialog
              setHighLight={setHighLight}
              curPending={curPending}
            />
          </div>
        );
      } else {
        //ENTERED ELSE -> highLight is LARGER than PENDINGS length...
        return <div>OOpsi... highLight is LARGER than PENDINGS length.</div>;
      }
    }
  }
};

// //curOffer is the highlighted offer in dialog
// if (curOffer) {
//   return (
//     <OffersDialog
//       curOffer={JSON.stringify(curOffer)}
//       requestId={requestId}
//       setHighlight={setHighlight}
//       operatedBy={curOffer.operatedBy}
//       rateID={curOffer.rateID}
//       totalForThisRate={curOffer.totalForThisRate}
//       originalRequest={JSON.stringify(originalRequest)}
//     />
//   );
// } else {
//   return <div>OOpsi curOffer is somehow not a thing</div>;
// }
