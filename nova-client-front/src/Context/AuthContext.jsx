import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";
// Creamos el contexto
export const AuthContext = createContext();

// Usar esto para importar todos los datos de AuthContext.Provider
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({children}) => {
    const [errors, setErrors] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);
    
    // Función que envía los datos ingresados por el usuario al back del registro
    const signup = async (user) => {
    // Establecer el valor del campo "role" como 2
    const dataWithRole = { ...user, role: 2 };
    // Convertir el campo "phone" a número
    dataWithRole.phone = parseInt(dataWithRole.phone, 10);

    console.log(dataWithRole);

    try {
      // Hace la llamada post (registerRequest)
      const res = await registerRequest(dataWithRole);
      //console.log(typeof res.data.role);
      setUser(res.data)
      setIsAuthenticated(true)   
    } catch (error) {
      setErrors(error.response.data);
    }    
    }

    // Función que envía los datos ingresados por el usuario al back del login
    const signin = async (user) => {
        try {
            // Envía los datos del usuario al back (loginRequest)
            const res = await loginRequest(user)
            console.log('res',res);

            if (res.data.role == 1){
                setIsAdmin(true);
                setIsAuthenticated(true);
                setUser(res.data)
                // Ejemplo de configuración de cookie en el cliente
                Cookies.set("token", res.data.token);
                console.log("es Administrador")
            } else {
                setIsAuthenticated(true);
                setUser(res.data);
                Cookies.set("token", res.data.token);
                console.log("es Usuarios");
            }     
        } catch (error) {
            setErrors(error.response.data);
        }
    }

    // Limpiar los errores
    useEffect(() => {
        if (errors.length > 0){

        }
    }, [errors])

    
      useEffect(() => {
        const checkLogin = async () => {
          const cookies = Cookies.get();
          console.log('Esta es la cookie',cookies.token)
          if (!cookies.token) {
            setIsAuthenticated(false);
            console.log(setIsAuthenticated)
            setLoading(false);
            return;
          }
    
          try {
            const res = await verifyTokenRequest(cookies.token);
            console.log(res.data);
            if (!res.data) return setIsAuthenticated(false);
            
            setIsAuthenticated(true);
            setUser(res.data);
            console.log(setUser);
            setLoading(false);
          } catch (error) {
            setIsAuthenticated(false);
            setLoading(false);
          }
        };
        checkLogin();
      }, []);
    

    return(
        <AuthContext.Provider value={{
            signup,
            signin,
            user,
            isAuthenticated,
            isAdmin,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}