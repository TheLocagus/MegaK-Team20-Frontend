import {setActiveStudents, setForInterviewStudents } from "actions/students";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import {
  AvailableStudentToListResponseInterface,
  ForInterviewStudentToListResponseInterface
} from "../components/CandidatesListPage/CandidatesListPage";

export const updateStudentsLists = async (
  setActiveStudentsList: any,
  setForInterviewStudentsList: any,
  numberOfPage: string,
) => {
  console.log(numberOfPage)
  const resAllStudents = await fetch(`http://localhost:3001/recruiter/${Number(numberOfPage)}`)
  const resForInterviewStudents = await fetch('http://localhost:3001/recruiter/for-interview')

  const dataAllStudents = await resAllStudents.json();
  const dataForInterviewStudents = await resForInterviewStudents.json();
  console.log(dataAllStudents)

  setActiveStudentsList(dataAllStudents)
  setForInterviewStudentsList(dataForInterviewStudents)
  // dispatch(setActiveStudents(dataAllStudents))
  // dispatch(setForInterviewStudents(dataForInterviewStudents))


}


