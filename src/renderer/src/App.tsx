import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { configuracion } from './type/configuracion'
import { preguntas } from './type/preguntas'
import Preguntas from './components/Preguntas'
import {QRCode} from 'react-qrcode-logo'
import logo from './assets/logo.png'
function App(): JSX.Element {
  const [conf, setConfiguracion] = useState<configuracion>()
  const [posicion, setPosicion] = useState<number>(0)
  const [final, setFinal] = useState<boolean>(false)
  const [segundos, setSegundos] = useState<number>(0)
  const tiempo: number = 5000
  const [preguntas, setPreguntas] = useState<preguntas[]>([
    {
      id: '1',
      posicion: 1,
      pregunta: '¿Qué tan satisfecho te encuentras con nuestro servicio?',
      calificacion: 0
    },
    {
      id: '2',
      posicion: 2,
      pregunta: '¿Qué tan satisfecho te encuentras con la universidad',
      calificacion: 0
    },
    {
      id: '3',
      posicion: 3,
      pregunta: '¿Qué tan satisfecho te encuentras con la atención?',
      calificacion: 0
    }
  ])
 // const handleCloseApp = (): void => window.electron.ipcRenderer.send('cerrar-app')
  useEffect(() => {
    setPreguntas(preguntas)
    const obtenerConfiguracion = async (): Promise<void> => {
      /* eslint-disable */
      const data = await window.CargaConfig.getConfiguracion()
      setConfiguracion(data)
    }
    obtenerConfiguracion()
    console.log(conf)
  }, [])
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
  const handleNext = (): void => {
    if (posicion < preguntas.length - 1) {
      setPosicion(posicion + 1)
    } else {
      setFinal(true)
      //handleNotificacion()
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
  const handleInciar = (): void => {
    setPosicion(0)
    setFinal(false)
  }
  const showContent = () => {

    setFinal(false)
    setPosicion(0)
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
  console.log(segundos)
  /* eslint-disable */
  return (
    <div className="relative bg-campus bg-cover  h-screen select-none ">
      <motion.div
        variants={variantsP}
        animate={!final ? 'visible' : 'hidden'}
        className={`${!final ? 'visible' : 'hidden'} absolute  flex flex-col h-full  backdrop-brightness-50 justify-center items-center w-full`}
      >
        {/* <h1 className="font-bold text-6xl uppercase text-center  drop-shadow-md  text-black bg-white py-4 px-9">
          Calificación de atención al cliente {conf?.nombre || ''}
        </h1> */}
        <div className="flex overflow-hidden justify-center w-full">
          {preguntas.length > 0 &&
            preguntas.map((pregunta, index) => (
              <motion.div
                key={index}
                className={`${posicion == index ? 'visible' : 'hidden'} w-[90%]`}
                variants={variants}
                animate={posicion == index ? 'visible' : 'hidden'}
              >
                <Preguntas pregunta={pregunta} handleNext={handleNext} className={``} />
              </motion.div>
            ))}
        </div>
        {/* <button className='bg-lime-300' onClick={()=>setPosicion(0)}>volverrrr</button> */}
      </motion.div>
      <motion.div
        variants={variantsP}
        animate={final ? 'visible' : 'hidden'}
        className={`${final ? 'visible' : 'hidden'} absolute  flex flex-col h-full  backdrop-brightness-50 justify-center items-center gap-6 w-full`}
      >
        <div className="bg-white p-8 flex flex-col justify-center items-center gap-6">
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
          value={'https://elecciones.upla.edu.pe'}
          qrStyle={"dots"}
          logoPaddingStyle={'square'}
          logoWidth={130}//130
          logoHeight={130}//150
          logoOpacity={0.3}
        

          // viewBox={`0 0 256 256`}
          />
          </div>
          <button onClick={() => handleInciar()} className="bg-lime-300 p-2 rounded-md hover:bg-lime-500 hover:scale-105 transition-all ease-in-out duration-300">
            Calificar Nuevamente ({ tiempo / 1000 - segundos})
          </button>
          </div>
      </motion.div>
      <p className="absolute bottom-5 text-white translate-x-1/2 right-[50%] text-xl italic font-[Inter-Thin]">
        Oficina de Informática y Sistemas
      </p>
    </div>
   
  )
}

export default App
