import { COLOR_PIEZA,EventosPartida } from "../constants";
import { CasillaInterface } from "../interfaces/casilla";
export interface EstadoPartidaInterface {
    turno?:number,
    siguienteJugador?:COLOR_PIEZA,
    hayPiezaPresionada?:boolean,
    casillaPresionada:CasillaInterface
}
export interface EventoPiezaPulsadaInterface{
    type:EventosPartida.CASILLA_PRESIONADA
    hayPiezaPresionada:boolean
    casillaPresionada:CasillaInterface
}
export interface EventoMovimientoValidadoInterface{
    type:EventosPartida.MOVIMIENTO_VALIDADO
    hayPiezaPresionada:boolean
}
export interface EventoAlmacenaCasilla{
    type:EventosPartida.ALMACENA_PIEZA
    casillaPresionada:CasillaInterface
}

export type EventoPartida=EventoPiezaPulsadaInterface|EventoMovimientoValidadoInterface|EventoAlmacenaCasilla