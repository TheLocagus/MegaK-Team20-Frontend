import { StudentsAction } from "action-types/students";
import { AvailableStudentToListResponseInterface, ForInterviewStudentToListResponseInterface } from "components/CandidatesListPage/CandidatesListPage";

interface StudentsState {
  activeStudents: AvailableStudentToListResponseInterface[];
  forInterviewStudents: ForInterviewStudentToListResponseInterface[];
}

const initialState: StudentsState = {
  activeStudents: [],
  forInterviewStudents: [],
}

interface SetActiveStudents {
  type: StudentsAction.SET_ACTIVE_STUDENTS;
  payload: AvailableStudentToListResponseInterface[];
}

interface SetForInterviewStudents {
  type: StudentsAction.SET_FOR_INTERVIEW_STUDENTS;
  payload: ForInterviewStudentToListResponseInterface[];
}

type Action = SetActiveStudents | SetForInterviewStudents;

export default (state: StudentsState = initialState, action: Action) => {
  switch(action.type){
    case StudentsAction.SET_ACTIVE_STUDENTS: {
      return {
        ...state,
        activeStudents: action.payload,
      }
    }
    case StudentsAction.SET_FOR_INTERVIEW_STUDENTS: {
      return {
        ...state,
        forInterviewStudents: action.payload,
      }
    }
    default: return state;
  }
}