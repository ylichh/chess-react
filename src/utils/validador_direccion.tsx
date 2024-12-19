import { Casilla } from "../interfaces/casilla";
import { PIEZAS,DIRECCIONES_TORRE,DIRECCIONES_ALFIL, DIRECCIONES_REINA } from "../constants";
import { obtenDireccionSentido } from "./utilidades";
type DireccionPosibleStrategy = (direccionSentido: any) => boolean;


export function direccionPosible(casillaOrigen: Casilla, casillaDestino: Casilla): boolean {
    let direccionSentido = obtenDireccionSentido(casillaOrigen, casillaDestino);
    console.log(`direccion sentido de la pieza ${direccionSentido}`);

    let estrategia: DireccionPosibleStrategy;

    switch (casillaOrigen.getPieza()) {
        case PIEZAS.TORRE_BLANCA:
        case PIEZAS.TORRE_NEGRA:
            estrategia = direccionPosibleTorre;
            break;
        case PIEZAS.ALFIL_BLANCO:
        case PIEZAS.ALFIL_NEGRO:
            estrategia = direccionPosibleAlfil;
            break;
        case PIEZAS.REINA_BLANCA:
        case PIEZAS.REINA_NEGRA:
            estrategia = direccionPosibleReina;
            break;
        default:
            return false;
    }

    return estrategia(direccionSentido);
}

const direccionPosibleTorre:DireccionPosibleStrategy=(direccionSentido:any)=>{
    return someDirecciones(direccionSentido,DIRECCIONES_TORRE)
}

const direccionPosibleAlfil:DireccionPosibleStrategy=(direccionSentido:any)=>{
    return someDirecciones(direccionSentido,DIRECCIONES_ALFIL)
}

const direccionPosibleReina:DireccionPosibleStrategy=(direccionSentido:any)=>{
    return someDirecciones(direccionSentido,DIRECCIONES_REINA)
}

export function someDirecciones(direccionSentido:any,direccionesValidas:any[]){
    let incluido=direccionesValidas.some(direcciones=> 
        direcciones.sentidoFila===direccionSentido.sentidoFila&&
        direcciones.sentidoColumna===direccionSentido.sentidoColumna
    )
    return incluido
}

