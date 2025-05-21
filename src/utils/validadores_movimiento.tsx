import { CasillaInterface, Casilla } from '../interfaces/casilla';
import { TableroInterface } from '../interfaces/Tablero';
import { obtenDireccionSentidoLineal, casillaOcupada } from './utilidades';

export function caminoLibre(casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface, posicionTablero: TableroInterface) {
  //direccion, sentido
  const { sentidoColumna, sentidoFila } = obtenDireccionSentidoLineal(casillaOrigen, casillaDestino);

  const filaDestino = casillaDestino.getFila();
  const columnaDestino = casillaDestino.getColumna();

  const filaOrigen = casillaOrigen.getFila();
  const columnaOrigen = casillaOrigen.getColumna();

  let siguienteColumnaEvaluada = columnaOrigen + sentidoColumna; //cuidao
  let siguienteFilaEvaluada = filaOrigen + sentidoFila; //cuidao

  let casillaEvaluada: CasillaInterface | undefined;
  console.log(`
        fila origen: ${filaOrigen}
        columna origen: ${columnaOrigen}

        fila destino: ${filaDestino}
        columna destino: ${columnaDestino}
    `);
  while (!(siguienteColumnaEvaluada === columnaDestino && siguienteFilaEvaluada === filaDestino)) {
    casillaEvaluada = posicionTablero.getCasillaFromColumnFile(
      new Casilla({
        columna: siguienteColumnaEvaluada,
        fila: siguienteFilaEvaluada,
      })
    );
    console.log(`
            siguiente fila: ${siguienteFilaEvaluada}
            siguiente columna: ${siguienteColumnaEvaluada}
            `);

    if (casillaEvaluada && casillaOcupada(casillaEvaluada)) {
      console.log('camino no libre');
      return false;
    }
    siguienteColumnaEvaluada += sentidoColumna;
    siguienteFilaEvaluada += sentidoFila;
  }
  return true;
}
