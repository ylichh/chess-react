import { Casilla,CasillaInterface } from "../interfaces/casilla";
import { PIEZAS } from "../constants";
import { obtenDireccionSentido,casillaOcupada } from "./utilidades";
import { TableroInterface } from "../interfaces/Tablero";
import { MovimientosEspecialesInterface } from "../interfaces/movimientosEspeciales";

export interface MovimientoEnRangoArgumentos{
    casillaOrigen:CasillaInterface,
    casillaDestino:CasillaInterface,
    posicionTablero?:TableroInterface,
    movimientosEspeciales:MovimientosEspecialesInterface
}

type RangoPosibleStrategy = (argumentosMovimientoEnRango:MovimientoEnRangoArgumentos) => CasillaInterface[];

export function movimientoEnRango(argumentosMovimientoEnRango:MovimientoEnRangoArgumentos): boolean {
    let direccionSentido = obtenDireccionSentido(argumentosMovimientoEnRango.casillaOrigen, argumentosMovimientoEnRango.casillaDestino);
    console.log(`direccion sentido de la pieza ${direccionSentido}`);

    let estrategia: RangoPosibleStrategy;

    switch (argumentosMovimientoEnRango.casillaOrigen.getPieza()) {
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
    let rango=estrategia(argumentosMovimientoEnRango);
    return rango.some(rango => rango.getFila() === argumentosMovimientoEnRango.casillaDestino.getFila() && rango.getColumna() === argumentosMovimientoEnRango.casillaDestino.getColumna())

}

const rangoPosiblePeon:RangoPosibleStrategy=(argumentosMovimientoEnRango)=>{
    
    if (!argumentosMovimientoEnRango.posicionTablero) {
        throw new Error("posicionTablero is required");
    }

    let rangoPosible:CasillaInterface[]=[]


    rangoPosible=rangoPosible.concat(_rangoMovimiento(argumentosMovimientoEnRango.casillaOrigen,argumentosMovimientoEnRango.posicionTablero))
    rangoPosible=rangoPosible.concat(_rangoCapturaClasica(argumentosMovimientoEnRango.casillaOrigen,argumentosMovimientoEnRango.posicionTablero))
    rangoPosible=rangoPosible.concat(_rangoCapturaAlPaso(argumentosMovimientoEnRango.casillaOrigen,argumentosMovimientoEnRango.movimientosEspeciales.alPaso))
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
const _rangoCapturaClasica=(casillaOrigen:CasillaInterface,posicionTablero:TableroInterface)=>{
    //ya tengo las casillas que estan disponibles al paso, debo ver si el peon original está en dispocion de hacer un al paso, osea, que esta en la 4 fila o 5 fila
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

const _rangoCapturaAlPaso=(casillaOrigen:CasillaInterface,casillaAlPasoDisponible:CasillaInterface[])=>{
    
    
    if (casillaAlPasoDisponible.length==0||casillaOrigen.getPieza()!==casillaAlPasoDisponible[0].getPieza()) {
        return []
    }

    let casillaAlPaso:CasillaInterface=casillaAlPasoDisponible[0] 
    let direccionOrigen=casillaAlPaso?.getPieza()===PIEZAS.PEON_BLANCO?-1:+1
    let casillaCapazComerAlPaso:CasillaInterface|undefined
    const casillasCapacesDeCapturarAlPaso:CasillaInterface[]=[
        new Casilla({
            columna:casillaAlPaso.getColumna()-1,
            fila:casillaAlPaso.getFila()+direccionOrigen}),
        new Casilla({
            columna:casillaAlPaso.getColumna()+1,
            fila:casillaAlPaso.getFila()+direccionOrigen})
    ]
    casillaCapazComerAlPaso=casillasCapacesDeCapturarAlPaso.find(
        casilla=>casilla.getColumna()===casillaOrigen.getColumna()&&
                casilla.getFila()===casillaOrigen.getFila()
    )

    return casillaCapazComerAlPaso? casillaAlPasoDisponible:[]
}
const rangoPosibleRey:RangoPosibleStrategy=(argumentosMovimientoEnRango:MovimientoEnRangoArgumentos)=>{
    let rangoPosible:Casilla[]=[]
    let casillaOrigen=argumentosMovimientoEnRango.casillaOrigen
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

const rangoPosibleCaballo:RangoPosibleStrategy=(argumentosMovimientoEnRango:MovimientoEnRangoArgumentos)=>{
    let rangoPosible:Casilla[]=[]
    let filaOrigen=argumentosMovimientoEnRango.casillaOrigen.getFila()
    let columnaOrigen=argumentosMovimientoEnRango.casillaOrigen.getColumna()
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



