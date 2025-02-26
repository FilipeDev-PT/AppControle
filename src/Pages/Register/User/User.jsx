import Layout from '../../../Components/Layout/Layout'
import HeaderContent from '../Components/HeaderContent/HeaderContent'
import './User.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { GetUser } from '../../../Requests/MethodRequest';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import '../Components/Table/Table.css'
import { useNavigate } from 'react-router-dom';
import Delete from '../Components/ScreenDelet/Delete';
import { useRef } from 'react';
import Loading from '../../../Components/Loading/Loading'

export default function User(){
  const [users, setUsers] = useState([]);
  const Navigate = useNavigate();
  const permission = "GetAllUser"
  const [searchQuery, setSearchQuery] = useState([]);
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
      const fetchUsers = async () => {
        const userData = await GetUser({ permissionScreen: permission });
        if (userData === 403) {
          Navigate('/Inauthorization');
        }
        if(userData != 404){
          setLoading(false)
        }
        setUsers(userData);
        setSearchQuery(userData)
      };
      fetchUsers();
  }, []);

  const handleSearchChange = (query) => {
    const filtro = users.filter(x => x.name.toLowerCase().includes(query.toLowerCase()))
    setSearchQuery(filtro);
  };

  const filhoRef = useRef();

    return(
      <>
      { loading ?
        <Loading />
      :
        <Layout> 
          <p className='DescriptionDisplay'>Cadastro de Usuario</p>
          <HeaderContent link='User' permissionScreen={permission} onSearchChange={handleSearchChange}/>
          <div className="ItenListHeader">
            <div className="indice">#</div>
            <div className="name">Nome</div>
            <div className="email">E-mail</div>
            <div className="usergroup">Função</div>
            <div className="icons"></div>
          </div>
          <div className='ContentUser'>
          { 
            searchQuery.map((user, indice) => {
              return(
                <>
                  <div key={user.id} className="ItenList">
                    <div className="indice">{indice + 1}</div>
                    <div className="name">{user.name}</div>
                    <div className="email">{user.email}</div>
                    <div className="usergroup">{user.funcao}</div>
                    <div className="icons">
                      <MdEdit className="icon" onClick={()=> Navigate(`/EditUser/${user.id}`)}/>
                      <MdDelete className="icon" onClick={() => filhoRef.current.setIds(user.id)}/>
                      <Delete ref={filhoRef} type='User'/>
                    </div>
                  </div>
                </>
              )
            })
          }
          </div>
        </Layout>
      }
      </>

    )
}