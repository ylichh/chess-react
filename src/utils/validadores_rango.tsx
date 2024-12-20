import { Casilla,CasillaInterface } from "../interfaces/casilla";
import { PIEZAS } from "../constants";
import { obtenDireccionSentido,casillaOcupada } from "./utilidades";
import { TableroInterface } from "../interfaces/Tablero";
type RangoPosibleStrategy = (casillaOrigen: CasillaInterface,casillaDestino?:CasillaInterface,posicionTablero?: TableroInterface) => CasillaInterface[];


export function movimientoEnRango(casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface,posicionTablero:TableroInterface): boolean {
    let direccionSentido = obtenDireccionSentido(casillaOrigen, casillaDestino);
    console.log(`direccion sentido de la pieza ${direccionSentido}`);

    let estrategia: RangoPosibleStrategy;

    switch (casillaOrigen.getPieza()) {
        case PIEZAS.PEON_BLANCO:
        case PIEZAS.PEON_NEGRO:
            estrategia = rangoPosiblePeon;
            break;
        case PIEZAS.CABALLO_BLANCO:
        case PIEZAS.CABALLO_NEGRO:
            estrategia = rangoPosibleCaballo;
            break;
        case PIEZAS.REY_BLANCO:
        case PIEZAS.REY_NEGRO:
            estrategia = rangoPosibleRey;
            break;
        default:
            return false;
    }
    let rango=estrategia(casillaOrigen,casillaDestino,posicionTablero);
    return rango.some(rango => rango.getFila() === casillaDestino.getFila() && rango.getColumna() === casillaDestino.getColumna())

}

const rangoPosiblePeon:RangoPosibleStrategy=(casillaOrigen:CasillaInterface,_: any,posicionTablero?:TableroInterface)=>{
    
    if (!posicionTablero) {
        throw new Error("posicionTablero is required");
    }

    let rangoPosible:CasillaInterface[]=[]


    rangoPosible=rangoPosible.concat(_rangoMovimiento(casillaOrigen,posicionTablero))
    rangoPosible=rangoPosible.concat(_rangoCaptura(casillaOrigen,posicionTablero))


    return rangoPosible
}

const _rangoMovimiento=(casillaOrigen:CasillaInterface,posicionTablero:TableroInterface)=>{
    let filaOrigen=casillaOrigen.getFila()
    let columnaOrigen=casillaOrigen.getColumna()
    let rangoPosibleAux:Casilla[]=[]
    let rangoPosibleMovimiento:Casilla[]=[]
    let casillaAux:any
    const direccion = casillaOrigen.getPieza() === PIEZAS.PEON_BLANCO ? 1 : -1;
    const filaInicial = casillaOrigen.getPieza() === PIEZAS.PEON_BLANCO ? 1 : 6;
    const filaSiguiente = filaOrigen + direccion;
    const filaDobleSiguiente = filaOrigen + 2 * direccion;
    rangoPosibleAux.push(
        new Casilla({
            columna: columnaOrigen,
            fila: filaSiguiente,
        })
    )
    if (filaOrigen === filaInicial) {
        rangoPosibleAux.push(
            new Casilla({
                columna: columnaOrigen,
                fila: filaDobleSiguiente,
            })
        )
    }
    rangoPosibleAux.forEach(casillaPosibleAux => {
        casillaAux=posicionTablero.getCasillaFromColumnFile(casillaPosibleAux)
        if(!casillaOcupada(casillaAux)){
            rangoPosibleMovimiento.push(casillaAux)
        }
    })
        return rangoPosibleMovimiento
    
}
const _rangoCaptura=(casillaOrigen:CasillaInterface,posicionTablero:TableroInterface)=>{
    let rangoPosibleCaptura:CasillaInterface[]=[]
    let peon=casillaOrigen.getPieza()
    const direccion = peon === PIEZAS.PEON_BLANCO ? 1 : -1;
    let filaOrigen=casillaOrigen.getFila()
    let columnaOrigen=casillaOrigen.getColumna()
    const filaSiguiente = filaOrigen + direccion;

    let casillaAux:CasillaInterface|undefined

    let columnaCapturableIzquierda = columnaOrigen - 1;
    let columnaCapturableDerecha = columnaOrigen + 1;
    let casillasCapturables = [
        new Casilla({columna:columnaCapturableIzquierda, fila:filaSiguiente}),
        new Casilla({columna:columnaCapturableDerecha, fila:filaSiguiente})
    ]
    casillasCapturables.forEach(casillaCapturable => {
        if(posicionTablero){

            casillaAux=posicionTablero.getCasillaFromColumnFile(casillaCapturable)
            if(casillaAux?.getPieza()){
                rangoPosibleCaptura.push(casillaCapturable)
            }
            
        }
    }) 
    return rangoPosibleCaptura
}
const rangoPosibleRey:RangoPosibleStrategy=(casillaOrigen:CasillaInterface)=>{
    let rangoPosible:Casilla[]=[]
    rangoPosible=[
        new Casilla({columna:casillaOrigen.getColumna()+1,fila:casillaOrigen.getFila()}),
        new Casilla({columna:casillaOrigen.getColumna()-1,fila:casillaOrigen.getFila()}),
        new Casilla({columna:casillaOrigen.getColumna(),fila:casillaOrigen.getFila()+1}),
        new Casilla({columna:casillaOrigen.getColumna(),fila:casillaOrigen.getFila()-1}),
        new Casilla({columna:casillaOrigen.getColumna()+1,fila:casillaOrigen.getFila()+1}),
        new Casilla({columna:casillaOrigen.getColumna()+1,fila:casillaOrigen.getFila()-1}),
        new Casilla({columna:casillaOrigen.getColumna()-1,fila:casillaOrigen.getFila()+1}),
        new Casilla({columna:casillaOrigen.getColumna()-1,fila:casillaOrigen.getFila()-1})
    ]
    return rangoPosible
}

const rangoPosibleCaballo:RangoPosibleStrategy=(casillaOrigen:CasillaInterface)=>{
    let rangoPosible:Casilla[]=[]
    let filaOrigen=casillaOrigen.getFila()
    let columnaOrigen=casillaOrigen.getColumna()
    rangoPosible=[
        new Casilla({columna:columnaOrigen+1,fila:filaOrigen+2}),
        new Casilla({columna:columnaOrigen+1,fila:filaOrigen-2}),
        new Casilla({columna:columnaOrigen-1,fila:filaOrigen+2}),
        new Casilla({columna:columnaOrigen-1,fila:filaOrigen-2}),
        new Casilla({columna:columnaOrigen+2,fila:filaOrigen+1}),
        new Casilla({columna:columnaOrigen+2,fila:filaOrigen-1}),
        new Casilla({columna:columnaOrigen-2,fila:filaOrigen+1}),
        new Casilla({columna:columnaOrigen-2,fila:filaOrigen-1})
    ]
    return rangoPosible
}



