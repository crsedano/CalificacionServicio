
import { IconoLoading } from './Icons'

const Loading = () => {
  return <div className='absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex'>
    <div className='m-auto flex flex-col items-center'>
    <IconoLoading className=' text-6xl text-blue-600'/>
    <p className='text-blue-800 text-2xl'>Cargando...</p>
    </div>

  </div>
}

export default Loading
