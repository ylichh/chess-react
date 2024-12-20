
import { Casilla, CasillaInterface } from "../interfaces/casilla";
import { PIEZAS, PIEZAS_DE_RANGO,PIEZAS_DE_DIRECCION, PIEZAS_CAMINO_LIBRE } from "../constants"
import { caminoLibre,} from "./validadores_movimiento"
import { movimientoEnRango } from "./validadores_rango";
import { direccionPosible } from "./validador_direccion";
import { esComestible,casillaOcupada } from "./utilidades";
import { TableroInterface } from "../interfaces/Tablero";
export function movimientoValido(casillaOrigen:CasillaInterface,posicionTablero:TableroInterface,casillaDestino:CasillaInterface){
    //terminar de dat bola
    //movimiento en rango para peones o caballos
    // if (!casillaOrigen.pieza) {
    //     return false;
    // }
    //todo: casillatype meter constantes
    //
    let pieza=casillaOrigen.getPieza() as PIEZAS
    ////
    let cumpleCondiciones=false 
    if (PIEZAS_DE_RANGO.includes(pieza)){
        cumpleCondiciones = movimientoEnRango(casillaOrigen, casillaDestino,posicionTablero);
    }
    if (PIEZAS_DE_DIRECCION.includes(pieza)) {
        cumpleCondiciones =  direccionPosible(casillaOrigen, casillaDestino);
    }   
    if (PIEZAS_CAMINO_LIBRE.includes(pieza)) {
        cumpleCondiciones = cumpleCondiciones && caminoLibre(casillaOrigen, casillaDestino,posicionTablero);
    }
    if (casillaOcupada(casillaDestino)){
        console.log('es comestible',esComestible(casillaOrigen, casillaDestino))
        cumpleCondiciones = cumpleCondiciones && esComestible(casillaOrigen, casillaDestino);
    }
    
    return cumpleCondiciones
    }