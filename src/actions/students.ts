import { StudentsAction } from "action-types/students";
import { ForInterviewStudentToListResponseInterface } from "components/CandidatesListPage/CandidatesListPage";
import {StudentsState} from "../reducers/students-reducers";

export const setActiveStudents = (activeStudents: StudentsState["activeStudents"]) => ({
  type: StudentsAction.SET_ACTIVE_STUDENTS,
  payload: activeStudents,
})

export const setForInterviewStudents = (forInterviewStudents: ForInterviewStudentToListResponseInterface[]) => ({
  type: StudentsAction.SET_FOR_INTERVIEW_STUDENTS,
  payload: forInterviewStudents,
})