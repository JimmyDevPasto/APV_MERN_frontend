import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../componets/Alerta"
import clienteAxios from "../config/axios"


const Registrar = () => {
  const [nombre,setNombre] =useState('')
  const [email,setEmail] =useState('')
  const [password,setPassword] =useState('')
  const [repetirPassword,setRepetirPassword] =useState('')

  const [alerta,setAlerta]= useState({})

  const handleSubmit = async (e)=>{ 
      e.preventDefault();

      if ([nombre,email,password,repetirPassword].includes('')) {
        setAlerta({msg:'Hay campos vacios', error:true});
        return; 
      }

      if (password !== repetirPassword) {
        setAlerta({msg:'los password son diferentes', error:true});
         return;
      }
      if (password.length <6) {
        setAlerta({msg:'los password muy corto', error:true});         
         return;
      }
      
      setAlerta({})

      // Crear el usuario en la api
      
      try {
        
        await clienteAxios.post(`/veterinarios`,{nombre,password,email})
        setAlerta({
          msg:'Creado correctamente, revisa tu email',
          error:false
        })
        
      } catch (error) {
         setAlerta({
          error: true,
          msg:error.response.data.msg});
      }

  }

    const {msg} = alerta
    return (
      <>
          <div className="">
              <h1 className='text-indigo-600 font-black text-6xl'>
                Crea tu cuenta y administra {""}<span className='text-black'>tus pacientes</span>
              </h1>
          </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
              {msg && <Alerta
                alerta= {alerta}
              />}
              <form 
               onSubmit={handleSubmit}
              >
                <div className='my-5'>
                  <label 
                  className='uppercase text-gray-600 block text-xl font-bold'>
                    Nombre
                  </label>
                  <input 
                    type="text"
                    placeholder='Tu nombre'
                    className='border w-full p-3 mt-3 bg-gray-200 rounded-xl '
                    value={nombre}
                    onChange= {e=> setNombre(e.target.value)}
                  />
                </div>
                <div className='my-5'>
                  <label 
                  className='uppercase text-gray-600 block text-xl font-bold'>
                    Email
                  </label>
                  <input 
                    type="email"
                    placeholder='Tu Email'
                    className='border w-full p-3 mt-3 bg-gray-200 rounded-xl '
                    value={email}
                    onChange= {e=> setEmail(e.target.value)}
                  />
                </div>
                <div className='my-5'>
                  <label 
                  className='uppercase text-gray-600 block text-xl font-bold'>
                    Password
                  </label>
                  <input 
                    type="password"
                    placeholder='Tu password'
                    className='border w-full p-3 mt-3 bg-gray-200 rounded-xl '
                    value={password}
                    onChange= {e=> setPassword(e.target.value)}
                  />
                </div>
                <div className='my-5'>
                  <label 
                  className='uppercase text-gray-600 block text-xl font-bold'>
                     Repetir Password
                  </label>
                  <input 
                    type="password"
                    placeholder='Repite tu password'
                    className='border w-full p-3 mt-3 bg-gray-200 rounded-xl '
                    value={repetirPassword}
                    onChange= {e=> setRepetirPassword(e.target.value)}
                  />
                </div>
                <input 
                  type='submit'
                  value="Crear cuenta"
                  className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'
                  />
              </form>
                <nav className="mt-10 lg:flex lg:justify-between">
                <Link
                className="block text-center my-5 text-gray-500 font-bold"
                to='/'>¿ya tienes una cuenta? Inicia Sesión</Link>
                <Link 
                className="block text-center my-5 text-gray-500 font-bold"
                to='/olvide-password'>Olvide mi Password</Link>

                </nav>
            </div>
      </>
    )
  }
  
  export default Registrar