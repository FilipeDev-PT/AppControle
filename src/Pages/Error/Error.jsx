import './Error.css'
import { useNavigate } from 'react-router-dom'

export default function Error(){
  const Navigate = useNavigate()

  return(
    <div className='Error'>
        <button onClick={() => Navigate('/Home')}>RETORNAR AO SITE</button>
    </div>
  )
}