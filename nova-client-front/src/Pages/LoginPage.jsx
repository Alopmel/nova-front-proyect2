import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";


function LoginPage() {
    const { signin, isAuthenticated, isAdmin,user, errors: signinErrors } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    
    useEffect(() => {
      if (isAdmin) {
        navigate("/administrador");
      } else if (isAuthenticated) {
        navigate("/perfil");
      }
    }, [isAdmin, isAuthenticated]);
    // useEffect(() => {
    //   if (isAuthenticated && isAdmin) {
    //       navigate("/administrador");
    //     } else {
    //       navigate("/perfil");
    //     }
    //   }
    // , [isAuthenticated, isAdmin]);
    
    // Hace el post de los datos de usuario
    const onSubmit = handleSubmit((data) => {
      signin(data)
    })

    /*
    * Función para el login 
    * Verifica si está autentificado
    * Si lo está y tiene el rol 2 va a la p. de administrador
    * Si no tiene el rol 2 va a la página del perfil
    */

    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10">            
            {signinErrors.map((error, i) => (
              <div key={i} className="bg-red-500 p-2 text-white">
                {error}
              </div>
            ))}
            <h1 className="text-2xl font-bold">Login</h1>
            <form onSubmit={onSubmit}>
              <input type="email" {...register("email", {required: true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 my-2"
                placeholder="Email"/>
              {errors.email && <p className="text-red-500">El email es obligatorio</p>}

              <input type="password" {...register("password", {required: true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 my-2"
                placeholder="Contraseña"/>
              {errors.password && <p className="text-red-500">La contraseña es obligatoria</p>}

              <button type="submit">
                Login
              </button>
            </form>
            <p className="flex gap-x-2 justify-between">
              ¿Aún no tienes cuenta? 
              <Link to="/registro"
                className="text-sky-500">Regístrate</Link>
            </p>
        </div>
      </div>
    )
}

export default LoginPage;
