import { DataTypeEnum } from 'actions/students';
import { apiUrl } from 'config/api';

export const updateStudentsLists = async (
  setActiveStudentsList: any,
  setForInterviewStudentsList: any,
  numberOfPage: string,
  type: DataTypeEnum,
  actualSearchPhrase: string,
) => {

  if (type === DataTypeEnum.all){
    const resAllStudents = await fetch(`${apiUrl}/recruiter/all/${Number(numberOfPage)}`, {
      credentials: 'include',
    })
    const dataAllStudents = await resAllStudents.json();
    setActiveStudentsList(dataAllStudents)
  } else if (type === DataTypeEnum.searched){
    const resAllStudents = await fetch(`${apiUrl}/recruiter/${Number(numberOfPage)}/${actualSearchPhrase}`, {
      credentials: 'include',
    })
    const dataAllStudents = await resAllStudents.json();
    setActiveStudentsList(dataAllStudents)
  }
  const resForInterviewStudents = await fetch(`${apiUrl}/recruiter/for-interview`, {
    credentials: 'include',
  })

  const dataForInterviewStudents = await resForInterviewStudents.json();


  setForInterviewStudentsList(dataForInterviewStudents)


}


