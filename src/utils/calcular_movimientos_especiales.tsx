import { Casilla, CasillaInterface } from "../interfaces/casilla"
import { PIEZAS } from "../constants"
interface CalcularMovimientosEspecialesArgs{
    piezaTocada:CasillaInterface,
    casillaDestino:CasillaInterface
}
type EstrategiaMovimientoEspecial=(args:CalcularMovimientosEspecialesArgs)=>CasillaInterface[]
export function calcularMovimientosEspeciales(ultimoMovimientos:CalcularMovimientosEspecialesArgs):CasillaInterface[]{
    let estrategia:EstrategiaMovimientoEspecial
    switch (ultimoMovimientos.piezaTocada.getPieza()){
        case PIEZAS.PEON_BLANCO:
        case PIEZAS.PEON_NEGRO:
            estrategia=calcularAlPaso
        break;
        default:
            return []
    }
    return estrategia(ultimoMovimientos)

}
export function calcularAlPaso(ultimoMovimientos:CalcularMovimientosEspecialesArgs):CasillaInterface[]{
    let piezaTocada=ultimoMovimientos.piezaTocada
    let casillaDestino=ultimoMovimientos.casillaDestino
    let casillasAlPaso:CasillaInterface[]=[]
    let direccionFila=0
    let pieza
    if (piezaTocada.getPieza()===PIEZAS.PEON_BLANCO){
        direccionFila=-1
        pieza=PIEZAS.PEON_NEGRO
    }
    if (piezaTocada.getPieza()===PIEZAS.PEON_NEGRO){
        direccionFila=1
        pieza=PIEZAS.PEON_BLANCO
    }
    if (Math.abs(piezaTocada.getFila()-casillaDestino.getFila())===2){
        casillasAlPaso=casillasAlPaso.concat(
            new Casilla(
                {
                    pieza:pieza,
                    fila:casillaDestino.getFila()+direccionFila,
                    columna:piezaTocada.getColumna(),
                }
            )
        )
    }
    return casillasAlPaso
}