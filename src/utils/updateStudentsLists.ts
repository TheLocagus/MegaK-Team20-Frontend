import {DataTypeEnum} from "actions/students";

export const updateStudentsLists = async (
  setActiveStudentsList: any,
  setForInterviewStudentsList: any,
  numberOfPage: string,
  type: DataTypeEnum,
  actualSearchPhrase: string,
) => {
  console.log(numberOfPage)

  if (type === DataTypeEnum.all){
    console.log(numberOfPage)
    const resAllStudents = await fetch(`http://localhost:3001/recruiter/${Number(numberOfPage)}`)
    const dataAllStudents = await resAllStudents.json();
    setActiveStudentsList(dataAllStudents)
  } else if (type === DataTypeEnum.searched){
    const resAllStudents = await fetch(`http://localhost:3001/recruiter/${Number(numberOfPage)}/${actualSearchPhrase}`)
    const dataAllStudents = await resAllStudents.json();
    setActiveStudentsList(dataAllStudents)
  }
  const resForInterviewStudents = await fetch('http://localhost:3001/recruiter/for-interview')

  const dataForInterviewStudents = await resForInterviewStudents.json();


  setForInterviewStudentsList(dataForInterviewStudents)
  // dispatch(setActiveStudents(dataAllStudents))
  // dispatch(setForInterviewStudents(dataForInterviewStudents))


}


