import './DivTop.css'
import { IoChevronForwardOutline } from "react-icons/io5";
import { jwtDecode } from "jwt-decode"
import { GetRelUserWork, GetUserByID, GetWorkByID } from "../../Requests/MethodRequest"
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../Loading/Loading';

export default function DivTop() {
    const [userName, setUserName] = useState('')
    const [userGroup, setUserGroup] = useState('')
    const [valueWork, setValueWork] = useState([])
    const [nameWork, setNameWork] = useState('')
    const [loading, setLoading] = useState(' ')

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('tokenUser')
            const decoded = jwtDecode(token)
            const idUser = decoded.UserId
      
            const response = await GetRelUserWork({permissionScreen: "GetRelUserWork"})
            const resp = response.filter(x => x.userId == idUser)

            setValueWork(resp)

            const user = await GetUserByID({permissionScreen: "GetUserById" }, {id: idUser})
            setUserGroup(user.funcao)
            setUserName(user.name)
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const newDescs = {};
            for (let i = 0; i < valueWork.length; i++) {
                newDescs[valueWork[i].workId] = await getDesc(valueWork[i].workId);
            }
            setNameWork(newDescs);
            setLoading(false)
        };
        fetchData();
        async function getDesc(id){
          const nameWork = await GetWorkByID({permissionScreen: "GetWorkByID" }, {id: id})
          return nameWork.name
        }
      }, [valueWork]);


    function OpenDivSelectWork(){
        const input = document.getElementById('input_selectWork')
        const div = document.getElementById ('SelectWork')
        if(div.style.display === 'flex'){
            div.style.display = 'none'
            div.classList.remove('animationActiveDiv')
            div.classList.add('animationDesactiveDiv')
            input.style.borderRadius = '5px'
        }else{
            div.style.display = 'flex'
            div.classList.add('animationActiveDiv')
            div.classList.remove('animationDesactiveDiv')
            input.style.borderRadius = '5px 5px 0px 0px'
        }
    }
    return(
        <>
        {
        loading? 
            <Loading />
        :
            <div className='DivTop'>
                <div className='work'>
                    <input type="text" placeholder='SELECIONE A OBRA' id='input_selectWork' onClick={OpenDivSelectWork}/>
                    <IoChevronForwardOutline className='icon' id='icon_inputSelectWork' onClick={OpenDivSelectWork}/>
                </div>
                <div className='SelectWork' id='SelectWork'>
                    {valueWork.map((itens, index) => {
                        return(
                            <p key={index} className='p_SeleckWork' onClick={() => {
                                document.getElementById('input_selectWork').placeholder = nameWork[itens.workId]
                                OpenDivSelectWork()
                            }}>{nameWork[itens.workId]}</p>
                        )
                    })}
                </div>
                <div className='users'>
                    <p>{userName} - {userGroup}</p>
                </div>
            </div>
        }
        </>
    )
}