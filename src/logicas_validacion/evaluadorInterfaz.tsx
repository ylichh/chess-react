import { CasillaInterface } from '../interfaces/casilla';
import { TableroInterface } from '../interfaces/Tablero';
import { COLOR_PIEZA, PIEZAS } from '../constants';
import { MovimientosEspecialesInterface } from '../interfaces/movimientosEspeciales';

export interface MovimientoValidoArgumentos {
  casillaOrigen: CasillaInterface;
  posicionTablero: TableroInterface;
  casillaDestino: CasillaInterface;
  siguienteJugador: COLOR_PIEZA;
  movimientosEspeciales: MovimientosEspecialesInterface;
}

export interface MovimientoHandler {
  siguienteCondicion(handler: MovimientoHandler): MovimientoHandler;
  evaluar(argumentosMovimientosValidos: MovimientoValidoArgumentos): boolean;
}

export abstract class AbstractMovimientoHandler implements MovimientoHandler {
  private siguienteValidador: MovimientoHandler | null = null;
  protected pieza: PIEZAS | undefined;

  public siguienteCondicion(handler: MovimientoHandler): MovimientoHandler {
    this.siguienteValidador = handler;
    return handler;
  }

  public evaluar(argumentosMovimientosValidos: MovimientoValidoArgumentos): boolean {
    if (this.siguienteValidador) {
      return this.siguienteValidador.evaluar(argumentosMovimientosValidos);
    }
    return true;
  }
}
