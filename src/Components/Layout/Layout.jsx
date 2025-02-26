/* eslint-disable react/prop-types */
import DivSide from "../SideBar/DivSide"
import DivTop from "../TopBar/DivTop"
import './Layout.css'
import { useEffect } from "react"
import { useState } from "react"
import { Statuslogin } from "../../Requests/MethodRequest"
import { useNavigate } from "react-router-dom"

export default function Layout({ children }){
    const [status, setStatus] = useState([])
    const Navigate = useNavigate()

    useEffect(() => {
        const getStatus = async () => {
          const dados = await Statuslogin();
          setStatus(dados.isLoggedIn);
        };
    
        getStatus();
      }, []);
    
      useEffect(() => {
        if (status !== null && status === false) {
          Navigate("/");
        }
      }, [status, Navigate]);

    return(
      <div className="Container">
          <DivSide />
          <div className="ContainerContent">
              <DivTop />
              <div className="DivChildren">
                  <div className="ContentGeneral">
                      {children}
                  </div>
              </div>
          </div>
      </div>
    )
}