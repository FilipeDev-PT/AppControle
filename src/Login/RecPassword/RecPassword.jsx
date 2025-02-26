import "./RecPassword.css"
import { MdOutlineEmail } from "react-icons/md";
import { useState } from "react";
import { GetVerifyCode, PostSendEmail, PostUserByEmail, PutUser } from "../../Requests/MethodRequest";
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
  const errorEmail = useRef(null);
  const errorCod = useRef(null);
  const errorPass = useRef(null);

  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')
  const [value4, setValue4] = useState('')
  const [value5, setValue5] = useState('')
  const [value6, setValue6] = useState('')

  const [idUser, setIdUser] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setEmail(value)
  }

  const handleRecSenha = async () => {
    const erro = errorEmail.current
    erro.style.display = 'none'
    const resposta = await PostUserByEmail({permissionScreen: "PostUserByEmail"}, {data: email})
    setIdUser(resposta)
    if(resposta != 404){
      const response = await PostSendEmail({permissionScreen: "PostSendEmail"}, {data: email})
      if(response){
        setSendEmail(false)
        setVerifyCod(true)
      }
    }else{
      erro.style.display = 'flex'
    }
  }

  const retornar = () => {
    navigate('/Login')
  }

  const Tab1 = (e) =>{
    const value = e.target.value
    if(value.length == 6){
      setValue1(value.slice(0,1))
      setValue2(value.slice(1,2))
      setValue3(value.slice(2,3))
      setValue4(value.slice(3,4))
      setValue5(value.slice(4,5))
      setValue6(value.slice(5,6))
      input6Ref.current.focus();
    }else{
      if(value.length <= 1 && value.length >= 0){
        setValue1(value)
      }
      if(value != ""){
        input2Ref.current.focus();
      }
    }
  }
  const Tab2 = (e) =>{
    const value = e.target.value
    if(value.length <= 1 && value.length >= 0){
      setValue2(value)
    }
    if(value != ""){
      input3Ref.current.focus();
    }
  }
  const Tab3 = (e) =>{
    const value = e.target.value
    if(value.length <= 1 && value.length >= 0){
      setValue3(value)
    }

    if(value != ""){
      input4Ref.current.focus();
    }
  }
  const Tab4 = (e) =>{
    const value = e.target.value
    if(value.length <= 1 && value.length >= 0){
      setValue4(value)
    }
    if(value != ""){
      input5Ref.current.focus();
    }
  }
  const Tab5 = (e) =>{
    const value = e.target.value
    if(value.length <= 1 && value.length >= 0){
      setValue5(value)
    }
    if(value != ""){
      input6Ref.current.focus();
    }
  }
  const Tab6 = (e) =>{
    const value = e.target.value
    if(value.length <= 1 && value.length >= 0){
      setValue6(value)
    }
    if(value != ""){
      input6Ref.current.focus();
    }
  }

  const OnSubmit = async () => {
    const erro = errorCod.current
    erro.style.display = 'none'
    const cod = value1 + value2 + value3 + value4 + value5 + value6
    const data = {
      "CodeFromClient": cod,
      "RecipientEmail": email
    }
    const resposte = await GetVerifyCode({permissionScreen: "GetVerifyCode"}, {data: data})
    if(resposte != 500){
      setVerifyCod(false)
      setNewSenha(true)
    }else{
      erro.style.display = 'flex'
    }
  }

  const [visNewPass, setVisuNewPas] = useState(true)
  const [visNewPassConf, setVisuNewPasConf] = useState(true)

  const togglePasswordVisibility = () => {
    setVisuNewPas(prevState => !prevState);
  }

  const togglePasswordVisibilityConfi = ()=> {
    setVisuNewPasConf(prevState => !prevState);
  }

  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfir, setNewPasswordConfir] = useState('')

  const onChangeNewPassword = (e) => {
    const erro = errorPass.current
    const value = e.target.value
    setNewPassword(value)
    if(newPasswordConfir != value){
      erro.style.display = 'flex'
    }else{
      erro.style.display = 'none'
    }
  }

  const onChangeNewPasswordConfirm = (e) => {
    const erro = errorPass.current
    const value = e.target.value
    setNewPasswordConfir(value)
    if(newPassword != value){
      erro.style.display = 'flex'
    }else{
      erro.style.display = 'none'
    }
  }

  const AtualizedPassword = async() => {
    const erro = errorPass.current
    if(newPassword != newPasswordConfir){
      erro.style.display = 'flex'
    }else{
      erro.style.display = 'none'
      const response = await PutUser({permissionScreen: "PutUser"}, {data: newPassword}, {id: idUser})
      if(response){
        navigate('/Login')
      }
    }
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
                  <p className="pInformErro" ref={errorEmail}>E-mail não cadastrado</p>
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
                <p className="pInvalidCod" ref={errorCod}>Código Invalido</p>
                <button type="button" className='buttonLogin' onClick={OnSubmit}>Validar Codigo</button>
              </>
            :""}
            {newSenha? 
              <>
                <div className="contentDivsNewPassword">
                  <div className="NewPasswordNew">
                    <input type={visNewPass ? "text" : "password"} placeholder="Digite a nova Senha" value={newPassword} onChange={onChangeNewPassword}/>
                    {visNewPass ? < FaEye className='eyePasswordNewPas' onClick={togglePasswordVisibility}/> : <FaEyeSlash className='eyePasswordNewPas' onClick={togglePasswordVisibility}/>}
                  </div>
                  <div className="NewPasswordConfirm">
                    <input type={visNewPassConf ? "text" : "password"} placeholder="confirme a Senha" value={newPasswordConfir} onChange={onChangeNewPasswordConfirm}/>
                    {visNewPassConf ? <FaEye className='eyePasswordConfi' onClick={togglePasswordVisibilityConfi}/> : <FaEyeSlash className='eyePasswordConfi' onClick={togglePasswordVisibilityConfi}/>}
                  </div>
                  <p className="pNewPassword" ref={errorPass}>As senhas não são iguais</p>
                </div>
                <button type="button" className='buttonLogin' onClick={AtualizedPassword}>Atualizar Senha</button>
              </>
            :""}
          </form>
        </div>

      
      </div>
    </div>
  )
}