import {
  RecruiterActionsOfStatusEnum
} from "../components/CandidatesListPage/CandidatesListPage";
import {updateStudentsLists} from "./updateStudentsLists";
import {DataTypeEnum} from "../actions/students";
import {apiUrl} from "../config/api";

export const studentsStatusHandler = async (
  action: RecruiterActionsOfStatusEnum,
  id: string,
  setActiveStudentsList: any,
  setForInterviewStudentsList: any,
  numberOfPage: string,
  type: DataTypeEnum,
  actualSearchPhrase: string,
) => {

  switch(action){
    case `for-interview`:
      const res = await fetch(`${apiUrl}/recruiter/status/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: RecruiterActionsOfStatusEnum.forInterview
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      })

      await updateStudentsLists(setActiveStudentsList, setForInterviewStudentsList, numberOfPage || '1', type, actualSearchPhrase);
      //@TODO dodano pomyślnie
      break;
    case `no-interested`:
      await fetch(`${apiUrl}/recruiter/status/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: RecruiterActionsOfStatusEnum.noInterested
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      })

      await updateStudentsLists(setActiveStudentsList, setForInterviewStudentsList, numberOfPage, type, actualSearchPhrase);
      //@TODO dodano pomyślnie
      break;

    case 'employed':
      const resEmployed = await fetch(`${apiUrl}/recruiter/status/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: RecruiterActionsOfStatusEnum.employed
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      })
      await updateStudentsLists(setActiveStudentsList, setForInterviewStudentsList, numberOfPage, type, actualSearchPhrase);
      //@TODO dodano pomyślnie
      break;

    default: {
      console.log(action)
    }
  }

}