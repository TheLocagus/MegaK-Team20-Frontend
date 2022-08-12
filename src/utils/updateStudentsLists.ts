import {setActiveStudents, setForInterviewStudents } from "actions/students";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import {
  AvailableStudentToListResponseInterface,
  ForInterviewStudentToListResponseInterface
} from "../components/CandidatesListPage/CandidatesListPage";

export const updateStudentsLists = async (
  dispatch:  Dispatch<AnyAction>
) => {

  const resAllStudents = await fetch('http://localhost:3001/recruiter/students')
  const resForInterviewStudents = await fetch('http://localhost:3001/recruiter/for-interview')

  const dataAllStudents = await resAllStudents.json();
  const dataForInterviewStudents = await resForInterviewStudents.json();

  dispatch(setActiveStudents(dataAllStudents))
  dispatch(setForInterviewStudents(dataForInterviewStudents))
  // activeState(dataAllStudents);
  // interviewState(dataForInterviewStudents);
}


