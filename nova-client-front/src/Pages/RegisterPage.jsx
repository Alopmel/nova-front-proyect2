
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";


function RegisterPage() {
  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors} = useAuth();
  const navigate = useNavigate();
  
  /*
  * Función para el registro
  * Redirecciona si está autenticado al perfil
  */
  useEffect(() => {
    if (isAuthenticated) navigate("/perfil");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit( async (values) => {
    signup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10">
        {registerErrors.map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white">
              {error}
            </div>
          ))}
        <h1 className="text-2xl font-bold">Registro</h1>
        
        <form onSubmit={onSubmit}>
          <input type="text" {...register("username", {required: true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2"
            placeholder="Nombre de Usuario"
            />
          { errors.username && <p className="text-red-500">El usuario es obligatorio</p>}

          <input type="email" {...register("email", {required: true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2"
            placeholder="Email"/>
          { errors.email && <p className="text-red-500">El email es obligatorio</p>}
          <input 
            type="text" {...register("phone", {
            required: "El número de teléfono es requerido",
            pattern: {
              value: /^[0-9]{9}$/, 
              message: "El número de teléfono no es válido"
            }})}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2"
            placeholder="Teléfono"/>
          {errors.phone && (<p className="text-red-500">{errors.phone.message}</p>)}

          <input type="password" {...register("password", {required: true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2"
            placeholder="Contraseña"/>
          { errors.password && <p className="text-red-500">La contraseña es obligatoria</p>}

          <button type="submit">
            Register
          </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          ¿Ya tienes cuenta? 
          <Link to="/login"
            className="text-sky-500">Accede</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage