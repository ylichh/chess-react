import {  Casilla } from "../interfaces/casilla";
export function obtenDireccionSentido(casillaOrigen:Casilla,casillaDestino:Casilla){

    let filaDestino=casillaDestino.getFila()
    let filaOrigen=casillaOrigen.getFila()
    let sentidoFila=0
    sentidoFila=obtenSigno(filaDestino-filaOrigen)
    let columnaDestino=casillaDestino.getColumna()
    let columnaOrigen=casillaOrigen.getColumna()
    let sentidoColumna=0
    sentidoColumna=obtenSigno(columnaDestino-columnaOrigen)
    return {sentidoFila:sentidoFila,sentidoColumna:sentidoColumna}
}

export function obtenSigno(numero: number): number {
    if (numero > 0) return 1;
    if (numero < 0) return -1;
    return 0;
}

export function casillaOcupada(casillaDestino:Casilla){
    return casillaDestino.getPieza() !== ''
}

export function esComestible(casillaOrigen:Casilla,casillaDestino:Casilla){
    return casillaOrigen.getColorPieza() !== casillaDestino.getColorPieza()
}
