import {
  AvailableStudentToListResponseInterface, ForInterviewStudentToListResponseInterface,
  RecruiterActionsOfStatusEnum
} from "../components/CandidatesListPage/CandidatesListPage";
import {updateStudentsLists} from "./updateStudentsLists";
import React from "react";

export const studentsStatusHandler = async (
  action: RecruiterActionsOfStatusEnum,
  id: string,
  setActiveStudentsList: React.Dispatch<React.SetStateAction<AvailableStudentToListResponseInterface[]>>,
  setForInterviewStudentsList: React.Dispatch<React.SetStateAction<ForInterviewStudentToListResponseInterface[]>>,
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

      await updateStudentsLists(setActiveStudentsList, setForInterviewStudentsList);
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

      await updateStudentsLists(setActiveStudentsList, setForInterviewStudentsList);
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

      await updateStudentsLists(setActiveStudentsList, setForInterviewStudentsList);
      //@TODO dodano pomyślnie
      break;
  }

}