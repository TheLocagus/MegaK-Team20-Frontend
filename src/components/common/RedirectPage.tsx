import {useEffect} from "react";

export const RedirectPage = () => {
  useEffect(() => {
    // (async() => {
    //   await fetch('http://localhost:3001/recruiter/redirect')
    // })()
    window.location.href = 'http://localhost:3000/recruiter/1'
  }, [])

  return (
    <div></div>
  )
}