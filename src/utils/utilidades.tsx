import { CasillaType } from "./initial_state"
export function obtenDireccionSentido(casillaOrigen:CasillaType,casillaDestino:CasillaType){

    let filaDestino=casillaDestino.fila??0
    let filaOrigen=casillaOrigen.fila??0
    let sentidoFila=0
    sentidoFila=obtenSigno(filaDestino-filaOrigen)
    let columnaDestino=casillaDestino.columna??0
    let columnaOrigen=casillaOrigen.columna??0
    let sentidoColumna=0
    sentidoColumna=obtenSigno(columnaDestino-columnaOrigen)
    return {sentidoFila:sentidoFila,sentidoColumna:sentidoColumna}
}

export function obtenSigno(numero: number): number {
    if (numero > 0) return 1;
    if (numero < 0) return -1;
    return 0;
}

export function casillaOcupada(casillaDestino:CasillaType){
    return casillaDestino.pieza !== ''
}

export function esComestible(casillaOrigen:CasillaType,casillaDestino:CasillaType){
    return casillaOrigen.colorPieza !== casillaDestino.colorPieza
}
