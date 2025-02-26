import Layout from '../../../Components/Layout/Layout'
import FooterContent from '../Components/FooterContent/FooterContent'
import { useParams } from 'react-router-dom';
import './EditUser.css'
import { GetUserByID } from '../../../Requests/MethodRequest';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../../../Components/Loading/Loading'

export default function EditUser(){
    const { id } = useParams();
    const [idUser, setIdUser] = useState('');
    const [nameUser, setNameUser] = useState('');
    const [logradouroUser, setLogradouroUser] = useState('');
    const [neiUser, setNeiUser] = useState('');
    const [numberUser, setNumberUser] = useState('');
    const [citUser, setCitUser] = useState('');
    const [estateUser, setEstateUser] = useState('');
    const [cepUser, setCepUser] = useState('');
    const [functionUser, setFunctionUser]= useState('');
    const [carregando, setCarregando] = useState(true);

    const permission = "GetUserById"

    useEffect(() => {
        const getUser = async () => {
            const dados = await GetUserByID({ permissionScreen: permission }, { id: id });
            if(dados != 404){
                setCarregando(false)
              }
            setIdUser(dados.id)
            setNameUser(dados.name)
            setLogradouroUser(dados.logradouro)
            setNeiUser(dados.bairro)
            setNumberUser(dados.numero)
            setCitUser(dados.cidade)
            setEstateUser(dados.estado)
            setCepUser(dados.cep)
            setFunctionUser(dados.funcao)
        };

        if (id) {
            getUser();
        }
    }, [id]);

    const handleChangeNameUser = (e) => {
        setNameUser(e.target.value);
    };
    const handleChangeLogradouroUser = (e) => {
        setLogradouroUser(e.target.value);
    };
    const handleChangeNeiUser = (e) => {
        setNeiUser(e.target.value);
    };
    const handleChangeNumberUser = (e) => {
        setNumberUser(e.target.value);
    };
    const handleChangeCitUser = (e) => {
        setCitUser(e.target.value);
    };
    const handleChangeEstateUser = (e) => {
        setEstateUser(e.target.value);
    };
    const handleChangeCepUser = (e) => {
        setCepUser(e.target.value);
    };
    const handleChangeFunctionUser = (e) => {
        setFunctionUser(e.target.value);
    };

    function submitedEditUser(){
        const data = {
            name: nameUser,
            logradouro: logradouroUser,
            bairro: neiUser,
            numero: numberUser,
            cidade: citUser,
            estado: estateUser,
            cep: parseInt(cepUser),
            funcao: functionUser,
        }

        return data
    }

    return(
        <>
            { carregando ?
                <Loading />
            :
                <Layout>
                    <form action="submit">
                        <p className='DescriptionDisplay'>Editar Usuario</p>
                        <div style={{ display: 'flex', padding: '5px 0px', justifyContent: 'center', gap: '.5%' }}>
                            <div className='divCod divs'>
                                <label htmlFor="inputCod">Código</label>
                                <div id='inputCod'>{idUser}</div>
                            </div>
                            <div className='divDesc divs'>
                                <label htmlFor="inputDesc">Nome</label>
                                <input type="text" id='inputDesc' value={nameUser} onChange={handleChangeNameUser} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', padding: '5px 0px', justifyContent: 'center', gap: '.5%' }}>
                        <div className='divPla divs'>
                                <label htmlFor="inputPla">Logradouro</label>
                                <input type="text" id='inputPla'value={logradouroUser} onChange={handleChangeLogradouroUser}/>
                            </div>
                            <div className='divNei divs'>
                                <label htmlFor="inputNei">Bairro</label>
                                <input type="text" id='inputNei'value={neiUser} onChange={handleChangeNeiUser}/>
                            </div>
                            <div className='divNum divs'>
                                <label htmlFor="inputNum">Número</label>
                                <input type='text' id='inputNum'value={numberUser} onChange={handleChangeNumberUser}/>
                            </div>
                        </div>
                        <div style={{ display: 'flex', padding: '5px 0px', justifyContent: 'center', gap: '.5%' }}>
                            <div className='divCit divs'>
                                <label htmlFor="inputCit">Cidade</label>
                                <input type="text" id='inputCit'value={citUser} onChange={handleChangeCitUser}/>
                            </div>
                            <div className='divEst divs'>
                                <label htmlFor="inputEst">Estado</label>
                                <input type="text" id='inputEst'value={estateUser} onChange={handleChangeEstateUser}/>
                            </div>
                            <div className='divCEP divs'>
                                <label htmlFor="inputCEP">CEP</label>
                                <input type="text" id='inputCEP'value={cepUser} onChange={handleChangeCepUser}/>
                            </div>
                        </div>
                        <div style={{ display: 'flex', padding: '5px 0px', justifyContent: 'start', gap: '2%' }}>
                            <div className='divFun divs'>
                                <label htmlFor="inputFun">Função</label>
                                <input type="text" id='inputFun'value={functionUser} onChange={handleChangeFunctionUser}/>
                            </div>
                        </div>
                    </form>
                    <FooterContent link='User' onSubmit={submitedEditUser}/>
                </Layout>   
            }  
        </>
    )
}