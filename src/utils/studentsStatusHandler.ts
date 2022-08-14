import {
  RecruiterActionsOfStatusEnum
} from "../components/CandidatesListPage/CandidatesListPage";
import {updateStudentsLists} from "./updateStudentsLists";
import {DataTypeEnum} from "../actions/students";

export const studentsStatusHandler = async (
  action: RecruiterActionsOfStatusEnum,
  id: string,
  setActiveStudentsList: any,
  setForInterviewStudentsList: any,
  numberOfPage: string,
  type: DataTypeEnum,
  actualSearchPhrase: string,
  recruiterId: string,
) => {

  switch(action){
    case `for-interview`:
      const res = await fetch(`http://localhost:3001/recruiter/status/${recruiterId}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: RecruiterActionsOfStatusEnum.forInterview
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(await res.json())
      await updateStudentsLists(setActiveStudentsList, setForInterviewStudentsList, numberOfPage || '1', type, actualSearchPhrase, recruiterId);
      //@TODO dodano pomyślnie
      break;
    case `no-interested`:
      await fetch(`http://localhost:3001/recruiter/status/${recruiterId}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: RecruiterActionsOfStatusEnum.noInterested
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      await updateStudentsLists(setActiveStudentsList, setForInterviewStudentsList, numberOfPage, type, actualSearchPhrase, recruiterId);
      //@TODO dodano pomyślnie
      break;

    case 'employed':
      await fetch(`http://localhost:3001/recruiter/status/${recruiterId}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: RecruiterActionsOfStatusEnum.employed
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      await updateStudentsLists(setActiveStudentsList, setForInterviewStudentsList, numberOfPage, type, actualSearchPhrase, recruiterId);
      //@TODO dodano pomyślnie
      break;

    default: {
      console.log(action)
    }
  }

}