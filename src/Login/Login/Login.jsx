import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useRef } from "react";
import { useEffect } from "react";
import Loading from "../../Components/Loading/Loading";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visPassword, setVisPassword] = useState(true);
  const [load, setLoad] = useState(false);

  const navigate = useNavigate();

  const errorLogin = useRef(null);

  const recSenha = () => {
    navigate("/recPassword");
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoad(true);
    const error = errorLogin.current;
    error.style.display = "none";

    const response = await fetch(
      "https://localhost:7066/api/verifyLogin/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("tokenUser", data.token);
      navigate("/Home");
    } else {
      error.style.display = "flex";
    }
  };

  const togglePasswordVisibility = () => {
    setVisPassword((prevState) => !prevState);
  };

  return (
    <>
      {load ? (
        <Loading />
      ) : (
        <div className="BackgroundLogin">
          <div className="ContentLogin">
            <div className="Login">
              <form onSubmit={handleLogin}>
                <h1>FAÇA LOGIN</h1>
                <div>
                  <FiUser className="iconslogin" />
                  <input
                    type="text"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                  />
                </div>
                <div>
                  <RiLockPasswordLine className="iconslogin" />
                  <input
                    type={visPassword ? "password" : "true"}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                  />
                  {visPassword ? (
                    <FaEyeSlash
                      className="eyePassword"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaEye
                      className="eyePassword"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
                <p className="errorLogin" ref={errorLogin}>
                  Usuário ou seha inválido
                </p>
                <button className="buttonLogin" type="submit">
                  Login
                </button>
                <button className="recPassword" onClick={recSenha}>
                  Esqueceu a senha?
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
