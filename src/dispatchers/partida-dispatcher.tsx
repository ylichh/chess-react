import { EstadoPartidaInterface, EventoPartida } from "../states/estadoPartida"
import { EventosPartida } from "../constants"
export function partidaReducer(estadoAnterior:EstadoPartidaInterface,evento:EventoPartida):EstadoPartidaInterface{
    //eter aqui los eventos a medida que sucedan
    switch(evento.type){
        case EventosPartida.CASILLA_PRESIONADA:
            return {
                ...estadoAnterior,
                hayPiezaPresionada: evento.hayPiezaPresionada,
                casillaPresionada: evento.casillaPresionada
            }
        case EventosPartida.MOVIMIENTO_VALIDADO:
                return {
                    ...estadoAnterior,
                    hayPiezaPresionada: true
                }
        case EventosPartida.ALMACENA_PIEZA:
            return {
                ...estadoAnterior,
                casillaPresionada: evento.casillaPresionada
            }
    }
}