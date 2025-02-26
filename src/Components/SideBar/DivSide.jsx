import ButtonsSide from './ButtonsSide'
import './DivSide.css'
import logo from '../../img/SICO.svg'
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function DivSide(){
    const Navigation = useNavigate()
    function Logout(){
        localStorage.removeItem('tokenUser')
        Navigation('/Login')
    }

    return(
        <div id='divSide'>
            <img src={logo} alt="" />
            <ButtonsSide/>
            <div className='divLogout' onClick={Logout}>
                <button className='buttonLogout'>Sair</button>
                <IoIosLogOut className='iconLogout'/>
            </div>
        </div>
    )
}
