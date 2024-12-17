import { CasillaType } from "./initial_state";
import { PIEZAS } from "../constants";
import { obtenDireccionSentido,casillaOcupada } from "./utilidades";
type RangoPosibleStrategy = (casillaOrigen: CasillaType,casillaDestino?:CasillaType,posicionTablero?: CasillaType[]) => CasillaType[];


export function movimientoEnRango(casillaOrigen: CasillaType, casillaDestino: CasillaType,posicionTablero:CasillaType[]): boolean {
    let direccionSentido = obtenDireccionSentido(casillaOrigen, casillaDestino);
    console.log(`direccion sentido de la pieza ${direccionSentido}`);

    let estrategia: RangoPosibleStrategy;

    switch (casillaOrigen.pieza) {
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
    return rango.some(rango => rango.fila === casillaDestino.fila && rango.columna === casillaDestino.columna)

}

const rangoPosiblePeon:RangoPosibleStrategy=(casillaOrigen:CasillaType,_: any,posicionTablero?:CasillaType[])=>{
    let rangoPosible:CasillaType[]=[]

    posicionTablero=posicionTablero??[]
    rangoPosible=rangoPosible.concat(_rangoMovimiento(casillaOrigen,posicionTablero))
    rangoPosible=rangoPosible.concat(_rangoCaptura(casillaOrigen,posicionTablero))


    return rangoPosible
}

const _rangoMovimiento=(casillaOrigen:CasillaType,posicionTablero:CasillaType[])=>{
    let filaOrigen=casillaOrigen.fila??0
    let columnaOrigen=casillaOrigen.columna??0
    let rangoPosibleAux:CasillaType[]=[]
    let rangoPosibleMovimiento:CasillaType[]=[]
    let casillaAux:any
    const direccion = casillaOrigen.pieza === PIEZAS.PEON_BLANCO ? 1 : -1;
    const filaInicial = casillaOrigen.pieza === PIEZAS.PEON_BLANCO ? 1 : 6;
    const filaSiguiente = filaOrigen + direccion;
    const filaDobleSiguiente = filaOrigen + 2 * direccion;
    if (filaOrigen === filaInicial) {
        rangoPosibleAux.push(
            { fila: filaSiguiente, columna: columnaOrigen },
            { fila: filaDobleSiguiente, columna: columnaOrigen }
        );
    } else {
        rangoPosibleAux.push(
            { fila: filaSiguiente, columna: columnaOrigen }
        );
    }
    rangoPosibleAux.forEach(casillaPosibleAux => {
        casillaAux=posicionTablero.find(casillaTablero=>casillaTablero.fila===casillaPosibleAux.fila&&casillaTablero.columna===casillaPosibleAux.columna)
        if(!casillaOcupada(casillaAux)){
            rangoPosibleMovimiento.push(casillaAux)
        }
    })
    return rangoPosibleMovimiento
}
const _rangoCaptura=(casillaOrigen:CasillaType,posicionTablero:CasillaType[])=>{
    let rangoPosibleCaptura:CasillaType[]=[]
    let peon=casillaOrigen.pieza
    const direccion = peon === PIEZAS.PEON_BLANCO ? 1 : -1;
    let filaOrigen=casillaOrigen.fila??0
    let columnaOrigen=casillaOrigen.columna??0
    const filaSiguiente = filaOrigen + direccion;


    let columnaCapturableIzquierda = columnaOrigen - 1;
    let columnaCapturableDerecha = columnaOrigen + 1;
    let casillasCapturables = [
        { fila: filaSiguiente, columna: columnaCapturableIzquierda },
        { fila: filaSiguiente, columna: columnaCapturableDerecha }
    ]
    casillasCapturables.forEach(casillaCapturable => {
        if(posicionTablero){
            posicionTablero.find(casillaTablero=>{
                if(casillaTablero.fila===casillaCapturable.fila&&casillaTablero.columna===casillaCapturable.columna){
                    if(casillaTablero.pieza){
                        rangoPosibleCaptura.push(casillaCapturable)
                    }
                }
            })
        }
    }) 
    return rangoPosibleCaptura
}
const rangoPosibleRey:RangoPosibleStrategy=(casillaOrigen:CasillaType)=>{
    let rangoPosible:CasillaType[]=[]
    return rangoPosible
}

const rangoPosibleCaballo:RangoPosibleStrategy=(casillaOrigen:CasillaType)=>{
    let rangoPosible:CasillaType[]=[]

    return rangoPosible
}



