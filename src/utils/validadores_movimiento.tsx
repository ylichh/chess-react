import { CasillaType } from "./initial_state"

import { obtenDireccionSentido,casillaOcupada } from "./utilidades"
export function nuevaPosicionTablero(casillaPresionada:CasillaType,posicionTablero:any,casillaDestino:CasillaType){

    let casillaOrigenActualizada=posicionTablero.find((casillaPosicion:CasillaType)=>casillaPosicion.numero===casillaPresionada.numero)
    casillaOrigenActualizada.pieza=''

    let casillaDestinoActualizada=posicionTablero.find((casillaPosicion:CasillaType)=>casillaPosicion.numero===casillaDestino.numero)
    casillaDestinoActualizada.pieza=casillaPresionada.pieza
    casillaDestinoActualizada.colorPieza=casillaPresionada.colorPieza

    return posicionTablero
}


export function caminoLibre(casillaOrigen:CasillaType,casillaDestino:CasillaType,posicionTablero:CasillaType[]){
    //direccion, sentido
    let { sentidoColumna, sentidoFila } = obtenDireccionSentido(casillaOrigen, casillaDestino);

    let filaDestino=casillaDestino.fila
    let columnaDestino=casillaDestino.columna

    let filaOrigen=casillaOrigen.fila??0
    let columnaOrigen=casillaOrigen.columna??0

    let siguienteColumnaEvaluada=columnaOrigen+sentidoColumna//cuidao
    let siguienteFilaEvaluada=filaOrigen+sentidoFila//cuidao

    let casillaEvaluada
    console.log(`
        fila origen: ${filaOrigen}
        columna origen: ${columnaOrigen}

        fila destino: ${filaDestino}
        columna destino: ${columnaDestino}
    `)

    while (!(siguienteColumnaEvaluada===columnaDestino&&siguienteFilaEvaluada===filaDestino)){

        casillaEvaluada=posicionTablero.find(casilla =>
            casilla.fila===siguienteFilaEvaluada&&
            casilla.columna===siguienteColumnaEvaluada
        ) 
        console.log(`
            siguiente fila: ${siguienteFilaEvaluada}
            siguiente columna: ${siguienteColumnaEvaluada}
            `)

        if (casillaEvaluada&&casillaOcupada(casillaEvaluada)){
            console.log("camino no libre")
            return false
        }
        siguienteColumnaEvaluada+=sentidoColumna
        siguienteFilaEvaluada+=sentidoFila
    }
    return true
}
