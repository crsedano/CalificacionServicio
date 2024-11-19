/* eslint-disable */
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { configuracion } from './type/configuracion'
import { calificacionType, preguntas, response } from './type/preguntas'
import Preguntas from './components/Preguntas'
import { QRCode } from 'react-qrcode-logo'
import logo from './assets/logo.png'
import Configuracion from './components/Configuracion'
import axios from 'axios'
import Loading from './components/Loading'

function App(): JSX.Element {
  const [conf, setConfiguracion] = useState<configuracion>()
  const [posicion, setPosicion] = useState<number>(0)
  const [final, setFinal] = useState<boolean>(false)
  const [segundos, setSegundos] = useState<number>(0)
  const tiempo: number = 60000
  const [preguntas, setPreguntas] = useState<response<preguntas[]>>({} as response<preguntas[]>)
  const _calificacion = useRef<calificacionType[]>([])
  const [respCalificacion, setRespCalificacion] = useState<response<string>>({} as response<string>)
  const [loading, setLoading] = useState<boolean>(false)
  const [pagina, setPagina] = useState<number>(1)
  // const handleCloseApp = (): void => window.electron.ipcRenderer.send('cerrar-app')


  useEffect(() => {
    const obtenerConfiguracion = async (): Promise<void> => {
      
     // const handleGetConfig = (): void => )
      //const data = await window.CargaConfig.getConfiguracion()   
      const configData = await (window as any).electronAPI.getConfig();      
      setConfiguracion(configData)
    }
    obtenerConfiguracion()
    
  }, [])
  const getPreguntas = async () => {
    setLoading(true)
    await axios.get(import.meta.env.VITE_URL_API + 'Pregunta/GetPreguntas?Id=' + conf?.OficinaId)
      .then((response) => {
        setPreguntas(response.data)
      }).finally(()=>{
        setLoading(false)
      })
  }
  useEffect(()=>{    
    if(conf?.OficinaId != null){
      getPreguntas()
      }
  },[conf])
  //const handleNotificacion = (): void => {
    // window.electron.ipcRenderer.send('show-message-box', {
    //   title: 'Atención',
    //   message: 'Gracias por tu retroalimentación',
    //   icon: 'https://www.flaticon.com/svg/static/icons/svg/3523/3523063.svg'
    // })
    // const notificacion = new Notification('Atención', {
    //   body: 'Gracias por tu retroalimentación',
    //   icon: 'https://www.flaticon.com/svg/static/icons/svg/3523/3523063.svg'
    // })
    // notificacion.onclick = () => {
    //   console.log('click en notificación')
    // }
  //}

  const handleNext = (calificacion:number, id: number): void => {

 _calificacion.current.push({id,calificacion} as calificacionType)
    if (posicion < preguntas.data.length-1 ) {
      setPosicion(posicion + 1)
    } else {
      setLoading(true)
      axios.post(import.meta.env.VITE_URL_API + 'Respuesta/SendReply', _calificacion.current).then((response) => {
        setRespCalificacion(response.data)
      }).catch((error) => {
        setRespCalificacion({success:false,data:'',message:error.message})
      }).finally(()=>{
        setLoading(false)
      })
      setPagina(3)
      setFinal(true)
      _calificacion.current = []

    }
  }
  const variants = {
    hidden: {
      opacity: 0,
      x: 1280
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const variantsP = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,

      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  } 
  const handleInciar = async () => {
    
    
await getPreguntas()    
setPosicion(0)
setPagina(2)

    
    
    //setFinal(false)
  }
  const handleVolverInicio = ()=>{
    setPagina(1)
  }
  const showContent = () => {

    //setFinal(false)
  //  setPagina(2)
  //  setPosicion(0)
  }
  useEffect(() => {
    let temporizador: null | ReturnType<typeof setTimeout> = null
    let intervalo: null | ReturnType<typeof setInterval> = null
    if (final) {
      temporizador = setTimeout(showContent, tiempo)
      intervalo = setInterval(() => {
        setSegundos((prevSegundos) => prevSegundos + 1)
      }, 1000)
    }

    return () => {
      setSegundos(0)
      clearTimeout(temporizador!)
      clearInterval(intervalo!)
    }
  }, [final])
  console.log(pagina)
  return (
    <div className="relative bg-campus bg-cover  h-screen select-none ">
      {loading&&<Loading /> }
      <motion.div
      variants={variantsP}
      animate={pagina == 1 ? 'visible' : 'hidden'}
      className={`${pagina == 1 ? 'visible' : 'hidden'} absolute  flex flex-col h-full  backdrop-brightness-50 justify-center items-center w-full`}
      >
        <div className="font-bold text-6xl uppercase text-center  drop-shadow-md  text-black bg-white p-9 rounded-lg">

        
        <h1>
          Califica nuestra atención
        </h1>
        <button onClick={() => handleInciar()} className="bg-lime-300 p-2 px-6 rounded-xl hover:bg-lime-500 hover:scale-105 transition-all ease-in-out duration-300 text-xl mt-10">
          Inicio
        </button>
        </div>
      </motion.div>
      <motion.div
        variants={variantsP}
        animate={pagina == 2  ? 'visible' : 'hidden'}
        className={`${pagina == 2  ? 'visible' : 'hidden'} absolute  flex flex-col h-full  backdrop-brightness-50 justify-center items-center w-full`}
      >
        {/* <h1 className="font-bold text-6xl uppercase text-center  drop-shadow-md  text-black bg-white py-4 px-9">
          Calificación de atención al cliente {conf?.nombre || ''}
        </h1> */}
         {conf?.OficinaId == "0" ? <Configuracion/>
        :
        <div className="flex overflow-hidden justify-center w-full">

          {preguntas.success ? preguntas?.data?.length > 0 ?
            preguntas?.data?.map((pregunta, index) => (
              <motion.div
                key={index}
                className={`${posicion == index ? 'visible' : 'hidden'} w-[90%]`}
                variants={variants}
                animate={posicion == index ? 'visible' : 'hidden'}
              >
                <Preguntas pregunta={pregunta} handleNext={handleNext} className={``} />
              </motion.div>
            )): <div className="bg-white rounded-md p-8 flex flex-col justify-center items-center gap-6">
              <p className="text-center text-black">
                No se asignaron preguntas para la oficina, intente mas tarde.
                </p>
           </div> : <div className="bg-white rounded-md p-8 flex flex-col justify-center items-center gap-6">
              <p className="text-center text-black">
                Ocurrio un error al cargar las preguntas, por favor intente mas tarde.
                </p></div>}
        </div>} 
      </motion.div>
   
      <motion.div
        variants={variantsP}
        animate={pagina == 3 ? 'visible' : 'hidden'}
        className={`${pagina == 3 ? 'visible' : 'hidden'} absolute  flex flex-col h-full  backdrop-brightness-50 justify-center items-center gap-6 w-full`}
      >
          {
           respCalificacion.success 
          ? 
        <div className="bg-white p-11 flex flex-col justify-center items-center gap-6 text-2xl">
          <p className="text-center text-black">
            Gracias por completar la encuesta, esto nos ayura a mejorar nuestro servicio, <br/> si desea añadir un comentario, escanea el siguiente código <span className='font-bold'>QR</span>
          </p>
          <div>
          <QRCode
          ecLevel={"L"}
          size={200} //200 
          fgColor='#000'
          logoImage={logo}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={`https://satisfaccion.upla.edu.pe/Encuesta/${respCalificacion.data}`}
          qrStyle={"dots"}
          logoPaddingStyle={'square'}
          logoWidth={130}//130
          logoHeight={130}//150
          logoOpacity={0.3}
        

          // viewBox={`0 0 256 256`}
          />
          </div>
          <button onClick={() => handleVolverInicio()} className="bg-lime-300 p-2 rounded-md hover:bg-lime-500 hover:scale-105 transition-all ease-in-out duration-300">
            Calificar Nuevamente ({ tiempo / 1000 - segundos})
          </button>
          </div>: <div className="bg-white p-8 flex flex-col justify-center items-center gap-6">
          <p className="text-center text-black">
            Ocurrio un error al enviar la calificación, por favor intente nuevamente
          </p>
          <button onClick={() => handleVolverInicio()} className="bg-lime-300 p-2 rounded-md hover:bg-lime-500 hover:scale-105 transition-all ease-in-out duration-300">
            Calificar Nuevamente ({ tiempo / 1000 - segundos})
          </button>
            </div>}
      </motion.div>
      
      <p className="absolute bottom-5 text-white translate-x-1/2 right-[50%] text-xl italic font-[Inter-Thin]">
        Oficina de Informática y Sistemas
      </p>
    </div>
   
  )
}

export default App
