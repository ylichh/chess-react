import { Casilla } from "../interfaces/casilla"
import { obtenDireccionSentido,casillaOcupada } from "./utilidades"
export function nuevaPosicionTablero(casillaPresionada:Casilla,posicionTablero:Casilla[],casillaDestino:Casilla){

    let casillaOrigenActualizada:Casilla|undefined=posicionTablero.find((casillaPosicion:Casilla)=>casillaPosicion.getNumero()===casillaPresionada.getNumero())

    if (casillaOrigenActualizada){
        casillaOrigenActualizada.setPiezaConColor('','')
    }   
    let casillaDestinoActualizada:Casilla|undefined=posicionTablero.find((casillaPosicion:Casilla)=>casillaPosicion.getNumero()===casillaDestino.getNumero())
    if (casillaDestinoActualizada){
        casillaDestinoActualizada.setPiezaConColor(casillaPresionada.getColorPieza(),casillaPresionada.getPieza())
    }
    return posicionTablero
}


export function caminoLibre(casillaOrigen:Casilla,casillaDestino:Casilla,posicionTablero:Casilla[]){
    //direccion, sentido
    let { sentidoColumna, sentidoFila } = obtenDireccionSentido(casillaOrigen, casillaDestino);

    let filaDestino=casillaDestino.getFila()
    let columnaDestino=casillaDestino.getColumna()

    let filaOrigen=casillaOrigen.getFila()
    let columnaOrigen=casillaOrigen.getColumna()

    let siguienteColumnaEvaluada=columnaOrigen+sentidoColumna//cuidao
    let siguienteFilaEvaluada=filaOrigen+sentidoFila//cuidao

    let casillaEvaluada:Casilla|undefined
    console.log(`
        fila origen: ${filaOrigen}
        columna origen: ${columnaOrigen}

        fila destino: ${filaDestino}
        columna destino: ${columnaDestino}
    `)

    while (!(siguienteColumnaEvaluada===columnaDestino&&siguienteFilaEvaluada===filaDestino)){

        casillaEvaluada=posicionTablero.find((casilla:Casilla) =>
            casilla.getFila()===siguienteFilaEvaluada&&
            casilla.getColumna()===siguienteColumnaEvaluada
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
