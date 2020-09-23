import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../../../../graphql/queries";

const queryString = window.location.search;

export const ReveiwPendings: React.FC = () => {
  const [allPendings, setAllPendings] = useState([]);
  const [loading, setLoading] = useState(true);

  const myPendings = async () => {
    let response = await API.graphql(
      graphqlOperation(queries.listPendingRequestss)
    );

    if (response) return response;
  };

  function initialData(curPendings: any) {
    if (loading) {
      setAllPendings(curPendings);
    }
  }

  useEffect(() => {
    myPendings().then((res: any) => {
      let curPendings: any = res.data.listPendingRequestss.items;
      console.log("this is curRequest -> 27 -> ", curPendings);

      //from useEffetc, initialized once
      //initializing component with CurrentRequest object
      initialData(curPendings);
    });
  }, []);

  console.log("this is pendings -> ", allPendings);
  return <div>ReveiwPendings</div>;
};

//   //getting the reuestID from the url using queryString
//   let idHelper = queryString
//   .toString()
//   .slice(4, queryString.toString().length);
