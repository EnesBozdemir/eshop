import {useState} from "react";
import styles from "./auth.module.scss";
import registerImg from "../../assests/register.png";
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase/config";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("") // Kayıt işlemleri için state tanımlamaları yaptım.
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate() //sayfa yönlendirmesi için tanımlama yaptım.

  const registerUser = (e) =>{ //kayıt array functionu
    e.preventDefault(); // sayfanın yenilenmesini istemiyorum
    if (password !== cPassword) { // şifre yanlışşa uyarı mesajı verecek. Form içine componenti eklendi.
      toast.error("Password do not match")
    }
    setIsLoading(true)

    createUserWithEmailAndPassword(auth, email, password) // firebase in kayıt fonksiyonu
  .then((userCredential) => { 
    const user = userCredential.user;
    console.log(user)
    setIsLoading(false) // durum değişikliği
    toast.success("Registration Succesfull...") // Kayıt başarılı yazısını çıkardım
    navigate("/login") // login sayfasına gönderiyor
  })
  .catch((error) => {
    toast.error(error.message)
    setIsLoading(false); // Loader componentini kapatıyor
  });

  };
  return (
    <>
    {isLoading && <Loader/>}  {/* isLoading true ise daha önce yaptığım Loader cmp  göstercek */}
    <section className={`container ${styles.auth}`}>

      <Card>
      <div className={styles.form}>
        <h2>Register</h2>

        <form onSubmit={registerUser}> {/* formun submiti */}
          <input 
            type="text" 
            placeholder="Email" 
            required 
            value={email} // Statelerimi atadım, değişiklik olduğunda kayıt altına alıcak.
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required
            value={password} 
            onChange={(e)=>setPassword(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            required
            value={cPassword} 
            onChange={(e)=>setCPassword(e.target.value)}
          />

          <button type="submit" className='--btn --btn-primary --btn-block'>Register</button>
          
        </form>


        <span className={styles.register}>
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </span>
      </div>
      </Card>

      <div className={styles.img}>
        <img src={registerImg} alt="Register"  width="400"/>
      </div>
    </section>
    </>
  )
}

export default Register