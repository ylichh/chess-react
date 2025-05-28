import { PIEZAS } from '../constants';
import { CasillaInterface } from '../interfaces/casilla';
import { obtenDireccionSentidoLineal, casillaOcupada } from './utilidades';
import { ListaMovimientos } from '../constants';
type ClasificadorMovimientoEstrategia = (casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface) => ListaMovimientos;
///Este modulo es posterior a la validación de los movimientos, por ello no contempla errores
export function clasificarMovimiento(casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface): ListaMovimientos {
  let estrategia: ClasificadorMovimientoEstrategia;
  switch (casillaOrigen.getPieza()) {
    case PIEZAS.PEON_BLANCO:
    case PIEZAS.PEON_NEGRO:
      estrategia = clasificadorMovimientoPeon;
      break;
    case PIEZAS.ALFIL_BLANCO:
    case PIEZAS.ALFIL_NEGRO:
    case PIEZAS.CABALLO_BLANCO:
    case PIEZAS.CABALLO_NEGRO:
    case PIEZAS.TORRE_BLANCA:
    case PIEZAS.TORRE_NEGRA:
    case PIEZAS.REINA_NEGRA:
    case PIEZAS.REINA_BLANCA:
      estrategia = clasificadorEstandar;
      break;
    case PIEZAS.REY_BLANCO:
    case PIEZAS.REY_NEGRO:
      estrategia = clasificadorRey;
      break;
    default:
      throw new Error('Clasificador de la pieza no encontrado');
  }
  return estrategia(casillaOrigen, casillaDestino);
}

function clasificadorMovimientoPeon(casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface): ListaMovimientos {
  const direccionSentido = obtenDireccionSentidoLineal(casillaOrigen, casillaDestino);
  const esDiagonal = direccionSentido.sentidoColumna !== 0 && direccionSentido.sentidoFila !== 0;
  const estaOcupada = casillaOcupada(casillaDestino);
  const finalTablero = esFinalDeTablero(casillaOrigen, casillaDestino);

  if (esDiagonal && estaOcupada) {
    if (finalTablero) {
      return ListaMovimientos.CORONACION;
    }
    return ListaMovimientos.CAPTURA;
  }

  if (esDiagonal && !estaOcupada) {
    return ListaMovimientos.AL_PASO;
  }

  if (!esDiagonal && !estaOcupada) {
    if (finalTablero) {
      return ListaMovimientos.CORONACION;
    }
    return ListaMovimientos.DESPLAZAMIENTO;
  }
  //un movimiento puede ser captura y coronacion a la vez
  throw new Error('Movimiento no encontrado');
}
function esFinalDeTablero(casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface): boolean {
  if (casillaOrigen.getPieza() === PIEZAS.PEON_BLANCO) {
    return casillaDestino.getFila() === 7;
  }
  if (casillaOrigen.getPieza() === PIEZAS.PEON_NEGRO) {
    return casillaDestino.getFila() === 0;
  }
  return false;
}
function clasificadorEstandar(casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface): ListaMovimientos {
  const estaOcupada = casillaOcupada(casillaDestino);
  if (estaOcupada) {
    return ListaMovimientos.CAPTURA;
  } else if (!estaOcupada) {
    return ListaMovimientos.DESPLAZAMIENTO;
  }
  throw new Error('Movimiento no encontrado');
}
function clasificadorRey(casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface): ListaMovimientos {
  const estaOcupada = casillaOcupada(casillaDestino);
  if (estaOcupada) {
    const piezaDestino = casillaDestino.getPieza();
    if (piezaDestino === PIEZAS.TORRE_BLANCA || piezaDestino === PIEZAS.TORRE_NEGRA) {
      return ListaMovimientos.ENROQUE;
    }
    return ListaMovimientos.CAPTURA;
  } else {
    return ListaMovimientos.DESPLAZAMIENTO;
  }
}
