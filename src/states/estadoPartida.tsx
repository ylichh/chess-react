import { COLOR_PIEZA,EventosPartida } from "../constants";
import { CasillaInterface } from "../interfaces/casilla";
export interface EstadoPartidaInterface {
    turno?:number,
    siguienteJugador?:COLOR_PIEZA,
    hayPiezaPresionada?:boolean,
    casillaPresionada:CasillaInterface
}
export interface EventoPiezaPulsadaInterface{
    type:EventosPartida.PIEZA_SOLTADA
    hayPiezaPresionada:boolean
    casillaPresionada:CasillaInterface
}
export interface EventoMovimientoValidadoInterface{
    type:EventosPartida.MOVIMIENTO_VALIDADO
    hayPiezaPresionada:boolean
}

export interface EventoPiezaTocada{
    type:EventosPartida.PIEZA_TOCADA
    casillaPresionada:CasillaInterface
    hayPiezaPresionada:boolean
}

export type EventoPartida = 
    | EventoPiezaPulsadaInterface
    | EventoMovimientoValidadoInterface
    | EventoPiezaTocada;