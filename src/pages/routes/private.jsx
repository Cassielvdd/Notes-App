import { useState, useEffect } from "react";
import { auth } from "../../firebasedb";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
export default function Private({ children }) {
  const [load, setLoad] = useState(true);
  const [signed, setSigned] = useState(false);
  useEffect(() => {
    async function check() {
      const log = onAuthStateChanged(auth, (user) => {
        if (user) {
          const useData = {
            uid: user.uid,
            email: user.email,
          };
          localStorage.setItem("@user", JSON.stringify(useData));
          setLoad(false);
          setSigned(true);
        } else {
          setLoad(false);
          setSigned(false);
        }
      });
    }
    check();
  }, []);
  if (load) {
    return <div></div>;
  }
  if (!signed) {
    return <Navigate to="/" />;
  }
  return children;
}
