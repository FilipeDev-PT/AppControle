/* eslint-disable react/prop-types */
import './HeaderContent.css'
import ButNewReg from '../Buttons/ButNewReg'
import { GetUser } from '../../../../Requests/MethodRequest'
import { useEffect } from 'react'
import { useState } from 'react'

export default function HeaderContent({ link, permissionScreen, onSearchChange}){
    const [user, setUser] = useState([]);
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onSearchChange(newQuery);
      };

    useEffect(() => {
        const getUser = async () => {
            const dados = await GetUser({permissionScreen})
            setUser(dados)
        }
        getUser()
    }, [])

    return(
        <div className='HeaderContent'>
            <div className='InfoHeader'>
                <ButNewReg link={link}/>
            </div>
            <div className='HeaderHeader'>
                <p>Itens Listados ( { user.length } )</p>
                <div className='searchGeneral'>
                    <p>Pesquisar</p>
                    <input type="text" placeholder='Buscar Registros' value={query} onChange={handleChange}/>
                </div>
            </div>
        </div>
    )
}