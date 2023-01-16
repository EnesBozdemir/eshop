import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'; // npm paketini indirip sitesinden buraya yapıştırdım.
import 'react-toastify/dist/ReactToastify.css'; // giriş yaptın, şifre yanlış gibi bilgiler vercek.
// Pages
import { Home, Contact, Login, Register, Reset, Admin } from "./pages/index";
// Components
import { Header, Footer} from "./components/index";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";

function App() {

  return (
    <>
      <BrowserRouter>
        <ToastContainer/>
        <Header/>
          <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="/contact" element={ <Contact />} />
            <Route path="/login" element={ <Login />} />
            <Route path="register" element={ <Register />} />
            <Route path="reset" element={ <Reset />} />
            <Route path="admin/*" element={ <AdminOnlyRoute> <Admin /> </AdminOnlyRoute>} />
          </Routes>
        <Footer/>
      </BrowserRouter>      
    </>
  );
}

export default App;
