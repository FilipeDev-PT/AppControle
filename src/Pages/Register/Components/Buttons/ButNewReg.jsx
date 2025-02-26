/* eslint-disable react/prop-types */
import './ButNewReg.css'
import { IoIosAdd } from "react-icons/io";

export default function ButNewReg(props){
    return(
        <button className='ButNewReg' onClick={()=> {
            window.location.href = `/newreg${props.link}`
        }}><IoIosAdd className='iconButNewReg'/>Novo</button>
    )
}