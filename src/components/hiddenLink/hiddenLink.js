import { useSelector } from 'react-redux'   // Bu componenti eğer oturum açılmamışsa menude sadece login yazılmalı
import { selectIsLoggedIn } from '../../redux/slice/authSlice'// Oturum açılmışsa sadece logout gözükmeli logine gerek yok                                                     // Bu kontroller için gerekli component
const ShowOnLogin = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn); //stateti react store dan çektim

    if(isLoggedIn){ // isLoggedIn doğru ise chilren geri döndürcek yani oturum açıldıysa
        return children; // Navlink i sarmallıyacak
    }
    return null;
};

export const ShowOnLogout = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if(!isLoggedIn){
        return children;
    }
    return null;
};

export default ShowOnLogin;