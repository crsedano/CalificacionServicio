/* eslint-disable */
import React from 'react'
import { NivelCinco, NivelCuatro, NivelDos, NivelTres, NivelUno } from '../components/Icons'
import { preguntas } from '@renderer/type/preguntas'
interface PreguntasProps {
    handleNext: (calificacion: number, id: number) => void
    className?: string
    pregunta:preguntas
}
const Preguntas:React.FC<PreguntasProps> = ({className,handleNext,pregunta}): JSX.Element => {

  return (
    <div className={`${className} flex flex-col justify-center items-center gap-4 font-[Inter-Light] mt-6`}>
     <p className='italic font-extrabold text-5xl text-black bg-white/85 rounded-2xl font-[Inter-Bold] text-center p-4 px-5 backdrop-brightness-90 w-full'>{pregunta.pregunta}</p>
        <div className='flex flex-row bg-white/85  rounded-2xl  text-white w-full justify-around px-2 py-6 font-[Inter-Regular]  mt-5'>
          <button 
          className='hover:scale-105 transition-all duration-300 ease-in-out flex flex-col justify-center items-center gap-3' 
          onClick={()=>handleNext(0,pregunta.id)} >
              <NivelUno 
              className='bg-red-700 rounded-full text-black/70' 
              width="120px" 
              height="120px" />
              <span className='bg-lime-300 p-2 rounded-md hover:bg-lime-500 hover:scale-105 transition-all ease-in-out duration-300 text-black text-sm font-semibold'>Muy Insatisfecho</span></button>
          <button 
          className='hover:scale-105 transition-all duration-300 ease-in-out flex flex-col justify-center items-center gap-3' 
          onClick={()=>handleNext(1,pregunta.id)}>
              <NivelDos 
              className='bg-orange-600 rounded-full text-black/70' 
              width="120px" 
              height="120px" />
              <span className='bg-lime-300 p-2 rounded-md hover:bg-lime-500 hover:scale-105 transition-all ease-in-out duration-300 text-black text-sm font-semibold'>Insatisfecho</span></button>
          <button 
          className='hover:scale-105 transition-all duration-300 ease-in-out flex flex-col justify-center items-center gap-3' 
          onClick={()=>handleNext(2,pregunta.id)}>
              <NivelTres 
              className='bg-yellow-500 rounded-full text-black/70' 
              width="120px" 
              height="120px" /><span className='bg-lime-300 p-2 rounded-md hover:bg-lime-500 hover:scale-105 transition-all ease-in-out duration-300 text-black text-sm font-semibold'>Neutral</span></button>
          <button 
          className='hover:scale-105 transition-all duration-300 ease-in-out flex flex-col justify-center items-center gap-3' 
          onClick={()=>handleNext(3,pregunta.id)}>
              <NivelCuatro className='bg-green-500 rounded-full text-black/70' 
            width="120px" 
            height="120px" /><span className='bg-lime-300 p-2 rounded-md hover:bg-lime-500 hover:scale-105 transition-all ease-in-out duration-300 text-black text-sm font-semibold'>Satisfecho</span></button>
          <button 
          className='hover:scale-105 transition-all duration-300 ease-in-out flex flex-col justify-center items-center gap-3' 
          onClick={()=>handleNext(4,pregunta.id)}>
              <NivelCinco className='bg-green-800 rounded-full text-black/70' 
            width="120px" 
            height="120px" /><span className='bg-lime-300 p-2 rounded-md hover:bg-lime-500 hover:scale-105 transition-all ease-in-out duration-300 text-black text-sm font-semibold'>Muy Satisfecho</span></button>          
        </div>
        {/* <button onClick={handleCloseApp}>cerrar</button> */}
        </div>
  )
}

export default Preguntas