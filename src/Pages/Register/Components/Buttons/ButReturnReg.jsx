/* eslint-disable react/prop-types */
import './ButReturnReg.css'
import { IoReturnDownBack } from "react-icons/io5";

export default function ButReturnReg(props){
    return(
        <button className='ButReturnReg' onClick={() => {
            window.location.href = `/${props.link}`
        }}><IoReturnDownBack className='iconButReturnReg'/>Return</button>
    )
}