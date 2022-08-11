import {
  AvailableStudentToListResponseInterface,
  ForInterviewStudentToListResponseInterface
} from "../components/CandidatesListPage/CandidatesListPage";

export const updateStudentsLists = async (
  activeState: React.Dispatch<React.SetStateAction<AvailableStudentToListResponseInterface[]>>,
  interviewState: React.Dispatch<React.SetStateAction<ForInterviewStudentToListResponseInterface[]>>
) => {
  const resAllStudents = await fetch('http://localhost:3001/recruiter/students')
  const resForInterviewStudents = await fetch('http://localhost:3001/recruiter/for-interview')

  const dataAllStudents = await resAllStudents.json();
  const dataForInterviewStudents = await resForInterviewStudents.json();

  activeState(dataAllStudents);
  interviewState(dataForInterviewStudents);
}