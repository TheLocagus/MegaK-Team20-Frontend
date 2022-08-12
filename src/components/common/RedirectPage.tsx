import {useEffect} from "react";

export const RedirectPage = () => {
  useEffect(() => {
    window.location.href = 'http://localhost:3000/recruiter/1'
  }, [])

  return (
    <div></div>
  )
}