import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./pages/routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <RoutesApp />
      </BrowserRouter>
      <ToastContainer theme="dark" autoClose={3000} />
    </>
  );
}
