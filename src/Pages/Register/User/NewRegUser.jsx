import Layout from '../../../Components/Layout/Layout'
import { GetPermission, GetWork } from '../../../Requests/MethodRequest'
import FooterContent from '../Components/FooterContent/FooterContent'
import './NewRegUser.css'
import { useEffect, useState } from 'react'

export default function NewRegUser(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [bairro, setBairro] = useState('')
    const [numero, setNumero] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [cep, setCep] = useState('')
    const [funcao, setFuncao] = useState('')
    const [work , setWork] = useState([])
    const [permission, setPermission] = useState([])

    useEffect(() => {
        const getWork = async () => {
            const response = await GetWork({permissioncreen: "GetWork"})
            const resp = await GetPermission({permissionScreen: "GetPermission"})
            setWork(response)
            setPermission(resp)
        }
        getWork()
    })

    const handleChangeName = (e) => {
        setName(e.target.value);
    };
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleChangeLogradouro = (e) => {
        setLogradouro(e.target.value);
    };
    const handleChangeBairro = (e) => {
        setBairro(e.target.value);
    };
    const handleChangeNumero = (e) => {
        setNumero(e.target.value);
    };
    const handleChangeCidade = (e) => {
        setCidade(e.target.value);
    };
    const handleChangeEstado = (e) => {
        setEstado(e.target.value);
    };
    const handleChangeCep = (e) => {
        setCep(e.target.value);
    };
    const handleChangeFuncao = (e) => {
        setFuncao(e.target.value);
    };

    function submitedRegUser(){
        const data = {
            name: name,
            email: email,
            password: password,
            logradouro: logradouro,
            bairro: bairro,
            numero: numero,
            cidade: cidade,
            estado: estado,
            cep: parseInt(cep),
            funcao: funcao,
        }

        return data
    }

    const [errorEmail, setErrorEmail] = useState(false)

    function alterastate(){
        setErrorEmail(true)
    }

    return(
        <Layout>
            <p className='DescriptionDisplay'>Cadastrar Novo Usuario</p>
            <div style={{ display: 'flex', padding: '5px 0px', justifyContent: 'center', gap: '.5%' }}>
            <div className='divCod divs'>
                    <label htmlFor="inputCod">Código</label>
                    <div id='inputCod' >Gerado automaticamente</div>
                </div>
                <div className='divDesc divs'>
                    <label htmlFor="inputDesc">Nome</label>
                    <input type="text" id='inputDesc' onChange={handleChangeName}/>
                </div>
            </div>
            <div style={{ display: 'flex', padding: '5px 0px', justifyContent: 'center', gap: '.5%' }}>
                <div className='divEmail divs'>
                    <label htmlFor="inputEmail">E-mail</label>
                    <input type="text" id='inputEmail' onChange={handleChangeEmail}/>
                    {errorEmail ? <p className='PErrorEmail'>Email já cadastrado</p> : ""}
                </div>
                <div className='divPass divs'>
                    <label htmlFor="inputPass">Senha</label>
                    <input type="password" id='inputPass' onChange={handleChangePassword}/>
                </div>
            </div>
            <div style={{ display: 'flex', padding: '5px 0px', justifyContent: 'center', gap: '.5%' }}>
            <div className='divPla divs'>
                    <label htmlFor="inputPla">Logradouro</label>
                    <input type="text" id='inputPla' onChange={handleChangeLogradouro}/>
                </div>
                <div className='divNei divs'>
                    <label htmlFor="inputNei">Bairro</label>
                    <input type="text" id='inputNei' onChange={handleChangeBairro}/>
                </div>
                <div className='divNum divs'>
                    <label htmlFor="inputNum">Número</label>
                    <input type='text' id='inputNum' onChange={handleChangeNumero}/>
                </div>
            </div>
            <div style={{ display: 'flex', padding: '5px 0px', justifyContent: 'center', gap: '.5%' }}>
                <div className='divCit divs'>
                    <label htmlFor="inputCit">Cidade</label>
                    <input type="text" id='inputCit' onChange={handleChangeCidade}/>
                </div>
                <div className='divEst divs'>
                    <label htmlFor="inputEst">Estado</label>
                    <input type="text" id='inputEst' onChange={handleChangeEstado}/>
                </div>
                <div className='divCEP divs'>
                    <label htmlFor="inputCEP">CEP</label>
                    <input type="text" id='inputCEP' onChange={handleChangeCep}/>
                </div>
            </div>
            <div style={{ display: 'flex', padding: '5px 0px', justifyContent: 'start', gap: '2%' }}>
                <div className='divFun divs'>
                    <label htmlFor="inputFun">Função</label>
                    <input type="text" id='inputFun' onChange={handleChangeFuncao}/>
                </div>
            </div>
            <div className='PermissionsDivs'>
            <div className='PermissionUserPermission'>
                    <h4>SELECIONE AS PERMISSOES DO USUARIOS</h4>
                    {
                        permission.map((item, index) => {
                            return(
                                <>
                                    <div key={index}>
                                        <input type="checkbox" id={`id${item.name}`}/>
                                        <label htmlFor={`id${item.name}`}>{item.descriptionPermission}</label>
                                    </div>
                                </> 
                            )
                        })
                    }
                </div>
                <div className='PermissionUserWork'>
                    <h4>SELECIONE AS OBRAS DO USUARIO</h4>
                    {
                        work.map((item, index) => {
                            return(
                                <>
                                    <div key={index}>
                                        <input type="checkbox" id={`id${item.name}`}/>
                                        <label htmlFor={`id${item.name}`}>{item.name}</label>
                                    </div>
                                </> 
                            )
                        })
                    }
                </div>
            </div>
            <FooterContent link='User' onSubmit={submitedRegUser} errors={alterastate}/>
        </Layout>
    )
}