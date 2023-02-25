import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebasedb";
import { sendPasswordResetEmail, sendSignInLinkToEmail } from "firebase/auth";

export default function Forgot() {
  const [forgot, setForgot] = useState("");

  async function recovery(e) {
    e.preventDefault();
    await sendPasswordResetEmail(auth, forgot)
      .then(() => {
        toast.success("Email de recuperação de senha enviado");
      })
      .catch((error) => {
        toast.error("Erro ao enviar" + error);
      });
  }
  return (
    <div className="login-container">
      <h1>KrazinNotes</h1>
      <span>Email de recuperação de senha</span>
      <form onSubmit={recovery} className="form">
        <input
          type="email"
          placeholder="Email"
          value={forgot}
          onChange={(e) => setForgot(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      <Link to="/">Voltar ao Login</Link>
    </div>
  );
}
