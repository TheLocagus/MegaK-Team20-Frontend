import {
  RecruiterActionsOfStatusEnum
} from "../components/CandidatesListPage/CandidatesListPage";
import {updateStudentsLists} from "./updateStudentsLists";
import React, { Dispatch } from "react";
import { AnyAction } from "redux";

export const studentsStatusHandler = async (
  action: RecruiterActionsOfStatusEnum,
  id: string,
  dispatch:  Dispatch<AnyAction>
) => {

  switch(action){
    case `for-interview`:
      await fetch(`http://localhost:3001/recruiter/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: RecruiterActionsOfStatusEnum.forInterview
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      await updateStudentsLists(dispatch);
      //@TODO dodano pomyślnie
      break;
    case `no-interested`:
      await fetch(`http://localhost:3001/recruiter/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: RecruiterActionsOfStatusEnum.noInterested
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      await updateStudentsLists(dispatch);
      //@TODO dodano pomyślnie
      break;

    case 'employed':
      await fetch(`http://localhost:3001/recruiter/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: RecruiterActionsOfStatusEnum.employed
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      await updateStudentsLists(dispatch);
      //@TODO dodano pomyślnie
      break;
  }

}