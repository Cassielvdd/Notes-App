import "./register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebasedb";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function Register() {
  //UseStates and UseEffects
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  //   const [name, setName] = useState("");
  const navigate = useNavigate();

  //Function and Events
  async function handleReg(e) {
    e.preventDefault();
    if (email !== "" && senha !== "") {
      await createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
          toast.success("Bem vindo");
          navigate("/admin", { replace: true });
        })
        .catch((error) => {
          toast.warn("Erro" + error);
        });
    } else {
      toast.error("Preencha os campos");
    }
  }

  return (
    <div className="login-container">
      <h1>KrazinNotes</h1>
      <span>Crie uma Conta</span>
      <form onSubmit={handleReg} className="form">
        {/* <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> */}
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Crie sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Cadastrar-se</button>
      </form>
      <Link to="/">Já possui uma conta? Logar</Link>
    </div>
  );
}
