import "./RecPassword.css"
import { MdOutlineEmail } from "react-icons/md";
import { useState } from "react";
import { GetVerifyCode, PostSendEmail } from "../../Requests/MethodRequest";
import { useNavigate } from "react-router-dom";
import { MdKeyboardReturn } from "react-icons/md";
import { useRef } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

export default function RecPassword() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate();

  const [sendEmail, setSendEmail] = useState(true)
  const [verifyCod, setVerifyCod] = useState(false)
  const [newSenha, setNewSenha] = useState(false)

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);
  const input6Ref = useRef(null);

  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')
  const [value4, setValue4] = useState('')
  const [value5, setValue5] = useState('')
  const [value6, setValue6] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setEmail(value)
  }

  const handleRecSenha = async () => {
    const response = await PostSendEmail({permissionScreen: "PostSendEmail"}, {data: email})
    if(response){
      setSendEmail(false)
      setVerifyCod(true)
    }
  }

  const retornar = () => {
    navigate('/Login')
  }

  const Tab1 = (e) =>{
    const value = e.target.value
    setValue1(value)
    input2Ref.current.focus();
  }
  const Tab2 = (e) =>{
    const value = e.target.value
    setValue2(value)
    input3Ref.current.focus();
  }
  const Tab3 = (e) =>{
    const value = e.target.value
    setValue3(value)
    input4Ref.current.focus();
  }
  const Tab4 = (e) =>{
    const value = e.target.value
    setValue4(value)
    input5Ref.current.focus();
  }
  const Tab5 = (e) =>{
    const value = e.target.value
    setValue5(value)
    input6Ref.current.focus();
  }
  const Tab6 = (e) =>{
    const value = e.target.value
    setValue6(value)
    input6Ref.current.focus();
  }

  const OnSubmit = async () => {
    const cod = value1 + value2 + value3 + value4 + value5 + value6
    console.log(cod)
    const resposte = await GetVerifyCode({permissionScreen: "GetVerifyCode"}, {data: cod}, {email: email})
    console.log(resposte)
    if(resposte){
      console.log('22')
      setVerifyCod(false)
      setNewSenha(true)
    }
  }

  const [visNewPass, setVisuNewPas] = useState(false)
  const [visNewPassConf, setVisuNewPasConf] = useState(false)

  const togglePasswordVisibility = () => {
    setVisuNewPas(prevState => !prevState);
  }

  const togglePasswordVisibilityConfi = ()=> {
    setVisuNewPasConf(prevState => !prevState);
  }

  return(
    <div className='BackgroundLogin'>
      <div className='ContentLogin'>
        <div className='Login'>
          <button className="ReturnLogin" onClick={retornar}><MdKeyboardReturn className="buttonReturnLogin"/>Login</button>
          <form >
            <h1>RECUPERAR SENHA</h1>
            {sendEmail ?
              <>
                  <p>Insira o e-mail cadastrado para recuperar sua senha: </p>
                <div>
                  <MdOutlineEmail className='iconslogin'/>
                  <input type="text" id='email'  placeholder='E-mail' value={email} onChange={handleChange}/>
                </div>
                <button type="button" className='buttonLogin' onClick={handleRecSenha}>Enviar E-mail</button>
              </>
            :""}
            {verifyCod? 
              <>
                <p>Insira o código que você recebeu no seu e-mail: </p>
                <div className="divNumberCod">
                  <input type="number" onChange={Tab1} value={value1} ref={input1Ref}/>
                  <input type="number" onChange={Tab2} value={value2} ref={input2Ref}/>
                  <input type="number" onChange={Tab3} value={value3} ref={input3Ref}/>
                  <input type="number" onChange={Tab4} value={value4} ref={input4Ref}/>
                  <input type="number" onChange={Tab5} value={value5} ref={input5Ref}/>
                  <input type="number" onChange={Tab6} value={value6} ref={input6Ref}/>
                </div>
                <button type="button" className='buttonLogin' onClick={OnSubmit}>Validar Codigo</button>
              </>
            :""}
            {newSenha? 
              <>
                <div className="contentDivsNewPassword">
                  <div className="NewPasswordNew">
                    <input type={visNewPass ? "text" : "password"} placeholder="Digite a nova Senha"/>
                    {visNewPass ? <FaEyeSlash className='eyePasswordNewPas' onClick={togglePasswordVisibility}/> : <FaEye className='eyePasswordNewPas' onClick={togglePasswordVisibility}/>}
                  </div>
                  <div className="NewPasswordConfirm">
                    <input type={visNewPassConf ? "text" : "password"} placeholder="confirme a Senha"/>
                    {visNewPassConf ? <FaEyeSlash className='eyePasswordConfi' onClick={togglePasswordVisibilityConfi}/> : <FaEye className='eyePasswordConfi' onClick={togglePasswordVisibilityConfi}/>}
                  </div>
                </div>
                <button type="button" className='buttonLogin' onClick={OnSubmit}>Atualizar Senha</button>
              </>
            :""}
          </form>
        </div>

      
      </div>
    </div>
  )
}