import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../../../../graphql/queries";
import { PendingOverview } from "../../../../../autologServices/ActionsTeam/ReviewAndAcceptPendings/PendingOverview";

const queryString = window.location.search;

export const ReveiwPendings: React.FC = () => {
  const [allPendings, setAllPendings] = useState([]);
  const [loading, setLoading] = useState(true);

  async function myPendings() {
    try {
      let response = await API.graphql(
        graphqlOperation(queries.listPendingRequestss)
      );

      if (response) {
        // console.log("all good... ", response);
        return response;
      }
    } catch (err) {
      console.log("error getting pendings.. ", err);
    }
  }

  useEffect(() => {
    myPendings().then((res: any) => {
      if (res.data) {
        // console.log("1 -> ", res.data.listPendingRequestss);
        setAllPendings(res.data.listPendingRequestss.items);
      }
    });
  }, []);

  console.log("this is allPendings -> ", allPendings);
  if (allPendings.length > 0) {
    return (
      <div>
        <PendingOverview allPendings={allPendings} />
      </div>
    );
  } else {
    return <div>Loading Pendings to Review team..</div>;
  }
};

