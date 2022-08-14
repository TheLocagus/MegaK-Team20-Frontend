import './Generating.scss'

interface Props {
  message: string;
}


const Generating:React.FC<Props> = ({ message }) => {

  
  return (
    <div className='generating-info'>
      <h3>{message}</h3>
    </div>
  )
}

export default Generating;