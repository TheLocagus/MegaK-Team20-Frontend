import { useEffect } from 'react';

const RedirectPage = () => {
  
  useEffect(() => {
    window.location.href = 'http://localhost:3000/'
  }, [])

  return (
    <div></div>
  )
}

export default RedirectPage;