import { Casilla } from "../interfaces/casilla";
import { PIEZAS } from "../constants";
import { obtenDireccionSentido,casillaOcupada } from "./utilidades";
type RangoPosibleStrategy = (casillaOrigen: Casilla,casillaDestino?:Casilla,posicionTablero?: Casilla[]) => Casilla[];


export function movimientoEnRango(casillaOrigen: Casilla, casillaDestino: Casilla,posicionTablero:Casilla[]): boolean {
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

const rangoPosiblePeon:RangoPosibleStrategy=(casillaOrigen:Casilla,_: any,posicionTablero?:Casilla[])=>{
    let rangoPosible:Casilla[]=[]

    posicionTablero=posicionTablero??[]
    rangoPosible=rangoPosible.concat(_rangoMovimiento(casillaOrigen,posicionTablero))
    rangoPosible=rangoPosible.concat(_rangoCaptura(casillaOrigen,posicionTablero))


    return rangoPosible
}

const _rangoMovimiento=(casillaOrigen:Casilla,posicionTablero:Casilla[])=>{
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
        casillaAux=posicionTablero.find(casillaTablero=>casillaTablero.getFila()===casillaPosibleAux.getFila()&&casillaTablero.getColumna()===casillaPosibleAux.getColumna())
        if(!casillaOcupada(casillaAux)){
            rangoPosibleMovimiento.push(casillaAux)
        }
    })
        return rangoPosibleMovimiento
    
}
const _rangoCaptura=(casillaOrigen:Casilla,posicionTablero:Casilla[])=>{
    let rangoPosibleCaptura:Casilla[]=[]
    let peon=casillaOrigen.getPieza()
    const direccion = peon === PIEZAS.PEON_BLANCO ? 1 : -1;
    let filaOrigen=casillaOrigen.getFila()
    let columnaOrigen=casillaOrigen.getColumna()
    const filaSiguiente = filaOrigen + direccion;


    let columnaCapturableIzquierda = columnaOrigen - 1;
    let columnaCapturableDerecha = columnaOrigen + 1;
    let casillasCapturables = [
        new Casilla({columna:columnaCapturableIzquierda, fila:filaSiguiente}),
        new Casilla({columna:columnaCapturableDerecha, fila:filaSiguiente})
    ]
    casillasCapturables.forEach(casillaCapturable => {
        if(posicionTablero){
            posicionTablero.find(casillaTablero=>{
                if(casillaTablero.getFila()===casillaCapturable.getFila()&&casillaTablero.getColumna()===casillaCapturable.getColumna()){
                    if(casillaTablero.getPieza()){
                        rangoPosibleCaptura.push(casillaCapturable)
                    }
                }
            })
        }
    }) 
    return rangoPosibleCaptura
}
const rangoPosibleRey:RangoPosibleStrategy=(casillaOrigen:Casilla)=>{
    let rangoPosible:Casilla[]=[]
    return rangoPosible
}

const rangoPosibleCaballo:RangoPosibleStrategy=(casillaOrigen:Casilla)=>{
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



