import { StudentsAction } from "action-types/students";
import { AvailableStudentToListResponseInterface, ForInterviewStudentToListResponseInterface } from "components/CandidatesListPage/CandidatesListPage";

export interface StudentsState {
  activeStudents: {
    count: number;
    items: AvailableStudentToListResponseInterface[];
    totalPages: Number;
  };
  forInterviewStudents: ForInterviewStudentToListResponseInterface[];
}

const initialState: StudentsState = {
  activeStudents: {
    count: 1,
    items: [],
    totalPages: 1,
  },
  forInterviewStudents: [],
}

interface SetActiveStudents {
  type: StudentsAction.SET_ACTIVE_STUDENTS;
  payload: StudentsState["activeStudents"];
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