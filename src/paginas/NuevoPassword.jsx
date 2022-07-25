import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../componets/Alerta"
import clienteAxios from "../config/axios"

const NuevoPassword = () => {
  const [password,setPassword] =useState('')
  const [repetirPassword,setRepetirPassword] =useState('')
  const [tokenValido,setTokenValido]= useState(false)
  const [passwordModificado,setPasswordModificado]= useState(false)

  const [alerta,setAlerta]= useState({})

  const params = useParams();
  const {token} = params
  useEffect(() => {
    const comprobarToken = async () =>{

      try {
         await clienteAxios(`/veterinarios/olvide-password/${token}`)
         setAlerta({
          msg:'Coloca tu Nuevo Password'
         })
         setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el enlace',
          error:true
      })
    }
  }
    comprobarToken()
  }, [])
  

  const handleSubmit = async (e)=>{ 
    e.preventDefault();

    if ([password,repetirPassword].includes('')) {
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

    try {
      
      const url= (`/veterinarios/olvide-password/${token}`)
      const {data}= await clienteAxios.post(url, {password})
      console.log(data); 
      setAlerta({
        msg:data.msg
        
      })
      setPasswordModificado(true)
      setTokenValido(false)
    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error: true
      })
      return
    }

  }

  const {msg} = alerta
  return (
    <>
     <div className="">
              <h1 className='text-indigo-600 font-black text-6xl'>
                Restablece tu password y no pierdas Acceso a tus  {""}<span className='text-black'>tus pacientes</span>
              </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <Alerta
                alerta= {alerta}
              />}

              {tokenValido && (
                <>
                
                  <form
            
                  onSubmit={handleSubmit}>
                  <div className='my-5'>
                        <label 
                        className='uppercase text-gray-600 block text-xl font-bold'>
                         Nuevo  Password
                        </label>
                        <input 
                          type="password"
                          placeholder='Tu nuevo password'
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
      
                      <input 
                        type='submit'
                        value="Reestablecer Password"
                        className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'
                        />
                      </div>
                      
                  </form>
                  </>
              )}
            
            {passwordModificado && <Link
                        className="block text-center my-5 text-gray-500 font-bold"
                        to='/'> Inicia Sesión</Link>}

      </div>
    
    </>
  )
}

export default NuevoPassword