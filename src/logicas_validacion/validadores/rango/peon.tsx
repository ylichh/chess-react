import { Casilla, CasillaInterface } from '../../../interfaces/casilla';
import { TableroInterface } from '../../../interfaces/Tablero';
import { RangoPosibleStrategy } from './patron';
import { casillaOcupada } from '../../../utils/utilidades';
import { PIEZAS } from '../../../constants';

export const rangoPosiblePeon: RangoPosibleStrategy = (argumentosMovimientoEnRango) => {
  if (!argumentosMovimientoEnRango.posicionTablero) {
    throw new Error('posicionTablero is required');
  }

  let rangoPosible: CasillaInterface[] = [];

  rangoPosible = rangoPosible.concat(_rangoDesplazamiento(argumentosMovimientoEnRango.casillaOrigen, argumentosMovimientoEnRango.posicionTablero));
  rangoPosible = rangoPosible.concat(_rangoCapturaClasica(argumentosMovimientoEnRango.casillaOrigen, argumentosMovimientoEnRango.posicionTablero));
  rangoPosible = rangoPosible.concat(_rangoCapturaAlPaso(argumentosMovimientoEnRango.casillaOrigen, argumentosMovimientoEnRango.movimientosEspeciales.alPaso));
  return rangoPosible;
};

const _rangoDesplazamiento = (casillaOrigen: CasillaInterface, posicionTablero: TableroInterface) => {
  const filaOrigen = casillaOrigen.getFila();
  const columnaOrigen = casillaOrigen.getColumna();
  const rangoPosibleAux: Casilla[] = [];
  const rangoPosibleMovimiento: Casilla[] = [];
  let casillaAux: any;
  const direccion = casillaOrigen.getPieza() === PIEZAS.PEON_BLANCO ? 1 : -1;
  const filaInicial = casillaOrigen.getPieza() === PIEZAS.PEON_BLANCO ? 1 : 6;
  const filaSiguiente = filaOrigen + direccion;
  const filaDobleSiguiente = filaOrigen + 2 * direccion;
  rangoPosibleAux.push(
    new Casilla({
      columna: columnaOrigen,
      fila: filaSiguiente,
    })
  );
  if (filaOrigen === filaInicial) {
    rangoPosibleAux.push(
      new Casilla({
        columna: columnaOrigen,
        fila: filaDobleSiguiente,
      })
    );
  }
  rangoPosibleAux.forEach((casillaPosibleAux) => {
    casillaAux = posicionTablero.getCasillaFromColumnFile(casillaPosibleAux);
    if (!casillaOcupada(casillaAux)) {
      rangoPosibleMovimiento.push(casillaAux);
    }
  });
  return rangoPosibleMovimiento;
};
const _rangoCapturaClasica = (casillaOrigen: CasillaInterface, posicionTablero: TableroInterface) => {
  //ya tengo las casillas que estan disponibles al paso, debo ver si el peon original está en dispocion de hacer un al paso, osea, que esta en la 4 fila o 5 fila
  const rangoPosibleCaptura: CasillaInterface[] = [];
  const peon = casillaOrigen.getPieza();
  const direccion = peon === PIEZAS.PEON_BLANCO ? 1 : -1;
  const filaOrigen = casillaOrigen.getFila();
  const columnaOrigen = casillaOrigen.getColumna();
  const filaSiguiente = filaOrigen + direccion;

  let casillaAux: CasillaInterface | undefined;

  const columnaCapturableIzquierda = columnaOrigen - 1;
  const columnaCapturableDerecha = columnaOrigen + 1;
  const casillasCapturables = [new Casilla({ columna: columnaCapturableIzquierda, fila: filaSiguiente }), new Casilla({ columna: columnaCapturableDerecha, fila: filaSiguiente })];

  casillasCapturables.forEach((casillaCapturable) => {
    if (posicionTablero) {
      casillaAux = posicionTablero.getCasillaFromColumnFile(casillaCapturable);
      if (casillaAux?.getPieza()) {
        rangoPosibleCaptura.push(casillaCapturable);
      }
    }
  });
  return rangoPosibleCaptura;
};

const _rangoCapturaAlPaso = (casillaOrigen: CasillaInterface, casillaAlPasoDisponible: CasillaInterface[]) => {
  if (casillaAlPasoDisponible.length == 0 || casillaOrigen.getPieza() !== casillaAlPasoDisponible[0].getPieza()) {
    return [];
  }

  const casillaAlPaso: CasillaInterface = casillaAlPasoDisponible[0];
  const direccionOrigen = casillaAlPaso?.getPieza() === PIEZAS.PEON_BLANCO ? -1 : +1;
  const casillasCapacesDeCapturarAlPaso: CasillaInterface[] = [
    new Casilla({
      columna: casillaAlPaso.getColumna() - 1,
      fila: casillaAlPaso.getFila() + direccionOrigen,
    }),
    new Casilla({
      columna: casillaAlPaso.getColumna() + 1,
      fila: casillaAlPaso.getFila() + direccionOrigen,
    }),
  ];
  const casillaCapazComerAlPaso = casillasCapacesDeCapturarAlPaso.find((casilla) => casilla.getColumna() === casillaOrigen.getColumna() && casilla.getFila() === casillaOrigen.getFila());

  return casillaCapazComerAlPaso ? casillaAlPasoDisponible : [];
};
