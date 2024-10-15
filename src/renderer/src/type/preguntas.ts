export type preguntas = {
  id: number
  posicion: number
  pregunta: string
  calificacion: number
}

export type calificacionType = {
  id: number
  calificacion: number
}
export type response<T> = {
  success: boolean
  data: T
  message: string
}
