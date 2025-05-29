import { PIEZAS } from '../../../constants';
import { TableroInterface } from '../../../interfaces/Tablero';
import { CasillaInterface } from '../../../interfaces/casilla';
import { MovimientosEspecialesInterface } from '../../../interfaces/movimientosEspeciales';
import { rangoPosiblePeon } from './peon';
import { rangoPosibleCaballo } from './caballo';
import { rangoPosibleRey } from './rey';
export interface MovimientoEnRangoArgumentos {
  casillaOrigen: CasillaInterface;
  casillaDestino: CasillaInterface;
  posicionTablero?: TableroInterface;
  movimientosEspeciales: MovimientosEspecialesInterface;
}

export type RangoPosibleStrategy = (argumentosMovimientoEnRango: MovimientoEnRangoArgumentos) => CasillaInterface[];

export function movimientoEnRango(argumentosMovimientoEnRango: MovimientoEnRangoArgumentos): boolean {
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
  const rango = estrategia(argumentosMovimientoEnRango);
  return rango.some((rango) => rango.getFila() === argumentosMovimientoEnRango.casillaDestino.getFila() && rango.getColumna() === argumentosMovimientoEnRango.casillaDestino.getColumna());
}
