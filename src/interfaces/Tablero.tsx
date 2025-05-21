import { CasillaInterface, Casilla } from './casilla';

import { clasificarMovimiento } from '../utils/clasificador_movimiento';
import { obtenDireccionSentidoLineal } from '../utils/utilidades';
import { ListaMovimientos } from '../constants';
export interface TableroInterface {
  getCasillaFromColumnFile(datosCasilla: CasillaInterface): CasillaInterface | undefined;
  getCasillas(): CasillaInterface[];
  updateTableroAfterMovement(casillaAnterior: CasillaInterface, casillaDestino: CasillaInterface): TableroInterface;
  actualizaPosicion(casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface): TableroInterface;
}
interface TableroParams {
  casillas: CasillaInterface[];
}
export class Tablero implements TableroInterface {
  private casillas: CasillaInterface[];
  constructor(tableroParams: TableroParams) {
    this.casillas = tableroParams.casillas;
  }
  getCasillaFromColumnFile(datosCasilla: CasillaInterface): CasillaInterface | undefined {
    const casilla: CasillaInterface | undefined = this.casillas.find((casilla) => casilla.getColumna() === datosCasilla.getColumna() && casilla.getFila() === datosCasilla.getFila());

    return casilla;
  }
  getCasillas(): CasillaInterface[] {
    return this.casillas;
  }
  updateTableroAfterMovement(casillaAnterior: CasillaInterface, casillaDestino: CasillaInterface): TableroInterface {
    let casillaOrigenActualizada: CasillaInterface | undefined = this.getCasillaFromColumnFile(casillaAnterior);

    if (casillaOrigenActualizada) {
      casillaOrigenActualizada.setPiezaConColor('', '');
    }
    // let casillaDestinoActualizada:CasillaInterface|undefined=posicionTablero.find((casillaPosicion:Casilla)=>casillaPosicion.getNumero()===casillaDestino.getNumero())
    let casillaDestinoActualizada: CasillaInterface | undefined = this.getCasillaFromColumnFile(casillaDestino);

    if (casillaDestinoActualizada) {
      casillaDestinoActualizada.setPiezaConColor(casillaAnterior.getColorPieza(), casillaAnterior.getPieza());
    }
    return this;
  }
  actualizaPosicion(casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface): TableroInterface {
    //clasificar movimiento: desplazamiento, comer, enroque, coronacion, al paso
    const movimiento = clasificarMovimiento(casillaOrigen, casillaDestino);
    let estrategiaActualizacion: (casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface) => TableroInterface;

    switch (movimiento) {
      case ListaMovimientos.AL_PASO:
        estrategiaActualizacion = this.actualizaAlPaso;
        break;
      case ListaMovimientos.DESPLAZAMIENTO:
      case ListaMovimientos.CAPTURA:
        estrategiaActualizacion = this.actualizacionEstandar;
        break;
      case ListaMovimientos.ENROQUE:
        estrategiaActualizacion = this.actualizaEnroque;
        break;
      case ListaMovimientos.CORONACION:
        estrategiaActualizacion = this.actualizaCoronacion;
        break;
      default:
        throw new Error('Movimiento no encontrado');
    }

    console.log('movimiento', movimiento);
    return estrategiaActualizacion(casillaOrigen, casillaDestino);
  }
  actualizacionEstandar = (casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface): TableroInterface => {
    const casillaOrigenActualizada: CasillaInterface | undefined = this.getCasillaFromColumnFile(casillaOrigen);

    if (casillaOrigenActualizada) {
      casillaOrigenActualizada.setPiezaConColor('', '');
    }
    // let casillaDestinoActualizada:CasillaInterface|undefined=posicionTablero.find((casillaPosicion:Casilla)=>casillaPosicion.getNumero()===casillaDestino.getNumero())
    const casillaDestinoActualizada: CasillaInterface | undefined = this.getCasillaFromColumnFile(casillaDestino);

    if (casillaDestinoActualizada) {
      casillaDestinoActualizada.setPiezaConColor(casillaOrigen.getColorPieza(), casillaOrigen.getPieza());
    }
    return this;
  };
  actualizaEnroque(casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface): TableroInterface {
    return this;
  }
  actualizaCoronacion(casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface): TableroInterface {
    return this;
  }
  actualizaAlPaso = (casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface): TableroInterface => {
    const direcctionSentido = obtenDireccionSentidoLineal(casillaOrigen, casillaDestino);
    const coordenadasCasillaCapturada = new Casilla({
      columna: casillaDestino.getColumna(),
      fila: casillaDestino.getFila() - direcctionSentido.sentidoFila,
    });
    const casillacapturada: CasillaInterface | undefined = this.getCasillaFromColumnFile(coordenadasCasillaCapturada);
    if (casillacapturada) {
      casillacapturada.setPiezaConColor('', '');
    }
    this.actualizacionEstandar(casillaOrigen, casillaDestino);
    return this;
  };
}
