/* eslint-disable */
import axios from 'axios';
import  { useRef } from 'react'
import Swal from 'sweetalert2';


const Configuracion = () => {
   const valor = useRef<HTMLInputElement>(null);
  const handleSave = () => {
    const newData = JSON.stringify({name:"Configuracion Generals","OficinaId": parseInt(valor?.current?.value||"0")}); // Replace this with your actual data

    axios.get(import.meta.env.VITE_URL_API+'Oficina/getOficina?id='+parseInt(valor?.current?.value||"0")).then((response)=>{

        if(parseInt(valor?.current?.value||"0")==0){

            Swal.fire({
                
                title: 'Lista de oficinas',
            
                html: `<div class="max-h-[400px] overflow-y-auto"><ul>${response.data.data.map((v, i) => `<li class="text-sm text-left" key="${i}"><strong>CÓDIGO:</strong> ${v.id} <strong>OFICINA:</strong> ${v.oficina} ${v.facultad} ${v.sede}</li>`).join('')}</ul></div>`,
                allowEscapeKey:false,
                allowOutsideClick:false,
                confirmButtonText:"Aceptar",
                showCancelButton:true,
            })

        }else {
            Swal.fire({                
                icon: 'question',
                title: `Esta seguro de seleccionar la oficina ${response.data.data[0].oficina} ${response.data.data[0].facultad} ${response.data.data[0].sede}`,
                allowEscapeKey:false,
                allowOutsideClick:false,
                confirmButtonText:"Aceptar",
                showCancelButton:true,
            }).then((result) => {
                    if(result.isConfirmed){
                        window.electron.ipcRenderer.send('modificarConfiguracion', newData);   
                        window.electron.ipcRenderer.on('file-modification-success', () => {
                            window.location.reload();
                           
                        });
                        window.electron.ipcRenderer.on('file-modification-error', (event, errorMessage) => {
                            console.log(event)
                           Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: errorMessage,
                                allowEscapeKey:false,
                                allowOutsideClick:false,
                                confirmButtonText:"Aceptar",
                                showCancelButton:true,
                            })
                        });
                    }
            })
        }

        
        })
    
      
    

  }
  /*{
    "name":"Configuracion Generals",
    "OficinaId":"0"    
}*/

  return (
    <div className="text-white flex flex-col items-center justify-center gap-4 ">
      <h1 className="text-xl">Configuración de Oficina</h1>
      <input ref={valor} type="number" className="p-3 min-w-[400px] text-center text-black " placeholder="Ingrese el codigo de la oficina" />
      <button onClick={()=> handleSave()} 
            className="bg-green-700 px-6 py-3 rounded-md">Guardar</button>
    </div>
  )
}

export default Configuracion
