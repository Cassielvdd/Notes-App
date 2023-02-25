import "./admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faEdit,
  faRemove,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebasedb";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { async } from "@firebase/util";

export default function Admin() {
  const [task, setTask] = useState("");
  const [userDetail, setDetail] = useState({});
  const [tarefas, setTarefas] = useState([]);
  const [edit, setEdit] = useState([]);

  useEffect(() => {
    async function loadTar() {
      const userInfo = localStorage.getItem("@user");
      setDetail(JSON.parse(userInfo));
      if (userInfo) {
        const data = JSON.parse(userInfo);
        const tarefaRef = collection(db, "tarefas");
        const q = query(
          tarefaRef,
          orderBy("created", "desc"),
          where("userUid", "==", data?.uid)
        );
        const unsub = onSnapshot(q, (snapshot) => {
          let list = [];
          snapshot.forEach((doc) => {
            list.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid,
            });
          });
          setTarefas(list);
        });
      }
    }
    loadTar();
  }, []);
  async function handlereg(e) {
    e.preventDefault();
    if (task === "") {
      toast.warn("Digite uma nova tarefa");
    }
    if (edit?.id) {
      handleUpdatetask();
      return;
    }
    await addDoc(collection(db, "tarefas"), {
      tarefa: task,
      created: new Date(),
      userUid: userDetail?.uid,
    })
      .then(() => {
        toast.success("Nova tarefa adicionada");
        setTask("");
      })
      .catch((error) => {
        toast.error("Erro ao criar tarefa " + error);
      });
  }
  async function logout() {
    await signOut(auth);
  }
  async function deleteTask(id) {
    const docRef = doc(db, "tarefas", id);
    await deleteDoc(docRef);
  }
  async function editTak(item) {
    setTask(item.tarefa);
    setEdit(item);
  }
  async function handleUpdatetask() {
    const docRef = doc(db, "tarefas", edit?.id);
    await updateDoc(docRef, {
      tarefa: task,
    })
      .then(() => {
        toast.success("Tarefa Atualizada");
        setTask("");
        setEdit({});
      })
      .catch((error) => {
        toast.error("Erro ao atualizar" + error);
        setTask("");
        setEdit({});
      });
  }
  return (
    <div className="admin-container">
      <header>
        <h1>KrazinNotes</h1>
        <button onClick={logout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </header>
      <div className="admin-content">
        <form onSubmit={handlereg} className="admin-form">
          <h1>Minhas Tarefas</h1>
          <div className="inputs">
            <input
              type="text"
              placeholder="Digite sua tarefa..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            {Object.keys(edit).length > 0 ? (
              <button type="submit">
                <FontAwesomeIcon icon={faEdit} />
              </button>
            ) : (
              <button type="submit">
                <FontAwesomeIcon icon={faAdd} />
              </button>
            )}
          </div>
        </form>
        {tarefas.map((item) => {
          return (
            <div className="task" key={item.id}>
              <article>
                <p>{item.tarefa}</p>
              </article>
              <div className="btn">
                <button className="btn-add" onClick={() => editTak(item)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="btn-remove"
                  onClick={() => deleteTask(item.id)}
                >
                  <FontAwesomeIcon icon={faRemove} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
