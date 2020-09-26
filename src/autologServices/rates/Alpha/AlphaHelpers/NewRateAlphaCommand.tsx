import React, { useState, useEffect } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { uuid } from "uuidv4";
import { IValues } from "../../../../common/form/formTypes";
import axios from "axios";
import * as mutations from "../../../../graphql/mutations";

export const newRateSubmissions = async (submissionData: IValues) => {
  const currentUserInfo = await Auth.currentUserInfo();
  const userMail = currentUserInfo.attributes.email;

  const { incoTerms, airOcean, region } = submissionData.GeneralInfo;
  console.log("submissionData -> ", submissionData);
  return;
};
