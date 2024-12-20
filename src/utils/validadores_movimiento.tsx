import { CasillaInterface,Casilla } from "../interfaces/casilla"
import { TableroInterface } from "../interfaces/Tablero"
import { obtenDireccionSentido,casillaOcupada } from "./utilidades"



export function caminoLibre(casillaOrigen:CasillaInterface,casillaDestino:CasillaInterface,posicionTablero:TableroInterface){
    //direccion, sentido
    let { sentidoColumna, sentidoFila } = obtenDireccionSentido(casillaOrigen, casillaDestino);

    let filaDestino=casillaDestino.getFila()
    let columnaDestino=casillaDestino.getColumna()

    let filaOrigen=casillaOrigen.getFila()
    let columnaOrigen=casillaOrigen.getColumna()

    let siguienteColumnaEvaluada=columnaOrigen+sentidoColumna//cuidao
    let siguienteFilaEvaluada=filaOrigen+sentidoFila//cuidao

    let casillaEvaluada:CasillaInterface|undefined
    console.log(`
        fila origen: ${filaOrigen}
        columna origen: ${columnaOrigen}

        fila destino: ${filaDestino}
        columna destino: ${columnaDestino}
    `)

    while (!(siguienteColumnaEvaluada===columnaDestino&&siguienteFilaEvaluada===filaDestino)){

        // casillaEvaluada=posicionTablero.find((casilla:Casilla) =>
        //     casilla.getFila()===siguienteFilaEvaluada&&
        //     casilla.getColumna()===siguienteColumnaEvaluada
        // ) 
        casillaEvaluada=posicionTablero.getCasillaFromColumnFile(new Casilla({
            columna:siguienteColumnaEvaluada,
            fila:siguienteFilaEvaluada
        }))
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
