import { StudentsAction } from "action-types/students";
import { AvailableStudentToListResponseInterface, ForInterviewStudentToListResponseInterface } from "components/CandidatesListPage/CandidatesListPage";

export const setActiveStudents = (activeStudents: AvailableStudentToListResponseInterface[]) => ({
  type: StudentsAction.SET_ACTIVE_STUDENTS,
  payload: activeStudents,
})

export const setForInterviewStudents = (forInterviewStudents: ForInterviewStudentToListResponseInterface[]) => ({
  type: StudentsAction.SET_FOR_INTERVIEW_STUDENTS,
  payload: forInterviewStudents,
})