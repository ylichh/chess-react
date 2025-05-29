import { Casilla } from '../../../interfaces/casilla';
import { RangoPosibleStrategy } from './patron';
import { MovimientoEnRangoArgumentos } from './patron';
export const rangoPosibleCaballo: RangoPosibleStrategy = (argumentosMovimientoEnRango: MovimientoEnRangoArgumentos) => {
  let rangoPosible: Casilla[] = [];
  const filaOrigen = argumentosMovimientoEnRango.casillaOrigen.getFila();
  const columnaOrigen = argumentosMovimientoEnRango.casillaOrigen.getColumna();
  rangoPosible = [
    new Casilla({ columna: columnaOrigen + 1, fila: filaOrigen + 2 }),
    new Casilla({ columna: columnaOrigen + 1, fila: filaOrigen - 2 }),
    new Casilla({ columna: columnaOrigen - 1, fila: filaOrigen + 2 }),
    new Casilla({ columna: columnaOrigen - 1, fila: filaOrigen - 2 }),
    new Casilla({ columna: columnaOrigen + 2, fila: filaOrigen + 1 }),
    new Casilla({ columna: columnaOrigen + 2, fila: filaOrigen - 1 }),
    new Casilla({ columna: columnaOrigen - 2, fila: filaOrigen + 1 }),
    new Casilla({ columna: columnaOrigen - 2, fila: filaOrigen - 1 }),
  ];
  return rangoPosible;
};
