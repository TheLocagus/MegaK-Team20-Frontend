import { StudentsAction } from "action-types/students";
import { AvailableStudentToListResponseInterface, ForInterviewStudentToListResponseInterface } from "components/CandidatesListPage/CandidatesListPage";
import {DataTypeEnum} from "../actions/students";

export interface StudentsState {
  activeStudents: {
    count: number;
    items: AvailableStudentToListResponseInterface[];
    totalPages: Number;
  };
  forInterviewStudents: ForInterviewStudentToListResponseInterface[];
  type: DataTypeEnum;
  actualSearchPhrase: string
}

const initialState: StudentsState = {
  activeStudents: {
    count: 1,
    items: [],
    totalPages: 1,
  },
  forInterviewStudents: [],
  type: DataTypeEnum.all,
  actualSearchPhrase: '',
}

interface SetActiveStudents {
  type: StudentsAction.SET_ACTIVE_STUDENTS;
  payload: StudentsState["activeStudents"];
}

interface SetForInterviewStudents {
  type: StudentsAction.SET_FOR_INTERVIEW_STUDENTS;
  payload: ForInterviewStudentToListResponseInterface[];
}

interface SetDataType {
  type: StudentsAction.SET_DATA_TYPE;
  payload: DataTypeEnum;
}

interface SetActualSearchPhrase {
  type: StudentsAction.SET_ACTUAL_SEARCH_PHRASE;
  payload: string;
}

type Action = SetActiveStudents | SetForInterviewStudents | SetDataType | SetActualSearchPhrase;

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
    case StudentsAction.SET_DATA_TYPE: {
      return {
        ...state,
        type: action.payload,
      }
    }
    case StudentsAction.SET_ACTUAL_SEARCH_PHRASE: {
      return {
        ...state,
        actualSearchPhrase: action.payload,
      }
    }
    default: return state;
  }
}