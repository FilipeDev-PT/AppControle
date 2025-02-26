import './ButtonsSide.css'
import '../../animation.css'
import RetunlistPermission from './MenuItens'
import { IoChevronForwardOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { PiCashRegisterLight } from "react-icons/pi";
import { FaRegBuilding } from "react-icons/fa";
import { TbNews } from "react-icons/tb";
import { useEffect, useState } from 'react';
import React from 'react';

export default function ButtonsSide(){
    const [list, getList] = useState([])

    useEffect(() => {
        const getListPermission = async () => {
            const resposta = await RetunlistPermission()
            getList(resposta)
        }
        getListPermission()
    }, []);

    return(
        <>
            {list.map((iten, index) => {
                return(
                    <div className='divSide' key={index}>
                        <div className='ContentTitle select' onClick={() => {
                            const icon = document.getElementById(`icons${iten.title}${index}`)
                            const div = document.getElementById(`subDiv${iten.title}${index}`)
                            if(div.style.display === 'flex'){
                                icon.classList.add('animationDesactiveIcon')
                                icon.classList.remove('animationActiveIcon')
                                div.classList.add('animationDesactiveDiv')
                                div.classList.remove('animationActiveDiv')
                                div.style.display = 'none'
                            }else{
                                icon.classList.add('animationActiveIcon')
                                icon.classList.remove('animationDesactiveIcon')
                                div.classList.add('animationActiveDiv')
                                div.classList.remove('animationDesactiveDiv')
                                div.style.display = 'flex'
                            }}}>
                            <div className='ButtonIcon'>
                                {iten.title === `Novidades` ? <TbNews className='iconDescriptions'/> : ""}
                                {iten.title === `Pagina Inicial` ? <IoHomeOutline className='iconDescriptions'/> : ""}
                                {iten.title === `Cadastro` ? <PiCashRegisterLight className='iconDescriptions'/> : ""}
                                {iten.title === `Controle de Obras` ? <FaRegBuilding className='iconDescriptions'/> : ""}
                                {iten.link != "" ? <button className="butSide" onClick={()=>{window.location.href = iten.link}}>{iten.title}</button> : <button className="butSide">{iten.title}</button>}
                            </div>
                            {iten.itens != "" ? <IoChevronForwardOutline className='i_Side' id={`icons${iten.title}${index}`}/> : ""}
                        </div>
                            {iten.itens != "" ?
                                <div className='list' id={`subDiv${iten.title}${index}`} >
                                    {iten.itens.map((subitens, index) => {
                                        return(
                                            <React.Fragment key={subitens.id}>
                                                {subitens.link != "" ? 
                                                    <div className='ContentTitle select'>
                                                        <button className="butSide" onClick={()=>{window.location.href = subitens.link}}>{subitens.title}</button>
                                                    </div>
                                                : 
                                                    <div key={index} className='ContentTitle teste'>
                                                        <div className='ContentTitle select' onClick={() => {
                                                            const icon = document.getElementById(`iconsSub${subitens.title}${index}`)
                                                            const div = document.getElementById(`subDivSub${subitens.title}${index}`)
                                                            if(div.style.display === 'flex'){
                                                                icon.classList.add('animationDesactiveIcon')
                                                                icon.classList.remove('animationActiveIcon')
                                                                div.classList.add('animationDesactiveDiv')
                                                                div.classList.remove('animationActiveDiv')
                                                                div.style.display = 'none'
                                                            }else{
                                                                icon.classList.add('animationActiveIcon')
                                                                icon.classList.remove('animationDesactiveIcon')
                                                                div.classList.add('animationActiveDiv')
                                                                div.classList.remove('animationDesactiveDiv')
                                                                div.style.display = 'flex'
                                                            }}}>
                                                            <button  className="butSide">{subitens.title}</button>
                                                            {subitens.itens != "" ? <IoChevronForwardOutline className='i_Side' id={`iconsSub${subitens.title}${index}`}/> : ""}
                                                        </div>
                                                            {subitens.itens != "" ?
                                                                <div className='list' id={`subDivSub${subitens.title}${index}`}>
                                                                    {subitens.itens.map((subSubitens) => {
                                                                        return(
                                                                            <React.Fragment key={subSubitens.id}>
                                                                                {subSubitens.link != "" ? 
                                                                                    <ul className='ContentTitle select'>
                                                                                        <li className="butSide" onClick={()=>{window.location.href = subSubitens.link}}>{subSubitens.title}</li>
                                                                                    </ul>
                                                                                : ""}
                                                                            </React.Fragment>
                                                                        )
                                                                    })}
                                                                </div>
                                                            : "" }
                                                    </div>
                                                }
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                            : "" }
                    </div>
                )
            })}
        </>
    )
}
