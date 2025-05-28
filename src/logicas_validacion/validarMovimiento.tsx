// import { CasillaInterface } from '../interfaces/casilla';
// import { TableroInterface } from '../interfaces/Tablero';
import { PIEZAS } from '../constants';
import { validadorPeon } from './cadenasValidacion/peon';
import { validadorEstandar } from './cadenasValidacion/estandar';
import { validadorRey } from './cadenasValidacion/rey';
import { validadorCaballo } from './cadenasValidacion/caballo';
import { MovimientoValidoArgumentos } from './evaluadorInterfaz';
// interface EstrategiaValidacionParams {
//   casillaOrigen: CasillaInterface;
//   casillaDestino: CasillaInterface;
//   tablero: TableroInterface;
// }
export type EstrategiaValidacion = ({ casillaOrigen, posicionTablero, casillaDestino, siguienteJugador, movimientosEspeciales }: MovimientoValidoArgumentos) => boolean;
export function validarMovimiento(argumentosValidacion: MovimientoValidoArgumentos): boolean {
  let estrategiaValidacion: EstrategiaValidacion;
  switch (argumentosValidacion.casillaOrigen.getPieza()) {
    case PIEZAS.PEON_BLANCO:
    case PIEZAS.PEON_NEGRO:
      estrategiaValidacion = validadorPeon;
      break;
    case PIEZAS.ALFIL_BLANCO:
    case PIEZAS.ALFIL_NEGRO:
    case PIEZAS.TORRE_BLANCA:
    case PIEZAS.TORRE_NEGRA:
    case PIEZAS.REINA_BLANCA:
    case PIEZAS.REINA_NEGRA:
      estrategiaValidacion = validadorEstandar;
      break;
    case PIEZAS.CABALLO_BLANCO:
    case PIEZAS.CABALLO_NEGRO:
      estrategiaValidacion = validadorCaballo;
      break;
    case PIEZAS.REY_BLANCO:
    case PIEZAS.REY_NEGRO:
      estrategiaValidacion = validadorRey;
      break;
    default:
      console.log('Pieza no registrada en el validador', argumentosValidacion);
      throw new Error('Pieza no registrada en el validador');
  }
  return estrategiaValidacion(argumentosValidacion);
}
