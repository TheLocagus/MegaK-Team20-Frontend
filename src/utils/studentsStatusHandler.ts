import {
  RecruiterActionsOfStatusEnum
} from "../components/CandidatesListPage/CandidatesListPage";
import {updateStudentsLists} from "./updateStudentsLists";

export const studentsStatusHandler = async (
  action: RecruiterActionsOfStatusEnum,
  id: string,
  setActiveStudentsList: any,
  setForInterviewStudentsList: any,
  numberOfPage: string
) => {

  switch(action){
    case `for-interview`:
      const res = await fetch(`http://localhost:3001/recruiter/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: RecruiterActionsOfStatusEnum.forInterview
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(await res.json())
      await updateStudentsLists(setActiveStudentsList, setForInterviewStudentsList, numberOfPage || '1');
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

      await updateStudentsLists(setActiveStudentsList, setForInterviewStudentsList, numberOfPage);
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

      await updateStudentsLists(setActiveStudentsList, setForInterviewStudentsList, numberOfPage);
      //@TODO dodano pomyślnie
      break;

    default: {
      console.log(action)
    }
  }

}