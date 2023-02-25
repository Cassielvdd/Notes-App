import "./home.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebasedb";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
export default function Home() {
  //UseStates and UseEffects
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  //Function and Events
  async function handleReg(e) {
    e.preventDefault();
    if (email !== "" && senha !== "") {
      await signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
          //navigate to admin
          navigate("/admin", { replace: true });
          toast.success("Bem vindo");
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            toast.error("User não cadastrado");
          }
          if (error.code === "auth/wrong-password") {
            toast.error("Senha incorreta");
          }
        });
    } else {
      toast.error("Preencha os campos");
    }
  }

  return (
    <div className="login-container">
      <h1>KrazinNotes</h1>
      <span>Gerencie sua agenda com o Krazio</span>
      <form onSubmit={handleReg} className="form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Link to={"/recovery"} className="forgot-pass">
          Esqueceu a senha?
        </Link>
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Não possui uma conta? Cadastre-se</Link>
    </div>
  );
}
