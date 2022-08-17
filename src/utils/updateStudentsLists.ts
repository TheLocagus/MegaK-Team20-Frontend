import {DataTypeEnum} from "actions/students";

export const updateStudentsLists = async (
  setActiveStudentsList: any,
  setForInterviewStudentsList: any,
  numberOfPage: string,
  type: DataTypeEnum,
  actualSearchPhrase: string,
) => {

  if (type === DataTypeEnum.all){
    const resAllStudents = await fetch(`http://localhost:3001/api/recruiter/all/${Number(numberOfPage)}`, {
      credentials: 'include',
    })
    const dataAllStudents = await resAllStudents.json();
    setActiveStudentsList(dataAllStudents)
  } else if (type === DataTypeEnum.searched){
    const resAllStudents = await fetch(`http://localhost:3001/api/recruiter/${Number(numberOfPage)}/${actualSearchPhrase}`, {
      credentials: 'include',
    })
    const dataAllStudents = await resAllStudents.json();
    setActiveStudentsList(dataAllStudents)
  }
  const resForInterviewStudents = await fetch(`http://localhost:3001/api/recruiter/for-interview`, {
    credentials: 'include',
  })

  const dataForInterviewStudents = await resForInterviewStudents.json();


  setForInterviewStudentsList(dataForInterviewStudents)


}


