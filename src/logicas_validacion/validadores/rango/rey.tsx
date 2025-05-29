import { Casilla } from '../../../interfaces/casilla';
import { MovimientoEnRangoArgumentos } from './patron';
import { RangoPosibleStrategy } from './patron';
export const rangoPosibleRey: RangoPosibleStrategy = (argumentosMovimientoEnRango: MovimientoEnRangoArgumentos) => {
  let rangoPosible: Casilla[] = [];
  const casillaOrigen = argumentosMovimientoEnRango.casillaOrigen;
  rangoPosible = [
    new Casilla({
      columna: casillaOrigen.getColumna() + 1,
      fila: casillaOrigen.getFila(),
    }),
    new Casilla({
      columna: casillaOrigen.getColumna() - 1,
      fila: casillaOrigen.getFila(),
    }),
    new Casilla({
      columna: casillaOrigen.getColumna(),
      fila: casillaOrigen.getFila() + 1,
    }),
    new Casilla({
      columna: casillaOrigen.getColumna(),
      fila: casillaOrigen.getFila() - 1,
    }),
    new Casilla({
      columna: casillaOrigen.getColumna() + 1,
      fila: casillaOrigen.getFila() + 1,
    }),
    new Casilla({
      columna: casillaOrigen.getColumna() + 1,
      fila: casillaOrigen.getFila() - 1,
    }),
    new Casilla({
      columna: casillaOrigen.getColumna() - 1,
      fila: casillaOrigen.getFila() + 1,
    }),
    new Casilla({
      columna: casillaOrigen.getColumna() - 1,
      fila: casillaOrigen.getFila() - 1,
    }),
  ];
  return rangoPosible;
};
